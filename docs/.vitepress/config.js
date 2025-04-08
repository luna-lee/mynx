import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Moon工具库',
  description: '功能丰富的JavaScript工具库集合',
  lang: 'zh-CN',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { 
        text: '模块', 
        items: [
          { text: 'moon-utils', link: '/modules/moon-utils/' },
          { text: 'npm插件', link: '/modules/plugins/' }
          // 这里可以添加更多模块
        ]
      },
      { text: '关于', link: '/about' }
    ],
    sidebar: {
      '/modules/moon-utils/': [
        {
          text: 'moon-utils',
          items: [
            { text: '简介', link: '/modules/moon-utils/' },
            { text: '安装', link: '/modules/moon-utils/guide/installation' }
          ]
        },
        {
          text: '类型工具',
          items: [
            { text: 'isType', link: '/modules/moon-utils/api/isType' }
          ]
        },
        {
          text: '通用工具',
          items: [
            { text: 'getUUID', link: '/modules/moon-utils/api/getUUID' },
            { text: 'setEventListenerVue2', link: '/modules/moon-utils/api/setEventListenerVue2' },
            { text: 'mergeObject', link: '/modules/moon-utils/api/mergeObject' },
            { text: 'asyncLoadElement', link: '/modules/moon-utils/api/asyncLoadElement' }
          ]
        },
        {
          text: '验证工具',
          items: [
            { text: 'InstanceValidate', link: '/modules/moon-utils/api/InstanceValidate' }
          ]
        },
        {
          text: '树形结构工具',
          items: [
            { text: 'treeToFlat', link: '/modules/moon-utils/api/treeToFlat' },
            { text: 'treeDataFactory', link: '/modules/moon-utils/api/treeDataFactory' }
          ]
        },
        {
          text: '数组工具',
          items: [
            { text: 'arrayRemoveItem', link: '/modules/moon-utils/api/arrayRemoveItem' }
          ]
        },
        {
          text: 'URL工具',
          items: [
            { text: 'addUrlParams', link: '/modules/moon-utils/api/addUrlParams' },
            { text: 'getUrlParams', link: '/modules/moon-utils/api/getUrlParams' }
          ]
        }
      ],
      '/modules/plugins/': [
        {
          text: 'npm插件',
          items: [
            { text: '概述', link: '/modules/plugins/' }
          ]
        },
        {
          text: '命令行工具',
          items: [
            { text: 'creo-bin', link: '/modules/plugins/creo-bin/' }
          ]
        },
        {
          text: 'Vite插件',
          items: [
            { text: 'vite-plugin-mixin-code', link: '/modules/plugins/vite-plugin-mixin-code/' },
            { text: 'vite-plugin-moon-svg', link: '/modules/plugins/vite-plugin-moon-svg/' },
            { text: 'vite-plugin-version-evn', link: '/modules/plugins/vite-plugin-version-evn/' }
          ]
        },
        {
          text: 'Vue CLI插件',
          items: [
            { text: 'vue-cli-version-static-plugin', link: '/modules/plugins/vue-cli-version-static-plugin/' }
          ]
        }
      ]
      // 这里可以为其他模块添加侧边栏配置
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/luna-lee/moon-utils' }
    ],
    footer: {
      message: '基于MIT许可证发布',
      copyright: '版权所有 © 2023-至今 Luna Lee'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '页面导航'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
}) 