<template>
  <div class="demo-container">
    <h4>不同的拖拽位置配置</h4>
    
    <div class="demo-row">
      <div class="demo-item">
        <h5>只允许右边和底部拖拽</h5>
        <MDiv 
          :dragPosition="['right', 'bottom', 'br']" 
          style="width: 200px; height: 150px; border: 1px solid #409eff;"
        >
          <div class="content">
            只能从右边和底部拖拽
          </div>
        </MDiv>
      </div>
      
      <div class="demo-item">
        <h5>只允许四个角拖拽</h5>
        <MDiv 
          :dragPosition="['tl', 'tr', 'bl', 'br']" 
          style="width: 200px; height: 150px; border: 1px solid #67c23a;"
        >
          <div class="content">
            只能从四个角拖拽
          </div>
        </MDiv>
      </div>
    </div>
    
    <div class="demo-row">
      <div class="demo-item">
        <h5>只允许左右拖拽</h5>
        <MDiv 
          :dragPosition="['left', 'right']" 
          style="width: 200px; height: 150px; border: 1px solid #e6a23c;"
        >
          <div class="content">
            只能左右调整宽度
          </div>
        </MDiv>
      </div>
      
      <div class="demo-item">
        <h5>禁用所有拖拽</h5>
        <MDiv 
          :dragPosition="[]" 
          style="width: 200px; height: 150px; border: 1px solid #f56c6c;"
        >
          <div class="content">
            无法拖拽调整大小
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
</style> 