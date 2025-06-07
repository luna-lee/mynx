<template>
  <div class="demo-container">
    <MCurtain
      v-model="isOpen1"
      :foldStyle="{ width: '0', height: '100%' }"
      :openStyle="{ width: '100%', height: '100%' }"
      triggerPosition="right"
    >
      <div class="text-content">
        <h5>这是窗帘的默认插槽</h5>
        <p>可以放置任意的文本内容，包括标题、段落、列表等。</p>
      </div>
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

.text-content {
  padding: 15px;
  background: #e8f4fd;
  border-radius: 4px;
  color: #333;

  h5 {
    margin: 0 0 10px 0;
    color: #409eff;
  }

  p {
    margin: 0;
    line-height: 1.5;
  }
}
</style>
