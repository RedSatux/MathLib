<template>
    <header class="site-header outer" :class="{ 'no-cover': !header.showCover }" :style="backgroundStyle">
        <div class="inner">
            <div class="site-header-content" v-if="header.showCover">
                <h1 class="site-title">
                    <img v-if="header.logo" class="site-logo" :src="this.$withBase(header.logo)" :alt="header.title"/>
                </h1>
                <h2 class="site-description" v-if="isHome">{{ header.description }}</h2>
                <h2 class="site-description" v-else-if="header.title && !isHome"><b>{{ header.title }}</b> - {{ header.description }}</h2>
            </div>
            <slot></slot>
        </div>
    </header>
</template>
<script>
    export default {
        props: ['type', 'blog', 'header'],
        computed: {
            isHome() {
                return this.type === 'home'
            },
            backgroundStyle() {
                if (this.header.coverImage) {
                    return {
                        'background-image': `url(${this.$withBase(this.header.coverImage)})`
                    }
                }
                return {}
            }
        }
    }
</script>

<style lang="scss">
    @import '../styles/variables';

    .site-header {
        position: relative;
        padding-top: 12px !important;
        padding-bottom: 12px !important;
        color: #fff;
        background: darken($darkgrey, 5%) no-repeat center center;
        background-size: cover;
    }

    .site-header:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        display: block;
        background: rgba(0, 0, 0, 0.18);
    }

    .site-header:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: auto;
        left: 0;
        z-index: 10;
        display: block;
        height: 80px;
        background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
    }

    .site-header.no-cover:before,
    .site-header.no-cover:after {
        display: none;
    }

    .site-header-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10vw 4vw;
        min-height: 200px;
        max-height: 450px;
        text-align: center;
    }

    .site-title {
        z-index: 10;
        margin: 0;
        padding: 0;
        font-size: 3.8rem;
        font-weight: 700;
    }

    .site-logo {
        max-height: 45px;
    }

    .site-description {
        z-index: 10;
        margin: 0;
        padding: 5px 0;
        font-size: 2.2rem;
        font-weight: 300;
        letter-spacing: 0.5px;
        opacity: 0.8;
    }

    @media (max-width: 500px) {
        .site-title {
            font-size: 3rem;
        }
        .site-description {
            font-size: 1.5rem;
        }
    }
</style>
