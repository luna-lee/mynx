# addUrlParams

向 URL 添加查询参数，支持合并或覆盖现有参数的选项。

## 类型签名

```typescript
(url: string, params?: Recordable, merge?: boolean) => string
```

## 参数

- `url` (string): 要添加参数的基础 URL
- `params` (Recordable, 可选): 要添加到 URL 的参数对象
- `merge` (boolean, 可选): 是否覆盖现有参数(true, 默认)或保留它们(false)

## 返回值

- (string): 添加了参数的 URL

## 描述

`addUrlParams` 函数将查询参数附加到 URL。它可以处理已有参数的 URL，并提供两种合并策略：

1. **覆盖合并** (默认, `merge=true`): 如果 URL 中已存在某个参数，其值将被新值替换
2. **保留合并** (`merge=false`): 如果 URL 中已存在某个参数，原始值将被保留

此工具特别适用于构建 API 请求、导航链接或任何需要构造带有动态参数的 URL 的场景。

## 示例

### 向基本 URL 添加参数

```js
import { addUrlParams } from 'mynx-utils';

const baseUrl = 'https://api.example.com/users';
const params = {
  limit: 10,
  offset: 20,
  sort: 'name'
};

const url = addUrlParams(baseUrl, params);
console.log(url);
// 输出: 'https://api.example.com/users?limit=10&offset=20&sort=name'
```

### 覆盖现有参数（默认行为）

```js
import { addUrlParams } from 'mynx-utils';

const url = 'https://api.example.com/products?category=electronics&limit=5';
const newParams = {
  limit: 10,
  sort: 'price'
};

// 默认情况下，现有参数会被覆盖
const newUrl = addUrlParams(url, newParams);
console.log(newUrl);
// 输出: 'https://api.example.com/products?category=electronics&limit=10&sort=price'
```

### 保留现有参数

```js
import { addUrlParams } from 'mynx-utils';

const url = 'https://api.example.com/products?category=electronics&limit=5';
const newParams = {
  limit: 10,
  sort: 'price'
};

// 设置 merge=false 以保留现有参数
const newUrl = addUrlParams(url, newParams, false);
console.log(newUrl);
// 输出: 'https://api.example.com/products?category=electronics&limit=5&sort=price'
```

### 构建带有特殊字符的 URL

```js
import { addUrlParams } from 'mynx-utils';

const url = 'https://example.com/search';
const params = {
  query: 'Mynx Utils javascript',
  tags: 'javascript,utility,array,tree',
  include_deprecated: true
};

const searchUrl = addUrlParams(url, params);
console.log(searchUrl);
// 输出: 'https://example.com/search?query=moon%20utils%20javascript&tags=javascript%2Cutility%2Carray%2Ctree&include_deprecated=true'
```

### 向带有哈希片段的 URL 添加参数

```js
import { addUrlParams } from 'mynx-utils';

const url = 'https://example.com/docs#installation';
const params = {
  version: '1.2.3',
  theme: 'dark'
};

const docsUrl = addUrlParams(url, params);
console.log(docsUrl);
// 输出: 'https://example.com/docs?version=1.2.3&theme=dark#installation'
```

### 在 Vue Router 中的实际应用

```js
import { addUrlParams } from 'mynx-utils';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    
    function navigateToProducts(filters) {
      // 从基本产品 URL 开始
      let url = '/products';
      
      // 添加任何当前的过滤参数
      if (filters) {
        url = addUrlParams(url, {
          category: filters.category,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          inStock: filters.inStock
        });
      }
      
      // 使用路由器导航到 URL
      router.push(url);
    }
    
    return {
      navigateToProducts
    };
  }
}; 