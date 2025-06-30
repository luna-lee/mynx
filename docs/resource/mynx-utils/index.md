# mynx-utils

[![npm version](https://img.shields.io/npm/v/mynx-utils.svg)](https://www.npmjs.com/package/mynx-utils)
[![npm downloads](https://img.shields.io/npm/dm/mynx-utils.svg)](https://www.npmjs.com/package/mynx-utils)
[![license](https://img.shields.io/npm/l/mynx-utils.svg)](https://github.com/yourusername/mynx-utils/blob/main/LICENSE)

### 一个 JavaScript 实用工具库，提供了一系列用于 Web 开发中常见任务的辅助函数。该库包括用于类型检查、UUID 生成、树形数据操作、验证、数组操作、URL 处理等功能。

## 功能特点

- **类型工具**：用于检查变量类型的函数
- **树形工具**：用于处理树形结构数据的工具
- **URL 工具**：用于操作 URL 及其参数的函数
- **验证工具**：用于根据模式规则验证对象的工具
- **数组工具**：用于数组操作的函数
- **Vue 集成**：专为 Vue.js 应用程序设计的工具

## 快速示例

```js
import { isType, getUUID } from 'mynx-utils';

// 检查变量是否为数组
const arr = [1, 2, 3];
console.log(isType(arr, 'Array')); // true

// 生成带有自定义前缀的 UUID
const id = getUUID('user-');
console.log(id); // 输出: "user-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

## 安装

您可以使用npm、yarn或pnpm安装mynx-utils：

```bash
# 使用npm
npm install mynx-utils

# 使用yarn
yarn add mynx-utils

# 使用pnpm
pnpm add mynx-utils
```

详细的安装和使用说明请查看[安装指南](./guide/installation)。

## API 文档

mynx-utils提供了多种实用工具函数，详细API说明如下：

### 类型工具

- [isType](./api/isType) - 检查变量的类型

### 通用工具

- [getUUID](./api/getUUID) - 生成UUID
- [setEventListenerVue2](./api/setEventListenerVue2) - 为Vue2组件设置事件监听器
- [mergeObject](./api/mergeObject) - 合并两个对象，对函数进行特殊处理
- [asyncLoadElement](./api/asyncLoadElement) - 异步加载DOM元素

### 验证工具

- [InstanceValidate](./api/InstanceValidate) - 根据模式规则验证对象

### 树形结构工具

- [treeToFlat](./api/treeToFlat) - 将树结构转换为扁平数组
- [treeDataFactory](./api/treeDataFactory) - 格式化和转换树形数据

### 数组工具

- [arrayRemoveItem](./api/arrayRemoveItem) - 根据条件从数组中移除项目

### URL工具

- [addUrlParams](./api/addUrlParams) - 向URL添加参数
- [getUrlParams](./api/getUrlParams) - 解析URL参数
