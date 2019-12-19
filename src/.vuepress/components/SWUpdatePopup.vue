<template>
    <SWUpdatePopup v-slot="{ enabled, reload, message, buttonText }">
        <div
                v-if="enabled"
                class="sw-update-popup">
            {{ message }}<br>
            <Button :text="buttonText" theme="success" @click="reload"></Button>
        </div>
    </SWUpdatePopup>
</template>

<script>
    import Button from './Button'
    import SWUpdatePopup from '@vuepress/plugin-pwa/lib/SWUpdatePopup.vue'

    export default {
        components: {Button, SWUpdatePopup}
    }
</script>

<style lang="scss">
    .sw-update-popup {
        font-size: 20px;
        right: 20px !important;
        bottom: 20px !important;
        z-index: 100 !important;
        padding: 10px !important;
        text-align: right !important;
        background-color: #f5f5f5 !important;
        border: 15px solid transparent !important;
        box-shadow: 0 0.5px 0 0 #f4f4f4 inset, 0 1px 2px 0 #d2d2d2 !important;
    }
</style>