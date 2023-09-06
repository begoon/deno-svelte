<script lang="ts">
    import KvViewRow from "./KvViewRow.svelte";
    import type { Value } from "./types";

    export let data: Value[];
    export let prefix: string[];
    export let remove: (key: string[]) => void;
    export let put: (key: string[], value: unknown) => void;
    export let refresh: (prefix: string[]) => void;

    let selected: boolean = false;
    function select() {
        data.forEach((v) => (v.selected = selected));
        data = [...data];
    }

    function highlighted(key: string[]) {
        data.find((v) => v.key.join("@") === key.join("@")).highlighted = true;
        data = [...data];
    }

    function added(key: string[]) {
        data.find((v) => v.key.join("@") === key.join("@")).added = true;
        data = [...data];
    }

    function del() {
        const selected = data.filter((v) => v.selected);
        if (selected.length === 0) return;
        if (!confirm(`delete ${selected.length} items?`)) return;
        selected.forEach((v) => remove(v.key));
    }

    $: n = data.filter((v) => v.selected).length;
</script>

<table>
    <tr>
        <th>
            {#if n > 0}
                <button
                    title="delete {n ? `${n} ` : ''}item{n === 1 ? ' ' : 's'}"
                    on:click={del}
                    disabled={n < 1}>🗑️</button
                >
            {:else}
                <button
                    class="add"
                    title="delete {n ? `${n} ` : ''}item{n === 1 ? ' ' : 's'}"
                    on:click={async () => {
                        const data = prompt(
                            "input the key to add\n" +
                                "(either a string with " +
                                "spaces as separators or a JSON array)"
                        ).trim();
                        if (data.length === 0) return;
                        let key = data.split(/\s+/);
                        if (data[0] === "[") {
                            try {
                                key = JSON.parse(data);
                            } catch (e) {
                                alert(e.message);
                                return;
                            }
                        }
                        await put(key, "");
                        window.location.href = "#" + key.join("@");
                        highlighted(key);
                        added(key);
                    }}
                >
                    ➕
                </button>
            {/if}
        </th>
        <th
            ><input
                type="checkbox"
                bind:checked={selected}
                on:change={select}
            /></th
        >
        <th>
            {#if prefix.length}
                {prefix.join(" / ")}
                <button title="clear filter" on:click={() => refresh([])}>
                    ❌
                </button>
            {:else}key{/if}
        </th>
        <th>≠</th>
        <th />
        <th>type</th>
        <th>value</th>
    </tr>
    {#each data as row}
        <KvViewRow bind:row {remove} {put} {refresh} />
    {/each}
</table>

<style>
    table {
        border-collapse: collapse;
        font-size: 10px;
        width: 100%;
    }
    th {
        text-align: left;
        white-space: nowrap;
    }
    button {
        border: none;
        background: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
        font-size: 8px;
    }
    button.add {
        font-size: 12px;
    }
</style>
