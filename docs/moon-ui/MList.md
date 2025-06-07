# MList 组件

## 作者：闰月飞鸟；时间：2024/01/09

### 开发目的

- 提供一个智能列表组件，支持选中状态管理和溢出处理。
- 支持自定义选中样式、禁用状态、水平/垂直溢出处理。
- 当列表项超出容器时，可自动隐藏多余项并显示"更多"按钮。

### 用法示例

#### 默认插槽内容
```demo
MList/default-slot
```

#### 自定义更多按钮插槽
```demo
MList/more-btn-slot
```

#### modelValue 双向绑定
```demo
MList/model-value
```

#### Props 综合配置
```demo
MList/active-class-disabled-overflow
```

#### 事件监听示例
```demo
MList/events
```

### Props

| 参数             | 说明                   | 类型          | 可选值      | 默认值    |
| ---------------- | ---------------------- | ------------- | ----------- | --------- |
| modelValue       | 双向绑定的值，控制当前选中项 | Number/String | -           | null      |
| activeClass      | 选中状态的CSS类名      | String        | -           | 'active'  |
| activeClassHalf  | 半选中状态的CSS类名    | String        | -           | 'active-half' |
| disabled         | 是否禁用组件           | Boolean       | true/false  | false     |
| showMoreBtn      | 是否显示更多按钮       | Boolean       | true/false  | false     |
| overflowX        | 是否开启宽度溢出处理   | Boolean       | true/false  | true      |
| overflowY        | 是否开启高度溢出处理   | Boolean       | true/false  | false     |

### Slots

- 默认插槽：列表项内容区域，每个子元素需要设置唯一的 `key` 属性
- moreBtn：自定义更多按钮插槽，参数 `{ vnodeList }` - 隐藏的VNode列表

### Events

| 事件名           | 说明                     | 回调参数                    |
| ---------------- | ------------------------ | --------------------------- |
| update:modelValue | 选中值变化时触发         | value(Number/String)        |
| sliceIndex       | 切片索引变化时触发       | index(Number) - 显示的项目数 |
| moreVnodeList    | 隐藏节点列表变化时触发   | vnodeList(Array) - 隐藏的VNode数组 |

### 功能说明

#### 选中状态管理
- 通过 `modelValue` 双向绑定控制当前选中项
- 支持字符串和数字类型的值
- 当选中值包含子项key时，会显示半选中状态（activeClassHalf）

#### 溢出处理
- `overflowX`: 启用水平溢出处理，当列表项超出容器宽度时自动隐藏多余项
- `overflowY`: 启用垂直溢出处理，当列表项超出容器高度时自动隐藏多余项
- 配合 `showMoreBtn` 可显示自定义的"更多"按钮

#### 响应式监听
- 组件内置 ResizeObserver 监听容器尺寸变化
- 自动重新计算溢出情况并调整显示项目数量

### 样式说明

- 列表项需要设置唯一的 `key` 属性才能正确处理点击事件和样式
- 选中状态通过添加 `activeClass` 类名实现
- 半选中状态通过添加 `activeClassHalf` 类名实现
- 禁用状态下列表项点击无效，但可通过外部修改 `modelValue`

### 注意事项

1. 设置 `key` 属性的列表项，才能被选中
2. 溢出处理依赖于容器的固定尺寸，确保容器有明确的宽度或高度限制
3. 更多按钮插槽的 `vnodeList` 参数包含了被隐藏的VNode对象
4. 外部控制列表数量时，需要在mlist组件上绑定key=列表数量