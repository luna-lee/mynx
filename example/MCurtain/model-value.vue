<template>
  <div class="demo-container">
    <h3>modelValue 双向绑定示例</h3>
    
    <div class="control-panel">
      <h4>外部控制</h4>
      <div class="buttons">
        <button @click="isOpen = true" :disabled="isOpen">展开窗帘</button>
        <button @click="isOpen = false" :disabled="!isOpen">收起窗帘</button>
        <button @click="toggleCurtain">切换状态</button>
      </div>
      <p>当前状态：<strong>{{ isOpen ? '展开' : '收起' }}</strong></p>
    </div>

    <div class="demo-item">
      <MCurtain
        v-model="isOpen"
        :foldStyle="{ width: '0', height: '200px' }"
        :openStyle="{ width: '400px', height: '200px' }"
        triggerPosition="right"
      >
        <div class="content">
          <h4>双向绑定演示</h4>
          <p>点击上方按钮或右侧触发器都可以控制窗帘状态</p>
          <p>状态会自动同步：{{ isOpen ? '展开中' : '已收起' }}</p>
        </div>
      </MCurtain>
    </div>

    <div class="sync-demo">
      <h4>多个组件同步</h4>
      <p>下面两个窗帘共享同一个状态：</p>
      <div class="sync-curtains">
        <MCurtain
          v-model="syncState"
          :foldStyle="{ width: '0', height: '150px' }"
          :openStyle="{ width: '200px', height: '150px' }"
          triggerPosition="right"
        >
          <div class="content sync-content">窗帘 A</div>
        </MCurtain>
        
        <MCurtain
          v-model="syncState"
          :foldStyle="{ width: '0', height: '150px' }"
          :openStyle="{ width: '200px', height: '150px' }"
          triggerPosition="left"
        >
          <div class="content sync-content">窗帘 B</div>
        </MCurtain>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);
const syncState = ref(false);

const toggleCurtain = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}

.control-panel {
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  
  h4 {
    margin-top: 0;
    color: #333;
  }
  
  .buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
    
    button {
      padding: 8px 16px;
      border: 1px solid #409eff;
      background: #409eff;
      color: white;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover:not(:disabled) {
        background: #337ecc;
      }
      
      &:disabled {
        background: #c0c4cc;
        border-color: #c0c4cc;
        cursor: not-allowed;
      }
    }
  }
  
  p {
    margin: 0;
    font-size: 14px;
  }
}

.demo-item {
  margin-bottom: 30px;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 4px;
}

.content {
  padding: 20px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%);
  color: white;
  border-radius: 4px;
  
  h4 {
    margin-top: 0;
  }
  
  p {
    margin: 10px 0;
  }
}

.sync-demo {
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 4px;
  
  h4 {
    margin-top: 0;
    color: #666;
  }
  
  .sync-curtains {
    display: flex;
    gap: 30px;
    justify-content: center;
    margin-top: 20px;
  }
  
  .sync-content {
    background: #9c88ff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
}
</style> 