# MSubsection 组件

### 开发目的

- 提供一个现代化的标签页组件，支持平滑的指示器动画和滚动功能。
- 支持自定义标签页标题和内容，适用于各种场景的标签页需求。
- 内置响应式布局和无障碍访问支持。

### 用法示例

#### 基础标签页
```demo
MSubsection/tabs-basic
```

#### modelValue 双向绑定
```demo
MSubsection/modelValue-binding
```

#### 滚动配置
```demo
MSubsection/scrollAttrs-config
```

#### 自定义标签页标题
```demo
MSubsection/tab-title-slot
```

#### 自定义标签页内容
```demo
MSubsection/tab-content-slot
```

#### 事件监听
```demo
MSubsection/update-modelValue-event
```

### Props

| 参数        | 说明                     | 类型     | 可选值 | 默认值                                                 |
| ----------- | ------------------------ | -------- | ------ | ------------------------------------------------------ |
| tabs        | 标签页数据数组           | Array    | -      | \[\{ title: '标签一' \}, \{ title: '标签二' \}\]       |
| modelValue  | 当前激活的标签页索引     | Number   | -      | 0                                                      |
| scrollAttrs | 滚动组件配置选项         | Object   | -      | \{ scrollBtnShow: false \}                             |

### Events

| 事件名             | 说明             | 回调参数         |
| ------------------ | ---------------- | ---------------- |
| update:modelValue  | 标签页切换时触发 | newIndex(Number) |

### Slots

#### 标签页标题插槽
- **tab-title-{index}**: 自定义第 {index} 个标签页的标题内容
  - 参数: `{ tab }` - 当前标签页的数据对象

#### 标签页内容插槽
- **tab-content-{index}**: 自定义第 {index} 个标签页的内容区域
  - 无参数

### 样式说明

组件采用现代化的设计风格：
- 圆角胶囊式标签页头部
- 平滑的指示器动画效果
- 支持CSS变量自定义样式
- 内容区域支持过渡动画

### CSS 变量

| 变量名                                      | 说明                 | 默认值    |
| ------------------------------------------- | -------------------- | --------- |
| --m-subsection-radius                       | 圆角大小             | 100px     |
| --m-subsection-tab-item-height              | 标签页高度           | 40px      |
| --m-subsection-tab-item-font-size           | 标签页字体大小       | 18px      |
| --m-subsection-tab-item-color               | 标签页文字颜色       | #3d3d3d   |
| --m-subsection-tab-item-active-color        | 激活标签页文字颜色   | #fff      |
| --m-subsection-tab-item-active-background-color | 激活标签页背景色 | #4269fd   |

### 注意事项

1. **标签页数据格式**: tabs 数组中的每个对象必须包含 `title` 属性
2. **插槽命名**: 插槽名称必须严格按照 `tab-title-{index}` 和 `tab-content-{index}` 格式
3. **索引从0开始**: modelValue 和插槽索引都从 0 开始计算
4. **滚动配置**: scrollAttrs 会直接传递给内部的 MScroll 组件
5. **响应式支持**: 组件会自动监听容器尺寸变化并更新指示器位置 