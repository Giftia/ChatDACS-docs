module.exports = {
  locales: {
    '/': {
      lang: 'zh-Hans',
      title: '星野夜蝶 使用文档',
      description: '一个简单的机器人框架，支持接入哔哩哔哩直播，具备完全功能的web端控制台。',
    }
  },
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  plugins: {
    '@vuepress/back-to-top': {},
    '@vuepress/nprogress': {},
    '@vuepress/active-header-links': {},
    '@vuepress/medium-zoom': {
      selector: 'img',
    },
    '@vuepress/pwa': {
      skipWaiting: true,
      serviceWorker: true,
      updatePopup: {
        message: '文档更新了，点击刷新',
        buttonText: '刷新',
      }
    },
    '@vuepress/last-updated': {
      dateOptions: {
        timeZone: "Asia/Shanghai",
        hour12: false,
      },
    },
  },
  themeConfig: {
    logo: '/favicon.ico',
    repo: 'Giftia/ChatDACS',
    docsRepo: 'Giftia/ChatDACS-docs',
    repoLabel: '查看源码',
    lastUpdated: '最后更新',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: '帮助完善此页面',
    smoothScroll: true,
    sidebar: 'auto',
    displayAllHeaders: true,
    backToHome: "返回首页",
    activeHeaderLinks: true,
    contributors: true,
    nav: [
      { text: '主页', link: '/' },
      { text: '使用说明', link: '/guide/' },
      { text: '部署说明', link: '/deploy/' },
      { text: '哔哩哔哩接入', link: '/bilibili/' },
      { text: 'QQ频道接入', link: '/qqGuild/' },
      { text: '特别感谢', link: '/thanks/' },
    ]
  },
  markdown: {
    lineNumbers: false,
  },
}