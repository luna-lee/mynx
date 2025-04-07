# 安装

您可以使用 npm、yarn 或 pnpm 安装 moon-utils：

## 使用 npm

```bash
npm install moon-utils
```

## 使用 yarn

```bash
yarn add moon-utils
```

## 使用 pnpm

```bash
pnpm add moon-utils
```

## 直接导入

您也可以直接从包中导入特定的工具函数：

```js
// 导入特定函数
import { isType, getUUID } from 'moon-utils';

// 使用这些函数
const isArray = isType([], 'Array');
const uuid = getUUID();
```

## CDN 使用

您可以直接从 CDN 使用 moon-utils：

```html
<script src="https://unpkg.com/moon-utils/dist/moon-utils.min.js"></script>
<script>
  // 使用全局 MoonUtils 对象
  const isArray = MoonUtils.isType([], 'Array');
  const uuid = MoonUtils.getUUID();
</script>
```

## 后续步骤

安装 moon-utils 后，您可以查看各个工具函数的详细文档：

- [类型工具 - isType](../api/isType)
- [通用工具 - getUUID](../api/getUUID)
- 以及更多... 