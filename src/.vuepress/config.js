module.exports = {
    title: 'کتابخانه ریاضیات',
    description: '« ریاضیات الفبایی است که خداوند جهان را بر مبنای آن خلق کرد ‌»',
    base: '/',
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['meta', {name: 'theme-color', content: '#010101'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
    ],
    markdown: {
        anchor: {
            permalink: false,
            permalinkBefore: false
        }
    },
    plugins: [
        'latex',
        ['vuepress-plugin-container', {
            type: 'tip',
            before: (message) => `<div class="custom-block tip"><p class="title">${message}</p>`,
            after: '</div>',
        }],
        ['vuepress-plugin-container', {
            type: 'danger',
            before: (message) => `<div class="custom-block danger"><p class="title">${message}</p>`,
            after: '</div>',
        }],
        ['vuepress-plugin-container', {
            type: 'warning',
            before: (message) => `<div class="custom-block warning"><p class="title">${message}</p>`,
            after: '</div>',
        }],
        ['vuepress-plugin-container', {
            type: 'details',
            before: (message) => `<div class="custom-block details"><p class="title">${message}</p>`,
            after: '</div>',
        }],
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: {
                '/': {
                    message: 'مطالب جدیدی در دسترس است!',
                    buttonText: 'بروزرسانی'
                },
            },
        }],
    ],
    themeConfig: {
        cover: '/cover.jpg',
        logo: '/logo.png',
        nav: [{
            text: 'خانه',
            link: '/'
        }, {
            text: 'المپیاد',
            link: '/category/المپیاد'
        }, {
            text: 'مقالات',
            link: '/category/مقالات'
        }, {
            text: 'کتابخانه',
            link: '/category/کتابخانه'
        }, {
            text: 'درباره',
            link: '/about.html'
        }],
        searchMaxSuggestions: 5,
        searchHotKeys: ['s', '/'],
        searchNoResults: 'نتیجه ای یافت نشد...',
        searchPlaceholder: 'جستجو در مطالب...',
        social: {
            instagram: 'https://instagram.com/RedSatux',
            email: 'mailto:redsatux@gmail.com',
            twitter: 'https://twitter.com/RedSatux',
            telegram: 'https://telegram.me/RedSatux',
        }
    }
};