# mergeObject

智能对象深度合并，特别处理函数合并和异步函数。

## 类型签名

```typescript
(to: object, from: object) => object
```

## 参数

- `to` (object): 原对象
- `from` (object): 待合并的来源对象

## 返回值

- (object): 返回一个合并后的新对象

## 描述

`mergeObject` 函数执行两个对象的智能深度合并，具有以下特殊处理机制：

- **函数合并**：当两个对象具有相同名称的函数属性时，不会覆盖，而是创建一个新函数，该函数会依次执行原函数和来源函数
- **返回值处理**：
  - 如果两个函数的返回值都是对象，则将这些对象合并
  - 如果两个函数的返回值都是数组，则将数组连接起来
  - 其他情况下，以来源函数的返回值为准
- **异步函数支持**：自动检测并处理异步函数（Promise），保持异步特性
- **数组处理**：数组不会被覆盖，而是连接（concat）原数组和来源数组
- **递归合并**：递归处理嵌套对象

这个函数在需要智能合并配置、选项、方法或任何复杂对象结构时非常有用，尤其适合Vue组件选项合并、插件配置合并等场景。

## 示例

### 基本对象合并

```js
import { mergeObject } from 'mynx-utils';

const original = {
  name: '张三',
  age: 30,
  address: {
    city: '北京',
    district: '海淀'
  }
};

const source = {
  age: 31,
  address: {
    district: '朝阳',
    zipCode: '100001'
  },
  isActive: true
};

const result = mergeObject(original, source);
console.log(result);
/*
输出:
{
  name: '张三',
  age: 31,
  address: {
    city: '北京',
    district: '朝阳',
    zipCode: '100001'
  },
  isActive: true
}
*/
```

### 函数合并

```js
import { mergeObject } from 'mynx-utils';

const originalObj = {
  calculate: function(x, y) {
    console.log('原始计算');
    return { sum: x + y };
  }
};

const newObj = {
  calculate: function(x, y) {
    console.log('新的计算');
    return { product: x * y };
  }
};

const merged = mergeObject(originalObj, newObj);

// 调用合并后的函数会执行两个原始函数，并合并它们的返回值
const result = merged.calculate(5, 3);
/*
输出:
原始计算
新的计算
{ sum: 8, product: 15 }
*/
```

### 处理数组

```js
import { mergeObject } from 'mynx-utils';

const obj1 = {
  tags: ['javascript', 'vue'],
  process: function() {
    return ['step1', 'step2'];
  }
};

const obj2 = {
  tags: ['react', 'angular'],
  process: function() {
    return ['step3', 'step4'];
  }
};

const merged = mergeObject(obj1, obj2);

console.log(merged.tags);
// 输出: ['javascript', 'vue', 'react', 'angular']

const processSteps = merged.process();
console.log(processSteps);
// 输出: ['step1', 'step2', 'step3', 'step4']
```

### 异步函数处理

```js
import { mergeObject } from 'mynx-utils';

const api1 = {
  fetchUser: async function(id) {
    console.log('获取用户基本信息');
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 100));
    return { id, name: '张三' };
  }
};

const api2 = {
  fetchUser: async function(id) {
    console.log('获取用户附加信息');
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 50));
    return { role: 'admin', department: '技术部' };
  }
};

const mergedApi = mergeObject(api1, api2);

// 异步函数合并后仍是异步的
async function getUser() {
  const user = await mergedApi.fetchUser(123);
  console.log(user);
}

getUser();
/*
输出:
获取用户基本信息
获取用户附加信息
{
  id: 123,
  name: '张三',
  role: 'admin',
  department: '技术部'
}
*/
```

### 在Vue组件中使用

```js
import { mergeObject } from 'mynx-utils';

// 插件默认选项
const defaultOptions = {
  pagination: {
    pageSize: 10,
    showTotal: true
  },
  hooks: {
    beforeSubmit: function(form) {
      console.log('默认提交前检查');
      return { valid: true };
    }
  }
};

// 用户配置
const userOptions = {
  pagination: {
    pageSize: 20,
    showSizeChanger: true
  },
  hooks: {
    beforeSubmit: function(form) {
      console.log('用户自定义验证');
      return { customValidated: true, message: '通过检查' };
    }
  }
};

// 合并配置
const finalOptions = mergeObject(defaultOptions, userOptions);

// 在组件中使用
export default {
  data() {
    return {
      options: finalOptions
    };
  },
  methods: {
    async submitForm(form) {
      // 调用合并后的钩子函数
      const validationResult = await this.options.hooks.beforeSubmit(form);
      console.log('验证结果:', validationResult);
      
      // 合并后的验证结果包含两个函数的返回值
      // { valid: true, customValidated: true, message: '通过检查' }
      
      if (validationResult.valid && validationResult.customValidated) {
        // 提交表单...
      }
    }
  }
}; 