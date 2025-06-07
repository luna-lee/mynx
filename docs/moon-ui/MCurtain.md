# MCurtain 组件


### 开发目的

- 提供一个带动画的窗帘（折叠/展开）组件，可自定义内容区域和触发按钮。
- 支持自定义展开/收起宽度，支持插槽自定义触发器。

### 用法示例

#### 默认插槽内容
```demo
MCurtain/default-slot
```

#### 自定义触发器插槽
```demo
MCurtain/trigger
```

#### 自定义触发器内容插槽
```demo
MCurtain/trigger-content
```

#### modelValue 双向绑定
```demo
MCurtain/model-value
```

#### 触发器位置设置
```demo
MCurtain/trigger-position
```

#### 自定义折叠/展开样式
```demo
MCurtain/fold-open-style
```

### Props

| 参数            | 说明              | 类型    | 可选值                   | 默认值                               |
| --------------- | ----------------- | ------- | ------------------------ | ------------------------------------ |
| value           | 控制展开/收起状态 | Boolean | true/false               | true                                 |
| foldStyle       | 收起时的样式      | Object  | -                        | \{ width: '0', height: 'auto' \}     |
| openStyle       | 展开时的样式      | Object  | -                        | \{ width: '500px', height: 'auto' \} |
| triggerPosition | 触发按钮的位置    | string  | top、right、bottom、left | right                                |

### Slots

- 默认插槽：窗帘内容区域
- trigger：自定义触发器插槽，参数 { isOpen }
- trigger-content:自定义触发器内容区域插槽，参数 { isOpen }

### Events

| 事件名 | 说明            | 回调参数        |
| ------ | --------------- | --------------- |
| input  | 展开/收起切换时 | isOpen(Boolean) |

### 样式说明

- 组件自带动画，内容区域默认禁止换行（white-space: nowrap）。
- 可通过 foldStyle/openStyle 控制窗帘宽度/高度。
