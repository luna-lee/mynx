# MValidator 组件

### 开发目的

- 提供一个强大的表单验证组件，基于 async-validator 库实现
- 支持对象模式和数组模式的数据验证
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

#### 错误提示控制
```demo
MValidator/showErrorMsgTip
```

### Props

| 参数            | 说明                     | 类型                    | 可选值      | 默认值 |
| --------------- | ------------------------ | ----------------------- | ----------- | ------ |
| mode            | 要验证的数据对象或数组   | Object \| Array         | -           | \{\}     |
| rules           | 验证规则配置             | Object                  | -           | \{\}     |
| showErrorMsgTip | 是否显示错误提示信息     | Boolean                 | true/false  | true   |

### Slots

- 默认插槽：放置需要验证的表单元素，需要在元素上添加 `validate-prop` 属性指定验证字段

### Methods

| 方法名        | 说明                     | 参数                    | 返回值                                    |
| ------------- | ------------------------ | ----------------------- | ----------------------------------------- |
| validate      | 手动触发验证             | showMessage(Boolean)    | \{ flag, errors, fields, fieldKeys \}      |
| clearValidate | 清除所有验证状态         | -                       | -                                         |
| reload        | 重新加载验证器DOM引用    | -                       | -                                         |

### 验证规则配置

#### 对象模式
```javascript
const rules = {
  username: {
    required: true,
    min: 3,
    message: '用户名至少3个字符'
  },
  email: {
    required: true,
    type: 'email',
    message: '请输入有效邮箱'
  },
  'address.city': {  // 支持嵌套对象
    required: true,
    message: '请选择城市'
  }
}
```

#### 数组模式
```javascript
const rules = {
  type: 'array',
  defaultField: {
    type: 'object',
    fields: {
      name: {
        required: true,
        message: '姓名不能为空'
      },
      age: {
        required: true,
        type: 'number',
        min: 18,
        message: '年龄必须大于18'
      }
    }
  }
}
```

### 使用说明

#### 1. 基础用法
```vue
<template>
  <MValidator :mode="formData" :rules="rules" ref="validator">
    <input v-model="formData.username" validate-prop="username" />
    <input v-model="formData.email" validate-prop="email" />
  </MValidator>
</template>

<script setup>
import { ref, reactive } from 'vue'

const validator = ref()
const formData = reactive({
  username: '',
  email: ''
})

const rules = {
  username: { required: true, message: '用户名必填' },
  email: { required: true, type: 'email', message: '邮箱格式错误' }
}

// 手动验证
const handleSubmit = () => {
  const result = validator.value.validate(true)
  if (result.flag) {
    console.log('验证通过')
  }
}
</script>
```

#### 2. 动态数组验证
```vue
<template>
  <MValidator :mode="userList" :rules="arrayRules" ref="validator">
    <div v-for="(user, index) in userList" :key="index">
      <input v-model="user.name" :validate-prop="`${index}.name`" />
      <input v-model="user.age" :validate-prop="`${index}.age`" />
    </div>
  </MValidator>
</template>
```

#### 3. 验证属性说明
- `validate-prop`: 必须属性，指定验证字段路径
- 对象模式：直接使用字段名，如 `"username"` 或嵌套路径 `"address.city"`
- 数组模式：使用索引路径，如 `"0.name"` 表示第一个元素的name字段

### 样式定制

组件提供了以下CSS类名用于样式定制：

- `.m-validator-error-element`: 验证失败的元素样式（红色边框）
- `.m-validator-error-container`: 错误提示容器
- `.m-validator-error-tip`: 错误提示文本样式

### 注意事项

1. 确保在需要验证的元素上添加 `validate-prop` 属性
2. 数组模式下，删除元素后需要调用 `reload()` 方法更新DOM引用
3. 验证规则基于 async-validator 库，支持所有其规则配置
4. 组件会自动处理失焦验证和实时数据变化验证 