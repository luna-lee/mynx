# MScale 缩放容器

MScale 是一个自适应缩放容器组件，可以根据容器尺寸自动缩放内容，支持多种缩放模式。

## 基础用法

最简单的用法是设置设计稿尺寸，内容会自动根据容器大小进行缩放。

> 💡 **提示**: 以下示例中使用了 MDiv 组件包裹 MScale，您可以拖拽边框来调整容器大小，实时观察缩放效果。

```demo
MScale/default-slot.vue
```

## 缩放模式

通过 `fit` 属性可以控制不同的缩放模式。

> 💡 **提示**: 拖拽各个容器的边框，观察不同缩放模式下的表现。

```demo
MScale/fit-mode.vue
```

## 居中对齐

在 `contain`、`containX`、`containY` 模式下，可以通过 `containCenter` 属性控制内容是否居中对齐。

> 💡 **提示**: 拖拽容器边框调整大小，对比居中和不居中的效果差异。

```demo
MScale/contain-center.vue
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| designWidth | 设计稿宽度 | number \| string | — | 835 |
| designHeight | 设计稿高度 | number \| string | — | 367 |
| fit | 缩放适配模式 | string | fill / contain / containX / containY | fill |
| containCenter | contain模式下缩放后是否保持居中 | boolean | — | false |

#### fit 模式说明

- `fill`: 完全填充容器，可能会改变宽高比
- `contain`: 保持宽高比，完整显示内容，可能会有留白
- `containX`: 按宽度比例缩放，高度可能超出容器
- `containY`: 按高度比例缩放，宽度可能超出容器

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，需要缩放的内容 |

## 注意事项

1. 组件会监听容器尺寸变化，自动调整缩放比例
2. 设计稿尺寸建议设置为实际设计稿的尺寸
3. 在 `contain` 相关模式下，可以通过 `containCenter` 控制内容居中
4. 组件内部使用 `transform: scale()` 进行缩放，性能较好 