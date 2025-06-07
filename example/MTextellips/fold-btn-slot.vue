<template>
  <div class="demo-container">
    <h4>自定义展开/收起按钮</h4>
    
    <div class="demo-item">
      <h5>默认展开按钮</h5>
      <MDiv class="text-wrapper">
        <MTextellips :lineClamp="2" :showFoldBtn="true">
          这是一段很长的文本内容，用来演示默认的展开和收起按钮样式。当文本超出指定行数时，会显示默认的展开按钮。拖拽容器边框可以调整大小。
        </MTextellips>
      </MDiv>
    </div>
    
    <div class="demo-item">
      <h5>自定义按钮样式</h5>
      <MDiv class="text-wrapper">
        <MTextellips :lineClamp="2" :showFoldBtn="true">
          <template #fold-btn="{ isExpanded }">
            <button class="custom-btn" :class="{ expanded: isExpanded }">
              <span>{{ isExpanded ? '收起' : '展开' }}</span>
              <svg class="icon" :class="{ rotated: isExpanded }" viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M7 10l5 5 5-5z"/>
              </svg>
            </button>
          </template>
          这是一段很长的文本内容，用来演示自定义展开和收起按钮的样式。你可以通过插槽来完全自定义按钮的外观和交互效果。拖拽容器边框可以调整容器大小，测试不同尺寸下的效果。
        </MTextellips>
      </MDiv>
    </div>
    
    <div class="demo-item">
      <h5>图标按钮</h5>
      <MDiv class="text-wrapper">
        <MTextellips :lineClamp="2" :showFoldBtn="true">
          <template #fold-btn="{ isExpanded }">
            <div class="icon-btn" :title="isExpanded ? '收起' : '展开'">
              <svg class="icon" :class="{ rotated: isExpanded }" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
              </svg>
            </div>
          </template>
          这是一段很长的文本内容，演示使用纯图标作为展开收起按钮的效果。图标会根据展开状态进行旋转动画。拖拽容器边框可以调整大小。
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

.custom-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1px solid #409eff;
  border-radius: 4px;
  background: #fff;
  color: #409eff;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #409eff;
    color: #fff;
  }

  &.expanded {
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;

    &:hover {
      background: #f78989;
      border-color: #f78989;
    }
  }

  .icon {
    transition: transform 0.3s;

    &.rotated {
      transform: rotate(180deg);
    }
  }
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #409eff;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #66b1ff;
    transform: scale(1.1);
  }

  .icon {
    transition: transform 0.3s;

    &.rotated {
      transform: rotate(180deg);
    }
  }
}
</style> 