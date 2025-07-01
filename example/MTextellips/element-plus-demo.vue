<template>
  <div class="element-plus-demo">
    <el-card class="demo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Element Plus + MTextellips 组合示例</span>
          <el-button class="button" text @click="toggleText">
            <el-icon><Refresh /></el-icon>
            切换文本
          </el-button>
        </div>
      </template>

      <div class="demo-content">
        <el-form :model="form" label-width="120px">
          <el-form-item label="行数限制">
            <el-slider
              v-model="form.lineClamp"
              :min="1"
              :max="5"
              show-stops
              :marks="marks"
            />
          </el-form-item>

          <el-form-item label="显示按钮">
            <el-switch v-model="form.showFoldBtn" />
          </el-form-item>

          <el-form-item label="文本内容">
            <el-select v-model="currentTextIndex" placeholder="选择文本">
              <el-option
                v-for="(text, index) in textOptions"
                :key="index"
                :label="text.label"
                :value="index"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="按钮跟随内容"> 
            <el-switch v-model="form.foldBtnInline" />
          </el-form-item>
        </el-form>

        <el-divider content-position="left">
          <el-icon><Document /></el-icon>
          文本展示效果
        </el-divider>

        <MDiv
          :width="400"
          :height="200"
          :resizable="true"
          style="
            border: 1px solid var(--el-border-color);
            border-radius: 4px;
            padding: 16px;
          "
        >
          <el-tooltip placement="top" :disabled="showAll">
            <template #content>
              {{ currentText }}
            </template>
            <MTextellips
              v-model:showAll="showAll"
              :text="currentText"
              :lineClamp="form.lineClamp"
              :showFoldBtn="form.showFoldBtn"
              :foldBtnInline="form.foldBtnInline"
              @update:showAll="handleShowAllUpdate"
            >
              <template #fold-btn="{ isExpanded }">
                <el-button
                  :type="isExpanded ? 'warning' : 'primary'"
                  size="small"
                  :icon="isExpanded ? 'ArrowUp' : 'ArrowDown'"
                >
                  {{ isExpanded ? "收起" : "展开" }}
                </el-button>
              </template>
            </MTextellips>
          </el-tooltip>
        </MDiv>

        <el-alert
          :title="`当前状态: ${showAll ? '显示全部' : '显示省略'}`"
          :type="showAll ? 'success' : 'info'"
          :closable="false"
          style="margin-top: 16px"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";

/**
 * 表单数据
 */
const form = ref({
  lineClamp: 2,
  showFoldBtn: true,
  foldBtnInline: true,
});

/**
 * 滑块标记
 */
const marks = {
  1: "1行",
  2: "2行",
  3: "3行",
  4: "4行",
  5: "5行",
};

/**
 * 文本选项
 */
const textOptions = [
  {
    label: "短文本",
    content: "这是一段短文本，不会触发省略效果。",
  },
  {
    label: "中等文本",
    content:
      "这是一段中等长度的文本内容，用来测试文本省略组件在不同行数限制下的表现效果。当文本内容超过指定行数时，会自动显示省略号。",
  },
  {
    label: "长文本",
    content:
      "这是一段很长的文本内容，专门用来测试 MTextellips 组件的文本省略功能。当文本内容超过设定的行数限制时，组件会自动截断文本并显示省略号，同时提供展开和收起的交互功能。用户可以通过点击展开按钮来查看完整的文本内容，也可以通过收起按钮来隐藏多余的文本。这种设计既节省了页面空间，又保证了用户体验的流畅性。组件还支持自定义展开按钮的样式，可以与 Element Plus 等 UI 框架完美结合使用。",
  },
  {
    label: "超长文本",
    content:
      "这是一段超长的文本内容，包含了大量的文字信息，用于全面测试 MTextellips 组件在处理大量文本时的性能和表现。在实际的业务场景中，我们经常会遇到需要展示大量文本信息的情况，比如文章摘要、产品描述、用户评论等。如果不对这些文本进行适当的处理，会导致页面布局混乱，影响用户的阅读体验。MTextellips 组件正是为了解决这个问题而设计的，它可以智能地检测文本是否超出了指定的行数限制，并在需要时自动添加省略号。同时，组件还提供了展开和收起的功能，让用户可以根据需要查看完整的文本内容。这种设计既保证了页面的整洁性，又提供了良好的用户交互体验。此外，组件还支持响应式设计，当容器大小发生变化时，会自动重新计算是否需要省略文本，确保在不同设备和屏幕尺寸下都能正常工作。",
  },
];

/**
 * 当前文本索引
 */
const currentTextIndex = ref(2);

/**
 * 当前文本内容
 */
const currentText = computed(() => {
  return textOptions[currentTextIndex.value]?.content || "";
});

/**
 * 显示状态
 */
const showAll = ref(false);

/**
 * 切换文本
 */
const toggleText = () => {
  currentTextIndex.value = (currentTextIndex.value + 1) % textOptions.length;
  ElMessage.success(`已切换到: ${textOptions[currentTextIndex.value].label}`);
};

/**
 * 处理显示状态更新
 */
const handleShowAllUpdate = (isShowAll) => {
  console.log("文本显示状态更新:", isShowAll ? "显示全部" : "显示省略");
};
</script>

<style scoped>
.element-plus-demo {
  padding: 20px;
}

.demo-card {
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-content {
  padding: 16px 0;
}

.button {
  padding: 0;
  margin-left: 16px;
}
</style>
