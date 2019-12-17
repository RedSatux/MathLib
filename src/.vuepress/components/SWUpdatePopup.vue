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
        z-index: 100;
        text-align: right;
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-size: 20px;
        padding: 10px;
        background-color: #f5f5f5;
        border: 15px solid transparent;
        box-shadow: 0 0.5px 0 0 #f4f4f4 inset, 0 1px 2px 0 #d2d2d2;
    }
</style>