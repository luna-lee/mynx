<template>
  <div class="demo-container">
    <h3>MList moreBtn插槽示例</h3>

    <div class="demo-item">
      <h4>基础更多按钮</h4>
      <div class="container-wrapper">
        <MList
          v-model="selectedValue1"
          :showMoreBtn="true"
          :overflowX="true"
          class="overflow-container"
        >
          <div key="item1" class="list-item">项目 1</div>
          <div key="item2" class="list-item">项目 2</div>
          <div key="item3" class="list-item">项目 3</div>
          <div key="item4" class="list-item">项目 4</div>
          <div key="item5" class="list-item">项目 5</div>
          <div key="item6" class="list-item">项目 6</div>
          <div key="item7" class="list-item">项目 7</div>
          <div key="item8" class="list-item">项目 8</div>

          <template #moreBtn="{ vnodeList }">
            <button class="more-btn-basic">
              更多 ({{ vnodeList.length }})
            </button>
          </template>
        </MList>
      </div>
      <p>当前选中：{{ selectedValue1 }}</p>
    </div>

    <div class="demo-item">
      <h4>自定义下拉更多按钮</h4>
      <div class="container-wrapper">
        <MList
          v-model="selectedValue2"
          :showMoreBtn="true"
          :overflowX="true"
          class="overflow-container"
        >
          <div key="tab1" class="tab-item">标签 1</div>
          <div key="tab2" class="tab-item">标签 2</div>
          <div key="tab3" class="tab-item">标签 3</div>
          <div key="tab4" class="tab-item">标签 4</div>
          <div key="tab5" class="tab-item">标签 5</div>
          <div key="tab6" class="tab-item">标签 6</div>

          <template #moreBtn="{ vnodeList }">
            <div class="dropdown-more" @click="toggleDropdown">
              <button class="dropdown-btn">
                <span>更多</span>
                <span class="arrow" :class="{ 'arrow-up': showDropdown }"
                  >▼</span
                >
              </button>
              <div v-show="showDropdown" class="dropdown-content">
                <div
                  v-for="(item, index) in vnodeList"
                  :key="item.key || index"
                  class="dropdown-item"
                  @click="handleDropdownItemClick(item.key)"
                >
                  {{ getItemText(item) }}
                </div>
              </div>
            </div>
          </template>
        </MList>
      </div>
      <p>当前选中：{{ selectedValue2 }}</p>
    </div>

    <div class="demo-item">
      <h4>弹窗式更多按钮</h4>
      <div class="container-wrapper">
        <MList
          v-model="selectedValue3"
          :showMoreBtn="true"
          :overflowX="true"
          class="overflow-container"
          @moreVnodeList="handleMoreVnodeList"
        >
          <div key="option1" class="option-item">选项 1</div>
          <div key="option2" class="option-item">选项 2</div>
          <div key="option3" class="option-item">选项 3</div>
          <div key="option4" class="option-item">选项 4</div>
          <div key="option5" class="option-item">选项 5</div>
          <div key="option6" class="option-item">选项 6</div>
          <div key="option7" class="option-item">选项 7</div>

          <template #moreBtn="{ vnodeList }">
            <button class="modal-more-btn" @click="showModal = true">
              <span class="icon">⋯</span>
              <span>{{ vnodeList.length }}+</span>
            </button>
          </template>
        </MList>
      </div>

      <!-- 弹窗 -->
      <div v-show="showModal" class="modal-overlay" @click="showModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h5>选择更多选项</h5>
            <button class="close-btn" @click="showModal = false">×</button>
          </div>
          <div class="modal-body">
            <component
              :is="item"
              v-for="item in hiddenItems"
              :key="item.key"
              class="modal-item"
              :vnode="item"
            >
            </component>
          </div>
        </div>
      </div>

      <p>当前选中：{{ selectedValue3 }}</p>
    </div>

    <div class="demo-item">
      <h4>图标式更多按钮</h4>
      <div class="container-wrapper">
        {{ selectedValue4 }}
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
            <div class="icon-more" @click="toggleIconMenu">
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
import { ref, computed } from "vue";

const selectedValue1 = ref<string | null>(null);
const selectedValue2 = ref<string | null>(null);
const selectedValue3 = ref<string | null>(null);
const selectedValue4 = ref<string | null>(null);

const showDropdown = ref(false);
const showModal = ref(false);
const showIconMenu = ref(false);
const hiddenItems = ref<any[]>([]);
const handleMoreVnodeList = (vnodeList: any[]) => {
  hiddenItems.value = vnodeList;
};
/**
 * 切换下拉菜单显示状态
 */
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

/**
 * 处理下拉菜单项点击
 */
const handleDropdownItemClick = (key: string | number) => {
  selectedValue2.value = String(key);
  showDropdown.value = false;
};

/**
 * 选择弹窗中的项目
 */
const selectModalItem = (key: string | number) => {
  selectedValue3.value = String(key);
  showModal.value = false;
};

/**
 * 切换图标菜单显示状态
 */
const toggleIconMenu = () => {
  showIconMenu.value = !showIconMenu.value;
};

/**
 * 处理图标菜单点击
 */
const handleIconMenuClick = (key: string) => {
  selectedValue4.value = key;
  showIconMenu.value = false;
};

/**
 * 获取项目文本内容
 */
const getItemText = (item: any) => {
  if (item && item.children) {
    return item.children;
  }
  return item?.props?.children || "未知项目";
};
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}

.demo-item {
  margin-bottom: 40px;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 8px;

  h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #666;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  p {
    margin-top: 15px;
    color: #333;
    font-weight: 500;
  }
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

.list-item,
.tab-item,
.option-item,
.action-item {
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

.action-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

// 基础更多按钮
.more-btn-basic {
  padding: 8px 16px;
  background: #e17055;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: #d63031;
    transform: scale(1.05);
  }
}

// 下拉更多按钮
.dropdown-more {
  position: relative;

  .dropdown-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    background: #00b894;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #00a085;
    }

    .arrow {
      transition: transform 0.3s ease;

      &.arrow-up {
        transform: rotate(180deg);
      }
    }
  }

  .dropdown-content {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    min-width: 120px;

    .dropdown-item {
      padding: 10px 15px;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: #f5f5f5;
      }

      &:first-child {
        border-radius: 4px 4px 0 0;
      }

      &:last-child {
        border-radius: 0 0 4px 4px;
      }
    }
  }
}

// 弹窗更多按钮
.modal-more-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: #6c5ce7;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  .icon {
    font-size: 16px;
  }

  &:hover {
    background: #5f3dc4;
    transform: scale(1.05);
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;

  .modal-content {
    background: white;
    border-radius: 8px;
    min-width: 300px;
    max-width: 90vw;
    max-height: 90vh;
    overflow: hidden;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid #eee;

      h5 {
        margin: 0;
        color: #333;
      }

      .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #999;

        &:hover {
          color: #333;
        }
      }
    }

    .modal-body {
      padding: 20px;
      max-height: 300px;
      overflow-y: auto;

      .modal-item {
        padding: 10px 15px;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.3s ease;
        margin-bottom: 5px;

        &:hover {
          background: #f5f5f5;
        }

        &.active {
          background: #409eff;
          color: white;
        }
      }
    }
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
