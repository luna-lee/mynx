<template>
  <div class="demo-container">
    <h4>居中对齐配置</h4>
    
    <div class="demo-row">
      <div class="demo-item">
        <h5>contain 模式 - 不居中</h5>
        <MDiv class="scale-wrapper">
          <MScale :designWidth="200" :designHeight="150" fit="contain" :containCenter="false">
            <div class="content">
              <p>contain 模式</p>
              <p>不居中对齐</p>
              <p>可拖拽调整</p>
            </div>
          </MScale>
        </MDiv>
      </div>
      
      <div class="demo-item">
        <h5>contain 模式 - 居中</h5>
        <MDiv class="scale-wrapper">
          <MScale :designWidth="200" :designHeight="150" fit="contain" :containCenter="true">
            <div class="content">
              <p>contain 模式</p>
              <p>居中对齐</p>
              <p>可拖拽调整</p>
            </div>
          </MScale>
        </MDiv>
      </div>
    </div>
    
    <div class="demo-row">
      <div class="demo-item">
        <h5>containX 模式 - 不居中</h5>
        <MDiv class="scale-wrapper">
          <MScale :designWidth="200" :designHeight="150" fit="containX" :containCenter="false">
            <div class="content">
              <p>containX 模式</p>
              <p>不居中对齐</p>
              <p>可拖拽调整</p>
            </div>
          </MScale>
        </MDiv>
      </div>
      
      <div class="demo-item">
        <h5>containX 模式 - 居中</h5>
        <MDiv class="scale-wrapper">
          <MScale :designWidth="200" :designHeight="150" fit="containX" :containCenter="true">
            <div class="content">
              <p>containX 模式</p>
              <p>居中对齐</p>
              <p>可拖拽调整</p>
            </div>
          </MScale>
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

.scale-wrapper {
  width: 350px;
  height: 200px;
  border: 2px solid #409eff;
  background: #f0f9ff;
}

.content {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  p {
    margin: 5px 0;
    font-size: 14px;
    font-weight: bold;
  }
}
</style> 