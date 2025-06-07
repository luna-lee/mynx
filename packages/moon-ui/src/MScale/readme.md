# MoonViewScale

### 作者：闰月飞鸟； 2023 年 08 月 17 日 09:00:43

### 开发目的

- 确保依据设计图尺寸生成的视图，在不同尺寸的显示器下不变形。

### Props

| 参数          | 说明                             | 类型          | 可选值       | 默认值 |
| ------------- | -------------------------------- | ------------- | ------------ | ------ |
| designWidth   | 设计图宽度                       | String Number | -            | 835    |
| designHeight  | 设计图高度                       | String Number | -            | 367    |
| fit           | 见下方说明                       | String        | fill,contain | fill   |
| containCenter | contain模式下 缩放后是否保持居中 | boolean       | -            | false  |

# fit

| 参数     | 说明                                                                                          |
| -------- | --------------------------------------------------------------------------------------------- |
| fill：   | 纵横各自缩放，填满整个容器                                                                    |
| contain  | 保持纵横比，尽量填满整个容器                                                                  |
| containX | 保持纵横比，取 x 轴的缩放比例，进行 X 轴 Y 轴的缩放，同时修改缩放后外部容器的高度，以避免留白 |
| containY | 保持纵横比，取 y 轴的缩放比例，进行 X 轴 Y 轴的缩放，同时修改缩放后外部容器的宽度，以避免留白 |

### Slots

| 名称    | 说明 | 参数 |
| ------- | ---- | ---- |
| defautl | -    | -    |

# 注意事项与说明

- 若定义 padding 如下例子 key-card 定义了 padding：20.则 designWidth 需要在原来的设计图上减去 40
- 即 designWidth 是可绘画区域的宽度，不包括 padding。
- slot div 默认为当前绘画区域的宽高。即 <div class="key-card-body">元素的宽高为 designWidth 和 designHeight

```javascript
<MoonViewScale class="key-card" designHeight="120" designWidth="1648">
    <div class="key-card-body">...</div>
</MoonViewScale>
```

```css
.key-card {
    padding: 20px;
    .key-card-body {
        display: flex;
        gap: 16px;
        justify-content: space-between;
    }
}
```
