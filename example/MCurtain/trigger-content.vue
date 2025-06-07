<template>
  <div class="demo-container">
    <MCurtain
      v-model="isOpen"
      :foldStyle="{ width: '0', height: '100%' }"
      :openStyle="{ width: '100%', height: '100%' }"
      triggerPosition="right"
      style="display: flex; gap: 10px"

    >
      <div style="padding: 20px; background: #f5f5f5">
        <h3>自定义触发器内容示例</h3>
        <p>这是窗帘的内容区域</p>
      </div>
      <template #trigger-content="{ isOpen }">
        <div class="custom-trigger-content">
          <span v-if="isOpen">⬅</span>
          <span v-else>➡</span>
          <div class="trigger-text">{{ isOpen ? "收起" : "展开" }}</div>
        </div>
      </template>
    </MCurtain>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isOpen = ref(true);
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}

.custom-trigger-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: #409eff;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  min-width: 40px;
  min-height: 60px;

  .trigger-text {
    margin-top: 4px;
    writing-mode: vertical-lr;
  }
}
</style>
