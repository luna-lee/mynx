<template>
  <div class="m-l-20px m-r-20px">
    <p>通过 left-btn 和 right-btn 插槽可以自定义滚动按钮的样式和内容。</p>

    <MDiv style="border: 1px solid #ddd; margin: 20px 0">
      <h4>圆形图标按钮</h4>
      <MScroll :scrollBtnShow="true" :scrollStep="150">
        <template #left-btn="{ isScrollBegin }">
          <div
            style="
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: #4269fd;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
              transition: all 0.3s;
            "
            :style="{
              opacity: isScrollBegin ? 0.3 : 1,
              cursor: isScrollBegin ? 'not-allowed' : 'pointer',
              background: isScrollBegin ? '#ccc' : '#4269fd',
            }"
          >
            <span
              style="color: white; font-size: 16px; transform: rotate(180deg)"
              >▶</span
            >
          </div>
        </template>

        <template #right-btn="{ isScrollEnd }">
          <div
            style="
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: #4269fd;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
              transition: all 0.3s;
            "
            :style="{
              opacity: isScrollEnd ? 0.3 : 1,
              cursor: isScrollEnd ? 'not-allowed' : 'pointer',
              background: isScrollEnd ? '#ccc' : '#4269fd',
            }"
          >
            <span style="color: white; font-size: 16px">▶</span>
          </div>
        </template>

        <div style="display: flex; gap: 15px; padding: 20px">
          <div
            v-for="i in 10"
            :key="i"
            style="
              min-width: 140px;
              height: 80px;
              background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
            "
          >
            内容 {{ i }}
          </div>
        </div>
      </MScroll>
    </MDiv>

    <MDiv style="border: 1px solid #ddd; margin: 20px 0">
      <h4>文字按钮</h4>
      <MScroll :scrollBtnShow="true" :scrollStep="120">
        <template #left-btn="{ isScrollBegin }">
          <div
            style="
              padding: 5px 8px;
              background: rgba(0, 0, 0, 0.7);
              color: white;
              border-radius: 4px;
              font-size: 12px;
              cursor: pointer;
              transition: all 0.3s;
            "
            :style="{
              opacity: isScrollBegin ? 0.3 : 1,
              cursor: isScrollBegin ? 'not-allowed' : 'pointer',
            }"
          >
            ← 上一页
          </div>
        </template>

        <template #right-btn="{ isScrollEnd }">
          <div
            style="
              padding: 5px 8px;
              background: rgba(0, 0, 0, 0.7);
              color: white;
              border-radius: 4px;
              font-size: 12px;
              cursor: pointer;
              transition: all 0.3s;
            "
            :style="{
              opacity: isScrollEnd ? 0.3 : 1,
              cursor: isScrollEnd ? 'not-allowed' : 'pointer',
            }"
          >
            下一页 →
          </div>
        </template>

        <div style="display: flex; gap: 10px; padding: 15px">
          <div
            v-for="i in 15"
            :key="i"
            style="
              min-width: 100px;
              height: 70px;
              background: #34495e;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 14px;
            "
          >
            第{{ i }}页
          </div>
        </div>
      </MScroll>
    </MDiv>

    <MDiv style="border: 1px solid #ddd; margin: 20px 0">
      <h4>带状态指示的按钮</h4>
      <MScroll :scrollBtnShow="true" :scrollStep="100">
        <template #left-btn="{ isScrollBegin }">
          <div
            style="
              width: 25px;
              height: 60px;
              background: linear-gradient(to bottom, #667eea, #764ba2);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.3s;
              position: relative;
            "
            :style="{
              opacity: isScrollBegin ? 0.4 : 1,
              cursor: isScrollBegin ? 'not-allowed' : 'pointer',
            }"
          >
            <span style="color: white; font-size: 14px">‹</span>
            <div
              v-if="isScrollBegin"
              style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 2px;
                height: 20px;
                background: #ff4757;
                border-radius: 1px;
                transform: rotate(45deg);
              "
            ></div>
          </div>
        </template>

        <template #right-btn="{ isScrollEnd }">
          <div
            style="
              width: 25px;
              height: 60px;
              background: linear-gradient(to bottom, #667eea, #764ba2);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.3s;
              position: relative;
            "
            :style="{
              opacity: isScrollEnd ? 0.4 : 1,
              cursor: isScrollEnd ? 'not-allowed' : 'pointer',
            }"
          >
            <span style="color: white; font-size: 14px">›</span>
            <div
              v-if="isScrollEnd"
              style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 2px;
                height: 20px;
                background: #ff4757;
                border-radius: 1px;
                transform: rotate(45deg);
              "
            ></div>
          </div>
        </template>

        <div style="display: flex; gap: 8px; padding: 15px">
          <div
            v-for="i in 20"
            :key="i"
            style="
              min-width: 80px;
              height: 60px;
              background: #f39c12;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
            "
          >
            {{ i }}
          </div>
        </div>
      </MScroll>
    </MDiv>

    <div style="margin-top: 20px; padding: 10px; background: #f5f5f5">
      <h4>自定义按钮说明</h4>
      <ul>
        <li>
          <strong>插槽参数:</strong> left-btn 接收 { isScrollBegin }，right-btn
          接收 { isScrollEnd }
        </li>
        <li><strong>状态指示:</strong> 可以根据滚动状态显示不同的按钮样式</li>
        <li><strong>交互反馈:</strong> 建议在禁用状态下改变样式和鼠标指针</li>
        <li><strong>尺寸适配:</strong> 按钮大小应该与容器高度相适应</li>
        <li><strong>视觉层次:</strong> 按钮应该有足够的对比度和可见性</li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>
