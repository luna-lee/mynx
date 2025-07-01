# MTextellips 文本省略

MTextellips 是一个智能文本省略组件，支持单行和多行文本省略，提供展开/收起功能。组件通过创建隐藏的样本元素来精确检测文本是否需要省略。

## 基础用法

最简单的用法是直接使用组件包裹文本内容或通过 `text` 属性传入文本。

> 💡 **提示**: 以下示例中使用了 MDiv 组件包裹文本容器，您可以拖拽边框来调整容器大小，实时观察文本省略效果的变化。

```demo
MTextellips/default-slot.vue
```

## 自定义展开按钮

可以通过 `fold-btn` 插槽自定义展开/收起按钮的样式和内容。

> 💡 **提示**: 拖拽容器边框调整大小，测试不同尺寸下自定义按钮的表现。

```demo
MTextellips/fold-btn-slot.vue
```

## 与 Element Plus 结合使用

MTextellips 组件可以与 Element Plus 完美结合，创建更丰富的交互体验。

```demo
MTextellips/element-plus-demo.vue
```

## API

### Props

| 参数          | 说明                                                                                                                 | 类型    | 可选值 | 默认值 |
| ------------- | -------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------ |
| text          | 显示的文本内容                                                                                                       | string  | —      | ''     |
| lineClamp     | 行数限制                                                                                                             | number  | —      | 1      |
| showFoldBtn   | 是否显示展开/收起按钮                                                                                                | boolean | —      | false  |
| foldBtnInline | 是否收起按钮紧跟内容| boolean | —      | true   |

#### 注意事项

- **按钮紧跟内容：** <span style='color:#4968FF'> 通过props.text传入文本，且为showFoldBtn和foldBtnInline都为true时</span>，按钮视图会渲染为自动紧跟内容。且展开状态的按钮会保持在最后一行上，即不会换行显示。
- **若文本通过slot传入：**foldBtnInline为true时，只对按钮展开后的位置起作用。

### Slots

| 插槽名   | 说明               | 参数                    |
| -------- | ------------------ | ----------------------- |
| default  | 默认插槽，文本内容 | —                       |
| fold-btn | 展开/收起按钮插槽  | { isExpanded: boolean } |

### Events

| 事件名         | 说明                                     | 参数               |
| -------------- | ---------------------------------------- | ------------------ |
| update:showAll | 显示状态更新时触发，支持 v-model:showAll | isShowAll: boolean |

### 插槽参数

#### fold-btn

| 参数       | 说明               | 类型    |
| ---------- | ------------------ | ------- |
| isExpanded | 当前是否为展开状态 | boolean |

### 事件参数

#### update:showAll

| 参数      | 说明                                                | 类型    |
| --------- | --------------------------------------------------- | ------- |
| isShowAll | 是否显示全部内容（true: 显示全部，false: 显示省略） | boolean |

## v-model 支持

组件支持 `v-model:showAll` 语法糖，可以双向绑定显示状态：

```vue
<template>
  <div>
    <p>当前状态: {{ showAll ? "显示全部" : "显示省略" }}</p>
    <MTextellips v-model:showAll="showAll" :lineClamp="2" :showFoldBtn="true">
      这是一段很长的文本内容，用来演示 v-model 双向绑定的效果...
    </MTextellips>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showAll = ref(false);
</script>
```

也可以使用传统的事件监听方式：

```vue
<template>
  <MTextellips
    :lineClamp="2"
    :showFoldBtn="true"
    @update:showAll="handleShowAllUpdate"
  >
    这是一段很长的文本内容...
  </MTextellips>
</template>

<script setup>
const handleShowAllUpdate = (isShowAll) => {
  console.log("文本显示状态:", isShowAll ? "显示全部" : "显示省略");
};
</script>
```

## 工作原理

组件采用了创新的检测机制来判断文本是否需要省略：

1. **样本元素**: 创建一个隐藏的样本元素（`m-text-ellips-text-sample`），与显示容器具有相同的样式
2. **尺寸同步**: 当容器尺寸变化时，自动同步样本元素的样式（宽度、内边距、边框、行高等）
3. **高度比较**: 通过比较样本元素的实际高度与容器允许的最大高度来判断是否需要省略
4. **响应式监听**: 使用 ResizeObserver 监听容器和样本元素的尺寸变化

## 特性

1. **精确检测**: 通过样本元素精确计算文本是否超出限制
2. **多行支持**: 支持单行和多行文本省略
3. **展开功能**: 可选的展开/收起功能，方便查看完整内容
4. **自定义按钮**: 支持完全自定义展开按钮的样式
5. **响应式**: 容器尺寸变化时自动重新计算是否需要省略
6. **样式同步**: 自动同步容器样式到检测元素，确保检测准确性

## 样式说明

### 容器样式

- `.m-text-ellips-container`: 主要的文本显示容器
  - 使用 `flex: 1` 占据可用空间
  - 设置 `text-overflow: ellipsis` 和 `overflow: hidden`
  - 默认行高为 `1.5em`

### 样本元素样式

- `.m-text-ellips-text-sample`: 隐藏的检测元素
  - 使用 `position: fixed` 脱离文档流
  - 设置 `visibility: hidden` 和 `opacity: 0` 完全隐藏
  - 动态同步容器的所有相关样式

### 按钮样式

- `.toggle-btn`: 展开/收起按钮容器
  - 使用 `flex-shrink: 0` 防止收缩
  - 行高与文本保持一致

## 注意事项

1. **样式继承**: 组件会自动同步容器的样式到检测元素，包括字体、行高、内边距等
2. **性能优化**: 样本元素使用 `position: fixed` 和完全隐藏，不影响页面布局和性能
3. **多行省略**: 使用了 `-webkit-line-clamp`，在某些旧浏览器中可能不支持
4. **动态检测**: 组件会自动监听容器尺寸变化，无需手动触发更新
5. **插槽优先**: 当使用插槽传入内容时，`text` 属性会被忽略

## 兼容性

- 现代浏览器完全支持
- 依赖 ResizeObserver API（现代浏览器原生支持）
- 多行省略功能依赖 `-webkit-line-clamp`（Webkit 内核浏览器支持）
