# InstanceValidate

校验目标对象是否符合输入的校验规则。

## 类型签名

```typescript
(targetObject: object, rules: object, validateCallback?: (errors: any[], fields: object) => void) => boolean
```

## 参数

- `targetObject` (object): 必选，要校验的目标对象
- `rules` (object): 必选，校验规则对象，每个字段包含一个或多个验证规则。使用async-validator的规则格式，支持以下规则类型：
  - `required`: 是否必填
  - `type`: 类型验证，支持'string', 'number', 'boolean', 'method', 'regexp', 'integer', 'float', 'array', 'object', 'enum', 'date', 'url', 'hex', 'email'等
  - `min`/`max`: 字符串长度或数值范围限制
  - `len`: 精确长度
  - `enum`: 枚举值
  - `pattern`: 正则表达式
  - `validator`: 自定义验证函数
  - `transform`: 在验证前转换字段值
  - `message`: 自定义错误信息
- `validateCallback` ((errors: any[], fields: object) => void, 可选): 校验回调函数，接收两个参数：
  - `errors`: 错误信息数组
  - `fields`: 存在错误的字段对象

## 返回值

- (boolean): 校验结果，如果验证通过则为true，否则为false

## 描述

`InstanceValidate` 函数用于验证目标对象是否符合指定的校验规则。它基于async-validator库的规则系统，可以验证对象的必填字段、字段类型、字段值范围等。当验证失败时，会提供详细的错误信息，包括哪些字段验证失败以及失败原因。

## 示例

### 基本用法

```js
import { InstanceValidate } from 'mynx-utils';

// 要验证的表单对象
const form = {
  catalogId: "",
};

// 验证规则
const rules = {
  catalogId: [
    {
      required: true,
      message: "请选择资源目录",
    },
  ],
};

// 进行验证
const validate = InstanceValidate();
validate(form, rules, (errors, fields) => {
  if (errors) {
    console.log('验证失败:', errors);
    console.log('错误字段:', fields);
  } else {
    console.log('验证通过');
  }
});
```

### 使用多种验证规则

```js
import { InstanceValidate } from 'mynx-utils';

const userForm = {
  username: 'john_doe',
  email: 'invalid-email',
  age: 17
};

const validationRules = {
  username: [
    { required: true, message: '用户名不能为空' },
    { min: 3, max: 20, message: '用户名长度必须在3-20个字符之间' }
  ],
  email: [
    { required: true, message: '邮箱不能为空' },
    { type: 'email', message: '请输入有效的邮箱地址' }
  ],
  age: [
    { required: true, message: '年龄不能为空' },
    { type: 'number', message: '年龄必须是数字' },
    { min: 18, message: '年龄必须大于或等于18岁' }
  ]
};

const validate = InstanceValidate();
validate(userForm, validationRules, (errors, fields) => {
  if (errors) {
    console.log('表单验证失败:');
    errors.forEach(err => {
      console.log(`- ${err.field}: ${err.message}`);
    });
  } else {
    console.log('表单验证通过');
  }
});
```

### 在Vue组件中使用

```js
import { InstanceValidate } from 'mynx-utils';

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        age: '',
        interests: []
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名' }
        ],
        email: [
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' }
        ],
        age: [
          { required: true, message: '请输入年龄' },
          { type: 'number', message: '年龄必须是数字' }
        ],
        interests: [
          { type: 'array', message: '兴趣必须是数组' },
          { required: true, message: '请至少选择一项兴趣', validator: (rule, value) => value.length > 0 }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      const validate = InstanceValidate();
      validate(this.form, this.rules, (errors, fields) => {
        if (errors) {
          this.$message.error('表单验证失败');
          console.log(errors);
        } else {
          this.$message.success('表单验证通过');
          this.submitToServer();
        }
      });
    },
    submitToServer() {
      // 提交表单到服务器
    }
  }
};
```

### 自定义验证器

```js
import { InstanceValidate } from 'mynx-utils';

const passwordForm = {
  password: 'password123',
  confirmPassword: 'password456'
};

const passwordRules = {
  password: [
    { required: true, message: '密码不能为空' },
    { min: 8, message: '密码长度不能少于8个字符' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码' },
    { 
      validator: (rule, value, callback, source) => {
        // 自定义验证器检查两次密码是否一致
        if (value !== source.password) {
          callback('两次输入的密码不一致');
        } else {
          callback(); // 验证通过
        }
      },
      message: '两次输入的密码必须一致'
    }
  ]
};

const validate = InstanceValidate();
validate(passwordForm, passwordRules, (errors, fields) => {
  if (errors) {
    console.log('密码验证失败:', errors);
  } else {
    console.log('密码验证通过');
  }
});
``` 