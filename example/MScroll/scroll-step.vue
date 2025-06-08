<template>
  <div class="m-l-20px m-r-20px">
    <p>通过 scrollStep 属性可以控制点击滚动按钮时的滚动距离。</p>
    
    <div style="margin-bottom: 20px;">
      <label style="display: block; margin-bottom: 10px;">
        滚动步长: {{ scrollStep }}px
      </label>
      <input 
        type="range" 
        v-model="scrollStep" 
        min="50" 
        max="500" 
        step="25"
        style="width: 300px;"
      />
      <div style="display: flex; gap: 10px; margin-top: 10px;">
        <button @click="scrollStep = 100" style="padding: 5px 10px; border: 1px solid #ddd; background: white; cursor: pointer;">快速 (100px)</button>
        <button @click="scrollStep = 200" style="padding: 5px 10px; border: 1px solid #ddd; background: white; cursor: pointer;">标准 (200px)</button>
        <button @click="scrollStep = 300" style="padding: 5px 10px; border: 1px solid #ddd; background: white; cursor: pointer;">慢速 (300px)</button>
      </div>
    </div>

    <MDiv style="border: 1px solid #ddd; margin: 20px 0">
      <h4>产品列表滚动</h4>
      <MScroll :scrollBtnShow="true" :scrollStep="scrollStep">
        <div style="display: flex; gap: 20px; padding: 20px;">
          <div v-for="i in 12" :key="i" 
               style="min-width: 180px; padding: 15px; background: white; border: 1px solid #e0e0e0;
                      border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="width: 100%; height: 120px; background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%); 
                        border-radius: 6px; margin-bottom: 10px; display: flex; align-items: center; 
                        justify-content: center; color: white; font-weight: bold;">
              产品 {{ i }}
            </div>
            <h5 style="margin: 0 0 5px 0; font-size: 14px;">产品名称 {{ i }}</h5>
            <p style="margin: 0; font-size: 12px; color: #666;">
              这是产品 {{ i }} 的详细描述信息
            </p>
            <div style="margin-top: 10px; font-weight: bold; color: #e74c3c;">
              ¥{{ (Math.random() * 1000 + 100).toFixed(0) }}
            </div>
          </div>
        </div>
      </MScroll>
    </MDiv>

    <MDiv style="border: 1px solid #ddd; margin: 20px 0">
      <h4>小步长精细控制</h4>
      <MScroll :scrollBtnShow="true" :scrollStep="50">
        <div style="display: flex; gap: 5px; padding: 15px;">
          <div v-for="i in 30" :key="i" 
               style="min-width: 60px; height: 60px; background: #3498db; 
                      border-radius: 50%; display: flex; align-items: center; 
                      justify-content: center; color: white; font-weight: bold; font-size: 12px;">
            {{ i }}
          </div>
        </div>
      </MScroll>
    </MDiv>

    <div style="margin-top: 20px; padding: 10px; background: #f5f5f5;">
      <h4>滚动步长说明</h4>
      <ul>
        <li><strong>当前步长:</strong> {{ scrollStep }}px</li>
        <li><strong>小步长 (50-100px):</strong> 适合精细控制，逐个查看内容</li>
        <li><strong>标准步长 (150-250px):</strong> 平衡速度和精度，适合大多数场景</li>
        <li><strong>大步长 (300px+):</strong> 快速浏览，适合内容较多的情况</li>
        <li>步长值会影响用户的滚动体验和操作效率</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MScroll from '../../packages/moon-ui/src/MScroll/index.vue'
import MDiv from '../../packages/moon-ui/src/MDiv/index.vue'

const scrollStep = ref(200)
</script>

<style scoped>
button {
  border-radius: 4px;
}

button:hover {
  background: #f5f5f5 !important;
}

input[type="range"] {
  accent-color: #4269fd;
}
</style> 