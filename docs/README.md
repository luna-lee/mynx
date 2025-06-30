# Mynx 

### 基于vue3的前端工具库

## 包含Mynx UI  Mynx Utils

# Mynx UI

<div class="header-tip">

[![npm version](https://img.shields.io/npm/v/mynx-ui.svg)](https://www.npmjs.com/package/mynx-ui)
[![npm downloads](https://img.shields.io/npm/dm/mynx-ui.svg)](https://www.npmjs.com/package/mynx-ui)
[![license](https://img.shields.io/npm/l/mynx-ui.svg)](https://github.com/yourusername/mynx-ui/blob/main/LICENSE)

</div>

### 一个基于 Vue 3 + TypeScript 的现代化 UI 组件库，轻量、优雅且易于使用。

## 特性

- 🚀 **基于 Vue 3**：充分利用 Vue 3 的 Composition API 和性能提升
- 🔨 **TypeScript 支持**：完整的类型定义，提供极佳的开发体验
- 📦 **按需引入**：支持组件按需引入，减小应用体积
- 🎨 **可定制主题**：灵活的样式系统，易于定制
- 📃 **详细文档**：每个组件都有详细的使用说明和示例
- 🔍 **全局类型**：TypeScript 开发时提供完整的组件类型提示

## 安装

```bash
# 使用 npm
npm install mynx-ui

# 使用 yarn
yarn add mynx-ui

# 使用 pnpm
pnpm add mynx-ui
```

## 快速开始

### 完整引入

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import MynxUI from "mynx-ui";
import "mynx-ui/style.css";

// 全局类型（TypeScript项目）
import "mynx-ui/client";

const app = createApp(App);
app.use(MynxUI);
app.mount("#app");
```

### 按需引入

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import { MButton } from "mynx-ui";
import "mynx-ui/style.css";

// 全局类型（TypeScript项目）
import "mynx-ui/client";

const app = createApp(App);
app.component("MButton", MButton);
app.mount("#app");
```

### 样式引入

Mynx UI 提供了单独的样式文件：

```typescript
// 引入全部样式
import "mynx-ui/style.css";
```

## TypeScript 类型支持 ：

<div style="background:var(--vp-code-block-bg);margin-bottom:-15px;border-bottom:1px solid #ccc; padding:5px 10px"> tsconfig.json</div>

```ts
{
    "compilerOptions": {
        "types": [
            //...,
            "mynx-ui/client"
        ],
    }
}
```

<style>
    .header-tip{
        a{
            display:inline-block;
        }
    }
</style>



### isType

##### 类型：

```
(obj: any, type: string | string[]) => boolean
```



- 类型判断
- @param obj 校验对象
- @param type 校验类型，可以是字符串或数组，数组为或结果。值为所有类型的实例化名。如 Object，Number...
- @return Boolean

```javascript
isType(obj, "Array");
isType(obj, ["Array", "String"]);
```

### getUUID

##### 类型：

```
(prefix?: string) => string
```



- 得到一个 uuid
- @param prefix 前缀
- @return String

```javascript
getUUID("mynx-validate-");
```

### setEventListenerVue2

##### 类型：

```
(binder: any, vm: any, evtName: string, listener: (...arg: any[]) => void, options: any) => (() => void) | undefined
```



- @description 设置 window 或 document 事件监听,同时当所在的 vue 实例销毁时自动移除监听
- @author 闰月飞鸟
- @param binder 指定 window 或 document 必传
- @param vm vue 实例 必传
- @param evtName 事件名 必传
- @param listener 监听函数 必传
- @param options 监听本身参数
- @return 返回一个移除监听函数

```javascript
setEventListenerVue2(window, this, "mousemove", () => {});
```

### mergeObject

##### 类型：

```
(to: object, from: object)=> object
```



- @description 对象合并，相同函数合并成一个，原函数先执行,若函数有返回值:若为对象则合并，非对象的以来源函数结果为主
- @author 闰月飞鸟
- @param to 原对象
- @param from 待合并的来源对象
- @return 返回一个新的对象

```javascript
mergeObject({}, {});
```

### asyncLoadElement

##### 类型：

```
(elementName: string, attrs: Recordable, appendToElement?: HTMLHeadElement) => Promise<unknown>
```



- @description 异步添加 dom 元素
- @author 闰月飞鸟
- @param {\*} el 元素名
- @param {\*} attrs 元素属性
- @param {\*} appendToElement 添加到的目标元素,默认 document.head
- @return Boolean

```javascript
await asyncLoadElement('script',{src;'',id:'xx'});
```

### InstanceValidate

##### 类型： 

```
(target: Recordable, rules: Schema["rules"], validateCallback: ValidateCallback) => boolean
```



- @description 校验目标对象是否符合输入的校验规则
- @return function 返回回调函数
- @param targetObject 必选，目标对象 object
- target @param rules 必选，校验规则 object
- target @param validateCallback 可选，校验回调返回函数,errors,fields，两个参数， （errors, fields）=>{}
- target @return 校验结果

```javascript
const form = {
  catalogId: "",
};
const rules = {
  catalogId: [
    {
      required: true,
      message: "请选择资源目录",
    },
  ],
};
const validate=InstanceValidate()
validate({}, rules, (e) => {
  console.log(e);
});
```

### treeToFlat

##### 类型： 

```
 <T = any>({ source, id, pId, children, }: {
    source: T[];
    id?: string | undefined;
    pId?: string | undefined;
    children?: string | undefined;
}) => T[]
```



- @description 将普通的树形数据，转成扁平化的数据，
- @description 若无指定层级元素如 id，pId，则自动添加， 
- @description  不改变源数据
- @author 闰月飞鸟
- @param {\*} source
- @param {\*} id
- @param {\*} pId
- @param {\*} children
- @return Array

```javascript
treeToFlat({ source: data, id: "id", pId: "pId", children: "children" });
```

### treeDataFactory

##### 类型

```
 type TreeFactoryItemType<T> = {
  id: string;
  pId: string;
  children?: TreeFactoryItemType<T>[];
  data: T;
  track?: string[];
  trigger?: string[];
  level?: number;
  [k: string]: any;
};

 
<T extends Recordable<any>>({ source, id, pId, }: {
    source: T[];
    id?: string | undefined;
    pId?: string | undefined;
}, customizer?: ((item: TreeFactoryItemType<T>) => void) | undefined) => {
    treeData: TreeFactoryItemType<T>[];
    leaves: TreeFactoryItemType<T>[];
    objById :{
    		[key: string]: TreeFactoryItemType<T>;
			};
    flatData: TreeFactoryItemType<T>[]
}
```

- @description 树形数据格式化
- @param {\*} source
- @param {\*} id
- @param {\*} pId
- @param customizer 自定义节点信息，可以直接对节点对象添加自定义属性。
- @return {treeData,leaves,objById,flatData}
- @description treeData 格式化后的树数据
- @description leaves 所有叶子节点
- @description objById 以 id 为 key 的对象
- @description flatData 扁平数组，
- @return TreeFactoryItemType 类型
- @param {\*} id
- @param {\*} pId
- @param {\*} children 子项
- @param {\*} data 源数据
- @param {\*} track 所有当前节点的父节点 id，包括自身 ID
- @param {\*} trigger 所有当前节点的子节点 id，不包含自身 ID

```javascript
let { treeData } = treeDataFactory({ source: data, id: "id", pId: "pId" });
```



### arrayRemoveItem

##### 类型

```
<T = any>(arr: T[], remove: (item: T, index: number) => boolean) => void
```



- *@description* — 在不修改当前引用的基础上 ，批量移除元素。数组依据条件函数，
- @author — 闰月飞鸟
- *@param* `arr` — 目标数组
- *@param* `remove` — 移除函数，接受两个参数，当前项item，以及下标index。
- *@return* — Boolean,返回true时，代表要移除该项 

```javascript
 arrayRemoveItem([],(item,index)=>{
  ...
  return true
});
```





### addUrlParams

类型

```
(url: string, params?: Recordable, merge?: boolean) => string
```

- @description 在 url 后面追加指定对象作为新的参数。
- @author 闰月飞鸟
- @param {url} 需要追加参数的 url
- @param {params} 具体的参数对象
- @param {merge} 对原有的 url 参数进行覆盖合并，还是保留合并，true 时为覆盖合并，以当前参数为主，false 则为保留合并，以原来的 url 参数为主 。默认为覆盖合并。即有相同参数的以后传的参数值为准

```javascript
addUrlParams("http:", { a: "b" }); ==> "http:?a=b"
```



### getUrlParams

```
(url: string, opt?: (qs.IParseOptions<qs.BooleanOptional> & {
    decoder?: undefined;
}) | undefined) => {
    rootUrl: string;
    urlParams: {};
}
```



- @description 获取 url 中的参数 。
- @author 闰月飞鸟
- @param {url} url
- @param {opt} qs.parse 第二个参数
- @return {rootUrl,urlParams} 返回 rootUrl 以及 urlParams 对象

```javascript
getUrlParams("http:?a=b");  ==>{rootUrl:"http:",urlParams:{a:"b"}}
```
