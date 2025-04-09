# vue-cli-version-static-plugin

vue-cli-version-static-plugin 是一个 Vue CLI 插件，它解决了两个主要问题：

1. 实现 Vue CLI 脚手架打包后，项目可以通过手动切换版本号来控制客户端具体展示页面，这在前端页面出错时，可以通过直接修改静态资源版本号来还原/回滚到之前代码，而不需要重新编译！
2. 解决 Vue CLI 项目中直接引用 public 中的 static 资源打包后无法正确展示的问题。

## 安装

```bash
npm install --save-dev vue-cli-version-static-plugin
```

## 配置选项

| 名称 | 类型 | 说明 | 默认值 |
|------|------|------|-------|
| `publicStaticFolderName` | string | public 文件夹下静态资源目录文件夹名。若有嵌套则需要将父文件夹名也带上，如：'project/static' | static |
| `loadMethod` | string | 脚本加载方式，async/defer | '' |
| `merge` | boolean | public 文件夹下静态资源是否与 assets 打包后的文件合并。不合并则单独存放一个文件夹，文件夹结构和名称与 public 中一致 | true |
| `versionControl` | boolean | 开启版本控制开启，开启后会自动复制指定路径上的 config 文件到 public 中，同时生成 sourcemap 文件，关闭 htmlplugin 的 inject 功能 | true |
| `to` | string | config 配置文件将要拷贝的路径。在 versionControl 为 true 时起作用 | public/config/index.js |
| `from` | string/Array | config 配置文件的来源路径。在 versionControl 为 true 时起作用。可以配置多个来源文件路径 | config/${args.config \|\| process.env.NODE_ENV}.js **args 为脚本命令中的参数对象** |
| `dynamicPublicPath` | boolean | 通过配置，动态设置 publicPath。<br/> 开启后 vue.config 文件中不要设置 publicPath。<br/> 在 main.js 中添加 `if (window.SITE_CONFIG["publicPath"]) __webpack_public_path__ = window.SITE_CONFIG["publicPath"]`<br/> config 文件中添加 `window.SITE_CONFIG["publicPath"]配置`<br/> **注意：当设置了 dynamicPublicPath 为 true 时，不要在 CSS 文件中应用 public 中的静态资源。<br/>JS，Vue 文件中使用必须手动加上 window.SITE_CONFIG["publicPath"]** | false |

## 使用方式

1. 在 vue.config.js 中引入 VersionPlugin

2. 获取变量 VersionPlugin, VersionCode

3. VersionPlugin 直接在 configureWebpack 中添加到插件中：
   ```js
   config.plugins.push(new VersionPlugin());
   ```

4. VersionCode 赋值给 assetsDir，也可以在前面拼接自定义名称或文件夹名：
   ```js
   assetsDir: VersionCode
   // 或
   assetsDir: 'static/' + VersionCode
   ```

5. 最后在 public 中的 index.html 模板文件中引入 config 文件

6. 若 htmlplugin 中的 option 设置了 cdn，则会对 cdn 中的所有绝对引用路径与 js，css 做相同处理。同时对绝对引用路径支持动态指定 publicPath

## 不同环境配置

### 默认取当前 NODE_ENV 值

```json
"scripts": {
  "serve": "vue-cli-service serve", 
  "build": "vue-cli-service build --report"
}
```

### 指定配置文件名称

根目录下的 config 文件夹中需要存在 local.js 和 test.js 文件，若没有会自动建立

```json
"scripts": {
  "local": "vue-cli-service serve --config local",  
  "test": "vue-cli-service serve --config test"
}
```

## 注意事项

- terser-webpack-plugin 版本需要 4.x 以上
- vuecli 4.x 对应的 htmlWebpackPlugin 也必须是 4.x

## 示例配置

### 目录结构

```
config
|- index-development.js
|- index-production.js
|- index-qa.js
```

### vue.config.js

```javascript
const { VersionPlugin, VersionCode } = require("./vue-cli-version-static-plugin/index");

const cdn = {
  css: ["/static/plugins/pageoffice-5.2.0.6/pageoffice.css"],
  js: [
    "/static/plugins/pageoffice-5.2.0.6/pageoffice.js",
    "/static/plugins/echarts-4.9.0/echarts.common.min.js",
    "https://gw.alipayobjects.com/os/antv/pkg/_antv.hierarchy-0.4.0/build/hierarchy.js",
    "https://api.map.baidu.com/api?v=2.0&ak=28209425e505ba8c3c4ade607ca46fd7&__ec_v__=20190126"
  ]
};

module.exports = {
  publicPath: '/', // dynamicPublicPath 为 true 时不设置任何值
  assetsDir: VersionCode,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].minify = false;
      args[0].cdn = cdn;
      return args;
    });
  },
  configureWebpack: (config) => {
    config.plugins.push(new VersionPlugin());
  }
};
```

### package.json

```json
// 通过 config 适配不同配置，默认为当前 process.env.NODE_ENV 值，对应 config 文件夹下的 index-{name} 文件
"scripts": {
  "serve": "vue-cli-service serve --open",
  "build": "vue-cli-service build --no-clean --report",
  "qa": "vue-cli-service build --no-clean --report --config qa"
}
```

### main.js (dynamicPublicPath 设置 true 时)

```javascript
if (window.SITE_CONFIG["publicPath"])
  __webpack_public_path__ = window.SITE_CONFIG["publicPath"]
```

## 实际应用场景

### 版本回滚

当前端页面出现问题时，可以通过修改服务器上的版本号文件，快速回滚到之前的稳定版本，而无需重新部署应用。

### 静态资源管理

当项目中存在大量静态资源（如 PDF、图片、视频等）时，插件可以确保这些资源在打包后正确引用和加载。

### CDN 资源处理

对于需要从 CDN 加载的资源，插件可以根据不同环境自动切换 CDN 路径，简化开发和部署流程。

## 最佳实践

- 在开发环境中使用本地路径，在生产环境中使用 CDN 路径
- 为每个构建版本保留历史记录，以便在需要时轻松回滚
- 使用配置文件管理不同环境的变量，保持代码的一致性
- 在 CI/CD 流程中自动增加版本号并记录到配置系统中 