import DefaultTheme from 'vitepress/theme'
import 'virtual:uno.css' 
import './styles/custom.css'
import Demo from '../components/Demo.vue'
import { components } from '../../../packages/moon-ui/src/index'
export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData, head }) {
    // 注册全局组件
    app.component('Demo', Demo)
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
    // 添加全局样式，确保搜索高亮生效
    if (typeof document !== 'undefined') {
      const style = document.createElement('style')
      style.innerHTML = `
        mark {
          background-color: transparent !important;
          color: #3eaf7c !important; 
          font-weight: 600 !important;
          text-decoration: none !important;
          border-bottom: 1px solid #3eaf7c !important;
          padding-bottom: 1px !important;
          box-shadow: none !important;
        }
        
        .dark mark {
          color: #42d392 !important;
          border-bottom: 1px solid #42d392 !important;
        }
      `
      document.head.appendChild(style)
    }
  }
} 