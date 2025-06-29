# asyncLoadElement

异步添加DOM元素，支持检查是否已存在相同ID元素。

## 类型签名

```typescript
(elementName: string, attrs: Recordable, appendToElement = document.head) => Promise<boolean>
```

## 参数

- `elementName` (string): 要创建的DOM元素名称（例如，'script'、'link'、'style'）
- `attrs` (Recordable): 要设置在元素上的属性对象，若设置了id，则只会添加一次
- `appendToElement` (HTMLElement, 可选): 要将创建的元素附加到的目标元素，默认为document.head

## 返回值

- (Promise\<boolean\>): 一个Promise，解析为：
  - `true`: 元素成功加载或已经存在（具有相同ID）
  - `false`: 元素加载失败

## 描述

`asyncLoadElement`函数提供了一种便捷的方式来动态添加DOM元素，特别适合加载外部资源，如脚本、样式表等。该函数具有以下特点：

- 如果提供了ID属性，并且具有相同ID的元素已存在，则不会重复添加元素
- 自动设置所有提供的属性到新创建的元素上
- 返回Promise，允许异步等待元素加载完成
- 处理加载成功和失败的情况，简化错误处理
- 支持指定添加元素的父容器（默认为document.head）

此函数非常适合实现按需加载资源、延迟加载非关键资源或动态添加样式和脚本。

## 示例

### 加载外部JavaScript文件

```js
import { asyncLoadElement } from 'mynx-utils';

// 加载JavaScript库
async function loadLibrary() {
  const success = await asyncLoadElement('script', {
    src: 'https://cdn.example.com/library.js',
    id: 'library-script', // 设置ID以避免重复加载
    async: true
  });
  
  if (success) {
    console.log('库加载成功！');
    // 此时可以使用加载的库
  } else {
    console.error('库加载失败');
  }
}

loadLibrary();
```

### 加载CSS样式表

```js
import { asyncLoadElement } from 'mynx-utils';

// 加载CSS文件
async function loadStyles() {
  const success = await asyncLoadElement('link', {
    rel: 'stylesheet',
    href: 'https://cdn.example.com/styles.css',
    id: 'main-stylesheet'
  });
  
  if (success) {
    console.log('样式表加载成功！');
  } else {
    console.warn('样式表加载失败，应用可能样式不完整');
  }
}

loadStyles();
```

### 检查重复加载

```js
import { asyncLoadElement } from 'mynx-utils';

async function ensureLibraryLoaded() {
  // 第一次调用 - 元素将被添加
  await asyncLoadElement('script', {
    src: 'https://cdn.example.com/chart-library.js',
    id: 'chart-library'
  });
  
  // 第二次调用 - 由于ID相同，不会重复添加元素
  // 函数将立即返回true
  const result = await asyncLoadElement('script', {
    src: 'https://cdn.example.com/chart-library.js',
    id: 'chart-library'
  });
  
  console.log('第二次调用结果:', result); // true，表示元素已存在或加载成功
}

ensureLibraryLoaded();
```

### 添加到自定义元素

```js
import { asyncLoadElement } from 'mynx-utils';

function addCustomScript() {
  // 获取要添加到的自定义容器
  const container = document.getElementById('scripts-container');
  
  if (container) {
    asyncLoadElement('script', {
      type: 'text/javascript',
      src: 'https://cdn.example.com/plugin.js',
      defer: 'true'
    }, container);
  }
}

// 在DOM准备好后执行
document.addEventListener('DOMContentLoaded', addCustomScript);
``` 