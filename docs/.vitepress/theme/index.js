import DefaultTheme from 'vitepress/theme'
import './styles/custom.css'
import Demo from '../components/demo.vue'
export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData, head }) {
    // 注册全局组件
    app.component('Demo', Demo)
  }
} 