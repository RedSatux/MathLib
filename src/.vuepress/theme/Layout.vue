<template>
    <div class="site-wrapper">
        <site-header :header="header">
            <navigation/>
        </site-header>
        <component :is="content"></component>
        <site-footer/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    import Post from './layouts/Post'
    import Page from './layouts/Page'
    import Posts from './layouts/Posts'

    import SiteHeader from './partials/Header'
    import SiteFooter from './partials/Footer'
    import Navigation from './partials/Navigation'

    export default {
        components: {Page, Posts, Post, SiteFooter, SiteHeader, Navigation},
        methods: {
            ...mapActions(['updateSite', 'updatePage', 'updateParams']),
            updateLayoutClass() {
                this.$el.parentNode.className = `${this.type}-template`
            }
        },
        computed: {
            ...mapGetters(['type', 'blog', 'header']),

            content() {
                switch (this.type) {
                    case 'home':
                    case 'tags':
                    case 'posts':
                    case 'category':
                        return 'posts';
                    case 'post':
                        return 'post';
                    case 'page':
                        return 'page'
                }
            },
        },
        watch: {
            type() {
                this.updateLayoutClass()
            },
            $page() {
                this.updatePage(this.$page);
                this.updateLayoutClass()
            },
            $route() {
                this.updateParams(this.$route.params);
                this.updateLayoutClass()
            }
        },
        mounted() {
            this.updateLayoutClass();
            this.updatePage(this.$page);
            this.updateSite(this.$site);
            this.updateParams(this.$route.params);
        }
    }
</script>

<style lang="scss">
    @font-face {
        font-family: YekanBakh;
        src: url("../public/fonts/YekanBakh.ttf");
    }

    @import './styles/reset';
    @import './styles/defaults';

    body {
        background: #f4f8fb;
    }

    .img {
        display: block;
        width: 100%;
        height: 100%;
        background-position: center center;
        background-size: cover;
        border-radius: 100%;
    }

    .hidden {
        visibility: hidden;
        position: absolute;
        text-indent: -9999px;
    }

    .site-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .site-main {
        z-index: 100;
        flex-grow: 1;
    }

    .outer {
        position: relative;
        padding: 0 4vw;
    }

    .inner {
        margin: 0 auto;
        max-width: 1040px;
        width: 100%;
    }

    @media (min-width: 900px) {
        .home-template,
        .category-template,
        .tags-template,
        .posts-template,
        .author-template {
            .post-feed {
                margin-top: -70px;
                padding-top: 0;
            }

            .site-nav {
                position: relative;
                top: -70px;
            }
        }
    }
</style>
