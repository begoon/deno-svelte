<script lang="ts">
    export let error: string;
</script>

<code class="error">{error}</code>

<style>
    code.error {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: auto;
        height: auto;
        padding: 2em;
        border-radius: 8px;
        background: red;
        color: white;
        font-family: sans-serif;
    }
</style>
