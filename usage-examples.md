# JavaScript 文本省略号工具使用指南

## 概述

本工具提供了多种 JavaScript 实现方案来模拟和增强 CSS `text-overflow: ellipsis` 的效果，支持单行、多行、响应式等多种场景。

## 快速开始

### 1. 引入工具库

```html
<!-- 在 HTML 中引入 -->
<script src="text-ellipsis-utils.js"></script>
```

或者

```javascript
// 在 Node.js 中使用
const { TextEllipsis, ResponsiveTextEllipsis, TextEllipsisUtils } = require('./text-ellipsis-utils.js');
```

### 2. 基础用法

#### 单行文本省略号

```javascript
// 方式1: 使用工具函数（推荐）
TextEllipsisUtils.applySingle('.text-container', '这是一段很长的文本内容');

// 方式2: 使用类实例
const ellipsis = new TextEllipsis();
const element = document.querySelector('.text-container');
ellipsis.applySingleLine(element, '这是一段很长的文本内容');
```

#### 多行文本省略号

```javascript
// 应用2行省略号效果
TextEllipsisUtils.applyMulti('.text-container', '这是一段很长的文本内容，支持多行显示', 2);

// 应用3行省略号效果
TextEllipsisUtils.applyMulti('.text-container', '这是一段很长的文本内容，支持多行显示', 3);
```

## 高级用法

### 1. 响应式省略号

```javascript
// 自动响应容器尺寸变化
const responsiveEllipsis = new ResponsiveTextEllipsis();

// 单行响应式
responsiveEllipsis.observe(
    document.querySelector('.responsive-text'),
    '这段文本会根据容器大小自动调整省略号位置',
    { type: 'single' }
);

// 多行响应式
responsiveEllipsis.observe(
    document.querySelector('.responsive-multi-text'),
    '这段文本支持多行显示，并且会根据容器大小自动调整',
    { type: 'multi', maxLines: 3 }
);
```

### 2. 自定义配置

```javascript
// 创建自定义配置的实例
const customEllipsis = new TextEllipsis({
    ellipsis: '…',           // 使用不同的省略号字符
    tolerance: 5,            // 容错像素值
    cacheEnabled: false      // 禁用缓存
});

// 应用自定义省略号
customEllipsis.applySingleLine(element, text);
```

### 3. 自动检测最佳方案

```javascript
// 自动选择最合适的省略号方案
TextEllipsisUtils.auto('.text-container', '这是一段文本', {
    preferMultiLine: false,  // 优先使用单行
    maxLines: 2,             // 多行模式的最大行数
    responsive: true         // 启用响应式
});
```

## 实际应用场景

### 1. 文章标题截断

```html
<div class="article-title" style="width: 200px;">
    <!-- 这里会显示截断的标题 -->
</div>
```

```javascript
// 应用单行省略号
TextEllipsisUtils.applySingle(
    '.article-title', 
    '这是一个非常长的文章标题，需要在指定宽度内显示'
);
```

### 2. 商品描述多行显示

```html
<div class="product-description" style="width: 300px; height: 60px;">
    <!-- 这里会显示多行截断的商品描述 -->
</div>
```

```javascript
// 应用多行省略号（最多显示3行）
TextEllipsisUtils.applyMulti(
    '.product-description',
    '这是一个商品的详细描述信息，包含了很多重要的特性和卖点，需要在有限的空间内展示给用户',
    3
);
```

### 3. 响应式用户评论

```html
<div class="user-comment">
    <!-- 响应式评论内容 -->
</div>
```

```javascript
// 创建响应式实例
const responsiveEllipsis = new ResponsiveTextEllipsis();

// 监听评论容器
responsiveEllipsis.observe(
    document.querySelector('.user-comment'),
    '这是一条用户评论，内容可能很长，需要根据不同设备的屏幕尺寸自动调整显示效果。在移动设备上可能显示较少内容，在桌面设备上可能显示更多内容。',
    {
        type: 'multi',
        maxLines: window.innerWidth > 768 ? 3 : 2  // 桌面显示3行，移动设备显示2行
    }
);
```

### 4. 动态内容处理

```javascript
// 处理动态加载的内容
function handleDynamicContent(container, textList) {
    const ellipsis = new TextEllipsis();
    
    textList.forEach((text, index) => {
        const element = container.children[index];
        if (element) {
            ellipsis.applySingleLine(element, text);
        }
    });
}

// 使用示例
const container = document.querySelector('.dynamic-list');
const texts = [
    '第一条动态内容，可能很长...',
    '第二条动态内容，也可能很长...',
    '第三条动态内容，同样可能很长...'
];

handleDynamicContent(container, texts);
```

## 性能优化

### 1. 缓存管理

```javascript
const ellipsis = new TextEllipsis({ cacheEnabled: true });

// 批量处理时，缓存能显著提升性能
const elements = document.querySelectorAll('.batch-text');
elements.forEach(el => {
    ellipsis.applySingleLine(el, el.dataset.text);
});

// 处理完成后清理缓存
ellipsis.clearCache();
```

### 2. 资源清理

```javascript
// 创建响应式实例
const responsiveEllipsis = new ResponsiveTextEllipsis();

// 使用完毕后务必清理资源
window.addEventListener('beforeunload', () => {
    responsiveEllipsis.destroy();
});

// 或者在单页应用的路由切换时清理
function cleanupPage() {
    responsiveEllipsis.unobserveAll();
}
```

## API 参考

### TextEllipsis 类

#### 构造函数
```javascript
new TextEllipsis(options)
```

**参数：**
- `options.ellipsis` (string): 省略号字符，默认 `'...'`
- `options.tolerance` (number): 容错像素值，默认 `2`
- `options.cacheEnabled` (boolean): 是否启用缓存，默认 `true`

#### 方法

##### applySingleLine(element, text, maxWidth)
应用单行省略号效果

**参数：**
- `element` (HTMLElement): 目标元素
- `text` (string): 原始文本
- `maxWidth` (number, 可选): 最大宽度，默认使用元素宽度

**返回：** (string) 处理后的文本

##### applyMultiLine(element, text, maxLines)
应用多行省略号效果

**参数：**
- `element` (HTMLElement): 目标元素
- `text` (string): 原始文本
- `maxLines` (number): 最大行数，默认 `2`

**返回：** (string) 处理后的文本

### ResponsiveTextEllipsis 类

继承自 `TextEllipsis`，新增响应式功能。

#### 方法

##### observe(element, originalText, options)
开始观察元素尺寸变化

**参数：**
- `element` (HTMLElement): 目标元素
- `originalText` (string): 原始文本
- `options.type` (string): 类型，`'single'` 或 `'multi'`
- `options.maxLines` (number): 多行模式的最大行数

##### unobserve(element)
停止观察指定元素

##### unobserveAll()
停止观察所有元素

### TextEllipsisUtils 工具函数

#### applySingle(element, text, options)
快速应用单行省略号

#### applyMulti(element, text, maxLines)
快速应用多行省略号

#### auto(element, text, options)
自动选择最佳省略号方案

## 浏览器兼容性

- **Canvas API**: IE9+
- **ResizeObserver**: Chrome 64+, Firefox 69+, Safari 13.1+
- **降级方案**: 使用 window.resize 事件，支持所有现代浏览器

## 注意事项

1. **字体一致性**: 确保测量时使用的字体与实际显示字体一致
2. **性能考虑**: 对于大量元素，建议启用缓存并及时清理
3. **响应式清理**: 使用响应式功能时，记得在适当时机清理资源
4. **DOM 操作**: 避免在频繁的 DOM 操作中重复调用省略号函数

## 与 CSS 的对比

| 特性 | CSS `text-overflow: ellipsis` | JavaScript 实现 |
|------|------------------------------|-----------------|
| 性能 | 优秀（浏览器原生） | 良好（需要计算） |
| 灵活性 | 有限 | 非常灵活 |
| 多行支持 | 需要配合 `-webkit-line-clamp` | 完全支持 |
| 响应式 | 天然支持 | 需要额外实现 |
| 自定义省略号 | 有限支持 | 完全支持 |
| 兼容性 | IE6+ | IE9+ |

## 总结

JavaScript 实现的文本省略号虽然在性能上略逊于 CSS 原生实现，但在灵活性和功能完整性方面具有明显优势。特别适合以下场景：

1. 需要多行文本省略号且不支持 `-webkit-line-clamp` 的环境
2. 需要自定义省略号字符或样式
3. 需要响应式的省略号效果
4. 需要精确控制截断逻辑的复杂场景

选择哪种方案应该根据具体的项目需求、性能要求和兼容性需求来决定。 