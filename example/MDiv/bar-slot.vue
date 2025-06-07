<template>
  <div class="demo-container">
    <h4>自定义拖拽条插槽</h4>
    
    <div class="demo-row">
      <div class="demo-item">
        <h5>通用bar插槽</h5>
        <MDiv 
          :dragPosition="['top', 'right', 'bottom', 'left']" 
          style="width: 250px; height: 180px; border: 1px solid #409eff;"
        >
          <template #bar>
            <div class="custom-bar">
              <span>⋮⋮</span>
            </div>
          </template>
          <div class="content">
            所有边都使用相同的拖拽条样式
          </div>
        </MDiv>
      </div>
      
      <div class="demo-item">
        <h5>不同方向的bar插槽</h5>
        <MDiv 
          :dragPosition="['top', 'right', 'bottom', 'left']" 
          style="width: 250px; height: 180px; border: 1px solid #67c23a;"
        >
          <template #bar-top>
            <div class="custom-bar-top">↕</div>
          </template>
          <template #bar-right>
            <div class="custom-bar-right">↔</div>
          </template>
          <template #bar-bottom>
            <div class="custom-bar-bottom">↕</div>
          </template>
          <template #bar-left>
            <div class="custom-bar-left">↔</div>
          </template>
          <div class="content">
            每个方向都有不同的拖拽条样式
          </div>
        </MDiv>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需额外的逻辑
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}

.demo-row {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.demo-item {
  flex: 1;
  
  h5 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 14px;
  }
}

.content {
  padding: 15px;
  background: #f5f7fa;
  border-radius: 4px;
  color: #333;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
}

.custom-bar {
  color: #409eff;
  font-weight: bold;
  font-size: 12px;
}

.custom-bar-top,
.custom-bar-bottom {
  color: #67c23a;
  font-weight: bold;
  font-size: 16px;
}

.custom-bar-left,
.custom-bar-right {
  color: #e6a23c;
  font-weight: bold;
  font-size: 16px;
}
</style> 