# treeDataFactory

树形数据格式化工具，提供多种树形数据的表示形式和操作方法。

## 类型签名

```typescript
<T extends Recordable>({ 
    source, 
    id = "id", 
    pId = "pId" 
  }: {
    source: T[];
    id?: string;
    pId?: string;
  }, 
  customizer?: (item: TreeFactoryItemType<T>) => void
) => {
    treeData: TreeFactoryItemType<T>[];
    leaves: TreeFactoryItemType<T>[];
    objById: {
        [key: string]: TreeFactoryItemType<T>;
    };
    flatData: TreeFactoryItemType<T>[]
}

interface TreeFactoryItemType<T> {
  id: string;
  pId: string;
  children?: TreeFactoryItemType<T>[];
  data: T;
  track?: string[];
  trigger?: string[];
  level?: number;
  [k: string]: any;
}
```

## 参数

- `source` (T[]): 必选，源树形数据数组
- `id` (string, 可选): 节点ID的字段名，默认为 'id'
- `pId` (string, 可选): 父节点ID的字段名，默认为 'pId'
- `customizer` ((item: TreeFactoryItemType\<T\>) => void, 可选): 自定义节点处理函数，可以对节点添加额外属性或进行其他操作

## 返回值

返回一个对象，包含以下属性：

- `treeData` (TreeFactoryItemType\<T>[]): 格式化后的树形结构数据
- `leaves` (TreeFactoryItemType\<T>[]): 所有叶子节点（没有子节点的节点）
- `objById` (Object): 以ID为键的所有节点映射对象
- `flatData` (TreeFactoryItemType\<T>[]): 扁平化的节点数组

## 描述

`treeDataFactory` 函数提供了全面的树形数据处理工具。它不会修改源数据，而是创建新的数据结构，并为每个节点增加以下有用的元数据：

- `track`: 从根到当前节点的所有ID路径（包括当前节点ID），按层级从顶到底排列
- `trigger`: 当前节点的所有后代节点ID（不包括自身ID）
- `level`: 节点在树中的深度级别
- `data`: 原始源数据对象
- `children`: 子节点数组

此函数对于需要深度操作树形数据的场景特别有用，例如构建具有高级功能的树形UI组件、查找节点的祖先或后代关系、同时使用树形与扁平两种表现形式等。

## 示例

### 基本用法

```js
import { treeDataFactory } from 'moon-utils';

const data = [
  { id: '1', pId: '0', name: '父节点 1' },
  { id: '1-1', pId: '1', name: '子节点 1-1' },
  { id: '1-1-1', pId: '1-1', name: '孙节点 1-1-1' },
  { id: '1-2', pId: '1', name: '子节点 1-2' },
  { id: '2', pId: '0', name: '父节点 2' },
  { id: '2-1', pId: '2', name: '子节点 2-1' }
];

const { treeData, leaves, objById, flatData } = treeDataFactory({ 
  source: data, 
  id: 'id', 
  pId: 'pId' 
});

console.log('树结构:', treeData);
/*
[
  {
    id: '1',
    pId: '0',
    data: { id: '1', pId: '0', name: '父节点 1' },
    children: [ ... ],
    track: ['1'],
    trigger: ['1-1', '1-2', '1-1-1'],
    level: 1
  },
  {
    id: '2',
    pId: '0',
    data: { id: '2', pId: '0', name: '父节点 2' },
    children: [ ... ],
    track: ['2'],
    trigger: ['2-1'],
    level: 1
  }
]
*/

console.log('叶子节点:', leaves);
/*
[
  { id: '1-1-1', pId: '1-1', data: {...}, track: ['1-1-1', '1-1', '1'], trigger: [], level: 3 },
  { id: '1-2', pId: '1', data: {...}, track: ['1-2', '1'], trigger: [], level: 2 },
  { id: '2-1', pId: '2', data: {...}, track: ['2-1', '2'], trigger: [], level: 2 }
]
*/

console.log('ID为"1-1"的节点:', objById['1-1']);
/*
{
  id: '1-1',
  pId: '1',
  data: { id: '1-1', pId: '1', name: '子节点 1-1' },
  children: [ ... ],
  track: ['1-1', '1'],
  trigger: ['1-1-1'],
  level: 2
}
*/

console.log('扁平数据数量:', flatData.length); // 6
```

### 使用自定义函数增强节点

```js
import { treeDataFactory } from 'moon-utils';

const menuItems = [
  { id: 'home', pId: '0', title: '首页', url: '/home' },
  { id: 'products', pId: '0', title: '产品', url: '/products' },
  { id: 'electronics', pId: 'products', title: '电子产品', url: '/products/electronics' },
  { id: 'phones', pId: 'electronics', title: '手机', url: '/products/electronics/phones' },
  { id: 'laptops', pId: 'electronics', title: '笔记本电脑', url: '/products/electronics/laptops' },
  { id: 'clothing', pId: 'products', title: '服装', url: '/products/clothing' },
  { id: 'about', pId: '0', title: '关于我们', url: '/about' }
];

// 使用自定义函数增强节点
const { treeData, objById } = treeDataFactory(
  { source: menuItems, id: 'id', pId: 'pId' },
  (item) => {
    // 为每个节点添加自定义属性
    item.fullPath = item.data.url;
    item.breadcrumb = item.track.map(id => objById[id]?.data.title).filter(Boolean);
    item.isActive = false;
    
    // 根据节点类型添加图标
    if (item.data.id === 'home') {
      item.icon = 'home-icon';
    } else if (item.data.id === 'about') {
      item.icon = 'info-icon';
    } else {
      item.icon = 'default-icon';
    }
  }
);

console.log(treeData);
```

### 查找父子关系

```js
import { treeDataFactory } from 'moon-utils';

const employees = [
  { id: 'e1', pId: '0', name: 'CEO', department: '执行部门' },
  { id: 'e2', pId: 'e1', name: 'CTO', department: '技术部门' },
  { id: 'e3', pId: 'e1', name: 'CFO', department: '财务部门' },
  { id: 'e4', pId: 'e2', name: '工程经理', department: '技术部门' },
  { id: 'e5', pId: 'e4', name: '高级开发者', department: '技术部门' },
  { id: 'e6', pId: 'e4', name: '初级开发者', department: '技术部门' },
  { id: 'e7', pId: 'e3', name: '会计', department: '财务部门' }
];

const { objById, flatData } = treeDataFactory({ source: employees });

// 查找初级开发者的所有上级
const juniorDev = objById['e6'];
const managerChain = juniorDev.track
  .filter(id => id !== 'e6') // 排除自己
  .map(id => objById[id].data.name);

console.log('初级开发者汇报给:', managerChain);
// 输出: ['工程经理', 'CTO', 'CEO']

// 查找CTO的所有下属
const cto = objById['e2'];
const ctoSubordinates = cto.trigger
  .map(id => objById[id].data.name);

console.log('CTO管理:', ctoSubordinates);
// 输出: ['工程经理', '高级开发者', '初级开发者']

// 查找深度级别为2的员工
const level2Employees = flatData
  .filter(item => item.level === 2)
  .map(item => item.data.name);

console.log('2级员工:', level2Employees);
// 输出: ['工程经理', '会计']
```

### 在Vue组件中使用

```js
import { treeDataFactory } from 'moon-utils';

export default {
  data() {
    return {
      menuData: [],
      activeId: null
    }
  },
  computed: {
    treeInfo() {
      return treeDataFactory({ source: this.menuData });
    },
    menuTree() {
      return this.treeInfo.treeData;
    },
    currentNode() {
      return this.activeId ? this.treeInfo.objById[this.activeId] : null;
    },
    breadcrumbs() {
      if (!this.currentNode) return [];
      return this.currentNode.track.map(id => this.treeInfo.objById[id].data);
    }
  },
  methods: {
    selectMenuItem(id) {
      this.activeId = id;
      // 可以直接访问选中节点的所有父节点
      console.log('父节点路径:', this.currentNode.track);
      // 可以直接访问选中节点的所有子节点
      console.log('子节点IDs:', this.currentNode.trigger);
    },
    isParentOf(nodeId, possibleChildId) {
      const node = this.treeInfo.objById[nodeId];
      return node && node.trigger.includes(possibleChildId);
    },
    isChildOf(nodeId, possibleParentId) {
      const node = this.treeInfo.objById[nodeId];
      return node && node.track.includes(possibleParentId);
    }
  }
}
``` 