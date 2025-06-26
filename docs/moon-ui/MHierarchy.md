# MHierarchy 组件

### 开发目的

- 提供一个功能丰富的层次结构（树形图）可视化组件
- 支持水平和垂直两种布局模式
- 提供丰富的配置选项和交互功能
- 支持节点的增删改查、缩放、展开折叠等操作

### 用法示例

#### 水平布局模式
```demo
MHierarchy/mode-h
```

#### 垂直布局模式
```demo
MHierarchy/mode-v
```

#### 默认插槽内容
```demo
MHierarchy/default-slot
```

#### 数据和配置示例
```demo
MHierarchy/tree-data-config
```

#### 方法调用示例
```demo
MHierarchy/methods
```

### Props

| 参数             | 说明                 | 类型             | 可选值         | 默认值 |
| ---------------- | -------------------- | ---------------- | -------------- | ------ |
| mode             | 布局模式             | string           | 'h' / 'v'      | 'h'    |
| treeData         | 树形数据             | Array            | -              | []     |
| treeOptions      | 树形数据选项配置     | Object           | -              | \{\}    |
| defaultOpenLevel | 默认展开层级         | number           | -              | 2      |
| duration         | 动画持续时间(毫秒)   | number           | -              | 400    |
| negativeIds      | 负方向节点ID数组     | Array            | -              | []     |
| config           | 节点和连线样式配置   | Object           | -              | \{\}    |
| canExpandFold    | 是否可以展开折叠     | boolean/Function | -              | true   |
| expandShape      | 展开按钮形状         | string           | -              | -      |
| foldShape        | 折叠按钮形状         | string           | -              | -      |

### TreeOptions 配置

| 参数 | 说明           | 类型   | 默认值 |
| ---- | -------------- | ------ | ------ |
| id   | 节点ID字段名   | string | 'id'   |
| pId  | 父节点ID字段名 | string | 'pId'  |
| name | 节点名称字段名 | string | 'name' |

### Config 配置

#### node 节点配置
```javascript
{
  node: {
    rect: {
      attrs: {
        fill: '#fff',          // 填充色
        stroke: '#ccc',        // 边框色
        'stroke-width': 1,     // 边框宽度
        rx: 4                  // 圆角半径
      },
      show: true,              // 是否显示矩形
      on: {}                  // 事件监听
    },
    text: {
      attrs: {
        'font-size': 14,       // 字体大小
        'font-family': 'Arial', // 字体
        fill: '#333'           // 字体颜色
      },
      show: true,              // 是否显示文本
      on: {},                 // 事件监听
      compose: {}             // 组合属性
    },
    plus: {
      attrs: {
        r: 6,                  // 按钮半径
        fill: '#409eff',       // 填充色
        stroke: '#333'         // 边框色
      },
      show: true,              // 是否显示展开按钮
      on: {}                  // 事件监听
    },
    on: {}                    // 节点事件监听
  }
}
```

#### link 连线配置
```javascript
{
  link: {
    stroke: '#999',            // 连线颜色
    'stroke-width': 1,         // 连线宽度
    fill: 'none'               // 填充（通常为none）
  }
}
```

#### arrow 箭头配置
```javascript
{
  arrow: {
    show: true,                // 是否显示箭头
    attrs: {
      fill: '#999'             // 箭头颜色
    },
    path: 'M 0 0 L 10 5 L 0 10 z'  // 箭头路径
  }
}
```

#### zoom 缩放配置
```javascript
{
  zoom: {
    defaultScale: 1,           // 默认缩放比例
    scaleRange: [0.2, 2],      // 缩放范围
    callback: (event) => {}   // 缩放回调
  }
}
```

### Slots

- 默认插槽：自定义视图内容区域，用于显示额外的UI元素

### Methods

| 方法名            | 说明                     | 参数                                           | 返回值 |
| ----------------- | ------------------------ | ---------------------------------------------- | ------ |
| getNodeById       | 根据ID获取节点           | id: string/number                              | Object |
| getAllNodes       | 获取所有节点             | -                                              | Array  |
| moveToCenter      | 移动到中心位置           | -                                              | -      |
| setZoom           | 设置缩放比例             | scale: number                                  | -      |
| addNode           | 添加节点到目标节点       | targetNodeId, childrenNode, sign              | -      |
| removeNodeById    | 根据ID删除节点           | id: string/number/Array                        | -      |
| pauseZoom         | 暂停缩放功能             | -                                              | -      |
| continueZoom      | 继续缩放功能             | -                                              | -      |
| showCustomView    | 显示自定义视图           | event, data, width, height, priority          | -      |
| hideCustomView    | 隐藏自定义视图           | -                                              | -      |
| updateNodesByData | 根据数据更新节点         | data: Object/Array                             | -      |
| moveToNode        | 移动到指定节点           | targetNodeId: string/number, eventList: Array | -      |
| expandAllNodes    | 展开所有节点             | -                                              | -      |
| collapseAllNodes  | 折叠所有节点             | -                                              | -      |

### Events

组件支持通过 config.node.on、config.node.rect.on、config.node.text.on、config.node.plus.on 配置节点相关事件监听器。

常用事件包括：
- click: 节点点击事件
- mouseover: 鼠标悬停事件
- mouseout: 鼠标离开事件
- dblclick: 双击事件

### 样式说明

- 组件使用 D3.js 进行 SVG 渲染，提供流畅的动画效果
- 支持自定义节点样式、连线样式和箭头样式
- 内置缩放和拖拽功能
- 响应式设计，支持不同尺寸的容器

### 注意事项

1. 组件依赖 D3.js 和相关工具库
2. 树形数据需要包含 id、name 等必要字段
3. 大量节点时建议设置合适的 defaultOpenLevel 以提升性能
4. 自定义样式时需要了解 SVG 属性配置 