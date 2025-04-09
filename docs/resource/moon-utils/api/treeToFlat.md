# treeToFlat

将普通的树形数据转换为扁平化的数据，保留父子关系信息。

## 类型签名

```typescript
<T = any>({
  source,
  id = "id",
  pId = "pId",
  children = "children",
}: {
  source: T[];
  id?: string;
  pId?: string;
  children?: string;
}): { id: string; data: T; pId: string }[]
```

## 参数

- `source` (T[]): 必选，源树形数据数组
- `id` (string, 可选): 节点ID的字段名，默认为 'id'
- `pId` (string, 可选): 父节点ID的字段名，默认为 'pId'
- `children` (string, 可选): 子节点数组的字段名，默认为 'children'

## 返回值

- ({ id: string; data: T; pId: string }[]): 扁平化后的数据数组，每个元素包含：
  - `id`: 节点ID
  - `data`: 原始节点数据
  - `pId`: 父节点ID

## 描述

`treeToFlat` 函数将嵌套的树形结构数据转换为一维扁平数组，并保留节点之间的父子关系信息。该函数不会修改源数据，而是返回一个新的数组。在转换过程中，每个节点的原始数据将作为 `data` 属性保存，同时添加 `id` 和 `pId` 属性来表示节点ID和父节点ID。如果源数据中缺少ID，将自动生成UUID作为节点ID。

此函数适用于需要将层次结构数据转换为扁平结构以便于存储或处理的场景，例如将树形结构的数据提交到后端或在表格中显示。

## 示例

### 基本用法

```js
import { treeToFlat } from 'moon-utils';

const treeData = [
  {
    id: '1',
    name: '父节点1',
    children: [
      {
        id: '1-1',
        name: '子节点1-1',
        children: [
          { id: '1-1-1', name: '子节点1-1-1' }
        ]
      },
      { id: '1-2', name: '子节点1-2' }
    ]
  },
  {
    id: '2',
    name: '父节点2',
    children: [
      { id: '2-1', name: '子节点2-1' }
    ]
  }
];

const flatData = treeToFlat({ source: treeData });
console.log(flatData);
/*
输出:
[
  { id: '1', data: { id: '1', name: '父节点1', children: [...] }, pId: '' },
  { id: '1-1', data: { id: '1-1', name: '子节点1-1', children: [...] }, pId: '1' },
  { id: '1-1-1', data: { id: '1-1-1', name: '子节点1-1-1' }, pId: '1-1' },
  { id: '1-2', data: { id: '1-2', name: '子节点1-2' }, pId: '1' },
  { id: '2', data: { id: '2', name: '父节点2', children: [...] }, pId: '' },
  { id: '2-1', data: { id: '2-1', name: '子节点2-1' }, pId: '2' }
]
*/
```

### 自定义字段名

```js
import { treeToFlat } from 'moon-utils';

const menuTree = [
  {
    menuId: 'dashboard',
    title: '仪表盘',
    subItems: []
  },
  {
    menuId: 'users',
    title: '用户管理',
    subItems: [
      { menuId: 'user-list', title: '用户列表', subItems: [] },
      { menuId: 'user-roles', title: '角色管理', subItems: [] }
    ]
  }
];

// 使用自定义的字段名
const flatMenus = treeToFlat({
  source: menuTree,
  id: 'menuId',
  children: 'subItems'
});

console.log(flatMenus);
/*
输出:
[
  { id: 'dashboard', data: { menuId: 'dashboard', title: '仪表盘', subItems: [] }, pId: '' },
  { id: 'users', data: { menuId: 'users', title: '用户管理', subItems: [...] }, pId: '' },
  { id: 'user-list', data: { menuId: 'user-list', title: '用户列表', subItems: [] }, pId: 'users' },
  { id: 'user-roles', data: { menuId: 'user-roles', title: '角色管理', subItems: [] }, pId: 'users' }
]
*/
```

### 处理缺少ID的数据

```js
import { treeToFlat } from 'moon-utils';

const treeWithoutIds = [
  {
    name: '类别A',
    items: [
      { name: '产品A-1' },
      { name: '产品A-2' }
    ]
  },
  {
    name: '类别B',
    items: [
      { name: '产品B-1' }
    ]
  }
];

// 为缺少ID的数据指定子节点字段
const flatItems = treeToFlat({
  source: treeWithoutIds,
  children: 'items'
});

console.log(flatItems);
/*
输出: (注意自动生成的UUID形式的ID)
[
  { id: 'tree-xxxx', data: { name: '类别A', items: [...] }, pId: '' },
  { id: 'tree-xxxx', data: { name: '产品A-1' }, pId: 'tree-xxxx' },
  { id: 'tree-xxxx', data: { name: '产品A-2' }, pId: 'tree-xxxx' },
  { id: 'tree-xxxx', data: { name: '类别B', items: [...] }, pId: '' },
  { id: 'tree-xxxx', data: { name: '产品B-1' }, pId: 'tree-xxxx' }
]
*/
```

### 在Vue组件中使用

```js
import { treeToFlat } from 'moon-utils';

export default {
  data() {
    return {
      departmentTree: [
        {
          id: 'dept1',
          name: '技术部',
          children: [
            { id: 'dept1-1', name: '前端组' },
            { id: 'dept1-2', name: '后端组' }
          ]
        },
        {
          id: 'dept2',
          name: '市场部',
          children: [
            { id: 'dept2-1', name: '销售组' }
          ]
        }
      ],
      flatDepartments: []
    };
  },
  computed: {
    // 转换为表格可用的数据格式
    tableData() {
      return this.flatDepartments.map(item => {
        // 从data属性中提取需要的字段
        const { id, name } = item.data;
        return {
          id,
          name,
          parentId: item.pId,
          // 添加其他需要的数据处理...
          isLeaf: !item.data.children || item.data.children.length === 0
        };
      });
    }
  },
  created() {
    // 将树形部门结构扁平化
    this.flatDepartments = treeToFlat({
      source: this.departmentTree
    });
  },
  methods: {
    // 根据父ID过滤子部门
    getChildDepartments(parentId) {
      return this.tableData.filter(dept => dept.parentId === parentId);
    }
  }
};
``` 