/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import * as dotenv from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import {
    Application,
    Router,
    Status,
    send,
} from "https://deno.land/x/oak@v12.6.0/mod.ts";

const app = new Application();
const router = new Router();

dotenv.config({ path: ".env", export: true });

const DENO_KV_DATABASE = Deno.env.get("DENO_KV_DATABASE") || "local";
const DENO_KV_PATH =
    DENO_KV_DATABASE !== "local"
        ? `https://api.deno.com/databases/${DENO_KV_DATABASE}/connect`
        : undefined;

console.log("DENO_KV_DATABASE", DENO_KV_DATABASE || "local");

console.time("opening kv");
const kv = await Deno.openKv(DENO_KV_PATH);
console.timeEnd("opening kv");

type Item = {
    key: Deno.KvKey;
    type: string;
    value: unknown;
};

for (const [name, value] of Object.entries(Deno.env.toObject())) {
    await kv.set(
        ["env", ...name.split("_").map((v) => (v ? v : "_"))],
        value || ""
    );
}

await kv.set(["", "DENO", "STARTED_AT"], new Date().toISOString());

const deno = Deno as Record<string, unknown>;
[
    "cwd",
    "execPath",
    "hostname",
    "args",
    "version",
    "consoleSize",
    "build",
    "pid",
    "loadavg",
    "resources",
    "networkInterfaces",
    "osRelease",
    "osUptime",
]
    .map((v) => [
        v.toString(),
        typeof deno[v] === "function"
            ? (<() => void>deno[v])()
            : (<{ toObject: () => void }>deno[v]).toObject
            ? (<{ toObject: () => void }>deno[v]).toObject()
            : deno[v],
    ])
    .forEach(([name, value], _) => {
        kv.set(["", "DENO", <string>name], value);
    });

const prefix = (url: URL): string[] => {
    return url.searchParams.getAll("prefix");
};

router.get("/health", (ctx) => {
    ctx.response.body = JSON.stringify({ database: DENO_KV_DATABASE });
});

router.get("/kv/:prefix*", async (ctx) => {
    const prefix_ = prefix(ctx.request.url);
    const data: Item[] = [];
    for await (const { key, value } of kv.list({ prefix: prefix_ })) {
        data.push({ key, value, type: typeof value });
    }
    ctx.response.body = JSON.stringify(data);
});

router.put("/kv/:prefix*", async (ctx) => {
    const key = prefix(ctx.request.url);
    const value = JSON.parse(await ctx.request.body().value);
    console.log("set", key, typeof value, value);
    const result = await kv.set(key, value);
    console.log("set result", result);
    ctx.response.status = Status.Accepted;
});

router.delete("/kv/:prefix*", async (ctx) => {
    const key = prefix(ctx.request.url);
    console.log("delete", key);
    await kv.delete(key);
    ctx.response.status = Status.Accepted;
});

app.use(oakCors());
app.use(router.routes());

app.use((ctx) =>
    send(ctx, ctx.request.url.pathname, {
        root: "dist",
        index: "index.html",
    })
);

app.use(router.allowedMethods());

const PORT = Number(Deno.env.get("PORT")) || 8000;
console.log("listening on", `http://localhost:${PORT}`);
await app.listen({ port: PORT });
