<template>
    <nav class="site-nav">
        <div class="site-nav-left">
            <router-link v-if="isPage && this.blog.logo" class="site-nav-logo" to="/">
                <img :src="this.$withBase(this.blog.logo)" :alt="this.blog.title"/>
            </router-link>
            <router-link v-if="!isHome && !this.blog.logo" class="site-nav-logo" to="/">
                {{ this.blog.title }}
            </router-link>
            <ul class="nav" v-if="nav">
                <li v-for="(item, index) in nav" role="menuitem" :key="index">
                    <router-link :class="{ active: item.active }" :to="item.link">{{ item.text }}</router-link>
                </li>
                <li id="search-box">
                    <search-box></search-box>
                </li>
            </ul>
        </div>
        <div class="site-nav-right">
            <div class="social-links">
                <social-link v-for="(channel, index) in this.social" :url="channel.url" :type="channel.type"
                             :key="index"/>
            </div>
        </div>
    </nav>
</template>

<script>
    import {mapGetters} from 'vuex'
    import SearchBox from './SearchBox'
    import SocialLink from './SocialLink'

    export default {
        components: {SearchBox, SocialLink},
        computed: {
            ...mapGetters(['blog', 'type', 'social', 'nav']),
            isHome() {
                return this.type === 'home'
            },
            isPage() {
                return this.type === 'page'
            }
        }
    }
</script>

<style lang="scss">
    .site-nav {
        position: relative;
        z-index: 300;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        height: 40px;
        font-size: 1.2rem;
    }

    .site-nav-left {
        display: flex;
        align-items: center;
        overflow-x: hidden;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        margin-right: 10px;
        letter-spacing: 0.4px;
        white-space: nowrap;
    }

    .site-nav-logo {
        flex-shrink: 0;
        display: block;
        margin-right: 24px;
        padding: 11px 0;
        color: #fff;
        font-size: 1.7rem;
        line-height: 1em;
        font-weight: bold;
        letter-spacing: -0.5px;
    }

    .site-nav-logo:hover {
        text-decoration: none;
    }

    .site-nav-logo img {
        display: block;
        width: auto;
        height: 16px;
        margin-bottom: 3px;
    }

    .nav {
        display:table;
        list-style: none;
        padding-right: 5px;
        margin: 0 0 0 -12px;

        li {
            margin: 0;
            padding: 0;
            display: table-cell;
            vertical-align:middle;
            text-transform: uppercase;

            a {
                display: block;
                margin: 0;
                padding: 10px 12px;
                color: #fff;
                opacity: 0.8;

                &.active {
                    font-weight: 700;
                }

                &:hover {
                    text-decoration: none;
                    opacity: 1;
                }
            }
        }
    }

    .site-nav-right {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        height: 40px;
    }

    .social-links {
        flex-shrink: 0;
        display: flex;
        align-items: center;
    }

    .subscribe-button {
        display: block;
        padding: 4px 10px;
        border: #fff 1px solid;
        color: #fff;
        font-size: 1.2rem;
        line-height: 1em;
        border-radius: 10px;
        opacity: 0.8;
    }

    .subscribe-button:hover {
        text-decoration: none;
        opacity: 1;
    }

    @media (max-width: 825px) {
        .site-header {
            padding-right: 0;
            padding-left: 0;
        }
        .site-nav-left {
            margin-right: 0;
            padding-left: 4vw;
            overflow-x: auto;
            -ms-overflow-style: none;
        }
        .site-nav-left::-webkit-scrollbar {
            display: none;
        }
        .site-nav-right {
            display: none;
        }
        #search-box {
            display: none;
        }
    }
</style>
