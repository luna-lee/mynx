<template>
  <div class="demo-container">
    <MDiv style="width: 300px; height: 200px; border: 1px solid #ddd;">
      <div class="content">
        <h5>这是MDiv的默认插槽</h5>
        <p>可以放置任意内容，这个容器支持拖拽调整大小。</p>
        <p>尝试拖拽边框和角落来调整大小！</p>
      </div>
    </MDiv>
  </div>
</template>

<script setup lang="ts">
// 无需额外的逻辑
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}

.content {
  padding: 15px;
  background: #f5f7fa;
  border-radius: 4px;
  color: #333;
  height: 100%;
  box-sizing: border-box;

  h5 {
    margin: 0 0 10px 0;
    color: #409eff;
  }

  p {
    margin: 0 0 8px 0;
    line-height: 1.5;
    font-size: 14px;
  }
}
</style> 