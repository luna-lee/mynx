<template>
  <div class="demo-container">
    <h4>自定义角落插槽</h4>
    
    <div class="demo-row">
      <div class="demo-item">
        <h5>通用corner插槽</h5>
        <MDiv 
          :dragPosition="['tl', 'tr', 'bl', 'br']" 
          style="width: 250px; height: 180px; border: 1px solid #409eff;"
        >
          <template #corner>
            <div class="custom-corner">
              ⌘
            </div>
          </template>
          <div class="content">
            所有角落都使用相同的样式
          </div>
        </MDiv>
      </div>
      
      <div class="demo-item">
        <h5>不同角落的插槽</h5>
        <MDiv 
          :dragPosition="['tl', 'tr', 'bl', 'br']" 
          style="width: 250px; height: 180px; border: 1px solid #67c23a;"
        >
          <template #corner-tl>
            <div class="custom-corner-tl">↖</div>
          </template>
          <template #corner-tr>
            <div class="custom-corner-tr">↗</div>
          </template>
          <template #corner-bl>
            <div class="custom-corner-bl">↙</div>
          </template>
          <template #corner-br>
            <div class="custom-corner-br">↘</div>
          </template>
          <div class="content">
            每个角落都有不同的方向指示
          </div>
        </MDiv>
      </div>
    </div>
    
    <div class="demo-row">
      <div class="demo-item">
        <h5>混合使用边和角</h5>
        <MDiv 
          :dragPosition="['top', 'right', 'bottom', 'left', 'br']" 
          style="width: 250px; height: 180px; border: 1px solid #e6a23c;"
        >
          <template #bar>
            <div class="custom-bar">═</div>
          </template>
          <template #corner-br>
            <div class="custom-corner-special">⚡</div>
          </template>
          <div class="content">
            边框拖拽 + 右下角特殊拖拽
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

.custom-corner {
  color: #409eff;
  font-weight: bold;
  font-size: 14px;
}

.custom-corner-tl,
.custom-corner-tr,
.custom-corner-bl,
.custom-corner-br {
  color: #67c23a;
  font-weight: bold;
  font-size: 12px;
}

.custom-corner-special {
  color: #f56c6c;
  font-weight: bold;
  font-size: 12px;
}

.custom-bar {
  color: #e6a23c;
  font-weight: bold;
  font-size: 12px;
}
</style> 