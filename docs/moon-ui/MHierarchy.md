# MHierarchy 组件

### 开发目的

- 提供一个功能丰富的层次结构（树形图）可视化组件
- 支持水平和垂直两种布局模式
- 提供丰富的配置选项和交互功能
- 支持节点的增删改查、缩放、展开折叠等操作

### 用法示例

#### 通用

```demo
MHierarchy/demo
```

### Props

| 参数             | 说明                                                                                                     | 类型                  | 可选值  | 默认值                                 |
| ---------------- | -------------------------------------------------------------------------------------------------------- | --------------------- | ------- | -------------------------------------- |
| width            | svg 宽度                                                                                                 | Number                | -       | 1300                                   |
| height           | svg 高度                                                                                                 | Number                | -       | 800                                    |
| mode             | 渲染模式：水平方向 h，垂直方向 v                                                                         | String                | h,v     | h                                      |
| layout           | 布局：水平方向-左右，右左，蝴蝶，垂直->上下，下上，蝴蝶                                                  | String                | -       | tb/bt/bf, lr/rl/bf                     |
| limit            | 水平模式，子节点最大展示数，多余的出收起按钮 ，-1 时全部展出                                             | Number                | -1；1+  | 3                                      |
| treeData         | 扁平化树数据，外部修改后，会触发画布重绘。但内置新增、修改、删除方法不会触发重绘，且会修改 treeData 数据 | Array                 | -       | []                                     |
| treeOptions      | 树数据选项                                                                                               | Object                | -       | \{ id: 'id',pId: 'pId',name: 'name',\} |
| duration         | 动画过渡时间                                                                                             | Number                |         | 400                                    |
| defaultOpenLevel | 默认展开层级，-1 时全部展开                                                                              | Number                | -1 ，1+ | 2                                      |
| negativeIds      | 蝴蝶模型，指定负向数据对应的 id，必须是根节点的直接子节点                                                | Array                 | -       | []                                     |
| config           | 配置节点连线，详情见下方说明                                                                             | Object                | -       | \{\}                                   |
| canExpendFold    | 点击当前节点，展开和收缩子节点 ,传入函数，则接受当前节点数据，返回一个 boolean                           | Boolean, (d)=>boolean | -       | true                                   |
| expendShape      | 指定点击展开的元素，必须同时设置 foldShape 才起作用，可以是 id，class 或元素,默认整个节点                | string                | -       | -                                      |
| foldShape        | 指定点击闭合的元素，必须同时设置 expendShape 才起作用，可以是 id，class 或元素 ,默认整个节点             | string                | -       | -                                      |

#### Props.config

| 参数       | 说明           |
| ---------- | -------------- |
| node       | 节点配置       |
| arrow      | 箭头配置       |
| link       | 连线配置       |
| zoom       | 缩放配置       |
| customView | 自定义节点视图 |

### Props.config.node 配置

| 参数       | 说明                                                                                    | 默认值     |
| ---------- | --------------------------------------------------------------------------------------- | ---------- |
| attrs      | 设置节点除 id，transform 其他的所有属性                                                 | -          |
| on         | 节点监听 ，详情见下方说明                                                               | Object     |
| padding    | 内容区域到边框的距离，详情见下                                                          | h:15,v:10  |
| nodeWidth  | 布局的节点宽度，水平模式，实际的节点宽度依据内容确定。在数据 data.\_nodeConfig 中可查看 | h:60,v:168 |
| nodeHeight | 布局的节点高度,水平模式，实际的节点高度，还会加上 padding 值                            | h:16,v:68  |
| separation | 节点间距                                                                                | 1.5        |
| rect       | 矩形配置                                                                                | -          |
| text       | 文本配置                                                                                | -          |
| plus       | 折叠图标配置                                                                            | -          |
| exShaps    | 自定义图型配置,                                                                         | []         |

- #### node.on 节点监听

| 名称               | 说明                                                                                                                                                             | 类型                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| clickFetchChildren | 点击后异步加载子节点。父节点上需要有\_hasChildren 标记 ,返回一个数组，可以是层级结构的数据。data:当前节点源数据信息；el:当前节点对应的 d3 元素对象；svg:画布元素 | (data:treeData,el:selection,svg:d3Selection)=>object[]\|object |
| click              | 鼠标事件,禁止冒泡;                                                                                                                                               | (e:MouseEvent,d:d3Node,svg:d3Selection)=>object[]              |
| mouseover          | 鼠标事件                                                                                                                                                         | (e:MouseEvent,d:d3Node,svg:d3Selection)=>object[]              |
| mouseout           | 鼠标事件                                                                                                                                                         | (e:MouseEvent,d:d3Node,svg:d3Selection)=>object[]              |
| 其他事件           | 其他事件                                                                                                                                                         | (e:MouseEvent,d:d3Node,svg:d3Selection)=>object[]              |

​

> [!NOTE]
>
> 所有的事件都不会在层级节点展开/收起按钮节点上触发

- #### node.padding

  - 可以是数字，数组，函数， 函数时接受一个当前节点数据的参数，动态返回一个数组
  - ```javascript
    type=[number,number,number,number]|number|(d:d3Node)=>{return [number,number,number,number]}
    ```

- #### node.rect 默认组件

  - ```javascript
    {
      attrs:object,
      on:object,
      show:boolean
    }
    ```

  - | 参数  | 说明                                               | 默认值                      |
    | ----- | -------------------------------------------------- | --------------------------- |
    | attrs | 组件样式配置                                       | \{ attrs:\{ \} ,show:true\} |
    | show  | 是否显示，设置为 false 后可以通过 exShaps 自己指定 | true                        |

- #### node.text 默认组件

  - ```javascript
    {
      attrs:object,
      on:object,
      compose:object,// mode 水平模式可配置
      show:boolean
    }
    ```

  - | 参数  | 说明                                               | 默认值                                               |
    | ----- | -------------------------------------------------- | ---------------------------------------------------- |
    | attrs | 组件配置                                           | v:\{font-size:16,line-height:10\} h:\{font-size:10\} |
    | show  | 是否显示，设置为 false 后可以通过 exShaps 自己指定 | true                                                 |

- #### node.plus 默认组件

  - ```javascript
    {
      attrs:object,
      on:object,
      show:boolean
    }
    ```

  - | 参数  | 说明                                               | 默认值           |
    | ----- | -------------------------------------------------- | ---------------- |
    | attrs | 组件配置                                           | \{ r: v:10;h:6\} |
    | show  | 是否显示，设置为 false 后可以通过 exShaps 自己指定 | true             |

- #### node.exShaps 自定义图形配置

  - 一个图形数组。

  - 图形嵌套，通过指定 children 实现

  - 具体配置如下：

```javascript
exShaps = [
  {
    name: "g",
    // 属性配置
    attrs: {
      stroke: "rgb(153, 153, 153)",
      fill: "rgb(234, 242, 255)",
      "stroke-width": 1,
    },
    // 链式函数配置。如text
    compose: {
      text(d) {
        return d.name;
      },
    },
    // 监听事件配置。
    on: {
      click(e, d) {},
    },
    children: [
      {
        name: "circle",
        attrs: {
          r: 20,
        },
      },
    ],
  },
];
```

### Props.config.arrow 箭头

<!-- 数据类型 -->

```javascript
{
  attrs:object,
  path: string,
  show:true
}
```

| 参数  | 说明             | 默认值                                                                                                              |
| ----- | ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| attrs | 箭头 marker 配置 | \{ viewBox: '0 0 10 10', refX: '10', refY: '5', markerWidth: '6', markerHeight: '6', orient: 'auto-start-reverse'\} |
| path  | path d 配置      | d:’M 0 0 L 10 5 L 0 10 z‘                                                                                           |
| show  | 是否显示         | true                                                                                                                |

### Props.config.link 连线配置

<!-- 数据类型 -->

```javascript
{
  [string]:any
}
```

| 参数 | 说明         | 默认值                                                                           |
| ---- | ------------ | -------------------------------------------------------------------------------- |
| link | 路径样式配置 | \{ stroke: '#D8D8D8', fill: 'none', 'stroke-opacity': '1', 'stroke-width': '1'\} |

### Props.config.zoom 缩放配置

<!-- 数据类型 -->

```javascript
{
  defaultScale:number,
  scaleRange:[number,number],
  callback:(e)=>void
}
```

| 参数         | 说明                       | 默认值  |
| ------------ | -------------------------- | ------- |
| defaultScale | 默认缩放值                 | 1       |
| scaleRange   | 可缩放范围                 | [0.2,2] |
| callback     | 缩放回到函数，接受缩放参数 | -       |

### Props.config.customView 自定视图配置

| 参数     | 说明                                                                | 默认值                   |
| -------- | ------------------------------------------------------------------- | ------------------------ |
| width    | 视图宽度                                                            | 100                      |
| height   | 视图高度                                                            | 50                       |
| priority | 相对于布局节点，视图优先出现位置,rb 右下，rt 右上，lb 左下，lt 左上 | ['rb', 'rt', 'lb', 'lt'] |
| duration | 动画过渡时间，默认 props.duration 中的值                            | 400                      |

#### 节点数据说明

- 所有的 attrs，compose 中关于节点属性的属性配置项的值，即可以是字符串，也可以是函数

- 函数接受一个参数，为当前节点数据。其中的 data 属性值为业务数据。

- 如

```
attrs:{
    display(d){
        if(d.data....)
            return 'none'
    }
}

```

```javascript
{
  "data": {
      // ...业务数据
      "_hasChildren": true, //异步加载子节点时，父节点中的判断标记
      "_sign": 1, //不同模型下，上下，左右标记。 左、上：-1。 右，下：1
      "_nodeConfig": object, //当前节点配置信息。包含节点的高度宽度形状等信息。
      "_isexpend":false,//水平模式下，限制节点按钮的展开闭合状态，只有限制节点按钮才有
      "_name": []  //垂直模式下，文本的多行节点信息
    },
  "x": 126, //节点坐标
  "y": 136 //节点坐标
}

```

####

### Events

| 名称      | 说明                                              | 参数                                      |
| --------- | ------------------------------------------------- | ----------------------------------------- |
| draw-done | 画布渲染完成后事件,返回当前画布节点与内容区域节点 | \{svg:d3Selection,container:d3Selection\} |

### Slot

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义视图节点 |

### Methods

| 名称             | 说明                                                                                                                                                                        | 类型                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| getNodeById      | 依据数据中唯一标识 id，对应 treeOptions 中的 id， 获取对应的数据，以及元素对象                                                                                              | (id:string)=>({ data: d3Node, el: d3Selection })          |
| getAllNode       | 获取所有非展开收起的节点，对应的数据，以及元素对象                                                                                                                          | (id:string)=>({ data: d3Node, el: d3Selection }[])        |
| moveToCenter     | 移动到中点                                                                                                                                                                  | ()=>void                                                  |
| zoom             | 缩放画布， 大于 1 的为放大，小于 1 大于 0 的为缩小。负数无效                                                                                                                | (scale:number)=>void                                      |
| addNode          | 在 targetId 对应目标节点上新增子节点 ,childrenNode 是一个扁平树数据也可以是单个对象数据。 \_sign 当目标节点为根节点且为 bf 布局时，用于指定添加的方位。会修改 treeData 数据 | (targetId,childrenNode:treeItem\|treeItem[],\_sign)=>void |
| updateNodeByData | 更新节点对应业务数据。但不能更改组件数据，如 id，pId，children，"\_"开头的属性。会修改 treeData 数据                                                                        | (dataList:treeItem\|treeItem[])=>void                     |
| removeNodeById   | 依据节点 id，移除该节点以及其所有子节点。会修改 treeData 数据                                                                                                               | (id:string\|string[])=>void                               |
| pauseZoom        | 暂停缩放功能                                                                                                                                                                | ()=>void                                                  |
| continueZoom     | 启动缩放功能                                                                                                                                                                | ()=>void                                                  |
| showCustomView   | 显示 slot 对应的自定义的 view 视图,e:鼠标信息，d：布局节点信息，width，height，priority，duration：参考 config.customView，优先级高于 config.customView 中的配置。          | (e, d, width, height, priority,duration)=>void            |
| hiddenCustomView | 隐藏 slot 对应的自定义的 view 视图,                                                                                                                                         | ()=>void                                                  |
| moveToNode       | 展开到指定节点所在的层级,将节点移动到画布中间，并且可以触发 eventList 指定的节点事件。                                                                                      | (targetNodeId:string,eventList:string[]\|string)=>void    |
| expandAllNode    | 展开所有节点                                                                                                                                                                | ()=>void                                                  |
| foldAllNode      | 将所有节点折叠到默认层级                                                                                                                                                    | ()=>void                                                  |

### 各个节点，图形默认的 id 和 class

| 名称                                       | class                            | id                                         |
| ------------------------------------------ | -------------------------------- | ------------------------------------------ |
| 节点                                       | m-hierarchy-node              | 'node'+ 节点数据中的唯一标识字段对应的数据 |
| 节点-根节点                                | m-hierarchy-node-root         | 'node'+ 节点数据中的唯一标识字段对应的数据 |
| 节点-有子节点的节点                        | m-hierarchy-node-haschildren  | 'node'+ 节点数据中的唯一标识字段对应的数据 |
| 节点-有子节点的节点，且展开                | m-hierarchy-node-expend       | 'node'+ 节点数据中的唯一标识字段对应的数据 |
| 节点-限制展开收起的节点                    | m-hierarchy-node-limit-button | 'node'+ 节点数据中的唯一标识字段对应的数据 |
| rect                                       | m-hierarchy-rect              | -                                          |
| text                                       | m-hierarchy-text              | -                                          |
| 展开收起图形                               | m-hierarchy-plus              | -                                          |
| 连线                                       | m-hierarchy-link              | 'link'+"起点 id-终点 id"                   |
| 节点鼠标悬浮，该节点对应的所有子节点间连线 | m-hierarchy-node-hover-link   | 'link'+"起点 id-终点 id"                   |
| 用户自定义视图节点                         | m-hierarchy-custom-view       | -                                          |

## DefaultStyle

- 可以自行依据项目修改

```CSS
    .m-hierarchy-svg {
    .m-hierarchy-node {
        // 默认rect样式
        .m-hierarchy-rect {
            fill: #fff;
            stroke: rgb(216, 216, 216);
            stroke-width: 0.5;
        }
        // 默认text样式
        .m-hierarchy-text {
            fill: rgb(51, 51, 51);
        }
        // 默认plus样式
        .m-hierarchy-plus {
            stroke: rgb(153, 153, 153);
            fill: rgb(234, 242, 255);
            stroke-width: 1;
        }

        // 根节点样式
        &.m-hierarchy-node-root {
            .m-hierarchy-rect {
                fill: rgb(18, 137, 239);
            }
            .m-hierarchy-text {
                fill: #fff;
            }
            .m-hierarchy-plus {
                display: none;
            }
        }
        // 没有子节点的样式
        &:not(.m-hierarchy-node-haschildren) {
            .m-hierarchy-plus {
                display: none;
            }
        }
        // 非根节点的节点展开后样式
        &.m-hierarchy-node-expend:not(.m-hierarchy-node-root) {
            .m-hierarchy-text {
                fill: rgb(18, 139, 237);
            }
        }
        // 节点展开后样式
        &.m-hierarchy-node-expend {
            .m-hierarchy-plus {
                line:nth-of-type(2) {
                    display: none;
                }
            }
        }
        //展开限制节点的按钮型节点样式
        &.m-hierarchy-node-limit-button {
            .m-hierarchy-rect {
                fill: rgb(247, 247, 247);
            }
        }
        // 非展开限制节点的按钮型节点得节点鼠标悬停样式
        &:not(.m-hierarchy-node-limit-button):hover {
            .m-hierarchy-rect {
                stroke: rgb(18, 137, 239);
            }
        }
    }
    .m-hierarchy-custom-view {
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding: 5px;
        border-radius: 8px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .m-hierarchy-arrow {
        fill: #128bed;
    }
    .m-hierarchy-link {
        stroke: #d8d8d8;
        stroke-opacity: 1;
        stroke-width: 1;
    }
    .m-hierarchy-node-hover-link {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: m-hierarchy-link-run 20s linear infinite;
    }
    .m-hierarchy-loading {
        animation: m-hierarchy-rotate 3s linear infinite;
    }
    @keyframes m-hierarchy-rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes m-hierarchy-link-run {
        from {
            stroke-dasharray: 10, 5;
        }
        to {
            stroke-dasharray: 20, 5;
        }
    }
}
```
