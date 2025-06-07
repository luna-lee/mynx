<template>
  <div class="demo-container">
    <h4>默认插槽内容</h4>

    <div class="demo-item">
      <h5>使用默认插槽显示文本</h5>
      <MDiv class="text-wrapper">
        <MTextellips :lineClamp="1" showFoldBtn>
          这是通过默认插槽传入的长文本内容，当文本超出容器宽度时会显示省略号。
        </MTextellips>
      </MDiv>
    </div>

    <div class="demo-item">
      <h5>多行文本省略</h5>
      <MDiv class="text-wrapper">
        <MTextellips :lineClamp="3">
          这是一段很长的文本内容，用来演示多行文本省略的效果。当文本内容超过指定的行数时，会在最后一行显示省略号。这个组件支持自定义行数限制，也支持展开和收起功能。你可以通过鼠标悬停来查看完整的文本内容。拖拽容器边框可以动态调整容器大小，观察文本省略的变化。
        </MTextellips>
      </MDiv>
    </div>

    <div class="demo-item">
      <h5>带展开按钮的文本</h5>
      <MDiv class="text-wrapper">
        <MTextellips :lineClamp="2" :showFoldBtn="true">
          这是一段支持展开和收起的长文本内容。当文本超出指定行数时，会显示展开按钮，点击可以查看完整内容。再次点击可以收起文本。这个功能对于显示文章摘要或者长描述文本非常有用。通过拖拽容器边框可以调整容器大小，测试不同尺寸下的文本省略效果。
        </MTextellips>
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

.demo-item {
  margin-bottom: 30px;

  h5 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 14px;
  }
}

.text-wrapper {
  width: 400px;
  height: 120px;
  padding: 15px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  line-height: 1.5;
  color: #606266;
}
</style>
