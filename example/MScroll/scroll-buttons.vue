<template>
  <div  class="m-l-20px m-r-20px">
    <p>启用滚动按钮后，可以通过点击左右按钮来控制滚动。</p>
    
    <div style="margin-bottom: 20px;">
      <label style="display: flex; align-items: center; gap: 8px;">
        <input type="checkbox" v-model="showButtons" />
        显示滚动按钮
      </label>
    </div>

    <MDiv style="border: 1px solid #ddd; margin: 20px 0">
      <MScroll :scrollBtnShow="showButtons">
        <div style="display: flex; gap: 15px; padding: 20px;">
          <div v-for="i in 15" :key="i" 
               style="min-width: 150px; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      border-radius: 12px; display: flex; flex-direction: column; align-items: center; 
                      justify-content: center; color: white; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="font-size: 18px;">项目 {{ i }}</div>
            <div style="font-size: 12px; opacity: 0.8;">点击滚动按钮</div>
          </div>
        </div>
      </MScroll>
    </MDiv>

    <MDiv style="border: 1px solid #ddd; margin: 20px 0">
      <h4>图片画廊示例</h4>
      <MScroll :scrollBtnShow="showButtons">
        <div style="display: flex; gap: 10px; padding: 15px;">
          <div v-for="(color, i) in colors" :key="i" 
               style="min-width: 120px; height: 80px; border-radius: 8px; display: flex; 
                      align-items: center; justify-content: center; color: white; font-weight: bold;"
               :style="{ background: color }">
            {{ i + 1 }}
          </div>
        </div>
      </MScroll>
    </MDiv>

    <div style="margin-top: 20px; padding: 10px; background: #f5f5f5;">
      <h4>滚动按钮说明</h4>
      <ul>
        <li>左右滚动按钮会根据滚动位置自动启用/禁用</li>
        <li>滚动到最左侧时，左按钮变为禁用状态</li>
        <li>滚动到最右侧时，右按钮变为禁用状态</li>
        <li>按钮支持自定义样式和图标</li>
        <li>点击按钮会平滑滚动到目标位置</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showButtons = ref(true)

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#F4D03F'
]
</script>

<style scoped>
label {
  font-size: 14px;
  cursor: pointer;
}

input[type="checkbox"] {
  margin: 0;
}
</style> 