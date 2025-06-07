# moon-textellips

### 作者：闰月飞鸟 时间：2025年04月11日14:02:55

### 开发目的

- 依据元素宽度与文本内容动态实现文本省略展示
- 超出显示省略号，鼠标悬浮时通过tooltip展示完整内容
- 支持展开/收起功能，方便长文本查看
- 支持自定义行数限制
- 适配不同的显示需求和交互方式

### 功能特点

- 自动检测文本是否超出容器宽度
- 支持单行和多行文本省略
- 超出时显示省略号，并提供展开/收起按钮
- 鼠标悬浮时可通过tooltip显示全文
- 响应式设计，窗口大小变化时自动调整

### Props

| 参数           | 说明                       | 类型    | 可选值 | 默认值 |
| -------------- | -------------------------- | ------- | ------ | ------ |
| text           | 要显示的文本内容           | String  | —      | ''     |
| lineClamp      | 最大行数，超过将显示省略号 | Number  | —      | 1      |
| elToolTipAttrs | el-tooltip的属性配置       | Object  | —      | {}     |
| showFoldBtn    | 是否显示展开/收起按钮      | Boolean | —      | false   |
| showTooltip    | 是否显示tooltip            | Boolean | —      | true   |

### Events

| 事件名称 | 说明                    | 回调参数                 |
| -------- | ----------------------- | ------------------------ |
| toggle   | 展开/收起状态变化时触发 | 当前是否展开(true/false) |

### Slots

| 名称     | 说明                                    |
| -------- | --------------------------------------- |
| default  | 自定义文本内容，默认使用props.text      |
| fold-btn | 自定义展开/隐藏，接受一个isExpanded参数 |

### 使用示例

```vue
<template>
    <!-- 基础用法 -->
    <moon-textellips text="这是一段很长的文本内容，当宽度不够时会自动显示省略号" />

    <!-- 多行省略 -->
    <moon-textellips
        text="这是一段很长的文本内容，可能需要多行显示。当内容超出指定的行数时，将显示省略号并提供展开按钮。"
        :lineClamp="2"
    />
    <!-- 禁用展开按钮 -->
    <moon-textellips text="这段文本不会显示展开按钮，只会在hover时通过tooltip显示全部内容" :showFoldBtn="false" />

    <!-- 禁用tooltip -->
    <moon-textellips text="这段文本不会显示tooltip，只能通过展开按钮查看全部内容" :showTooltip="false" />

    <!-- 使用slot自定义内容 -->
    <moon-textellips :lineClamp="3">
        <div>
            <p>这是通过slot传入的自定义内容</p>
            <p>可以包含<strong>HTML标签</strong>和其他元素</p>
        </div>
    </moon-textellips>

    <!-- 自定义tooltip属性 -->
    <moon-textellips
        text="这段文本使用了自定义的tooltip配置"
        :elToolTipAttrs="{ effect: 'light', placement: 'bottom', popperClass: 'custom-tooltip' }"
    />
    <!-- 自定义展开按钮 -->
    <moon-textellips text="这段文本使用了自定义的tooltip配置">
        <template #fold-btn="{ isExpanded }">
            <a>{{ isExpanded ? 'fold' : 'expand' }}</a>
        </template>
    </moon-textellips>
</template>

<script>
import MoonTextellips from '@/components-moon/moon-textellips';

export default {
    components: {
        MoonTextellips
    }
};
</script>
```

### 注意事项

1. 组件会自动检测文本是否超出容器宽度，只有超出时才会显示省略号和展开按钮
2. `lineClamp`属性在非Chrome浏览器中可能效果不一致，因为它依赖于`-webkit-line-clamp`CSS属性
3. 使用`slot`自定义内容时，组件仍然会正确检测内容是否超出
4. 当组件宽度发生变化时，会自动重新检测文本是否超出
5. 文本展开后，tooltip将不再显示
6. 较大的`lineClamp`值可能会影响性能，建议根据实际需求设置合理的值

### 内部实现

组件内部使用了`useResizeObserver`来监听元素大小变化，并使用`-webkit-line-clamp`实现多行文本省略。当检测到文本超出容器宽度时，会自动显示省略号和相应的交互元素。
