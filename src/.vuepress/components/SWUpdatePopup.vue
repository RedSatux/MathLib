<template>
    <SWUpdatePopup v-slot="{ enabled, reload, message, buttonText }">
        <div
                v-if="enabled"
                class="sw-update-popup">
            {{ message }}<br>
            <button @click="reload">{{ buttonText }}</button>
        </div>
    </SWUpdatePopup>
</template>

<script>
    import SWUpdatePopup from '@vuepress/plugin-pwa/lib/SWUpdatePopup.vue'

    export default {
        components: {SWUpdatePopup}
    }
</script>

<style lang="scss">
    .sw-update-popup {
        z-index: 100;
        text-align: right;
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #fff;
        font-size: 20px;
        padding: 10px;
        border: 15px solid transparent;
        box-shadow: 0 0.5px 0 0 #fff inset, 0 1px 2px 0 #B3B3B3;
    }

    .sw-update-popup button {
        border: 1px solid #fefefe;
    }
</style>