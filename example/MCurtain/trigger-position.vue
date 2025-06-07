<template>
  <div class="demo-container">
    <h3>触发器位置示例</h3>

    <div class="demo-grid">
      <div class="demo-item">
        <h4>左侧触发器</h4>
        <div class="relative">
          <MCurtain
            class="absolute! right-0 top-0"
            v-model="isOpenLeft"
            :foldStyle="{ width: '0', height: '120px' }"
            :openStyle="{ width: '250px', height: '120px' }"
            triggerPosition="left"
          >
            <div class="content">左侧触发器示例</div>
          </MCurtain>
        </div>
      </div>

      <div class="demo-item">
        <h4>右侧触发器</h4>
        <MCurtain
          v-model="isOpenRight"
          :foldStyle="{ width: '0', height: '120px' }"
          :openStyle="{ width: '250px', height: '120px' }"
          triggerPosition="right"
        >
          <div class="content">右侧触发器示例</div>
        </MCurtain>
      </div>

      <div class="demo-item">
        <h4>顶部触发器</h4>
        <MCurtain
          v-model="isOpenTop"
          :foldStyle="{ width: '250px', height: '0' }"
          :openStyle="{ width: '250px', height: '120px' }"
          triggerPosition="top"
        >
          <div class="content">顶部触发器示例</div>
        </MCurtain>
      </div>

      <div class="demo-item">
        <h4>底部触发器</h4>
        <MCurtain
          v-model="isOpenBottom"
          :foldStyle="{ width: '250px', height: '0' }"
          :openStyle="{ width: '250px', height: '120px' }"
          triggerPosition="bottom"
        >
          <div class="content">底部触发器示例</div>
        </MCurtain>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isOpenLeft = ref(true);
const isOpenRight = ref(true);
const isOpenTop = ref(true);
const isOpenBottom = ref(true);
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 20px;
}

.demo-item {
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 4px;
  h4 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #666;
    text-align: center;
  }
}

.content {
  padding: 15px;
  background: #42b883;
  color: white;
  border-radius: 4px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
