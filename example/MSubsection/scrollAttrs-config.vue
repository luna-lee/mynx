<template>
  <div>
    <div style="margin-bottom: 20px">
      <label>
        <input type="checkbox" v-model="showScrollBtn" />
        显示滚动按钮
      </label>
    </div>

    <MDiv style="border: 1px solid #ddd; padding: 10px">
      <p style="margin-bottom: 10px">窄容器中的长标签页（会产生滚动）:</p>
      <MSubsection
        :tabs="longTabs"
        v-model="activeIndex"
        :scrollAttrs="scrollConfig"
      >
        <template #tab-content-0>
          <div style="padding: 20px">
            <h4>第一个很长的标签页内容</h4>
            <p>当标签页过多或标签文字过长时，可以启用滚动功能。</p>
            <p>scrollBtnShow 设置为 true 时会显示左右滚动按钮。</p>
          </div>
        </template>
        <template #tab-content-1>
          <div style="padding: 20px">
            <h4>第二个超级长的标签页</h4>
            <p>滚动按钮可以帮助用户快速浏览所有标签页选项。</p>
            <p>支持平滑滚动和键盘导航。</p>
          </div>
        </template>
        <template #tab-content-2>
          <div style="padding: 20px">
            <h4>第三个标签页内容区域</h4>
            <p>MScroll 组件提供了良好的滚动体验。</p>
          </div>
        </template>
        <template #tab-content-3>
          <div style="padding: 20px">
            <h4>第四个标签页</h4>
            <p>可以通过 scrollAttrs 传递更多配置给 MScroll 组件。</p>
          </div>
        </template>
        <template #tab-content-4>
          <div style="padding: 20px">
            <h4>第五个标签页</h4>
            <p>标签页数量较多时，滚动功能变得非常有用。</p>
          </div>
        </template>
        <template #tab-content-5>
          <div style="padding: 20px">
            <h4>最后一个标签页</h4>
            <p>通过滚动可以访问到所有标签页内容。</p>
          </div>
        </template>
      </MSubsection>
    </MDiv>

    <div style="margin-top: 20px; padding: 10px; background: #f5f5f5">
      <p>当前配置: {{ JSON.stringify(scrollConfig, null, 2) }}</p>
      <p>当前激活标签页: {{ activeIndex }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import MSubsection from "../../packages/moon-ui/src/MSubsection/index.vue";

const activeIndex = ref(0);
const showScrollBtn = ref(true);

const longTabs = ref([
  { title: "非常长的标签页名称一" },
  { title: "超级长的标签页标题二" },
  { title: "很长很长的标签三" },
  { title: "标签页四" },
  { title: "第五个长标签页" },
  { title: "最后一个标签页" },
]);

const scrollConfig = computed(() => ({
  scrollBtnShow: showScrollBtn.value,
  scrollStep: 100, // 自定义滚动步长
}));
</script>

<style scoped>
label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

input[type="checkbox"] {
  margin: 0;
}
:deep(.m-subsection__tab-item) {
  padding: 0 40px;
}
</style>
