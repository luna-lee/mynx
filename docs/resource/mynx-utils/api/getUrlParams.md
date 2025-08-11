# getUrlParams

从URL中提取查询参数并转换为对象。

## 类型签名

```typescript
(url?: string) => Record<string, string>
```

## 参数

- `url` (string, 可选): 要解析的URL字符串。如果未提供，将使用当前浏览器URL。

## 返回值

- (Record<string, string>): 一个包含URL查询参数的对象，其中键是参数名，值是参数值。

## 描述

`getUrlParams`函数解析URL中的查询字符串部分，并将其转换为键值对对象。如果未提供URL，则使用当前窗口的URL。这在需要访问URL参数进行路由、分析或其他操作时非常有用。

## 示例

### 解析当前页面URL

```js
import { getUrlParams } from 'mynx-utils';

// 假设当前URL是: https://example.com/?name=John&age=30&verified=true

const {rootUrl,urlParams} = getUrlParams();
console.log(urlParams);
// 输出: { name: "John", age: "30", verified: "true" }

console.log(urlParams.name); // 输出: "John"
console.log(urlParams.age);  // 输出: "30"
```

### 解析指定URL

```js
import { getUrlParams } from 'mynx-utils';

const url = 'https://api.example.com/data?category=books&sort=newest&page=2';
const {rootUrl,urlParams} = getUrlParams(url);

console.log(urlParams);
// 输出: { category: "books", sort: "newest", page: "2" }
```

### 处理特殊字符

```js
import { getUrlParams } from 'mynx-utils';

const url = 'https://example.com/search?query=javascript+framework&tags=vue,react&filter=new';
const {rootUrl,urlParams:params} = getUrlParams(url);

console.log(params.query); // 输出: "javascript framework"（注意+被解码为空格）
console.log(params.tags);  // 输出: "vue,react"
```

### 与其他功能结合使用

```js
import { getUrlParams, addUrlParams } from 'mynx-utils';

// 获取当前参数
const {rootUrl,urlParams:currentParams} = getUrlParams();

// 添加或修改一些参数
const newUrl = addUrlParams(window.location.href, {
  page: Number(currentParams.page || 1) + 1,
  view: 'detailed'
});

console.log(newUrl); // 包含更新后参数的新URL
``` 