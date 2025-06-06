<template>
  <div class="demo-container">
    <h3>自定义触发器插槽示例</h3>
    
    <div class="demo-item">
      <h4>按钮样式触发器</h4>
      <MCurtain
        v-model="isOpen1"
        :foldStyle="{ width: '0', height: '150px' }"
        :openStyle="{ width: '350px', height: '150px' }"
        triggerPosition="right"
      >
        <div class="content">
          <h5>按钮触发器演示</h5>
          <p>使用自定义按钮作为触发器，可以完全控制样式和交互</p>
        </div>
        <template #trigger="{ isOpen }">
          <button class="custom-button-trigger" @click="isOpen1 = !isOpen1">
            <span class="icon">{{ isOpen ? '◀' : '▶' }}</span>
            <span class="text">{{ isOpen ? '收起' : '展开' }}</span>
          </button>
        </template>
      </MCurtain>
    </div>

    <div class="demo-item">
      <h4>图标样式触发器</h4>
      <MCurtain
        v-model="isOpen2"
        :foldStyle="{ width: '0', height: '150px' }"
        :openStyle="{ width: '350px', height: '150px' }"
        triggerPosition="right"
      >
        <div class="content">
          <h5>图标触发器演示</h5>
          <p>使用图标作为触发器，简洁美观</p>
        </div>
        <template #trigger="{ isOpen }">
          <div class="icon-trigger" @click="isOpen2 = !isOpen2">
            <svg 
              class="icon-svg" 
              :class="{ 'rotated': isOpen }"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </div>
        </template>
      </MCurtain>
    </div>

    <div class="demo-item">
      <h4>卡片样式触发器</h4>
      <MCurtain
        v-model="isOpen3"
        :foldStyle="{ width: '0', height: '180px' }"
        :openStyle="{ width: '400px', height: '180px' }"
        triggerPosition="right"
      >
        <div class="content">
          <h5>卡片触发器演示</h5>
          <p>使用卡片样式的触发器，提供更多信息展示空间</p>
        </div>
        <template #trigger="{ isOpen }">
          <div class="card-trigger" @click="isOpen3 = !isOpen3">
            <div class="card-header">
              <span class="title">设置</span>
              <span class="arrow" :class="{ 'arrow-open': isOpen }">›</span>
            </div>
            <div class="card-body">
              <small>{{ isOpen ? '点击收起' : '点击展开' }}</small>
            </div>
          </div>
        </template>
      </MCurtain>
    </div>

    <div class="demo-item">
      <h4>悬浮提示触发器</h4>
      <MCurtain
        v-model="isOpen4"
        :foldStyle="{ width: '0', height: '150px' }"
        :openStyle="{ width: '350px', height: '150px' }"
        triggerPosition="right"
      >
        <div class="content">
          <h5>悬浮提示触发器演示</h5>
          <p>带悬浮效果和提示信息的触发器</p>
        </div>
        <template #trigger="{ isOpen }">
          <div 
            class="hover-trigger" 
            @click="isOpen4 = !isOpen4"
            :title="isOpen ? '点击收起窗帘' : '点击展开窗帘'"
          >
            <div class="trigger-content">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
            <div class="tooltip">{{ isOpen ? '收起' : '展开' }}</div>
          </div>
        </template>
      </MCurtain>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen1 = ref(false);
const isOpen2 = ref(false);
const isOpen3 = ref(false);
const isOpen4 = ref(false);
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}

.demo-item {
  margin-bottom: 40px;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 8px;
  
  h4 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #666;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
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

// 图标样式触发器
.icon-trigger {
  width: 40px;
  height: 40px;
  background: #00b894;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 184, 148, 0.3);
  
  &:hover {
    background: #00a085;
    transform: scale(1.1);
    box-shadow: 0 4px 20px rgba(0, 184, 148, 0.4);
  }
  
  .icon-svg {
    width: 20px;
    height: 20px;
    color: white;
    transition: transform 0.3s ease;
    
    &.rotated {
      transform: rotate(180deg);
    }
  }
}

// 卡片样式触发器
.card-trigger {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  .card-header {
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .title {
      font-weight: 600;
      color: #333;
      font-size: 14px;
    }
    
    .arrow {
      font-size: 18px;
      color: #666;
      transition: transform 0.3s ease;
      
      &.arrow-open {
        transform: rotate(90deg);
      }
    }
  }
  
  .card-body {
    padding: 8px 16px;
    
    small {
      color: #999;
      font-size: 12px;
    }
  }
}

// 悬浮提示触发器
.hover-trigger {
  position: relative;
  background: #6c5ce7;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5f3dc4;
    transform: scale(1.05);
    
    .tooltip {
      opacity: 1;
      transform: translateX(-50%) translateY(-10px);
    }
  }
  
  .trigger-content {
    display: flex;
    flex-direction: column;
    gap: 3px;
    
    .dot {
      width: 4px;
      height: 4px;
      background: white;
      border-radius: 50%;
    }
  }
  
  .tooltip {
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid rgba(0, 0, 0, 0.8);
    }
  }
}
</style> 