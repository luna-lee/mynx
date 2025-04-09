# vite-plugin-moon-svg

vite-plugin-moon-svg 是一个专门为 Vite 项目设计的 SVG 处理插件，提供了多种方式使用 SVG 图标的解决方案。

## 功能特点

1. SVG 文件可通过 import 直接作为组件使用
2. import 的 SVG 文件，除了默认返回一个 Vue 组件，还返回当前 SVG 的文本内容 context
3. 可通过 virtual:moon-svg-get 模块，依据 SVG 名获取 SVG 对应的组件，或获取全部 SVG 对应的组件
4. virtual:moon-svg-get 中依据 SVG 名获取 SVG 对应的组件，为按需引入，不会导致页面一次加载全部的 SVG 文件

## 安装

```bash
npm i vite-plugin-moon-svg -S
```

## 配置

### TS 类型支持

#### 在公共的 d.ts 文件中添加下面的代码

```typescript
/// <reference types="vite-plugin-moon-svg/types" />
```

#### 或者在 tsconfig.json 文件添加

```typescript
"types": ["vite-plugin-moon-svg/types"],
```

#### 类型内容

```typescript
declare module "*.svg" {
  const Component: DefineComponent<{}, {}, any>;

  export default Component;

  export const context: string;
}

declare interface MoonSvgIconType {
  component: string; // 或者根据实际类型进行更精确的定义
  name: string;
  context?: string; //需要在插件配置开启 ctxable
}

declare module "virtual:moon-svg-get" {
  const result: (args: {
    name?: string;
    all?: boolean;
  }) => Promise<MoonSvgIconType | MoonSvgIconType[] | null>;

  export default result;
}
```

### vite.config.ts 配置

#### 参数

| 名称      | 说明                                                                                                                           | 参数                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `dir`     | SVG 文件目录，相对于项目根目录。使用 virtual:moon-svg-get 模块时必须指定 dir 目录。<br/>子目录中的文件，SVG 组件名为：{子目录名}-{文件名} | -                   |
| `transfrom` | 对 SVG 文件进行操作，如替换修改属性等                                                                                          | (svg,filepath)=>svg |
| `ctxable` | import 文件时，是否同时返回 SVG 的文本内容                                                                                     | -                   |

#### 配置示例

```typescript
// vite.config.ts
import MoonSvgPlugin from "vite-plugin-moon-svg";

export default defineConfig({
  plugins: [
    MoonSvgPlugin({
      dir: "src/assets/svg",
      transfrom: (svg, filepath) =>
        // 亦可依据 filename 或 filepath，指定修改 svg
        svg
          .replace(/fill(\s*)=(\s*)"[^"]*"/g, "")
          .replace(/width(\s*)=(\s*)"[^"]*"/, "")
          .replace(/height(\s*)=(\s*)"[^"]*"/, "")
          .replace(
            /^<svg /,
            '<svg fill="currentColor" width="1em" height="1em" '
          ),
    }),
  ],
});
```

## 使用方法

### 直接引入 SVG 文件使用

```vue
<template>
  <logOut></logOut>
</template>

<script setup lang="ts">
// logOut 为 logOut.svg 的 Vue 组件，context 为 logOut.svg 的文本内容
// context 只有插件配置了 ctxable:true 时才有
import logOut, { context } from "@/assets/svg/logOut.svg";
</script>
```

### 通过 virtual:moon-svg-get 模块，依据文件名按需动态获取 SVG 文件

```vue
<template>
  <!-- 单个 SVG 图标 -->
  <component v-if="CustomSvg" :is="CustomSvg.component"></component>
  
  <!-- 单个 SVG 文本内容 -->
  {{ CustomSvg.context }}
  
  <!-- 全部 SVG 图标 -->
  <component 
    v-for="icon in customIcons" 
    :key="icon.name" 
    :is="icon.component" 
    @click="iconName = icon.name"
  ></component>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import getCustomSvg from "virtual:moon-svg-get";

const CustomSvg = ref<MoonSvgIconType | null>(null);
const iconName = ref('');
const customIcons = ref<MoonSvgIconType[]>([]);

// 获取单个图标
async function loadSingleIcon() {
  CustomSvg.value = (await getCustomSvg({ name: "logOut" })) as MoonSvgIconType;
}

// 获取所有图标
async function loadAllIcons() {
  customIcons.value = await getCustomSvg({ all: true }) as MoonSvgIconType[];
}

// 执行加载
loadSingleIcon();
loadAllIcons();
</script>
```

## 最佳实践

### SVG 文件组织结构

推荐使用以下结构组织 SVG 文件：

```
src/
└── assets/
    └── svg/
        ├── common/
        │   ├── home.svg
        │   └── user.svg
        ├── menu/
        │   ├── dashboard.svg
        │   └── settings.svg
        └── actions/
            ├── edit.svg
            └── delete.svg
```

这样，SVG 组件的名称会是 `common-home`、`menu-dashboard` 等，便于管理和使用。

### 优化 SVG 文件

建议在使用前优化 SVG 文件，可以使用 SVGO 等工具删除不必要的属性和元数据，减小文件体积。

### 配置通用的 SVG 属性

可以通过 transform 函数为所有 SVG 设置通用属性，如尺寸、颜色等：

```javascript
MoonSvgPlugin({
  dir: "src/assets/svg",
  transfrom: (svg) => 
    svg.replace(
      /^<svg /,
      '<svg fill="currentColor" width="1em" height="1em" '
    )
})
```

### 处理不同类型的图标

对于不同类型的图标，可以使用不同的转换规则：

```javascript
MoonSvgPlugin({
  dir: "src/assets/svg",
  transfrom: (svg, filepath) => {
    if (filepath.includes('/menu/')) {
      // 菜单图标特殊处理
      return svg.replace(/^<svg /, '<svg fill="#666" width="24px" height="24px" ');
    }
    // 默认处理
    return svg.replace(/^<svg /, '<svg fill="currentColor" width="1em" height="1em" ');
  }
})
``` 