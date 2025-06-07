<template>
  <div class="demo-container">
    <h4>默认插槽内容</h4>
    
    <div class="demo-item">
      <h5>基础显示控制</h5>
      <div class="controls">
        <button @click="show1 = !show1" class="toggle-btn">
          {{ show1 ? '隐藏' : '显示' }} 内容
        </button>
      </div>
      <div class="content-wrapper">
        <MIfShow :show="show1">
          <div class="content">
            <h6>这是MIfShow的默认插槽内容</h6>
            <p>当show属性为true时，这个内容会被渲染到DOM中。</p>
            <p>当show属性为false时，这个内容不会被渲染。</p>
          </div>
        </MIfShow>
      </div>
    </div>
    
    <div class="demo-item">
      <h5>延迟显示</h5>
      <div class="controls">
        <button @click="show2 = !show2" class="toggle-btn">
          {{ show2 ? '隐藏' : '显示' }} 内容（延迟1秒）
        </button>
      </div>
      <div class="content-wrapper">
        <MIfShow :show="show2" :delay="1000">
          <div class="content delayed">
            <h6>延迟显示的内容</h6>
            <p>这个内容会在show变为true后延迟1秒才渲染到DOM中。</p>
            <p>这对于避免频繁的DOM操作很有用。</p>
          </div>
        </MIfShow>
      </div>
    </div>
    
    <div class="demo-item">
      <h5>复杂内容</h5>
      <div class="controls">
        <button @click="show3 = !show3" class="toggle-btn">
          {{ show3 ? '隐藏' : '显示' }} 复杂内容
        </button>
      </div>
      <div class="content-wrapper">
        <MIfShow :show="show3">
          <div class="content complex">
            <h6>复杂的组件内容</h6>
            <div class="card-list">
              <div class="card" v-for="i in 3" :key="i">
                <div class="card-header">卡片 {{ i }}</div>
                <div class="card-body">
                  <p>这是卡片 {{ i }} 的内容</p>
                  <button class="card-btn">操作按钮</button>
                </div>
              </div>
            </div>
          </div>
        </MIfShow>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}

.demo-item {
  margin-bottom: 40px;
  
  h5 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 16px;
  }
}

.controls {
  margin-bottom: 15px;
}

.toggle-btn {
  padding: 8px 16px;
  border: 1px solid #409eff;
  border-radius: 4px;
  background: #409eff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #66b1ff;
    border-color: #66b1ff;
  }
}

.content-wrapper {
  min-height: 100px;
  border: 2px dashed #e4e7ed;
  border-radius: 4px;
  padding: 15px;
  background: #fafafa;
}

.content {
  padding: 20px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h6 {
    margin: 0 0 10px 0;
    color: #409eff;
    font-size: 18px;
  }

  p {
    margin: 8px 0;
    color: #606266;
    line-height: 1.5;
  }

  &.delayed {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;

    h6 {
      color: #fff;
    }

    p {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  &.complex {
    background: #f0f9ff;
  }
}

.card-list {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}

.card {
  flex: 1;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  background: #fff;
  overflow: hidden;

  .card-header {
    padding: 10px 15px;
    background: #409eff;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
  }

  .card-body {
    padding: 15px;

    p {
      margin: 0 0 10px 0;
      font-size: 14px;
    }

    .card-btn {
      padding: 6px 12px;
      border: 1px solid #67c23a;
      border-radius: 4px;
      background: #67c23a;
      color: #fff;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: #85ce61;
        border-color: #85ce61;
      }
    }
  }
}
</style> 