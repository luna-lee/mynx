<template>
  <MCurtain
    v-model="isOpen"
    :foldStyle="{ width: '0', height: '200px' }"
    :openStyle="{ width: '300px', height: '200px' }"
    triggerPosition="right"
  >
    <div style="padding: 20px; background: #f5f5f5;">
      <h3>自定义触发器内容示例</h3>
      <p>这是窗帘的内容区域</p>
    </div>
    <template #trigger-content="{ isOpen }">
      <div class="custom-trigger-content">
        <span v-if="isOpen">⬅</span>
        <span v-else>➡</span>
        <div class="trigger-text">{{ isOpen ? '收起' : '展开' }}</div>
      </div>
    </template>
  </MCurtain>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isOpen = ref(false);
</script>

<style scoped lang="scss">
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