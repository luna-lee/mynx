# moon-scroll 组件

`moon-scroll` 是一个自定义滚动容器组件，支持自定义滚动条样式和左右滚动按钮，适用于需要横向滚动的内容展示。

## 特性

- 自定义滚动条样式
- 左右滚动按钮
- 平滑滚动效果
- 自动检测内容是否需要滚动
- 跨浏览器支持（WebKit、Firefox、IE等）
- 自动隐藏不需要的滚动按钮

## 使用方法

### 基本用法

```vue
<template>
    <moon-scroll>
        <div class="content-container">
            <!-- 需要滚动的内容 -->
            <div class="item" v-for="i in 20" :key="i">内容项 {{ i }}</div>
        </div>
    </moon-scroll>
</template>

<script>
import MoonScroll from '@/components-moon/moon-scroll';

export default {
    components: {
        MoonScroll
    }
};
</script>

<style>
.content-container {
    display: flex;
    white-space: nowrap;
}
.item {
    flex-shrink: 0;
    width: 150px;
    height: 100px;
    margin-right: 10px;
}
</style>
```

### 启用滚动按钮

```vue
<template>
    <moon-scroll :scrollBtnShow="true" :scrollStep="300">
        <div class="content-container">
            <!-- 需要滚动的内容 -->
            <div class="item" v-for="i in 20" :key="i">内容项 {{ i }}</div>
        </div>
    </moon-scroll>
</template>
```

### 自定义滚动条样式

```vue
<template>
    <moon-scroll
        scrollbarWidth="8px"
        scrollbarHeight="8px"
        thumbBg="#409EFF"
        radius="4px"
        trackBg="#E4E7ED"
        :scrollBtnShow="true"
    >
        <div class="content-container">
            <!-- 需要滚动的内容 -->
            <div class="item" v-for="i in 20" :key="i">内容项 {{ i }}</div>
        </div>
    </moon-scroll>
</template>
```

### 自定义滚动按钮

```vue
<template>
    <moon-scroll :scrollBtnShow="true">
        <template #left-btn="{ isScrollBegin }">
            <el-button type="primary" icon="el-icon-arrow-left" :disabled="isScrollBegin"></el-button>
        </template>
        <template #right-btn="{ isScrollEnd }">
            <el-button type="primary" icon="el-icon-arrow-right" :disabled="isScrollEnd"></el-button>
        </template>

        <div class="content-container">
            <!-- 需要滚动的内容 -->
            <div class="item" v-for="i in 20" :key="i">内容项 {{ i }}</div>
        </div>
    </moon-scroll>
</template>
```

### 在其他组件中使用

`moon-scroll` 被用于 `moon-subsection` 组件中实现标签页横向滚动功能：

```vue
<template>
    <div class="parent-component">
        <moon-scroll :scrollBtnShow="true">
            <div class="tab-list">
                <div class="tab-item" v-for="(tab, index) in tabs" :key="index">
                    {{ tab.title }}
                </div>
            </div>
        </moon-scroll>
    </div>
</template>

<script>
import MoonScroll from '@/components-moon/moon-scroll';

export default {
    components: {
        MoonScroll
    },
    data() {
        return {
            tabs: [
                { title: '标签一' },
                { title: '标签二' },
                { title: '标签三' }
                // 更多标签...
            ]
        };
    }
};
</script>
```

## 属性

| 属性            | 类型    | 默认值    | 说明                         |
| --------------- | ------- | --------- | ---------------------------- |
| scrollbarWidth  | String  | '0px'     | 垂直滚动条宽度               |
| scrollbarHeight | String  | '0px'     | 水平滚动条高度               |
| thumbBg         | String  | '#3ab0f3' | 滚动条滑块背景色             |
| radius          | String  | '20px'    | 滚动条圆角半径               |
| trackBg         | String  | '#D8D8D8' | 滚动条轨道背景色             |
| scrollStep      | Number  | 200       | 点击滚动按钮时的滚动像素距离 |
| scrollBtnShow   | Boolean | false     | 是否显示左右滚动按钮         |

> **注意**: 组件设置了 `inheritAttrs: false`，这意味着未被识别为 prop 的属性不会自动添加到组件的根元素上。

## 插槽

组件提供了以下命名插槽：

| 插槽名称  | 说明               | 插槽属性                             |
| --------- | ------------------ | ------------------------------------ |
| default   | 滚动容器的内容     | -                                    |
| left-btn  | 自定义左侧滚动按钮 | { isScrollBegin } - 是否已滚动到开始 |
| right-btn | 自定义右侧滚动按钮 | { isScrollEnd } - 是否已滚动到结束   |

## 事件

组件内部处理了以下事件，但未向外部暴露：

| 事件名称 | 说明             | 监听对象                                        |
| -------- | ---------------- | ----------------------------------------------- |
| scroll   | 滚动事件         | .moon-scroll-container                          |
| click    | 左右按钮点击事件 | .moon-scroll-btn-left 和 .moon-scroll-btn-right |

## 方法

| 方法名              | 说明                       | 参数  |
| ------------------- | -------------------------- | ----- |
| freshScrollStatus   | 刷新滚动状态               | -     |
| handleLeftBtnClick  | 处理左侧按钮点击，向左滚动 | -     |
| handleRightBtnClick | 处理右侧按钮点击，向右滚动 | -     |
| handleScroll        | 处理滚动事件，更新滚动状态 | event |
| onScrollBegin       | 检测是否滚动到开始位置     | -     |
| onScrollEnd         | 检测是否滚动到结束位置     | -     |

## 计算属性

| 属性名          | 返回类型 | 说明                                     |
| --------------- | -------- | ---------------------------------------- |
| styleVar        | Object   | 返回用于设置CSS变量的样式对象            |
| isShowScrollBtn | Boolean  | 判断是否显示滚动按钮，基于内容是否可滚动 |

## CSS变量

组件使用CSS变量来控制滚动条样式，这些变量由props动态设置：

| CSS变量                   | 对应prop        | 说明             |
| ------------------------- | --------------- | ---------------- |
| --scrollbar-width         | scrollbarWidth  | 垂直滚动条宽度   |
| --scrollbar-height        | scrollbarHeight | 水平滚动条高度   |
| --scrollbar-thumb-bg      | thumbBg         | 滚动条滑块背景色 |
| --scrollbar-border-radius | radius          | 滚动条圆角半径   |
| --scrollbar-track-bg      | trackBg         | 滚动条轨道背景色 |
| containerStyle            | -               | 滚动区域Style    |

## 样式定制

组件使用BEM命名规范定义了以下CSS类名：

- `.moon-scroll` - 组件根元素
- `.moon-scroll-container` - 滚动内容容器
- `.moon-scroll-btn` - 滚动按钮
- `.moon-scroll-btn-left` - 左侧滚动按钮
- `.moon-scroll-btn-right` - 右侧滚动按钮
- `.moon-scroll-btn-disabled` - 禁用状态的滚动按钮
- `.moon-scroll-btn-show` - 显示滚动按钮时的根元素类名

您可以通过覆盖这些类名来自定义组件样式。

### 滚动按钮样式

滚动按钮默认样式：

- 宽度: 20px
- 高度: 100%
- 位置: 绝对定位在容器左右两侧
- 显示: 居中对齐的SVG图标

当启用滚动按钮时，组件会自动添加左右内边距（padding-left和padding-right）各20px，以确保内容不被滚动按钮遮挡。

## 生命周期钩子

组件在以下生命周期钩子中进行了处理：

| 钩子    | 操作           |
| ------- | -------------- |
| mounted | 初始化滚动状态 |
| updated | 更新滚动状态   |

## 注意事项

1. 当内容不需要滚动时（内容宽度小于容器宽度），滚动按钮将自动隐藏。
2. 确保滚动内容的宽度超过容器宽度，才能触发横向滚动功能。
3. 组件会自动检测内容变化并更新滚动状态。
4. 组件支持多种浏览器的滚动条样式（WebKit、Firefox、IE），但具体效果可能因浏览器而异。
5. 滚动按钮的显示逻辑：只有当 `scrollBtnShow` 为 true 且内容需要滚动时才会显示。
6. 组件使用 `smooth` 滚动行为，提供平滑的滚动体验。
