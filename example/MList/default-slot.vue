<template>
  <div class="demo-container">
    <MList v-model="selectedValue1" class="m-list">
      <div key="item1" class="m-list-item">项目 1</div>
      <div key="item2" class="m-list-item">项目 2</div>
      <div key="item3" class="m-list-item">项目 3</div>
      <div key="item4" class="m-list-item">项目 4</div>
    </MList>
    <p>当前选中：{{ selectedValue1 }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedValue1 = ref(null);
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}
.m-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 6px;
  background: #fafafa;
}

.m-list-item {
  padding: 10px 15px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f8ff;
    border-color: #409eff;
  }

  &.active {
    background: #409eff;
    color: white;
    border-color: #409eff;
  }
}
</style>
