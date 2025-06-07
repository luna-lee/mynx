<template>
  <div class="demo-container">
    <h4>默认插槽内容</h4>
    <div class="scale-wrapper">
      <MDiv style="width: 600px; height: 400px; border: 1px solid #ddd;">
        <MScale :designWidth="400" :designHeight="300" style="border: 2px solid #409eff;">
          <div class="content">
            <h3>这是MScale的默认插槽</h3>
            <p>设计稿尺寸：400x300</p>
            <p>内容会根据容器大小自动缩放</p>
            <p>外层MDiv支持拖拽调整大小</p>
            <div class="demo-box">演示区域</div>
          </div>
        </MScale>
      </MDiv>
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

.scale-wrapper {
  margin: 20px 0;
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

  h3 {
    margin: 0 0 15px 0;
    font-size: 24px;
  }

  p {
    margin: 5px 0;
    font-size: 16px;
  }

  .demo-box {
    margin-top: 20px;
    padding: 15px 30px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
  }
}
</style> 