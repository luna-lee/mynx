# isType

检查值是否为指定类型。

## 类型签名

```typescript
(target: any, type: string | string[]) => boolean
```

## 参数

- `target` (any): 要检查的值
- `type` (string | string[]): 单个类型名称或类型名称数组，不区分大小写，可以使用"Array"/"array"、"String"/"string"等形式

## 返回值

- (boolean): 如果值的类型与指定类型匹配则返回`true`，否则返回`false`

## 描述

`isType` 函数用于检查一个值是否为指定的类型。它比 JavaScript 的 `typeof` 运算符提供了更精确的类型检测，可以识别数组、日期、正则表达式等特定对象类型。此函数支持检查单个类型或多个类型（数组形式）。该函数内部使用`Object.prototype.toString.call`方法来准确判断类型，并且类型匹配不区分大小写。

## 示例

### 基本类型检查

```js
import { isType } from 'moon-utils';

// 类型参数大小写均可
console.log(isType(123, 'Number'));         // 输出: true
console.log(isType(123, 'number'));         // 输出: true

console.log(isType('hello', 'String'));     // 输出: true
console.log(isType(true, 'Boolean'));       // 输出: true
console.log(isType(undefined, 'Undefined')); // 输出: true
console.log(isType(null, 'Null'));          // 输出: true
console.log(isType({}, 'Object'));          // 输出: true
console.log(isType(() => {}, 'Function'));  // 输出: true
```

### 数组类型检查

```js
import { isType } from 'moon-utils';

const arr = [1, 2, 3];
// 两种写法等效
console.log(isType(arr, 'Array'));          // 输出: true
console.log(isType(arr, 'array'));          // 输出: true
console.log(isType(arr, 'Object'));         // 输出: false (更精确的检测)
```

### 多类型检查

```js
import { isType } from 'moon-utils';

const value = null;
// 大小写混用也可以
console.log(isType(value, ['string', 'Number', 'null']));  // 输出: true (匹配'null')

const input = '42';
console.log(isType(input, ['String', 'Number']));          // 输出: true (匹配'String')
```

### 特殊对象类型检查

```js
import { isType } from 'moon-utils';

console.log(isType(new Date(), 'date'));                 // 输出: true
console.log(isType(/^abc$/, 'regexp'));                 // 输出: true
console.log(isType(new Map(), 'Map'));                   // 输出: true
console.log(isType(new Set(), 'set'));                   // 输出: true
console.log(isType(new Error(), 'error'));               // 输出: true
console.log(isType(Symbol('symbol'), 'symbol'));         // 输出: true
```

### 在条件判断中使用

```js
import { isType } from 'moon-utils';

function processValue(value) {
  if (isType(value, 'number')) {
    return value * 2;
  } else if (isType(value, 'string')) {
    return value.toUpperCase();
  } else if (isType(value, 'array')) {
    return value.length;
  } else {
    return 'Unsupported type';
  }
}

console.log(processValue(5));          // 输出: 10
console.log(processValue('hello'));    // 输出: "HELLO"
console.log(processValue([1, 2, 3]));  // 输出: 3
console.log(processValue({}));         // 输出: "Unsupported type"
``` 