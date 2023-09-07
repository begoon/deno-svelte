<script lang="ts">
    import KvView from "./ui/KvView.svelte";
    import { formatJSON } from "./ui/format";

    interface ImportMetaEnv {
        readonly DEV: boolean;
    }

    interface ImportMetaVite extends ImportMeta {
        readonly env: ImportMetaEnv;
    }

    import type { Value } from "./ui/types";

    const API = (endpoint: string) => {
        const url = new URL(new URL(import.meta.url).origin);
        if ((<ImportMetaVite>import.meta).env.DEV) url.port = "8000";
        url.pathname = endpoint;
        return url.toString();
    };

    const info = async () => {
        return (await (await fetch(API("kv/info"))).json()) as {
            database: string;
        };
    };

    const query = (cmd: string, prefix: string[]): string => {
        return API(cmd) + "?" + prefix.map((v) => "prefix=" + v).join("&");
    };

    const list = async (prefix: string[] = []) => {
        return (await (await fetch(query("kv", prefix))).json()) as Value[];
    };

    const remove = async (key: string[]) => {
        await fetch(query("kv", key), { method: "DELETE" });
        await refresh(prefix);
    };

    const put = async (key: string[], value: unknown) => {
        await fetch(query("kv", key), {
            method: "PUT",
            body: JSON.stringify(value),
        });
        await refresh(prefix);
    };

    let data: Value[] = [];
    let prefix: string[] = [];

    const refresh = async (updated: string[]) => {
        prefix = updated;
        data = [
            ...(await list(prefix)).map((v) => ({
                ...v,
                content: formatJSON(v.value),
            })),
        ];
    };

    refresh(prefix);
</script>

<header>
    {#await info() then { database }}
        {database}
    {/await}
</header>
<main>
    <KvView {data} {prefix} {remove} {put} {refresh} />
</main>

<style>
    main {
        margin-top: 1.2em;
    }
    header {
        position: fixed;
        top: 0;
        right: 0;
        font-size: 10px;
        font-family: monospace;
    }
</style>
