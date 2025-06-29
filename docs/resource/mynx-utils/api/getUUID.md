# getUUID

生成一个UUID（通用唯一标识符），可选带有前缀。

## 类型签名

```typescript
(prefix?: string) => string
```

## 参数

- `prefix` (string, 可选): 要添加到生成的UUID前面的字符串

## 返回值

- (string): 一个UUID字符串，可选带有提供的前缀

## 描述

`getUUID`函数使用标准格式生成一个随机UUID。您可以选择提供一个前缀，它将被添加到结果前面。这对于为DOM元素、数据库记录或任何其他需要唯一性的上下文创建唯一标识符非常有用。

## 示例

### 生成基本UUID

```js
import { getUUID } from 'mynx-utils';

const uuid = getUUID();
console.log(uuid); // 示例输出: "550e8400-e29b-41d4-a716-446655440000"
```

### 生成带前缀的UUID

```js
import { getUUID } from 'mynx-utils';

const userUuid = getUUID('user-');
console.log(userUuid); // 示例输出: "user-550e8400-e29b-41d4-a716-446655440000"
```

### 为DOM元素创建唯一ID

```js
import { getUUID } from 'mynx-utils';

function createUniqueElement(tagName) {
  const element = document.createElement(tagName);
  element.id = getUUID('element-');
  return element;
}

const div1 = createUniqueElement('div');
const div2 = createUniqueElement('div');

console.log(div1.id); // 示例: "element-550e8400-e29b-41d4-a716-446655440000"
console.log(div2.id); // 示例: "element-7c53ed30-94b1-42bc-9a3c-7e0881899999"
``` 