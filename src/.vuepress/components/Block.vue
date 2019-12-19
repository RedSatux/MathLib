<template @mouseup="mouseUp">
    <div :class="['block', 'block-' + this.theme]">
        <p class="title">{{ this.title }}</p>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: [
            'title', 'theme'
        ]
    }
</script>

<style lang="scss">
    .block {
        width: 100%;

        .title {
            font-weight: 600;
            margin-bottom: -0.4rem;
        }

        p {
            margin-bottom: 1.5rem;
        }
    }

    .block-tip {
        padding-top: 1rem;
        padding-right: 1.25rem;
        padding-bottom: 0.5rem;
        border-right-width: 0.5rem;
        border-right-style: solid;
        margin: 1rem 0;
        background-color: #f3f5f7;
        border-color: #42b983;
    }

    .block-danger {
        padding-top: 1rem;
        padding-right: 1.25rem;
        padding-bottom: 0.5rem;
        border-right-width: 0.5rem;
        border-right-style: solid;
        margin: 1rem 0;
        background-color: #ffe6e6;
        border-color: #c00;
        color: #4d0000;

        .title {
            color: #900;
        }

        a {
            color: #2c3e50;
        }
    }

    .block-warning {
        padding-top: 1rem;
        padding-right: 1.25rem;
        padding-bottom: 0.5rem;
        border-right-width: 0.5rem;
        border-right-style: solid;
        margin: 1rem 0;
        background-color: rgba(255, 229, 100, 0.3);
        border-color: #e7c000;
        color: #6b5900;

        .title {
            color: #b29400;
        }

        a {
            color: #2c3e50;
        }
    }

    .block-details {
        padding-top: 1rem;
        padding-right: 1.25rem;
        padding-bottom: 0.5rem;
        border-right-width: 0.5rem;
        border-right-style: solid;
        margin: 1rem 0;
        background-color: #eee;
        border-color: #a3a3a3;

        .title {
            color: #00adfd;
        }

        a {
            color: #2c3e50;
        }
    }
</style>