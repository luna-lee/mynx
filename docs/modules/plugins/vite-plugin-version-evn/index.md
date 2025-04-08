# vite-plugin-version-evn

vite-plugin-version-evn 是一个专为 Vite 构建工具设计的插件，提供版本控制和全局环境参数配置功能。

## 功能特点

1. **构建版本控制** - 构建后所有的静态资源会被打包到以当前时间为名称的文件夹内，作为打包后的版本标记
2. **环境配置** - 构建时，获取当前环境的配置项，并将之设置为全局参数
3. **增强代理配置** - 开发环境下，增强代理配置功能，可实现不同接口走不同的代理，也可过滤指定接口

## 安装

```bash
npm i vite-plugin-version-env -S
```

## 配置

### TS 类型配置

#### 在 tsconfig.ts 文件中配置

```typescript
"types": ["vite-plugin-version-env/client"]
```

#### 类型详情

```typescript
declare namespace VersionEnvSpace {
  interface GlobalConfig {
    DEV?: DevConfig;
    [x: string]: any;
  }
  interface DevConfig {
    port?: number;
    proxy?: boolean;
    proxy_list?: {
      name: string;
      include?: string;
      exclude?: string;
      target: string;
    }[];
    [x: string]: any;
  }
  interface EnvConfig {
    GLOBAL_CONFIG: GlobalConfig;
    DEV?: DevConfig;
  }
}
declare const GLOBAL_CONFIG: VersionEnvSpace.GlobalConfig;
```

#### 扩展配置项类型

在 d.ts 文件中可扩展 GlobalConfig 类型：

```typescript
namespace VersionEnvSpace {
  interface GlobalConfig {
    cache_store: string[];
    api_base: string;
    api_idaas: string;
    api_file: string;
    api_security: string;
    api_gis: string;
  }
}
```

## 环境配置

创建一个文件夹，在文件夹内建立以环境名命名的 js/ts 文件：

```
build/config
|- development.ts
|- production.ts
|- test.ts
```

配置信息示例（development.ts）：

```typescript
export default {
  // 全局配置项，打包后会存入 app.config.js 文件中
  GLOBAL_CONFIG: {
    cache_store: ['oauth', 'global'],
    api_base: 'http://fyeb.cnsaas.com/support-gateway/',
    api_idaas: '/idaas/',
    api_file: '/file-service/',
    api_security: '/fy-security/',
    api_gis: '/',
  },
  DEV: {
    port: 8080,
    proxy: true,
    proxy_list: [
      {
        name: '/_api/',
        include: '^/gisLayerGroup',
        target: 'http://172.16.105.9:30006',
      },
    ],
  },
} as VersionEnvSpace.EnvConfig;
```

## vite.config.ts 配置

```typescript
import { ServerPlugin, VersionPlugin } from 'vite-plugin-version-env';

export default defineConfig(async ({ mode, command }: ConfigEnv): Promise<UserConfig> => {
  const CustomEnv = (await import(`./build/config/${mode}.ts`)).default as VersionEnvSpace.EnvConfig;
  return {
    plugins: [
      VersionPlugin({ CustomEnv, command, '__GLOBAL_CONFIG__', 'app.config.js' }),
    ],
    server: {  
      cors: true,
      open: true,
      host: '0.0.0.0',
      ...ServerPlugin(CustomEnv)
    }
  }
});
```

### VersionPlugin 参数

```typescript
({
  CustomEnv,
  command,
  cleanDir,
  GLOBAL_CONFIG_FILE_NAME,
  GLOBAL_CONFIG_KEY,
  GLOBAL_CONFIG_NAME,
}: {
  command: 'build' | 'serve';
  webTitle?: string;
  CustomEnv?: VersionEnvSpace.EnvConfig;
  cleanDir?: boolean;
  GLOBAL_CONFIG_FILE_NAME?: string;
  GLOBAL_CONFIG_KEY?: string;
  GLOBAL_CONFIG_NAME?: string;
})
```

| 属性                      | 类型     | 描述                               | 默认值              |
|---------------------------|----------|------------------------------------|--------------------|
| `webTitle`                | String   | 网页标题                            | -                  |
| `CustomEnv`               | Object   | 配置对象                            | -                  |
| `command`                 | 'build' \| 'serve' | 构建命令                  | -                  |
| `cleanDir`                | Boolean  | 是否清空输出目录                    | `true`             |
| `GLOBAL_CONFIG_FILE_NAME` | String   | 存放全局配置的文件名                | `app.config.js`    |
| `GLOBAL_CONFIG_KEY`       | String   | 挂载到 `window` 对象上的属性名      | `__GLOBAL_CONFIG__` |
| `GLOBAL_CONFIG_NAME`      | String   | 代码可用的全局对象名                | `GLOBAL_CONFIG`    |

## 设置 Axios 代理配置

实现在开发环境下，设置了代理模式后，不同的接口走不同的代理：

```typescript
import { SetDevProxy } from 'vite-plugin-version-env/SetDevProxy';

http.interceptors.request.use(async (config) => {
  SetDevProxy(config, GLOBAL_CONFIG.DEV);
  return config;
});
```

### SetDevProxy 函数

- 开发环境下，依据代理配置，设置 axios 的 baseURL
- ProxyConfig 为 undefined 时则不起作用

```typescript
(AxiosConfig: InternalAxiosRequestConfig<any>, ProxyConfig?: VersionEnvSpace.DevConfig) => void
```

## 全局参数

在项目中可以使用的全局参数：

- `GLOBAL_VERSION_CODE` - 版本号
- `GLOBAL_CONFIG` - 全局配置

## 实际应用场景

### 版本回滚

当前端页面出错时，可以在服务器上直接修改静态资源版本号来还原/回滚到之前的代码，而不需要重新编译。

### 环境隔离

不同的环境（开发、测试、生产）可以使用不同的配置文件，保持代码一致性的同时适应不同环境的需求。

### 智能代理

在开发环境中，针对不同的 API 请求自动路由到不同的后端服务，简化开发过程中的接口调试。

## 最佳实践

- 在环境配置文件中集中管理所有环境相关变量
- 使用类型定义确保配置的类型安全
- 在代码中使用全局配置而不是硬编码变量
- 在持续集成流程中，可以自动更新版本号并保存历史版本 