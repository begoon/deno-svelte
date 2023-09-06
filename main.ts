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

await kv.set(["", "a-boolean"], true);
await kv.set(["", "a-number"], 123);
await kv.set(["", "a-string"], "123");
await kv.set(["", "a-object"], { a: 1, b: 2, c: 3 });
await kv.set(["", "a-array"], [1, 2, 3]);

await kv.set(["root"], "some random shite");
await kv.set(["root", "a"], "more random shite");
await kv.set([".", "123"], "123");

for (const [name, value] of Object.entries(Deno.env.toObject())) {
    await kv.set(name.split("_"), value || "");
}

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
