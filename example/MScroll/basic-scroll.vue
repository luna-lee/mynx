<template>
  <div class="m-l-20px m-r-20px">
    <p>最简单的横向滚动容器，内容超出容器宽度时可以滚动查看。</p>

    <MDiv style="border: 1px solid #ddd">
      <MScroll>
        <div style="display: flex; gap: 10px; padding: 20px">
          <div
            v-for="i in 20"
            :key="i"
            style="
              min-width: 120px;
              height: 80px;
              background: linear-gradient(45deg, #4caf50, #45a049);
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
            "
          >
            卡片 {{ i }}
          </div>
        </div>
      </MScroll>
    </MDiv>

    <div style="margin-top: 20px">
      <h4>文本内容滚动示例</h4>
      <MDiv style="border: 1px solid #eee; padding: 10px">
        <MScroll>
          <p style="white-space: nowrap; margin: 0">
            这是一段很长很长很长很长很长很长很长很长很长的文本内容，需要横向滚动才能完整查看所有内容。
            可以用鼠标拖拽滚动条或者使用滚轮进行滚动操作。
          </p>
        </MScroll>
      </MDiv>
    </div>

    <div style="margin-top: 20px; padding: 10px; background: #f5f5f5">
      <h4>说明</h4>
      <ul>
        <li>基础滚动容器不显示滚动按钮</li>
        <li>支持鼠标滚轮和拖拽滚动</li>
        <li>内容超出容器宽度时自动启用滚动</li>
        <li>滚动条样式可通过 CSS 变量自定义</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import MScroll from "../../packages/moon-ui/src/MScroll/index.vue";
import MDiv from "../../packages/moon-ui/src/MDiv/index.vue";
</script>
