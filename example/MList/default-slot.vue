<template>
  <div class="demo-container">
    <h3>MList 默认插槽示例</h3>
    
    <div class="demo-item">
      <h4>基础列表项</h4>
      <MList v-model="selectedValue1" class="list-container">
        <div key="item1" class="list-item">项目 1</div>
        <div key="item2" class="list-item">项目 2</div>
        <div key="item3" class="list-item">项目 3</div>
        <div key="item4" class="list-item">项目 4</div>
      </MList>
      <p>当前选中：{{ selectedValue1 }}</p>
    </div>

    <div class="demo-item">
      <h4>按钮列表项</h4>
      <MList v-model="selectedValue2" class="list-container">
        <button key="btn1" class="btn-item">按钮 1</button>
        <button key="btn2" class="btn-item">按钮 2</button>
        <button key="btn3" class="btn-item">按钮 3</button>
        <button key="btn4" class="btn-item">按钮 4</button>
        <button key="btn5" class="btn-item">按钮 5</button>
      </MList>
      <p>当前选中：{{ selectedValue2 }}</p>
    </div>

    <div class="demo-item">
      <h4>卡片列表项</h4>
      <MList v-model="selectedValue3" class="list-container">
        <div key="card1" class="card-item">
          <h5>卡片 1</h5>
          <p>这是第一个卡片的内容</p>
        </div>
        <div key="card2" class="card-item">
          <h5>卡片 2</h5>
          <p>这是第二个卡片的内容</p>
        </div>
        <div key="card3" class="card-item">
          <h5>卡片 3</h5>
          <p>这是第三个卡片的内容</p>
        </div>
      </MList>
      <p>当前选中：{{ selectedValue3 }}</p>
    </div>

    <div class="demo-item">
      <h4>图标列表项</h4>
      <MList v-model="selectedValue4" class="list-container">
        <div key="home" class="icon-item">
          <span class="icon">🏠</span>
          <span>首页</span>
        </div>
        <div key="user" class="icon-item">
          <span class="icon">👤</span>
          <span>用户</span>
        </div>
        <div key="settings" class="icon-item">
          <span class="icon">⚙️</span>
          <span>设置</span>
        </div>
        <div key="help" class="icon-item">
          <span class="icon">❓</span>
          <span>帮助</span>
        </div>
      </MList>
      <p>当前选中：{{ selectedValue4 }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedValue1 = ref(null);
const selectedValue2 = ref(null);
const selectedValue3 = ref(null);
const selectedValue4 = ref(null);
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}

.demo-item {
  margin-bottom: 30px;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 8px;
  
  h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #666;
  }
  
  p {
    margin-top: 15px;
    color: #333;
    font-weight: 500;
  }
}

.list-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 6px;
  background: #fafafa;
}

.list-item {
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

.btn-item {
  padding: 8px 16px;
  border: 1px solid #409eff;
  background: white;
  color: #409eff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f8ff;
  }
  
  &.active {
    background: #409eff;
    color: white;
  }
}

.card-item {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  
  h5 {
    margin: 0 0 8px 0;
    color: #333;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  &.active {
    border-color: #409eff;
    background: #f0f8ff;
  }
}

.icon-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  .icon {
    font-size: 18px;
  }
  
  &:hover {
    background: #f9f9f9;
    transform: scale(1.02);
  }
  
  &.active {
    background: #409eff;
    color: white;
    border-color: #409eff;
  }
}
</style> 