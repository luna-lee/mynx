<template>
  <div class="demo-container">
    <MCurtain
      v-model="isOpen1"
      :foldStyle="{ width: '0', height: '100%' }"
      :openStyle="{ width: '100%', height: '100%' }"
      triggerPosition="right"
      style="display: flex; gap: 10px"
    >
      <div class="content">
        <h5>按钮触发器演示</h5>
        <p>使用自定义按钮作为触发器，可以完全控制样式和交互</p>
      </div>
      <template #trigger="{ isOpen }">
        <button class="custom-button-trigger" @click="isOpen1 = !isOpen1">
          <span class="icon">{{ isOpen ? "◀" : "▶" }}</span>
          <span class="text">{{ isOpen ? "收起" : "展开" }}</span>
        </button>
      </template>
    </MCurtain>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen1 = ref(true);
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}

.content {
  padding: 20px;
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  color: white;
  border-radius: 6px;

  h5 {
    margin: 0 0 10px 0;
    font-weight: 600;
  }

  p {
    margin: 0;
    opacity: 0.9;
  }
}

// 按钮样式触发器
.custom-button-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #e17055;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(225, 112, 85, 0.3);

  &:hover {
    background: #d63031;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(225, 112, 85, 0.4);
  }

  .icon {
    font-size: 14px;
    transition: transform 0.3s ease;
  }

  .text {
    font-size: 14px;
  }
}
</style>
