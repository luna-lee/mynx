<template>
  <div class="p-20px">
    <div style="margin-bottom: 20px">
      <button @click="setActiveTab(0)" :class="{ active: activeIndex === 0 }">
        切换到第一个
      </button>
      <button @click="setActiveTab(1)" :class="{ active: activeIndex === 1 }">
        切换到第二个
      </button>
      <button @click="setActiveTab(2)" :class="{ active: activeIndex === 2 }">
        切换到第三个
      </button>
    </div>

    <MSubsection
      class="w-full h-full mt-20px mb-20px"
      :tabs="tabs"
      v-model="activeIndex"
      @update:modelValue="handleTabChange"
    >
      <template #tab-content-0>
        <div class="mt-20px" style="padding: 20px; background: #f0f9ff">
          <h4>内容区域 1</h4>
          <p>通过外部按钮控制标签页切换，展示 v-model 双向绑定功能。</p>
          <p>当前激活索引: {{ activeIndex }}</p>
        </div>
      </template>
      <template #tab-content-1>
        <div class="mt-20px" style="padding: 20px; background: #f0fdf4">
          <h4>内容区域 2</h4>
          <p>点击标签页或外部按钮都会同步更新 modelValue。</p>
          <p>当前激活索引: {{ activeIndex }}</p>
        </div>
      </template>
      <template #tab-content-2>
        <div class="mt-20px" style="padding: 20px; background: #fefce8">
          <h4>内容区域 3</h4>
          <p>支持监听 update:modelValue 事件来响应标签页变化。</p>
          <p>当前激活索引: {{ activeIndex }}</p>
        </div>
      </template>
    </MSubsection>

    <div  style="margin-top: 20px; padding: 10px; background: #f5f5f5">
      <p>外部控制的激活索引: {{ activeIndex }}</p>
      <p>最后一次切换时间: {{ lastChangeTime }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MSubsection from "../../packages/moon-ui/src/MSubsection/index.vue";

const activeIndex = ref(1); // 默认激活第二个标签页
const lastChangeTime = ref(new Date().toLocaleTimeString());

const tabs = ref([
  { title: "选项一" },
  { title: "选项二" },
  { title: "选项三" },
]);

const setActiveTab = (index) => {
  activeIndex.value = index;
  lastChangeTime.value = new Date().toLocaleTimeString();
};

const handleTabChange = (newIndex) => {
  console.log("标签页切换到:", newIndex);
  lastChangeTime.value = new Date().toLocaleTimeString();
};
</script>

<style scoped>
button {
  margin-right: 10px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

button.active {
  background: #4269fd;
  color: white;
  border-color: #4269fd;
}

button:hover {
  background: #f5f5f5;
}

button.active:hover {
  background: #3651e6;
}
:deep(.m-subsection__tab-item) {
  padding: 0 40px;
}
</style>
