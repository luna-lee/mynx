// generateTypes.mts
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const indexDtsPath = path.resolve(__dirname, '../types/index.d.ts');
const outputPath = path.resolve(__dirname, '../types/global.d.ts');

function generateGlobalTypes() {
  // 读取 index.d.ts 文件
  const indexContent = fs.readFileSync(indexDtsPath, 'utf-8');
  
  // 解析 TypeScript 文件
  const sourceFile = ts.createSourceFile(
    'index.d.ts',
    indexContent,
    ts.ScriptTarget.Latest,
    true
  );

  // 收集导出的组件
  const exportedComponents: string[] = [];
  
  // 遍历 AST 查找导出声明
  function visit(node: ts.Node) {
    if (ts.isExportDeclaration(node)) {
      const { exportClause } = node;
      if (exportClause && ts.isNamedExports(exportClause)) {
        exportClause.elements.forEach(element => {
          if (element.name.text.startsWith('M')) {
            exportedComponents.push(element.name.text);
          }
        });
      }
    }
    ts.forEachChild(node, visit);
  }
  
  visit(sourceFile);

  // 生成全局类型声明
  const globalContent = `import type { DefineComponent } from 'vue';
import type { ${exportedComponents.join(', ')} } from './index';

// 全局组件类型声明
declare module 'vue' {
  export interface GlobalComponents {
${exportedComponents.map(comp => `    ${comp}: typeof ${comp}`).join('\n')}
  }
}
export {};`;

  // 写入文件
  fs.writeFileSync(outputPath, globalContent);
  console.log('Global types generated successfully!');
}

generateGlobalTypes();