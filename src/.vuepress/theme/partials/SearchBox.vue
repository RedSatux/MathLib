<template>
    <div class="search-box">
        <input
                ref="input"
                aria-label="Search"
                :value="query"
                :class="{ 'focused': focused }"
                :placeholder="placeholder"
                autocomplete="off"
                spellcheck="false"
                @input="query = $event.target.value"
                @focus="focused = true"
                @blur="focused = false"
                @keyup.enter="go(focusIndex)"
                @keyup.up="onUp"
                @keyup.down="onDown">
        <ul
                v-if="showSuggestions"
                class="suggestions"
                :class="{ 'align-right': alignRight }"
                @mouseleave="unFocus">
            <li
                    v-for="(s, i) in suggestions"
                    :key="i"
                    class="suggestion"
                    :class="{ focused: i === focusIndex }"
                    @mousedown="go(i)"
                    @mouseenter="focus(i)">
                <a v-if="s.path" :href="s.path" @click.prevent>
                    <span class="page-title">{{ s.title || s.path }}</span>
                    <span v-if="s.header" class="header">&gt; {{ s.header.title }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'SearchBox',
        data() {
            return {
                query: '',
                focused: false,
                focusIndex: 0,
                placeholder: undefined
            }
        },
        computed: {
            showSuggestions() {
                return (
                    this.focused
                    && this.suggestions
                    && this.suggestions.length
                )
            },
            suggestions() {
                const query = this.query.trim().toLowerCase();
                if (!query) {
                    return
                }
                const {pages} = this.$site;
                const maxSuggestions = this.$site.themeConfig.searchMaxSuggestions;
                const matches = item => (
                    item
                    && item.title
                    && item.title.toLowerCase().indexOf(query) > -1
                );
                const res = [];
                for (let i = 0; i < pages.length; i++) {
                    if (res.length >= maxSuggestions) break;
                    const p = pages[i];
                    if (matches(p)) {
                        res.push(p)
                    } else if (p.headers) {
                        for (let j = 0; j < p.headers.length; j++) {
                            if (res.length >= maxSuggestions) break;
                            const h = p.headers[j];
                            if (matches(h)) {
                                res.push(Object.assign({}, p, {
                                    path: p.path + '#' + h.slug,
                                    header: h
                                }))
                            }
                        }
                    }
                }
                console.log(res);
                if (res.length <= 0) {
                    res.push({
                        path: '#',
                        title: this.$site.themeConfig.searchNoResults
                    })
                }
                console.log(res);
                return res
            },
            alignRight() {
                const navCount = (this.$site.themeConfig.nav || []).length;
                const repo = this.$site.repo ? 1 : 0;
                return navCount + repo <= 2
            }
        },
        mounted() {
            this.placeholder = this.$site.themeConfig.searchPlaceholder;
            document.addEventListener('keydown', this.onHotKey)
        },
        beforeDestroy() {
            document.removeEventListener('keydown', this.onHotKey)
        },
        methods: {
            onHotKey(event) {
                if (event.srcElement === document.body && this.$site.themeConfig.searchHotKeys.includes(event.key)) {
                    this.$refs.input.focus();
                    event.preventDefault()
                }
            },
            onUp() {
                if (this.showSuggestions) {
                    if (this.focusIndex > 0) {
                        this.focusIndex--
                    } else {
                        this.focusIndex = this.suggestions.length - 1
                    }
                }
            },
            onDown() {
                if (this.showSuggestions) {
                    if (this.focusIndex < this.suggestions.length - 1) {
                        this.focusIndex++
                    } else {
                        this.focusIndex = 0
                    }
                }
            },
            go(i) {
                if (!this.showSuggestions) {
                    return
                }
                let path = this.suggestions[i].path;
                if (path && path !== this.$router.currentRoute.path) {
                    this.$router.push(path);
                    this.query = '';
                    this.focusIndex = 0
                }
            },
            focus(i) {
                this.focusIndex = i
            },
            unFocus() {
                this.focusIndex = -1
            }
        }
    }
</script>

<style lang="scss">
    .search-box {
        margin: auto;
        margin-right: 10px;
        text-align: center;
        position: absolute;
        display: inline-block;

        input {
            top: 50%;
            cursor: text;
            width: 15rem;
            outline: none;
            height: 2.2rem;
            line-height: 2rem;
            font-size: 1.15rem;
            position: relative;
            border-radius: 2rem;
            background-size: 1rem;
            display: inline-block;
            padding: 0 0.5rem 0 2rem;
            transition: all 0.2s ease;
            transform: translateY(-50%);
            color: #4e6e8e;
            border: 1px solid #010101;
            background: #fff url(/search.svg) 0.6rem 0.5rem no-repeat;

            &:focus {
                cursor: auto;
                border-color: #3eaf7c;
            }
        }

        .suggestions {
            z-index: 10;
            background: #fff;
            width: 20rem;
            position: absolute;
            top: 1.5rem;
            border-radius: 6px;
            border: 1px solid #eaecef;
            padding: 0.4rem;
            margin-top: 10px;
            list-style-type: none;

            li {
                display: block;
                width: 100%;
            }
        }

        .suggestions.align-right {
            right: 0;
        }

        .suggestion {
            width: 20rem;
            line-height: 1.4;
            padding: 0.4rem 0.6rem;
            border-radius: 4px;
            cursor: pointer;

            a {
                white-space: normal;
                color: #68c99d;

                .page-title {
                    font-weight: 600;
                }

                .header {
                    font-size: 0.9rem;
                    margin-left: 0.25em;
                }
            }
        }

        .suggestion.focused {
            background-color: #f3f4f5;

            a {
                color: #3eaf7c;
            }
        }
    }

    @media (max-width: 959px) {
        .search-box {
            input {
                cursor: pointer;
                width: 0;
                background: transparent url(/search.svg) 0.6rem 0.5rem no-repeat;
                border-color: transparent;
                position: relative;

                &:focus {
                    cursor: text;
                    left: 0;
                    background: #f9f9f9 url(/search.svg) 0.6rem 0.5rem no-repeat;
                    width: 12rem;
                }
            }
        }
    }

    @media all and (-ms-high-contrast: none) {
        .search-box {
            input {
                height: 2rem;
            }
        }
    }

    @media (max-width: 959px) and (min-width: 719px) {
        .search-box {
            .suggestions {
                left: 0;
            }
        }
    }

    @media (max-width: 719px) {
        .search-box {
            input {
                left: 1rem;

                &:focus {
                    width: 10rem;
                }
            }

            .suggestions {
                right: 0;
                width: calc(100vw - 4rem);
            }

            .suggestion {
                width: calc(100vw - 4rem);
            }
        }
    }
</style>