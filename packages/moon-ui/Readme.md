# Moon UI

![Moon UI Logo](https://via.placeholder.com/200x80?text=Moon+UI)

[![npm version](https://img.shields.io/npm/v/moon-ui.svg)](https://www.npmjs.com/package/moon-ui)
[![npm downloads](https://img.shields.io/npm/dm/moon-ui.svg)](https://www.npmjs.com/package/moon-ui)
[![license](https://img.shields.io/npm/l/moon-ui.svg)](https://github.com/yourusername/moon-ui/blob/main/LICENSE)

一个基于 Vue 3 + TypeScript 的现代化 UI 组件库，轻量、优雅且易于使用。

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
npm install moon-ui

# 使用 yarn
yarn add moon-ui

# 使用 pnpm
pnpm add moon-ui
```

## 快速开始

### 完整引入

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import MoonUI from 'moon-ui'
import 'moon-ui/style.css'

// 全局类型（TypeScript项目）
import 'moon-ui/client'

const app = createApp(App)
app.use(MoonUI)
app.mount('#app')
```

### 按需引入

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { MButton } from 'moon-ui'
import 'moon-ui/style.css'

// 全局类型（TypeScript项目）
import 'moon-ui/client'

const app = createApp(App)
app.component('MButton', MButton)
app.mount('#app')
```

### 样式引入

Moon UI 提供了单独的样式文件：

```typescript
// 引入全部样式
import 'moon-ui/style.css'
```

## 组件

### Button 按钮

基础的按钮组件，支持多种类型、尺寸和状态。

#### 基础用法

```vue
<template>
  <m-button>默认按钮</m-button>
  <m-button type="primary">主要按钮</m-button>
  <m-button type="success">成功按钮</m-button>
  <m-button type="warning">警告按钮</m-button>
  <m-button type="danger">危险按钮</m-button>
  <m-button type="info">信息按钮</m-button>
</template>
```

#### 按钮尺寸

```vue
<template>
  <m-button size="large">大型按钮</m-button>
  <m-button>默认尺寸</m-button>
  <m-button size="small">小型按钮</m-button>
</template>
```

#### 圆角和禁用状态

```vue
<template>
  <m-button round>圆角按钮</m-button>
  <m-button disabled>禁用按钮</m-button>
</template>
```

#### 块级按钮

```vue
<template>
  <m-button block>块级按钮</m-button>
</template>
```

#### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | 'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' | 'default' |
| size | 按钮尺寸 | 'large' \| 'default' \| 'small' | 'default' |
| round | 是否为圆角按钮 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| block | 是否为块级按钮 | boolean | false |
| nativeType | 原生按钮类型 | 'button' \| 'submit' \| 'reset' | 'button' |

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | (event: MouseEvent) => void |

## 类型支持

Moon UI 提供了完整的 TypeScript 类型支持，可以通过以下方式使用：

### 通过导入组件时获取类型

```typescript
import { MButton } from 'moon-ui'
import type { ButtonProps } from 'moon-ui'

const props: ButtonProps = {
  type: 'primary',
  size: 'large'
}
```

### 通过全局类型声明使用

```typescript
// 在 main.ts 中导入全局类型
import 'moon-ui/client'

// 然后在组件中可以直接使用全局类型
const props: MButtonProps = {
  type: 'primary',
  size: 'large'
}
```

### 在 tsconfig.json 中引入全局类型

为了在整个项目中都能使用 Moon UI 的全局类型，你可以在 `tsconfig.json` 中添加以下配置：

```json
{
  "compilerOptions": {
    "types": [
      "moon-ui/client"  // 添加 Moon UI 全局类型
    ]
  }
}
```

这样配置后，你可以在项目的任何地方直接使用组件的全局类型，无需在每个文件中导入。

## 导出说明

Moon UI 在 `package.json` 中配置了多种导出方式，支持多种使用场景：

```json
{
  "exports": {
    ".": {
      "types": "./types/index.d.ts",     // TypeScript 类型定义
      "import": "./dist/moon-ui.es.js",   // ESM 格式
      "require": "./dist/moon-ui.umd.js"  // CommonJS 格式
    },
    "./client": {
      "types": "./types/global.d.ts"      // 全局类型定义
    },
    "./style.css": "./dist/style.css"     // 样式文件
  },
  "typesVersions": {
    "*": {
      "client": ["./types/global.d.ts"]   // TypeScript 子路径映射
    }
  }
}
```

这意味着你可以：

- 导入组件库： `import { MButton } from 'moon-ui'`
- 导入全局类型： `import 'moon-ui/client'`
- 导入样式： `import 'moon-ui/style.css'`

## 项目结构

```
moon-ui/
├── packages/              # 组件库源码
│   ├── src/               # 组件源码
│   │   ├── button/        # 按钮组件
│   │   │   └── Button.vue
│   │   └── index.ts       # 入口文件
│   ├── types/             # 类型声明文件
│   └── dist/              # 构建输出
├── website/               # 文档站点
└── docs/                  # 文档源码
```

## 开发指南

### 环境准备

```bash
# 克隆仓库
git clone https://github.com/yourusername/moon-ui.git
cd moon-ui

# 安装依赖
pnpm install

# 启动开发环境
pnpm dev
```

### 构建

```bash
# 构建组件库
pnpm build

# 构建文档站点
pnpm docs:build
```

## 贡献指南

欢迎为 Moon UI 做出贡献！请参考以下步骤：

1. Fork 项目并克隆到本地
2. 创建一个新的分支: `git checkout -b my-feature`
3. 提交你的修改: `git commit -am 'feat: add some feature'`
4. 推送到远程分支: `git push origin my-feature`
5. 提交 Pull Request

请确保你的代码符合我们的代码规范，并通过所有测试。

## 版本历史

- **0.1.0** (2023-04-09): 初始版本，包含基础组件

## 许可证

[MIT](LICENSE)
