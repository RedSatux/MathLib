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
        ['seo', {
            author: _ =>'SadeghRamezani',
            title: $page => $page.title,
            siteTitle: (_, $site) => $site.title,
            tags: $page => $page.frontmatter.tags,
            twitterCard: _ => 'summary_large_image',
            description: $page => $page.frontmatter.description,
            url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
            publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
            image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain || '') + $page.frontmatter.image),
            type: $page => ['articles', 'posts', 'blog'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
        }],
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: {
                '/': {
                    message: 'بروزرسانی جدیدی در دسترس است!',
                    popupComponent: 'UpdatePopup',
                    buttonText: 'حله'
                },
            },
        }],
    ],
    themeConfig: {
        domain: 'https://math-lib.ir',
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
        searchPlaceholder: 'جستجو در نوشته ها...',
        social: {
            instagram: 'https://instagram.com/RedSatux',
            email: 'mailto:redsatux@gmail.com',
            twitter: 'https://twitter.com/RedSatux',
            telegram: 'https://telegram.me/RedSatux',
        }
    }
};