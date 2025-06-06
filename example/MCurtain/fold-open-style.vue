<template>
  <div class="demo-container">
    <h3>自定义折叠/展开样式示例</h3>
    <div class="demo-item">
      <h4>水平展开（宽度变化）</h4>
      <MCurtain
        v-model="isOpen1"
        :foldStyle="{ width: '50px', height: '150px' }"
        :openStyle="{ width: '400px', height: '150px' }"
        triggerPosition="right"
      >
        <div class="content">
          <p>这是水平展开的窗帘内容，宽度从50px变化到400px</p>
        </div>
      </MCurtain>
    </div>
    
    <div class="demo-item">
      <h4>垂直展开（高度变化）</h4>
      <MCurtain
        v-model="isOpen2"
        :foldStyle="{ width: '300px', height: '30px' }"
        :openStyle="{ width: '300px', height: '200px' }"
        triggerPosition="bottom"
      >
        <div class="content">
          <p>这是垂直展开的窗帘内容，高度从30px变化到200px</p>
          <p>可以放置更多内容...</p>
        </div>
      </MCurtain>
    </div>

    <div class="demo-item">
      <h4>同时变化宽高</h4>
      <MCurtain
        v-model="isOpen3"
        :foldStyle="{ width: '80px', height: '80px' }"
        :openStyle="{ width: '350px', height: '180px' }"
        triggerPosition="right"
      >
        <div class="content">
          <p>这是同时变化宽高的窗帘，从80x80变化到350x180</p>
        </div>
      </MCurtain>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isOpen1 = ref(false);
const isOpen2 = ref(false);
const isOpen3 = ref(false);
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}

.demo-item {
  margin-bottom: 30px;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 4px;
  
  h4 {
    margin-top: 0;
    color: #666;
  }
}

.content {
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 4px;
  
  p {
    margin: 0 0 10px 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style> 