<template @mouseup="mouseUp">
    <div class="button-wrapper">
        <div :class="['button', 'button-' + this.theme]" ref="button" :data-title="text"
             @mousedown="mouseDown" @mouseleave="mouseLeave" @mousemove="mouseMove" @click="clicked"></div>
    </div>
</template>

<script>
    export default {
        props: [
            'text', 'path', 'theme'
        ],
        methods: {
            clicked() {
                const isFile = path => /\/files\w*/.test(path);
                const isExternal = path => /^https?:\/\//i.test(path);
                if (isExternal(this.path) || isFile(this.path)) {
                    window.location = this.path;
                    window.location = this.path;
                } else {
                    this.$router.push(this.path)
                }
            },
            mouseDown() {
                const docStyle = document.documentElement.style;
                docStyle.setProperty('--tz', '-25px');
            },
            mouseLeave() {
                const docStyle = document.documentElement.style;
                docStyle.setProperty('--ty', '0');
                docStyle.setProperty('--rx', '0');
                docStyle.setProperty('--ry', '0');
            },
            mouseUp() {
                const docStyle = document.documentElement.style;
                docStyle.setProperty('--tz', '-12px');
            },
            mouseMove(element) {
                const docStyle = document.documentElement.style;
                const boundingClientRect = this.$refs.button.getBoundingClientRect();
                const x = element.clientX - boundingClientRect.left;
                const y = element.clientY - boundingClientRect.top;

                const xc = boundingClientRect.width / 2;
                const yc = boundingClientRect.height / 2;

                const dx = x - xc;
                const dy = y - yc;

                docStyle.setProperty('--rx', `${dy / -1}deg`);
                docStyle.setProperty('--ry', `${dx / 10}deg`);
            }
        },
    }
</script>

<style lang="scss">
    .button-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        transform-style: preserve-3d;
        transform: perspective(800px);
    }

    .button {
        color: white;
        cursor: pointer;
        user-select: none;
        text-align: center;
        position: relative;
        padding: 0.5em 2.5em;
        text-decoration: none;
        display: inline-block;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            border-radius: 4px;
            will-change: transform;
            box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
            transition: box-shadow .5s ease, transform .2s ease;
            transform: translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0)) translateZ(var(--tz, -12px));
        }

        &:hover::before {
            box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
        }

        &::after {
            position: relative;
            display: inline-block;
            content: attr(data-title);
            transition: transform .2s ease;
            font-weight: bold;
            letter-spacing: .01em;
            will-change: transform;
            transform: translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0));
        }
    }

    .button-default {
        &::before {
            color: white !important;
            background: linear-gradient(135deg, #CE9FFC, #7367F0);
        }
    }

    .button-info {
        &::before {
            color: white !important;
            background: linear-gradient(135deg, #ABDCFF, #0396FF);
        }
    }

    .button-success {
        &::before {
            color: white !important;
            background: linear-gradient(135deg, #37f4d2 , #17e6a2);
        }
    }

    .button-danger {
        &::before {
            color: white !important;
            background: linear-gradient(135deg, #FEB692, #EA5455);
        }
    }

    .button-warning {
        &::before {
            color: white !important;
            background: linear-gradient(135deg, #FFE985, #FA742B);
        }
    }
</style>