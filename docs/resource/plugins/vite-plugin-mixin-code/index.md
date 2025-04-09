# vite-plugin-mixin-code

vite-plugin-mixin-code 是一个 Vite 插件，可以对 Vue 文件进行代码混入和自动添加组件名，提高开发效率和代码统一性。

## 功能特点

### 自动添加大驼峰 PascalCase 命名方式的组件名
- 工程下的所有 Vue 文件，以当前文件名作为组件名，若文件名为 index，则取上级文件夹名称
- 首字符大写，名称中若有字母数字符号组成，则会剔除左右的符号，只保留中间
- 在所有组合式脚本和选项式脚本中都起作用
- 将字符串中的 `-` 或 `_` 作为 PascalCase 转换点
- 官方的 defineOptions 优先级最高

### 实现对指定目录下的 Vue 文件进行代码合并
- 功能类似全局 mixin，但比 mixin 更强大
- 可以通过指定具体文件/夹和排除指定文件/夹来实现合并
- 合并规则：以现有组件对象为主，并入的对象为辅，相同函数合并成一个，并入的函数先执行。函数有返回值：若为对象则合并，结果都以组件内的函数结果为主
- 同时支持多个不同的匹配规则
- 文件筛选匹配格式参考 [micromatch](https://github.com/micromatch/micromatch)

## 安装

```bash
npm i vite-plugin-mixin-code -S
```

## 应用场景

```javascript
// 小程序开发，当需要将所有第三方组件设置成虚拟节点时
// H5 开发，当需要将某一类文件统一添加属性或方法时
// 项目中统一自动加上组件 name
```

## 配置

### TS 类型

```typescript
export interface MixinOptionsType {
  mixinCode: string; // 插入的代码
  include?: string[]; // 指定文件/夹 默认当前工程下所有 Vue 文件【"**/*"】
  exclude?: string[]; // 排除文件/夹 默认【】
}

export interface ExtendOptionsType {
  method?: "mixin" | "merge"; // mixin 插入方式，通过 mixin 或直接合并。合并规则，对象合并，相同函数合并成一个，原函数先执行，若函数有返回值：merge：若为对象则合并，非对象的以来源函数结果为主
  projectPath?: string; // 手动指定项目根路径，取 process.cwd()
}

// MixinOptionsType 可以是数组或对象，数组时可以适配多个不同匹配规则的插入代码。若有多个插入代码片段，则会合并。合并规则，对象合并，相同函数合并成一个，原函数先执行，若函数有返回值：若为对象则合并，非对象的以来源函数结果为主
```

### vite.config.ts 文件配置

```javascript
// 基本使用
plugins.push(MixinCodePlugin())

// 使用数组配置多个规则
plugins.push(
  MixinCodePlugin(
    [
      {
        mixinCode: `
                    {	
                        options: {
                            virtualHost: true
                        } 
                    }
                 `,
        exclude: ["src/view/component/*.vue"], // 排除所有路由页面文件
      },
      {
        mixinCode: `
                    {	
                        options: {
                            virtualHost22: true
                        } 
                    }
                 `,
        exclude: ["src/view/component/*.vue"], // 排除所有路由页面文件
      },
    ],
    {
      projectPath: __dirname,
      method: "mixin",
    }
  )
);

// 使用对象配置单个规则
plugins.push(
  MixinCodePlugin(
    {
      mixinCode: `
                    {	
                        options: {
                            virtualHost: true
                        } 
                    }
                 `,
      exclude: ["src/view/component/*.vue"], // 排除所有路由页面文件
    },
    {
      projectPath: __dirname,
      // method: 'mixin'
    }
  )
);
```

## 高级用法

### 为指定类型组件添加特定属性

```javascript
// 为所有第三方组件设置虚拟节点属性
MixinCodePlugin({
  mixinCode: `
    {	
      options: {
        virtualHost: true
      } 
    }
  `,
  include: ["src/components/third-party/**/*.vue"],
})
```

### 同时使用多个混入规则

```javascript
// 为不同类型的组件应用不同的混入规则
MixinCodePlugin([
  {
    mixinCode: `
      {
        props: {
          theme: {
            type: String,
            default: 'light'
          }
        }
      }
    `,
    include: ["src/components/ui/**/*.vue"],
  },
  {
    mixinCode: `
      {
        mounted() {
          console.log('页面组件已挂载:', this.$options.name);
        }
      }
    `,
    include: ["src/views/**/*.vue"],
  }
])
```

## 最佳实践

- 谨慎使用，只在必要时添加混入代码
- 为混入代码做好文档说明，避免团队成员困惑
- 优先考虑使用 Vue 的官方特性（如 Composition API、插件系统等）
- 对于关键业务逻辑，避免依赖混入机制
- 定期检查混入代码是否仍然必要 