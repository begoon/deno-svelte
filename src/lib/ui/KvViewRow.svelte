<script lang="ts">
    import type { Value } from "./types";

    export let row: Value;
    export let remove: (key: string[]) => void;
    export let put: (key: string[], value: unknown) => void;
    export let refresh: (prefix: string[]) => void;

    let editing = false;

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

    import { formatJSON } from "./format";

    function parse() {
        editor.error = "";
        if (editor.type == "string") editor.value = editor.content;
        else
            try {
                editor.value = JSON.parse(editor.content);
            } catch (e) {
                editor.error = e.message;
                console.log("error", e.message);
            }
    }

    type Editor = {
        type: "string" | "number" | "boolean" | "object";
        value: unknown;
        content: string;
        error?: string;
    };

    const editor: Editor = {
        type: "string",
        value: undefined,
        content: "",
    };

    const equal = (a: unknown, b: unknown): boolean =>
        JSON.stringify(a) === JSON.stringify(b);

    const prepare = (row: Value): string => {
        return row.type == "string" ? <string>row.value : formatJSON(row.value);
    };

    const escape = document.createElement("textarea");
    function escapeHTML(html: string) {
        escape.textContent = html;
        return escape.innerHTML;
    }

    function unescapeHTML(html) {
        escape.innerHTML = html;
        return escape.textContent;
    }
</script>

<tr class:highlighted={row.highlighted}>
    <td>
        <a id={anchor(row)}>
            <button
                on:click={() => remove(row.key)}
                class="icon"
                title="delete"
            >
                🪣
            </button>
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
                class="key"
                on:click={() => refresh(row.key.slice(0, +i + 1))}
                disabled={i === row.key.length - 1}
            >
                {k || '""'}
            </button>
        {/each}
    </td>
    <td>
        {#if editing}
            <select bind:value={editor.type}>
                <option selected={editor.type == "string"}>string</option>
                <option selected={editor.type == "number"}>number</option>
                <option selected={editor.type == "boolean"}>boolean</option>
                <option selected={editor.type == "object"}>object</option>
            </select>
        {:else}
            {row.type}
        {/if}
    </td>
    <td>
        {#if editing}
            {#if editor.error}
                <mark>{editor.error}</mark>
            {:else if editor.type != row.type || !equal(editor.value, row.value)}
                <button
                    on:click={async () => {
                        parse();
                        row.value = editor.value;
                        try {
                            console.log("put", row.key, row.value);
                            await put(row.key, row.value);
                            row.updated = true;
                        } catch (e) {
                            editor.error = e.message;
                            return;
                        }
                        editing = false;
                    }}
                    title="save"
                    class="icon"
                    disabled={Boolean(editor.error)}>💾</button
                >
            {/if}

            <button
                on:click={() => (editing = false)}
                title="cancel"
                class="icon"
            >
                ❌
            </button>
            <!-- svelte-ignore a11y-autofocus -->
            <textarea
                rows={rows(editor.content)}
                bind:value={editor.content}
                on:keyup={(e) => {
                    e.key === "Escape" ? (editing = false) : parse();
                }}
                autofocus
            />
        {:else}
            {@const content = prepare(row)}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                on:click={() => {
                    editor.content = content;
                    editor.type = row.type;
                    editing = true;
                }}
            >
                <code
                    >{@html escapeHTML(content)
                        .replaceAll(" ", "&nbsp;")
                        .replaceAll("\n", "<br />")}</code
                >
            </div>
        {/if}
    </td>
</tr>

<style>
    tr.highlighted {
        animation: highlight 3s;
        background-color: #eee;
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
        font-size: 14px;
        margin-left: 8px;
    }
    .added::after {
        content: "added";
        font-size: 14px;
        margin-left: 8px;
    }
    button {
        border: none;
        padding: 0;
        margin: 0;
        background-color: transparent;
    }
    button:disabled {
        cursor: default;
        background: none;
        text-decoration: none;
    }
    button.key {
        background: #eee;
        margin-right: 4px;
        cursor: pointer;
    }
    button.icon {
        background: none;
        font-size: 10px;
        cursor: pointer;
    }
    textarea {
        width: 100%;
        height: 100%;
        border: none;
        background: none;
        resize: none;
        font-size: 12px;
    }
    mark {
        display: block;
    }
    input[type="checkbox"] {
        margin: 2px;
        padding: 0;
    }
</style>
