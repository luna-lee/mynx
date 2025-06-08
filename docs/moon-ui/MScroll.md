# MScroll 组件

### 开发目的

- 提供一个可自定义的滚动容器组件，支持水平滚动和滚动按钮控制。
- 支持自定义滚动条样式和平滑滚动行为。
- 适用于需要精确控制滚动体验的场景。

### 用法示例

#### 基础滚动容器
```demo
MScroll/basic-scroll
```

#### 显示滚动按钮
```demo
MScroll/scroll-buttons
```

#### 自定义滚动步长
```demo
MScroll/scroll-step
```

#### 自定义滚动按钮
```demo
MScroll/custom-buttons
```

#### 自定义容器样式
```demo
MScroll/body-style
```

### Props

| 参数         | 说明                 | 类型    | 可选值      | 默认值    |
| ------------ | -------------------- | ------- | ----------- | --------- |
| scrollStep   | 点击滚动按钮的步长   | Number  | -           | 200       |
| scrollBtnShow| 是否显示滚动按钮     | Boolean | true/false  | false     |
| bodyStyle    | 滚动容器的自定义样式 | Object  | -           | \{\}      |

### Slots

- **默认插槽**: 滚动容器内的内容
- **left-btn**: 自定义左侧滚动按钮
  - 参数: `\{ isScrollBegin \}` - 是否滚动到开始位置
- **right-btn**: 自定义右侧滚动按钮  
  - 参数: `\{ isScrollEnd \}` - 是否滚动到结束位置

### Events

该组件主要通过内部滚动事件来管理状态，不直接对外暴露事件。

### 样式说明

组件支持通过 CSS 变量自定义滚动条样式：

### CSS 变量

| 变量名                           | 说明             | 默认值      |
| -------------------------------- | ---------------- | ----------- |
| --m-scrollbar-width              | 滚动条宽度       | 0px         |
| --m-scrollbar-height             | 滚动条高度       | 0px         |
| --m-scrollbar-thumb-bg           | 滚动滑块背景色   | #3ab0f3     |
| --m-scrollbar-border-radius      | 滚动条圆角       | 20px        |
| --m-scrollbar-track-bg           | 滚动条轨道背景色 | #d8d8d8     |

### 注意事项

1. **滚动方向**: 组件主要支持水平滚动
2. **按钮状态**: 滚动按钮会根据滚动位置自动启用/禁用
3. **平滑滚动**: 使用 `scrollTo` API 实现平滑滚动效果
4. **响应式**: 组件会自动检测滚动状态变化
5. **兼容性**: 支持现代浏览器的滚动条样式自定义 