# MValidator 组件

### 开发目的

- 提供一个强大的表单验证组件，基于 async-validator 库实现
- 支持对象模式和数组模式的数据验证,尤其是对数组的空值验证
- 支持实时验证、失焦验证和手动验证
- 提供可视化的错误提示和样式反馈

### 用法示例

#### 默认插槽基础用法

```demo
MValidator/default-slot
```

#### 对象模式验证

```demo
MValidator/mode-object
```

#### 数组模式验证

```demo
MValidator/mode-array
```

#### 对象+数组组合验证

```demo
MValidator/mode-object-array
```

#### 错误提示控制

```demo
MValidator/showErrorMsgTip
```

### Props

| 参数            | 说明                                                                                      | 类型            | 可选值     | 默认值 |
| --------------- | ----------------------------------------------------------------------------------------- | --------------- | ---------- | ------ |
| mode            | 要验证的数据对象或数组                                                                    | Object \| Array | -          | \{\}   |
| rules           | 验证规则配置 校验规则，参考[async-validator](https://github.com/yiminghe/async-validator) | Object          | -          | \{\}   |
| showErrorMsgTip | 是否显示错误提示信息                                                                      | Boolean         | true/false | true   |

### Slots

- 默认插槽：放置需要验证的表单元素，需要在元素上添加 `validate-prop` 属性指定验证字段

### Methods

| 方法名        | 说明             | 参数 | 返回值                                |
| ------------- | ---------------- | ---- | ------------------------------------- |
| validate      | 手动触发验证     | -    | \{ flag, errors, fields, fieldKeys \} |
| clearValidate | 清除所有验证状态 | -    | -                                     |
| reload        | 重新加载验证器;  | -    | -                                     |

### 样式定制

组件提供了以下CSS类名用于样式定制：

- `.m-validator-error-element`: 验证失败的元素样式（红色边框）
- `.m-validator-error-container`: 错误提示容器
- `.m-validator-error-tip`: 错误提示文本样式
