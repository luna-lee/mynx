<template>
  <div class="demo-block">
    <!-- 组件展示区域 -->
    <div class="source">
      <component v-if="dynamicComponent" :is="dynamicComponent" />
      <div v-else-if="loadError" class="demo-error">
        <p>加载组件失败: {{ loadError }}</p>
      </div>
      <div v-else class="demo-loading">加载组件中...</div>
    </div>

    <!-- 代码控制条 -->
    <div class="demo-block-control">
      <div class="control-buttons">
        <!-- 显示/隐藏代码按钮 -->
        <a
          href="#"
          class="control-button"
          @click.prevent="showCode = !showCode"
          @mouseenter="codeTooltipVisible = true"
          @mouseleave="codeTooltipVisible = false"
        >
          <div class="control-icon" :class="{ 'is-active': showCode }">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path
                v-if="!showCode"
                fill="currentColor"
                d="M1018.645 531.298c8.635-18.61 4.601-41.42-11.442-55.864l-205.108-184.68c-19.7-17.739-50.05-16.148-67.789 3.552-17.738 19.7-16.148 50.051 3.553 67.79l166.28 149.718-167.28 150.62c-19.7 17.738-21.291 48.088-3.553 67.789 17.739 19.7 48.089 21.291 67.79 3.553l205.107-184.68a47.805 47.805 0 0 0 12.442-17.798zM119.947 511.39l166.28-149.719c19.7-17.738 21.29-48.088 3.552-67.789-17.738-19.7-48.088-21.291-67.789-3.553L16.882 475.01C.84 489.456-3.194 512.264 5.44 530.874a47.805 47.805 0 0 0 12.442 17.798l205.108 184.68c19.7 17.739 50.05 16.148 67.79-3.552 17.738-19.7 16.147-50.051-3.553-67.79l-167.28-150.62z"
              />
              <path
                v-else
                fill="currentColor"
                d="M1018.645 531.298c8.635-18.61 4.601-41.42-11.442-55.864l-205.108-184.68c-19.7-17.739-50.05-16.148-67.789 3.552-17.738 19.7-16.148 50.051 3.553 67.79l166.28 149.718-167.28 150.62c-19.7 17.738-21.291 48.088-3.553 67.789 17.739 19.7 48.089 21.291 67.79 3.553l205.107-184.68a47.805 47.805 0 0 0 12.442-17.798zM119.947 511.39l166.28-149.719c19.7-17.738 21.29-48.088 3.552-67.789-17.738-19.7-48.088-21.291-67.789-3.553L16.882 475.01C.84 489.456-3.194 512.264 5.44 530.874a47.805 47.805 0 0 0 12.442 17.798l205.108 184.68c19.7 17.739 50.05 16.148 67.79-3.552 17.738-19.7 16.147-50.051-3.553-67.79l-167.28-150.62zm529.545-377.146c24.911 9.066 37.755 36.61 28.688 61.522L436.03 861.068c-9.067 24.911-36.611 37.755-61.522 28.688-24.911-9.066-37.755-36.61-28.688-61.522l242.15-665.302c9.067-24.911 36.611-37.755 61.522-28.688z"
              />
            </svg>
          </div>
          <div class="tooltip" v-if="codeTooltipVisible">
            {{ showCode ? "隐藏代码" : "显示代码" }}
          </div>
        </a>

        <!-- 复制代码按钮 -->
        <a
          href="#"
          class="control-button"
          @click.prevent="copyCode"
          @mouseenter="
            copyTooltipVisible = true;
            resetCopyIcon = false;
          "
          @mouseleave="
            copyTooltipVisible = false;
            resetCopyIcon = true;
            copySuccess = false;
          "
        >
          <div class="copy-icon-wrapper">
            <svg
              v-if="!copySuccess || resetCopyIcon"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
            >
              <path
                d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32z"
                fill="currentColor"
              ></path>
              <path
                d="M704 192H192c-17.7 0-32 14.3-32 32v676c0 17.7 14.3 32 32 32h512c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32z m-32 640H224V256h448v576z"
                fill="currentColor"
              ></path>
            </svg>
            <svg
              v-if="copySuccess && !resetCopyIcon"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
            >
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
                fill="#67c23a"
              ></path>
            </svg>
            <div class="tooltip" v-if="copyTooltipVisible || copySuccess">
              {{ copySuccess ? "复制成功" : "复制代码" }}
            </div>
          </div>
        </a>
      </div>
    </div>

    <!-- 代码展示区域 -->
    <div class="meta" :style="{ height: showCode ? 'auto' : '0' }">
      <div class="description" v-if="description">
        <p>{{ description }}</p>
      </div>
      <div
        class="highlight"
        v-if="sourceCode && highlightedCode"
        v-html="highlightedCode"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, watch, markRaw } from "vue";
import { createHighlighter } from "shiki";
import githubLightTheme from "shiki/themes/github-light.mjs";
import githubDarkTheme from "shiki/themes/github-dark.mjs";
import { useData } from "vitepress";
const { isDark } = useData();
const files = import.meta.glob("../../../example/**/*.vue");
const filesRaw = import.meta.glob("../../../example/**/*.vue", {
  query: "?raw",
  import: "default",
});
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  showPath: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "",
  },
});

const dynamicComponent = ref(null);
const loadError = ref(null);
const sourceCode = ref(null);
const showCode = ref(false);
const highlighter = ref(null);
const highlightedCode = ref("");
const copySuccess = ref(false);
const resetCopyIcon = ref(false);
const codeTooltipVisible = ref(false);
const copyTooltipVisible = ref(false);

// 缓存高亮器实例
let cachedHighlighter = null;

// 初始化 Shiki 高亮器
const initHighlighter = async () => {
  try {
    // 使用缓存的高亮器实例
    if (cachedHighlighter) {
      highlighter.value = cachedHighlighter;
      return true;
    }

    if (!highlighter.value) {
      highlighter.value = await createHighlighter({
        themes: [githubLightTheme, githubDarkTheme],
        langs: ["vue", "typescript", "scss"],
      });
      // 缓存高亮器实例以供复用
      cachedHighlighter = highlighter.value;
    }
    return true;
  } catch (error) {
    console.error("Failed to initialize highlighter:", error);
    return false;
  }
};

// 处理源代码格式化
const formatSourceCode = (code) => {
  try {
    // 提取 export default 后的内容
    const match = code.match(/export default\s+"(.*)"/);
    if (match && match[1]) {
      // 解码内容中的转义字符
      return match[1]
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, '"')
        .replace(/\\t/g, "  ");
    }
    return code;
  } catch (error) {
    console.warn("Failed to format source code:", error);
    return code;
  }
};

// 更新高亮代码
const updateHighlightedCode = async () => {
  if (!sourceCode.value || !highlighter.value) return;

  try {
    // 尝试格式化代码
    let formattedCode = formatSourceCode(sourceCode.value);

    // 根据当前主题选择合适的代码高亮主题
    const theme = isDark.value ? "github-dark" : "github-light";

    highlightedCode.value = highlighter.value.codeToHtml(formattedCode, {
      lang: "vue",
      theme: theme,
    });
  } catch (error) {
    console.error("高亮代码失败:", error);
    // 降级处理，直接显示未处理的代码
    highlightedCode.value = `<pre><code>${sourceCode.value}</code></pre>`;
  }
};

// 监听源代码变化
watch(sourceCode, async () => {
  if (sourceCode.value) {
    if (!highlighter.value) {
      await initHighlighter();
    }
    await updateHighlightedCode();
  }
});

// 监听主题变化
watch(isDark, async () => {
  if (sourceCode.value && highlighter.value) {
    await updateHighlightedCode();
  }
});

// 复制代码到剪贴板
const copyCode = async () => {
  if (!sourceCode.value) return;

  try {
    await navigator.clipboard.writeText(sourceCode.value);
    // 显示复制成功提示
    copySuccess.value = true;
    resetCopyIcon.value = false;
    copyTooltipVisible.value = true; // 确保tooltip可见
  } catch (err) {
    console.error("复制失败:", err);
  }
};

onMounted(async () => {
  await initHighlighter();
  try {
    // 根据路径动态导入组件
    let importPath = props.path;

    // 构建正确的路径
    if (importPath.endsWith(".vue")) {
      importPath = importPath.slice(0, -4); // 移除.vue扩展名
    }
    // 使用相对路径直接导入
    const module = await files[`../../../example/${importPath}.vue`]();
    // 使用 markRaw 防止组件被设为响应式
    dynamicComponent.value = markRaw(module.default);
    try {
      const filePath = `../../../example/${importPath}.vue`;
      if (filesRaw[filePath]) {
        sourceCode.value = await filesRaw[filePath]();
      }
    } catch (error) {
      console.warn("源代码获取过程出错:", error);
    }
  } catch (error) {
    console.error("组件加载失败:", error);
    loadError.value = `无法加载组件: ${props.path} (${error.message})`;
  }
});
</script>

<style>
/* 代码高亮样式 */
.shiki {
  background-color: transparent !important;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 14px;
  line-height: 1.8;
  padding: 0;
  margin: 0;
}
</style>

<style scoped>
.demo-block {
  margin: 20px 0;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: all 0.2s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: var(--vp-c-bg);
}

.demo-block:hover {
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
}

.source {
  padding: 1.5rem;
  background-color: var(--vp-c-bg);
  overflow: hidden;
}

.demo-block-control {
  position: relative;
  height: 41px;
  border-top: 1px solid #eaeefb;
  border-bottom: 1px solid #eaeefb;
  text-align: center;
  margin-top: -1px;
  color: #409eff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  user-select: none;
}

.demo-block-control:hover {
  color: #1890ff;
}

.control-buttons {
  display: flex;
  align-items: center;
  padding-right: 20px;
}

.control-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  margin-left: 10px;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  transition: all 0.3s;
}

.control-button:hover {
  color: #409eff;
  background-color: #ecf5ff;
}

.path-text {
  font-size: 12px;
  color: #909399;
  margin-right: 10px;
}

.meta {
  background-color: #f5f7fa;
  overflow: hidden;
  transition: height 0.2s;
}

.description {
  padding: 16px;
  border-bottom: 1px solid #e4e7ed;
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
  background-color: #f7f9fc;
}

.highlight {
  padding: 24px;
  background-color: #f5f7fa;
  overflow: auto;
}

.highlight :deep(pre) {
  margin: 0;
  padding: 0;
  background: transparent !important;
}

.highlight :deep(code) {
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 14px;
  line-height: 1.8;
  padding: 0;
  background: transparent !important;
}

.demo-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #909399;
}

.demo-error {
  padding: 16px;
  background-color: #fff2f0;
  color: #f56c6c;
  border-radius: 4px;
}

/* 适配暗黑模式 */
.dark .demo-block {
  border-color: #4c4d4f;
}

.dark .demo-block-control {
  background-color: #252529;
  border-color: #4c4d4f;
}

.dark .demo-block-control:hover {
  background-color: #2b2b30;
}

.dark .meta {
  background-color: #252529;
}

.dark .description {
  border-color: #363637;
  background-color: #2b2b30;
  color: #a6a9b1;
}

.dark .highlight {
  background-color: #252529;
}

.dark .path-text {
  color: #a6a9b1;
}

.control-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.control-icon svg {
  fill: currentColor;
  width: 16px;
  height: 16px;
}

.copy-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tooltip {
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  pointer-events: none;
}

.tooltip::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 50%;
  margin-left: -4px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #333;
}

.tooltip-success {
  background-color: #67c23a;
}

.tooltip-success::after {
  border-top-color: #67c23a;
}
</style>
