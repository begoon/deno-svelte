<script lang="ts">
    import KvView from "./ui/KvView.svelte";

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
                content: JSON.stringify(v.value),
            })),
        ];
    };

    refresh(prefix);
</script>

<main>
    <KvView {data} {prefix} {remove} {put} {refresh} />
</main>

<style>
    main {
        margin-top: 1.2em;
    }
</style>
