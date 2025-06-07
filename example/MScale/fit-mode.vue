<template>
  <div class="demo-container">
    <h4>不同的缩放模式</h4>
    
    <div class="demo-row">
      <div class="demo-item">
        <h5>fill 模式（默认）</h5>
        <MDiv class="scale-wrapper">
          <MScale :designWidth="200" :designHeight="150" fit="fill">
            <div class="content fill">
              <p>fill 模式</p>
              <p>完全填充容器</p>
              <p>可拖拽调整</p>
            </div>
          </MScale>
        </MDiv>
      </div>
      
      <div class="demo-item">
        <h5>contain 模式</h5>
        <MDiv class="scale-wrapper">
          <MScale :designWidth="200" :designHeight="150" fit="contain">
            <div class="content contain">
              <p>contain 模式</p>
              <p>保持比例缩放</p>
              <p>可拖拽调整</p>
            </div>
          </MScale>
        </MDiv>
      </div>
    </div>
    
    <div class="demo-row">
      <div class="demo-item">
        <h5>containX 模式</h5>
        <MDiv class="scale-wrapper">
          <MScale :designWidth="200" :designHeight="150" fit="containX">
            <div class="content containx">
              <p>containX 模式</p>
              <p>按宽度比例缩放</p>
              <p>可拖拽调整</p>
            </div>
          </MScale>
        </MDiv>
      </div>
      
      <div class="demo-item">
        <h5>containY 模式</h5>
        <MDiv class="scale-wrapper">
          <MScale :designWidth="200" :designHeight="150" fit="containY">
            <div class="content containy">
              <p>containY 模式</p>
              <p>按高度比例缩放</p>
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
  width: 300px;
  height: 200px;
  border: 2px solid #ddd;
  background: #f9f9f9;
}

.content {
  padding: 20px;
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

  &.fill {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  &.contain {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }

  &.containx {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }

  &.containy {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  }
}
</style> 