<template>
    <footer class="site-footer outer">
        <div class="site-footer-content inner">
            <nav class="site-footer-nav">
                <a v-for="(item, index) in footer"
                   :key="index"
                   :target="item.external ? '_blank' : '_top'"
                   :href="item.external ? item.link : this.$withBase(item.link)"
                >{{ item.text }}</a>
            </nav>
            <section class="copyright"><a :href="this.$withBase('/')">{{ blog.title }}</a> &copy; {{ year }}</section>
        </div>
    </footer>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        components: {},
        computed: {
            ...mapGetters(['blog', 'footer']),
            year() {
                return new Date().getFullYear()
            }
        }
    }
</script>

<style lang="scss">
    @import '../styles/variables';

    .site-footer {
        position: relative;
        padding-top: 20px !important;
        padding-bottom: 25px !important;
        color: #fff;
        background: darken($darkgrey, 15%);
    }

    .site-footer-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        color: rgba(255, 255, 255, 0.7);
        font-size: 1.3rem;
    }

    .site-footer-content a {
        color: rgba(255, 255, 255, 0.7);
    }

    .site-footer-content a:hover {
        color: rgba(255, 255, 255, 1);
        text-decoration: none;
    }

    .site-footer-nav {
        display: block;
    }

    .site-footer-nav a {
        position: relative;
        margin-left: 20px;
    }

    .site-footer-nav a:before {
        content: "";
        position: absolute;
        top: 11px;
        left: -11px;
        display: block;
        width: 2px;
        height: 2px;
        background: #fff;
        border-radius: 100%;
    }

    .site-footer-nav a:first-of-type:before {
        display: block;
    }

    @media (max-width: 650px) {
        .site-footer-content {
            flex-direction: column;
        }
        .site-footer-nav a:first-child {
            margin-left: 0;
        }
    }
</style>
