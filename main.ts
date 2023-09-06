/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import {
    Application,
    Router,
    Status,
    send,
} from "https://deno.land/x/oak@v12.6.0/mod.ts";

const app = new Application();
const router = new Router();

const kv = await Deno.openKv();

type Item = {
    key: Deno.KvKey;
    type: string;
    value: unknown;
};

for (const [name, value] of Object.entries(Deno.env.toObject())) {
    await kv.set(name.split("_"), value || "");
}

await kv.set(["1", "DENO", "STARTED_AT"], new Date().toISOString());
await kv.set(["1", "DENO", "cwd"], Deno.cwd());
await kv.set(["1", "DENO", "execPath"], Deno.execPath());
await kv.set(["1", "DENO", "hostname"], Deno.hostname());
await kv.set(["1", "DENO", "env"], Deno.env.toObject());
await kv.set(["1", "DENO", "HOME"], Deno.env.get("HOME"));
await kv.set(["1", "DENO", "ARGS"], Deno.args);
await kv.set(["1", "DENO", "VERSION"], Deno.version);
await kv.set(["1", "DENO", "CONSOLE_SIZE"], Deno.consoleSize());
await kv.set(["1", "DENO", "BUILD"], Deno.build);
await kv.set(["1", "DENO", "PID"], Deno.pid);
await kv.set(["1", "DENO", "LOADAVG"], Deno.loadavg());
await kv.set(["1", "DENO", "RESOURCE"], Deno.resources());
await kv.set(["1", "DENO", "NETWORK"], Deno.networkInterfaces());
await kv.set(["1", "DENO", "OS_RELEASE"], Deno.osRelease());
await kv.set(["1", "DENO", "OS_UP_TIME"], Deno.osUptime());

const prefix = (url: URL): string[] => {
    return url.searchParams.getAll("prefix");
};

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
