<template>
  <div class="demo-container">
    <div class="demo-item">
      <div class="container-wrapper">
        <MList
          v-model="selectedValue4"
          :showMoreBtn="true"
          :overflowX="true"
          class="overflow-container"
        >
          <div
            key="action1"
            class="action-item"
            @click="handleIconMenuClick('action1')"
          >
            <span>📁</span> 文件
          </div>
          <div key="action2" class="action-item"><span>✏️</span> 编辑</div>
          <div key="action3" class="action-item"><span>🗑️</span> 删除</div>
          <div key="action4" class="action-item"><span>📤</span> 分享</div>
          <div key="action5" class="action-item"><span>⚙️</span> 设置</div>

          <template #moreBtn="{ vnodeList }">
            <div class="icon-more" @click="showIconMenu = !showIconMenu">
              <button class="icon-more-btn">
                <span class="dots">⋯</span>
              </button>
              <div v-show="showIconMenu" class="icon-menu">
                <component
                  :is="item"
                  v-for="item in vnodeList"
                  :key="item.key"
                  class="icon-menu-item"
                  :vnode="item"
                >
                </component>
              </div>
            </div>
          </template>
        </MList>
      </div>
      <p>当前选中：{{ selectedValue4 }}</p>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref } from "vue";

const selectedValue4 = ref<string | null>(null);
const showIconMenu = ref(false);
const handleIconMenuClick = (key: string) => {
  selectedValue4.value = key;
  showIconMenu.value = false;
};
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}

.container-wrapper {
  width: 300px;
  border: 2px dashed #ccc;
  padding: 10px;
  border-radius: 6px;
  background: #f9f9f9;
}

.overflow-container {
  display: flex;
  gap: 8px;
  white-space: nowrap;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: #f0f8ff;
    border-color: #409eff;
  }

  &.active {
    background: #409eff;
    color: white;
    border-color: #409eff;
  }
}

// 图标更多按钮
.icon-more {
  position: relative;

  .icon-more-btn {
    width: 36px;
    height: 36px;
    background: #fd79a8;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    .dots {
      color: white;
      font-size: 18px;
      transform: rotate(90deg);
    }

    &:hover {
      background: #e84393;
      transform: scale(1.1);
    }
  }

  .icon-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    min-width: 150px;

    .icon-menu-item {
      padding: 12px 16px;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: #f8f9fa;
      }

      &:first-child {
        border-radius: 6px 6px 0 0;
      }

      &:last-child {
        border-radius: 0 0 6px 6px;
      }
    }
  }
}
</style>
