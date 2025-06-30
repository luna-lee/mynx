# Mynx UI

[![npm version](https://img.shields.io/npm/v/mynx-ui.svg)](https://www.npmjs.com/package/mynx-ui)
[![npm downloads](https://img.shields.io/npm/dm/mynx-ui.svg)](https://www.npmjs.com/package/mynx-ui)
[![license](https://img.shields.io/npm/l/mynx-ui.svg)](https://github.com/yourusername/mynx-ui/blob/main/LICENSE)

### 一个基于 Vue 3 + TypeScript 的现代化 UI 组件库，轻量、优雅且易于使用。

## 特性

- 🚀 **基于 Vue 3**：充分利用 Vue 3 的 Composition API 和性能提升
- 🔨 **TypeScript 支持**：完整的类型定义，提供极佳的开发体验
- 📦 **按需引入**：支持组件按需引入，减小应用体积
- 🎨 **可定制主题**：灵活的样式系统，易于定制
- 📃 **详细文档**：每个组件都有详细的使用说明和示例
- 🔍 **全局类型**：TypeScript 开发时提供完整的组件类型提示

## 安装

```bash
# 使用 npm
npm install mynx-ui

# 使用 yarn
yarn add mynx-ui

# 使用 pnpm
pnpm add mynx-ui
```

## 快速开始

### 完整引入

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import MynxUI from "mynx-ui";
import "mynx-ui/style.css";

// 全局类型（TypeScript项目）
import "mynx-ui/client";

const app = createApp(App);
app.use(MynxUI);
app.mount("#app");
```

### 按需引入

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import { MButton } from "mynx-ui";
import "mynx-ui/style.css";

// 全局类型（TypeScript项目）
import "mynx-ui/client";

const app = createApp(App);
app.component("MButton", MButton);
app.mount("#app");
```

### 样式引入

Mynx UI 提供了单独的样式文件：

```typescript
// 引入全部样式
import "mynx-ui/style.css";
```

## TypeScript 类型支持 ：

<div style="background:var(--vp-code-block-bg);margin-bottom:-15px;border-bottom:1px solid #ccc; padding:5px 10px"> tsconfig.json</div>

```ts
{
    "compilerOptions": {
        "types": [
            //...,
            "mynx-ui/client"
        ],
    }
}
```
