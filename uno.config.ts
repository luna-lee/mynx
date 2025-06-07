import { defineConfig } from "unocss";
import {
  presetWind3,
  presetAttributify,
  presetIcons,
  presetTypography,
} from "unocss";

export default defineConfig({
  presets: [
    presetWind3(), // 🔥 重要：添加基础预设，包含所有基础工具类
    presetAttributify(), // 属性化模式
    presetTypography(), // 排版预设
  ],
  // 配置内容扫描路径
  content: {
    filesystem: [
      "docs/**/*.md",
      "docs/.vitepress/**/*.{js,ts,vue}",
      "**/*.{vue,ts,js}",
    ],
  },
});
