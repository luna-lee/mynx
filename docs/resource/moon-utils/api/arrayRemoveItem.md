# arrayRemoveItem

根据条件函数从数组中移除项目，而不修改原始数组引用。

## 类型签名

```typescript
<T = any>(arr: T[], remove: (item: T, index: number) => boolean) => void
```

## 参数

- `arr` (T[]): 要移除项目的目标数组
- `remove` (function): 确定要移除哪些项目的函数。它接收当前项和其索引，并应该对要移除的项返回`true`。

## 返回值

- `void`: 该函数在原地修改数组

## 描述

`arrayRemoveItem`函数允许您根据条件函数从数组中移除多个项目。与`filter()`等创建新数组的方法不同，此函数在原地修改原始数组但保留原始数组引用。当数组绑定到Vue或React等框架中的响应式属性时，这特别有用，因为它不会破坏响应性。

## 示例

### 基本用法

```js
import { arrayRemoveItem } from 'moon-utils';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 移除所有偶数
arrayRemoveItem(numbers, (num) => num % 2 === 0);

console.log(numbers); // [1, 3, 5, 7, 9]
```

### 使用索引

```js
import { arrayRemoveItem } from 'moon-utils';

const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

// 移除偶数索引位置的项目(0, 2, 4)
arrayRemoveItem(fruits, (_, index) => index % 2 === 0);

console.log(fruits); // ['banana', 'date']
```

### 复杂条件

```js
import { arrayRemoveItem } from 'moon-utils';

const users = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 30, active: false },
  { id: 3, name: 'Charlie', age: 35, active: true },
  { id: 4, name: 'David', age: 40, active: false },
  { id: 5, name: 'Eve', age: 45, active: true }
];

// 移除30岁以上的非活跃用户
arrayRemoveItem(users, (user) => !user.active && user.age > 30);

console.log(users);
/* 输出:
[
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 30, active: false },
  { id: 3, name: 'Charlie', age: 35, active: true },
  { id: 5, name: 'Eve', age: 45, active: true }
]
*/
```

### 与Vue响应式数组一起使用

```js
import { arrayRemoveItem } from 'moon-utils';
import { ref } from 'vue';

export default {
  setup() {
    const tasks = ref([
      { id: 1, text: '任务1', completed: false },
      { id: 2, text: '任务2', completed: true },
      { id: 3, text: '任务3', completed: false },
      { id: 4, text: '任务4', completed: true },
      { id: 5, text: '任务5', completed: false }
    ]);
    
    function removeCompletedTasks() {
      // 这样可以保留数组的响应性
      arrayRemoveItem(tasks.value, (task) => task.completed);
    }
    
    function removeTask(taskId) {
      arrayRemoveItem(tasks.value, (task) => task.id === taskId);
    }
    
    return {
      tasks,
      removeCompletedTasks,
      removeTask
    };
  }
};
```

### 批量操作

```js
import { arrayRemoveItem } from 'moon-utils';

const items = [
  { id: 'a1', category: 'A', value: 10 },
  { id: 'a2', category: 'A', value: 20 },
  { id: 'b1', category: 'B', value: 30 },
  { id: 'c1', category: 'C', value: 40 },
  { id: 'b2', category: 'B', value: 50 },
  { id: 'a3', category: 'A', value: 60 }
];

// 首先移除低价值项目
arrayRemoveItem(items, (item) => item.value < 30);

console.log(items);
/* 输出:
[
  { id: 'b1', category: 'B', value: 30 },
  { id: 'c1', category: 'C', value: 40 },
  { id: 'b2', category: 'B', value: 50 },
  { id: 'a3', category: 'A', value: 60 }
]
*/

// 然后移除B类别的项目
arrayRemoveItem(items, (item) => item.category === 'B');

console.log(items);
/* 输出:
[
  { id: 'c1', category: 'C', value: 40 },
  { id: 'a3', category: 'A', value: 60 }
]
*/
``` 