import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "virtual:uno.css";
import "./styles/custom.css";
import "virtual:uno.css";
import "./styles/custom.css";
import { components } from "../../../packages/mynx-ui/src/index";
// import MynxUI from "mynx-ui";
// import "mynx-ui/style.css";
// 导入自定义组件
import Demo from "../components/Demo.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // 注册 Element Plus
    app.use(ElementPlus);
    // app.use(MynxUI);
    // 注册所有 Element Plus 图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }

    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });

    // 注册自定义组件
    app.component("Demo", Demo);

    // 添加全局样式，确保搜索高亮生效
    if (typeof document !== "undefined") {
      const style = document.createElement("style");
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
        `;
      document.head.appendChild(style);
    }
  },
} satisfies Theme;
