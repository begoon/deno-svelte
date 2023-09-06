<script lang="ts">
</script>

<img class="gear" src="/gear.png" alt="*" />

<style>
    img.gear {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 32px;
        height: auto;
        animation-name: spinner;
        animation-duration: 0.5s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }
    @keyframes spinner {
        100% {
            transform: rotate(360deg);
        }
    }
</style>
