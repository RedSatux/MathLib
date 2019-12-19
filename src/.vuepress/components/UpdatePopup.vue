<template>
    <SWUpdatePopup v-slot="{ enabled, reload, message, buttonText }">
        <div
                v-if="enabled"
                class="update-popup">
            {{ message }}<br>
            <Button :text="buttonText" theme="default" @click="reload"></Button>
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
    .update-popup {
        right: 20px;
        bottom: 20px;
        z-index: 100;
        padding: 10px;
        font-size: 20px;
        position: fixed;
        text-align: right;
        background-color: #f5f5f5;
        border: 15px solid transparent;
        box-shadow: 0 0.5px 0 0 #f4f4f4 inset, 0 1px 2px 0 #d2d2d2;
    }

    .update-popup > button {
        margin-top: 0.5em;
        padding: 0.25em 2em;
    }

    .update-popup-enter-active, .update-popup-leave-active {
        transition: opacity 0.3s, transform 0.3s;
    }

    .update-popup-enter, .update-popup-leave-to {
        opacity: 0;
        transform: translate(0, 50%) scale(0.5);
    }
</style>