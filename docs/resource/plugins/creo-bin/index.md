# creo-bin

creo-bin 是一个命令行工具，用于创建一个名为 creo 的 bin 指令，专门用于前端项目构建脚本执行。该工具支持 webpack 和 vite 两种构建工具，通过自定义配置文件可以灵活控制构建过程。

## 安装

```bash
npm install creo-bin --save-dev
```

## 功能特点

- 创建一个名为 creo 的命令行工具
- 脚本执行取根目录中的 creo-bin.runtime.js 文件中的导出函数
- 支持 webpack 和 vite 两种主流构建工具
- 可自由扩展支持其他构建工具或自定义命令
- 提供统一的命令行接口

## 使用方法

### 基本步骤

1. 在项目根目录创建 `creo-bin.runtime.js` 文件
2. 在该文件中导出一个函数，用于处理命令行参数并执行相应的构建工具
3. 在 package.json 中添加相应的脚本命令

### 示例 package.json

```javascript
// package.json
{
  "scripts": {
    "dev:webpack": "creo webpack serve --mode development",
    "build:webpack": "creo webpack --mode production",
    "dev:vite": "creo vite",
    "build:vite": "creo vite build"
  }
}
```

### 命令格式

```
creo <构建工具> [选项]
```

#### 支持的构建工具

- `webpack`: 使用 webpack 构建项目
- `vite`: 使用 vite 构建项目
- 其他自定义工具（根据您的 creo-bin.runtime.js 实现）

#### 常用命令示例

```bash
# webpack 开发模式
creo webpack serve --mode development

# webpack 生产构建
creo webpack --mode production

# vite 开发模式
creo vite

# vite 生产构建
creo vite build
```

## 配置文件示例

下面是一个 `creo-bin.runtime.js` 的示例，展示如何同时支持 webpack 和 vite：

```javascript
// creo-bin.runtime.js
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

/**
 * 运行时函数 - 处理命令行参数并执行相应的构建工具
 * @param {Array} args - 命令行参数
 */
module.exports = function(args) {
    // 如果没有参数，显示帮助信息
    if (!args || args.length === 0) {
        showHelp();
        return;
    }

    const buildTool = args[0]; // 获取构建工具类型 (webpack 或 vite)
    const restArgs = args.slice(1); // 获取剩余参数
    const restArgsStr = restArgs.join(' ');

    // 根据构建工具类型执行相应的命令
    switch (buildTool) {
        case 'webpack':
            runWebpack(restArgs, restArgsStr);
            break;
        case 'vite':
            runVite(restArgs, restArgsStr);
            break;
        default:
            console.error(`错误: 不支持的构建工具 "${buildTool}"`);
            showHelp();
            process.exit(1);
    }
};

/**
 * 显示帮助信息
 */
function showHelp() {
    console.log(`
creo - 前端项目构建工具

用法:
  creo <构建工具> [选项]

支持的构建工具:
  webpack   - 使用 webpack 构建项目
  vite      - 使用 vite 构建项目

示例:
  creo webpack serve --mode development
  creo vite --force
`);
}

/**
 * 运行 webpack 命令
 */
function runWebpack(args, argsStr) {
    console.log('🚀 以 webpack 模式启动...');
    
    // 检查依赖并执行命令
    // ...具体实现...
}

/**
 * 运行 vite 命令
 */
function runVite(args, argsStr) {
    console.log('🚀 以 vite 模式启动...');
    
    // 检查依赖并执行命令
    // ...具体实现...
}
```

## 功能扩展

您可以根据项目需求自由扩展 creo-bin.runtime.js 文件中的功能：

- 添加自定义构建工具支持
- 集成测试、部署等其他脚本
- 添加项目特定的构建前/后处理逻辑
- 自动检测和使用项目中的配置文件

### 扩展示例

下面是一个扩展示例，添加了对 docsify 文档工具的支持：

```javascript
// 在 switch 语句中添加 docsify 支持
switch (buildTool) {
    case 'webpack':
        // ...
        break;
    case 'vite':
        // ...
        break;
    case 'docsify':
        runDocsify(restArgsStr);
        break;
    default:
        // ...
}

/**
 * 运行 docsify 命令
 */
function runDocsify(argsStr) {
    console.log('📚 以 docsify 模式启动...');
    
    // 使用 concurrently 同时运行多个命令
    const { result } = concurrently([
        { command: 'gulp docs', name: 'gulp docs' },
        { command: argsStr, name: argsStr }
    ]);

    // 处理执行结果
    // ...
}
```

## 最佳实践

- 为不同的构建工具创建单独的 npm 脚本
- 在 creo-bin.runtime.js 中添加依赖检查，确保需要的工具已安装
- 利用配置文件自动检测功能，减少手动配置
- 添加清晰的错误处理和帮助信息

## 实际应用场景

- 统一管理使用不同构建工具的前端项目
- 简化团队成员的开发体验，提供一致的命令接口
- 为复杂的构建流程提供自定义逻辑
- 在构建过程中添加额外的处理步骤

## 相关资源

完整的示例文件可以在安装后的 node_modules/creo-bin 目录中找到，或者参考项目仓库中的 creo-bin.runtime.js.example 文件。 