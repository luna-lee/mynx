<template>
  <div v-if="!loading">
    <slot />
  </div>
  <div v-else class="loading-container">
    <el-icon class="loading-icon"><Loading /></el-icon>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
const loading = ref(false);
onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>
<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  height: 100%;
}
.loading-icon {
  animation: spin 1s linear infinite;
  /* 启用硬件加速 */
  will-change: transform;
  /* 创建新的层叠上下文 */
  transform: translateZ(0);
}
</style>
