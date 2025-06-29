import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import UnoCSS from 'unocss/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
  plugins: [vue(), vueJsx(), UnoCSS()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MynxUI',
      fileName: (format) => `mynx-ui.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理不打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
        // 明确指定只使用命名导出，解决警告
        exports: 'named',
        // 添加到生成文件的顶部
        banner: '/*!\n * Mynx UI v0.1.0\n * (c) ' + new Date().getFullYear() + '\n * Released under the MIT License.\n */',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    // 确保CSS提取
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
