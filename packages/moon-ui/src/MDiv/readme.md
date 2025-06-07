# Moon-Div 可调整大小的容器组件

### 作者：闰月飞鸟；时间：2025年05月29日16:24:43

这是一个可以通过拖动边框和角落来调整宽高的Vue容器组件。

## 功能特点

- 支持从四个边框（上、下、左、右）调整宽度和高度
- 支持从四个角落（左上、右上、左下、右下）同时调整宽高
- 可配置启用哪些拖拽点（边框和角落）
- 提供多个命名插槽，可自定义边框和角落的样式

## 组件属性

| 属性名       | 类型  | 默认值                                                     | 描述             |
| ------------ | ----- | ---------------------------------------------------------- | ---------------- |
| dragPosition | Array | ['top', 'left', 'right', 'bottom', 'tl', 'tr', 'bl', 'br'] | 启用的拖拽点列表 |

## 插槽

组件提供了多个命名插槽，用于自定义边框和角落的内容：

| 插槽名     | 描述                                             |
| ---------- | ------------------------------------------------ |
| default    | 容器主体内容                                     |
| bar        | 所有边框的默认样式（当未提供特定边框插槽时使用） |
| bar-top    | 上边框的样式                                     |
| bar-right  | 右边框的样式                                     |
| bar-bottom | 下边框的样式                                     |
| bar-left   | 左边框的样式                                     |
| corner     | 所有角落的默认样式（当未提供特定角落插槽时使用） |
| corner-tl  | 左上角的样式                                     |
| corner-tr  | 右上角的样式                                     |
| corner-bl  | 左下角的样式                                     |
| corner-br  | 右下角的样式                                     |

## 样式结构

组件使用以下CSS类名，可以通过这些类名来自定义样式：

- `.moon-div` - 容器主体
- `.moon-div-bar` - 所有边框的基础类
    - `.moon-div-bar-top` - 上边框
    - `.moon-div-bar-right` - 右边框
    - `.moon-div-bar-bottom` - 下边框
    - `.moon-div-bar-left` - 左边框
- `.moon-div-corner` - 所有角落的基础类
    - `.moon-div-corner-tl` - 左上角
    - `.moon-div-corner-tr` - 右上角
    - `.moon-div-corner-bl` - 左下角
    - `.moon-div-corner-br` - 右下角

## 使用方法

### 基本用法

```vue
<template>
    <moon-div style="width: 300px; height: 200px; border: 1px solid #ddd;">
        <!-- 这里放置你的内容 -->
        <div>可调整大小的容器</div>
    </moon-div>
</template>

<script>
import MoonDiv from '@/components-moon/moon-div';

export default {
    components: {
        MoonDiv
    }
};
</script>
```

### 自定义可拖拽位置

默认情况下，组件支持所有八个拖拽点。你可以通过 `dragPosition` 属性来自定义启用哪些拖拽点：

```vue
<template>
    <!-- 只允许从右下角调整大小 -->
    <moon-div :dragPosition="['br']" style="width: 300px; height: 200px; border: 1px solid #ddd;">
        <div>只能从右下角调整大小</div>
    </moon-div>
</template>
```

可用的拖拽点选项：

- `top`, `right`, `bottom`, `left` - 四个边框
- `tl`, `tr`, `bl`, `br` - 四个角落（左上、右上、左下、右下）

### 自定义边框和角落样式

```vue
<template>
    <moon-div style="width: 300px; height: 200px; border: 1px solid #ddd;">
        <!-- 容器内容 -->
        <div>带自定义边框样式的容器</div>

        <!-- 自定义所有边框和角落的样式 -->
        <template #bar>
            <div class="custom-bar"></div>
        </template>

        <template #corner>
            <div class="custom-corner"></div>
        </template>

        <!-- 或者单独自定义特定边框或角落 -->
        <template #bar-right>
            <div class="special-right-bar"></div>
        </template>

        <template #corner-br>
            <div class="special-bottom-right-corner"></div>
        </template>
    </moon-div>
</template>

<style scoped>
.custom-bar {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 0, 0, 0.2);
}

.custom-corner {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 255, 0, 0.3);
    border-radius: 50%;
}

.special-right-bar {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 255, 0.3);
}

.special-bottom-right-corner {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 0, 255, 0.4);
}
</style>
```

## 绝对定位使用示例

```vue
<template>
    <div class="contain">
        <div style="position: absolute; top: 0; right: 0; width: fit-content; height: 100%; border: 1px solid blue">
            <moon-div style="border: 1px solid red; width: 100%; height: 100%"> hello </moon-div>
        </div>
    </div>
</template>

<style>
.contain {
    display: flex;
    height: 100vh;
    width: 100%;
    flex-direction: column;
}
</style>
```

## 调整CSS变量

组件使用CSS变量来定义边框和角落的尺寸及颜色，你可以在全局或局部修改这些变量：

```css
/* 全局修改 */
:root {
    --moon-div-bar-color: rgba(66, 185, 131, 0.3); /* 边框和角落的颜色 */
    --moon-div-bar-size: 8px; /* 边框宽度 */
    --moon-div-corner-size: 14px; /* 角落大小 */
}

/* 或在组件内局部修改 */
.my-container .moon-div {
    --moon-div-bar-color: rgba(255, 0, 0, 0.2);
    --moon-div-bar-size: 10px;
    --moon-div-corner-size: 16px;
}
```
