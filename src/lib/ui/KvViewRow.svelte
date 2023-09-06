<script lang="ts">
    import type { Value } from "./types";

    export let row: Value;
    export let remove: (key: string[]) => void;
    export let put: (key: string[], value: unknown) => void;
    export let refresh: (prefix: string[]) => void;

    const rows = (v: string) => {
        if (!v) return 0;
        const n = Math.max(1, v.split("\n").length);
        const m =
            v
                .split("\n")
                .filter((v) => v.length > 100)
                .map((v) => v.length / 100)
                .reduce((a, b) => a + b, 0) + 1;
        return Math.max(n, m);
    };

    const anchor = (row: Value) => row.key.join("@");
</script>

<tr class:highlighted={row.highlighted}>
    <td>
        <a id={anchor(row)}>
            <button on:click={() => remove(row.key)} title="delete">🪣</button>
        </a>
    </td>
    <td
        ><input
            type="checkbox"
            value={row.selected}
            bind:checked={row.selected}
        /></td
    >
    <td class="key" class:added={row.added} class:updated={row.updated}>
        {#each row.key as k, i}
            <button
                on:click={() => refresh(row.key.slice(0, +i + 1))}
                disabled={i === row.key.length - 1}
            >
                {k || '""'}
            </button>
        {/each}
    </td>
    <td>
        {#if JSON.stringify(row.value) !== row.content}
            <button
                on:click={async () => {
                    try {
                        row.value = JSON.parse(row.content);
                        console.log("put", row.key, row.value);
                        await put(row.key, row.value);
                        row.updated = true;
                        row.error = "";
                    } catch (e) {
                        row.error = e.message;
                    }
                }}
                title="save"
                class="editing"
                disabled={Boolean(row.error)}>💾</button
            >
            <button
                on:click={() => {
                    row.content = JSON.stringify(row.value);
                    row.error = "";
                }}
                title="cancel"
                class="editing"
            >
                ❌
            </button>
        {:else}
            🟢
        {/if}
    </td>
    <td>{row.error ? "🚨" : "✔︎"}</td>
    <td>{row.type}</td>
    <td>
        <textarea
            rows={rows(row.content)}
            bind:value={row.content}
            on:keyup={(e) => {
                if (e.key === "Escape") row.content = JSON.stringify(row.value);
                try {
                    row.type = typeof JSON.parse(row.content);
                    row.error = "";
                } catch (e) {
                    row.error = e.message;
                }
            }}
        />
        {#if row.error}
            <mark>{row.error}</mark>
        {/if}
    </td>
</tr>

<style>
    tr.highlighted {
        animation: highlight 3s;
        background-color: #77ff77;
    }
    @keyframes highlight {
        0% {
            background: green;
        }
        100% {
            background: none;
        }
    }
    td {
        vertical-align: top;
        border: 1px solid #999;
        padding: 0.2em;
        width: 20px;
    }
    td.key {
        white-space: nowrap;
        color: red;
    }
    td:last-child {
        width: 100%;
        word-break: break-all;
    }
    .updated::after {
        content: "updated";
    }
    .added::after {
        content: "added";
    }
    button {
        border: none;
        background: #eee;
        margin: 1px;
        cursor: pointer;
    }
    button[title="delete"] {
        background: none;
        padding: 0;
        margin: 0;
    }
    button:disabled {
        cursor: default;
        background: none;
        text-decoration: none;
    }
    button.editing {
        background: none;
        background-color: transparent;
        padding: 0;
        margin: 0;
        font-size: 10px;
    }
    textarea {
        width: 100%;
        height: 100%;
        border: none;
        background: none;
        resize: none;
        font-size: 12px;
    }
</style>
