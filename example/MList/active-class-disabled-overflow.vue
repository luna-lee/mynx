<template>
  <div class="demo-container">
    <h3>MList Props 综合示例</h3>

    <div class="demo-item">
      <h4>自定义选中状态样式 (activeClass & activeClassHalf)</h4>
      <div class="control-panel">
        <label>activeClass:</label>
        <select v-model="customActiveClass">
          <option value="custom-active">自定义激活样式</option>
          <option value="highlight">高亮样式</option>
          <option value="selected">选中样式</option>
        </select>

        <label>activeClassHalf:</label>
        <select v-model="customActiveClassHalf">
          <option value="custom-half">自定义半选样式</option>
          <option value="partial">部分样式</option>
          <option value="semi">半透明样式</option>
        </select>
      </div>

      <MList
        v-model="selectedValue1"
        :activeClass="customActiveClass"
        :activeClassHalf="customActiveClassHalf"
        class="style-list"
      >
        <div key="parent1" class="style-item">父级选项 1</div>
        <div key="parent1-child1" class="style-item">子选项 1-1</div>
        <div key="parent1-child2" class="style-item">子选项 1-2</div>
        <div key="parent2" class="style-item">父级选项 2</div>
        <div key="parent2-child1" class="style-item">子选项 2-1</div>
      </MList>

      <p>
        当前选中：<strong>{{ selectedValue1 || "未选择" }}</strong>
      </p>
      <p class="tip">💡 选择"parent1"会使所有"parent1-*"项显示半选状态</p>
    </div>

    <div class="demo-item">
      <h4>禁用状态 (disabled)</h4>
      <div class="control-panel">
        <label>
          <input type="checkbox" v-model="isDisabled" />
          启用禁用状态
        </label>
        <button @click="selectedValue2 = 'item2'" :disabled="isDisabled">
          外部设置选中项2
        </button>
      </div>

      <MList
        v-model="selectedValue2"
        :disabled="isDisabled"
        class="disabled-list"
      >
        <div key="item1" class="disabled-item">项目 1</div>
        <div key="item2" class="disabled-item">项目 2</div>
        <div key="item3" class="disabled-item">项目 3</div>
        <div key="item4" class="disabled-item">项目 4</div>
      </MList>

      <p>
        当前选中：<strong>{{ selectedValue2 || "未选择" }}</strong>
      </p>
      <p class="tip">💡 禁用状态下点击列表项不会改变选中状态</p>
    </div>

    <div class="demo-item">
      <h4>水平溢出处理 (overflowX)</h4>
      <div class="control-panel">
        <label>
          <input type="checkbox" v-model="enableOverflowX" />
          启用水平溢出处理
        </label>
        <label>
          <input type="checkbox" v-model="showMoreBtnX" />
          显示更多按钮
        </label>
        <span>容器宽度: 300px (固定)</span>
      </div>

      <div class="overflow-container-x">
        <MList
          :key="enableOverflowX + ''"
          v-model="selectedValue3"
          :overflowX="enableOverflowX"
          :overflowY="false"
          :showMoreBtn="showMoreBtnX"
          class="overflow-list-x"
        >
          <div key="tag1" class="overflow-item">标签 1</div>
          <div key="tag2" class="overflow-item">标签 2</div>
          <div key="tag3" class="overflow-item">标签 3</div>
          <div key="tag4" class="overflow-item">标签 4</div>
          <div key="tag5" class="overflow-item">标签 5</div>
          <div key="tag6" class="overflow-item">标签 6</div>
          <div key="tag7" class="overflow-item">标签 7</div>
          <div key="tag8" class="overflow-item">标签 8</div>

          <template #moreBtn="{ vnodeList }">
            <button class="overflow-more-btn">+{{ vnodeList.length }}</button>
          </template>
        </MList>
      </div>

      <p>
        当前选中：<strong>{{ selectedValue3 || "未选择" }}</strong>
      </p>
      <p class="tip">💡 启用溢出处理后，超出容器的项目会被隐藏并显示更多按钮</p>
    </div>

    <div class="demo-item">
      <h4>垂直溢出处理 (overflowY)</h4>
      <div class="control-panel">
        <label>
          <input type="checkbox" v-model="enableOverflowY" />
          启用垂直溢出处理
        </label>
        <label>
          <input type="checkbox" v-model="showMoreBtnY" />
          显示更多按钮
        </label>
        <span>容器高度: 120px (固定)</span>
      </div>

      <div class="overflow-container-y">
        <MList
          v-model="selectedValue4"
          :key="enableOverflowY + ''"
          :overflowX="false"
          :overflowY="enableOverflowY"
          :showMoreBtn="showMoreBtnY"
          @moreVnodeList="handleOverflowYMoreVnode"
          class="overflow-list-y"
        >
          <div key="row1" class="overflow-row">行 1</div>
          <div key="row2" class="overflow-row">行 2</div>
          <div key="row3" class="overflow-row">行 3</div>
          <div key="row4" class="overflow-row">行 4</div>
          <div key="row5" class="overflow-row">行 5</div>
          <div key="row6" class="overflow-row">行 6</div>
          <div key="row7" class="overflow-row">行 7</div>

          <template #moreBtn="{ vnodeList }">
            <div
              class="overflow-more-dropdown"
              @click="showOverflowDropdown = !showOverflowDropdown"
            >
              <div class="overflow-more-btn-y">
                <span class="more-text">查看更多</span>
                <span class="more-count">{{ vnodeList.length }}</span>
                <span
                  class="more-arrow"
                  :class="{ 'arrow-up': showOverflowDropdown }"
                  >↓</span
                >
              </div>
              <div
                class="overflow-dropdown-content"
                v-if="showOverflowDropdown"
              >
                <div class="overflow-dropdown-header">
                  <span>隐藏的 {{ overflowYHiddenItems.length }} 个项目：</span>
                </div>
                <div class="overflow-dropdown-list">
                  <component
                    :is="item"
                    v-for="item in overflowYHiddenItems"
                    :key="item.key"
                  />
                </div>
              </div>
            </div>
          </template>
        </MList>
      </div>

      <p>
        当前选中：<strong>{{ selectedValue4 || "未选择" }}</strong>
      </p>
      <p class="tip">
        💡
        启用垂直溢出处理后，超出容器高度的项目会被隐藏，点击"查看更多"展开下拉菜单选择
      </p>
    </div>

    <div class="demo-item">
      <h4>综合示例：响应式卡片列表</h4>
      <div class="control-panel">
        <label>
          <input type="checkbox" v-model="responsiveDisabled" />
          禁用交互
        </label>
        <button @click="addCard">添加卡片</button>
        <button @click="removeCard">删除卡片</button>
        <span>卡片数量：{{ cards.length }}</span>
      </div>

      <div class="responsive-container">
        <MList
          v-model="selectedCard"
          :disabled="responsiveDisabled"
          :overflowX="true"
          :overflowY="false"
          :showMoreBtn="true"
          activeClass="card-selected"
          activeClassHalf="card-partial"
          class="responsive-list"
          :key="cards.length"
        >
          <div v-for="card in cards" :key="card.id" class="responsive-card">
            <div class="card-header">{{ card.title }}</div>
            <div class="card-content">{{ card.content }}</div>
            <div class="card-footer">{{ card.date }}</div>
          </div>

          <template #moreBtn="{ vnodeList }">
            <div class="responsive-more">
              <div class="more-icon">⋯</div>
              <div class="more-count">{{ vnodeList.length }}</div>
            </div>
          </template>
        </MList>
      </div>

      <p>
        当前选中：<strong>{{ selectedCard || "未选择" }}</strong>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedValue1 = ref<string | null>(null);
const selectedValue2 = ref<string | null>(null);
const selectedValue3 = ref<string | null>(null);
const selectedValue4 = ref<string | null>(null);
const selectedCard = ref<string | null>(null);

const customActiveClass = ref("custom-active");
const customActiveClassHalf = ref("custom-half");
const isDisabled = ref(false);
const enableOverflowX = ref(true);
const enableOverflowY = ref(true);
const showMoreBtnX = ref(true);
const showMoreBtnY = ref(true);
const responsiveDisabled = ref(false);

// 垂直溢出相关状态
const showOverflowDropdown = ref(false);
const overflowYHiddenItems = ref<any[]>([]);

// 响应式卡片数据
const cards = ref([
  {
    id: "card1",
    title: "卡片 1",
    content: "这是第一张卡片",
    date: "2024-01-01",
  },
  {
    id: "card2",
    title: "卡片 2",
    content: "这是第二张卡片",
    date: "2024-01-02",
  },
  {
    id: "card3",
    title: "卡片 3",
    content: "这是第三张卡片",
    date: "2024-01-03",
  },
  {
    id: "card4",
    title: "卡片 4",
    content: "这是第四张卡片",
    date: "2024-01-04",
  },
  {
    id: "card5",
    title: "卡片 5",
    content: "这是第五张卡片",
    date: "2024-01-05",
  },
]);

/**
 * 添加卡片
 */
const addCard = () => {
  const newId = `card${cards.value.length + 1}`;
  cards.value.push({
    id: newId,
    title: `卡片 ${cards.value.length + 1}`,
    content: `这是第${cards.value.length + 1}张卡片`,
    date: new Date().toLocaleDateString(),
  });
};

/**
 * 删除卡片
 */
const removeCard = () => {
  if (cards.value.length > 2) {
    const removed = cards.value.pop();
    if (removed && selectedCard.value === removed.id) {
      selectedCard.value = null;
    }
  }
};

/**
 * 处理垂直溢出的moreVnodeList事件
 */
const handleOverflowYMoreVnode = (vnodeList: any[]) => {
  overflowYHiddenItems.value = vnodeList;
};
/**
 * 切换溢出下拉菜单的显示状态
 */
const toggleOverflowDropdown = () => {
  showOverflowDropdown.value = !showOverflowDropdown.value;
};

/**
 * 点击外部区域关闭下拉框
 */
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  const dropdown = document.querySelector(".overflow-more-dropdown");
  if (dropdown && !dropdown.contains(target)) {
    showOverflowDropdown.value = false;
  }
};

// 监听全局点击事件
if (typeof window !== "undefined") {
  document.addEventListener("click", handleClickOutside);
}
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
    font-size: 14px;

    &.tip {
      color: #666;
      font-style: italic;
      background: #f8f9fa;
      padding: 8px 12px;
      border-radius: 4px;
      border-left: 3px solid #409eff;
    }
  }
}

.control-panel {
  margin-bottom: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;

  label {
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  select,
  input[type="checkbox"] {
    margin-left: 5px;
  }

  select {
    padding: 4px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    padding: 6px 12px;
    background: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;

    &:hover:not(:disabled) {
      background: #337ecc;
    }

    &:disabled {
      background: #c0c4cc;
      cursor: not-allowed;
    }
  }
}

// 自定义样式列表
.style-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fafafa;
}

.style-item {
  padding: 10px 15px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f8ff;
    border-color: #409eff;
  }

  // 自定义激活样式
  &.custom-active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: #667eea;
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  &.highlight {
    background: #ffeb3b;
    color: #333;
    border-color: #ffc107;
    font-weight: bold;
  }

  &.selected {
    background: #4caf50;
    color: white;
    border-color: #45a049;
  }

  // 自定义半选样式
  &.custom-half {
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.3) 0%,
      rgba(118, 75, 162, 0.3) 100%
    );
    border-color: #667eea;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 2px;
      right: 2px;
      width: 8px;
      height: 8px;
      background: #667eea;
      border-radius: 50%;
    }
  }

  &.partial {
    background: rgba(255, 193, 7, 0.3);
    border-color: #ffc107;
    border-style: dashed;
  }

  &.semi {
    background: rgba(76, 175, 80, 0.5);
    border-color: #4caf50;
    opacity: 0.7;
  }
}

// 禁用列表
.disabled-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fafafa;

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}

.disabled-item {
  padding: 10px 15px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

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

// 水平溢出容器
.overflow-container-x {
  width: 300px;
  border: 2px dashed #ccc;
  border-radius: 6px;
  padding: 10px;
  background: #f9f9f9;
}

.overflow-list-x {
  display: flex;
  gap: 8px;
  overflow: hidden;
}

.overflow-item {
  padding: 8px 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  white-space: nowrap;

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

.overflow-more-btn {
  padding: 8px 12px;
  background: #e17055;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  flex-shrink: 0;

  &:hover {
    background: #d63031;
  }
}

// 垂直溢出容器
.overflow-container-y {
  height: 120px;
  border: 2px dashed #ccc;
  border-radius: 6px;
  padding: 10px;
  background: #f9f9f9;
}

.overflow-list-y {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.overflow-row {
  padding: 10px 15px;
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

.overflow-more-dropdown {
  position: relative;
  cursor: pointer;
}

.overflow-more-btn-y {
  padding: 8px 15px;
  background: #00b894;
  color: white;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  .more-arrow {
    transition: transform 0.3s ease;

    &.arrow-up {
      transform: rotate(180deg);
    }
  }

  &:hover {
    background: #00a085;
  }
}

.overflow-dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 200px;
  overflow: auto;
}

.overflow-dropdown-header {
  padding: 8px 15px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 8px;
}

.overflow-dropdown-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.overflow-dropdown-item {
  padding: 10px 15px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e0e0e0;
  }
}

// 响应式卡片
.responsive-container {
  max-width: 600px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 15px;
  background: #f9f9f9;
}

.responsive-list {
  display: flex;
  gap: 15px;
  overflow: hidden;
  width: 400px;
  border: 1px solid red;
}

.responsive-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  min-width: 180px;

  .card-header {
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }

  .card-content {
    color: #666;
    font-size: 14px;
    margin-bottom: 8px;
  }

  .card-footer {
    color: #999;
    font-size: 12px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.card-selected {
    border-color: #409eff;
    background: linear-gradient(135deg, #409eff 0%, #337ecc 100%);
    color: white;

    .card-header,
    .card-content,
    .card-footer {
      color: white;
    }
  }

  &.card-partial {
    border-color: #409eff;
    background: rgba(64, 158, 255, 0.1);

    &::before {
      content: "◐";
      position: absolute;
      top: 10px;
      right: 10px;
      color: #409eff;
      font-size: 16px;
    }
  }
}

.responsive-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #6c5ce7;
  color: white;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;

  .more-icon {
    font-size: 24px;
    margin-bottom: 5px;
  }

  .more-count {
    font-size: 12px;
    opacity: 0.8;
  }

  &:hover {
    background: #5f3dc4;
    transform: scale(1.05);
  }
}
</style>
