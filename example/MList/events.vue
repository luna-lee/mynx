<template>
  <div class="demo-container">
    <h3>MList Events 事件示例</h3>

    <div class="demo-item">
      <h4>update:modelValue 事件</h4>
      <p class="description">双向绑定值变化时触发</p>

      <MList
        v-model="selectedValue1"
        @update:modelValue="handleModelValueUpdate"
        class="event-list"
      >
        <div key="option1" class="event-item">选项 1</div>
        <div key="option2" class="event-item">选项 2</div>
        <div key="option3" class="event-item">选项 3</div>
        <div key="option4" class="event-item">选项 4</div>
      </MList>

      <div class="event-log">
        <h5>事件日志：</h5>
        <div class="log-list">
          <div
            v-for="(log, index) in modelValueLogs"
            :key="index"
            class="log-item"
          >
            <span class="log-time">{{ log.time }}</span>
            <span class="log-event">update:modelValue</span>
            <span class="log-value">{{ log.value }}</span>
          </div>
        </div>
        <button @click="modelValueLogs = []" class="clear-btn">清空日志</button>
      </div>
    </div>

    <div class="demo-item">
      <h4>sliceIndex 事件</h4>
      <p class="description">切片索引变化时触发，用于溢出处理</p>

      <div class="overflow-demo">
        <div class="container-wrapper">
          <MDiv style="width: 260px; border: 1px solid #409eff">
            <MList
              v-model="selectedValue2"
              :showMoreBtn="true"
              :overflowX="true"
              @sliceIndex="handleSliceIndex"
              class="slice-list"
            >
              <div key="item1" class="slice-item">项目 1</div>
              <div key="item2" class="slice-item">项目 2</div>
              <div key="item3" class="slice-item">项目 3</div>
              <div key="item4" class="slice-item">项目 4</div>
              <div key="item5" class="slice-item">项目 5</div>
              <div key="item6" class="slice-item">项目 6</div>
              <div key="item7" class="slice-item">项目 7</div>
              <div key="item8" class="slice-item">项目 8</div>

              <template #moreBtn="{ vnodeList }">
                <button class="slice-more-btn">+{{ vnodeList.length }}</button>
              </template>
            </MList>
          </MDiv>
        </div>

        <div class="slice-info">
          <p><strong>当前切片索引：</strong>{{ currentSliceIndex }}</p>
          <p><strong>显示项目数：</strong>{{ currentSliceIndex }}</p>
          <p>
            <strong>隐藏项目数：</strong
            >{{ Math.max(0, 8 - currentSliceIndex) }}
          </p>
        </div>
      </div>

      <div class="event-log">
        <h5>sliceIndex 事件日志：</h5>
        <div class="log-list">
          <div
            v-for="(log, index) in sliceIndexLogs"
            :key="index"
            class="log-item"
          >
            <span class="log-time">{{ log.time }}</span>
            <span class="log-event">sliceIndex</span>
            <span class="log-value">{{ log.value }}</span>
          </div>
        </div>
        <button @click="sliceIndexLogs = []" class="clear-btn">清空日志</button>
      </div>
    </div>

    <div class="demo-item">
      <h4>moreVnodeList 事件</h4>
      <p class="description">更多VNode列表变化时触发</p>

      <div class="vnode-demo">
        <div class="container-wrapper">
          <MList
            v-model="selectedValue3"
            :showMoreBtn="true"
            :overflowY="true"
            @moreVnodeList="handleMoreVnodeList"
            class="vnode-list"
          >
            <div key="card1" class="vnode-card">卡片 1</div>
            <div key="card2" class="vnode-card">卡片 2</div>
            <div key="card3" class="vnode-card">卡片 3</div>
            <div key="card4" class="vnode-card">卡片 4</div>
            <div key="card5" class="vnode-card">卡片 5</div>
            <div key="card6" class="vnode-card">卡片 6</div>

            <template #moreBtn="{ vnodeList }">
              <div class="vnode-more-btn">
                <span>查看更多</span>
                <span class="badge">{{ vnodeList.length }}</span>
              </div>
            </template>
          </MList>
        </div>

        <div class="vnode-info">
          <h5>隐藏的VNode信息：</h5>
          <div class="vnode-details">
            <p><strong>隐藏节点数量：</strong>{{ moreVnodeList.length }}</p>
            <div v-if="moreVnodeList.length > 0" class="vnode-keys">
              <strong>隐藏节点Key：</strong>
              <span
                v-for="(vnode, index) in moreVnodeList"
                :key="index"
                class="vnode-key"
              >
                {{ vnode.key || "unknown" }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="event-log">
        <h5>moreVnodeList 事件日志：</h5>
        <div class="log-list">
          <div
            v-for="(log, index) in moreVnodeListLogs"
            :key="index"
            class="log-item"
          >
            <span class="log-time">{{ log.time }}</span>
            <span class="log-event">moreVnodeList</span>
            <span class="log-value">{{ log.count }} 个VNode</span>
          </div>
        </div>
        <button @click="moreVnodeListLogs = []" class="clear-btn">
          清空日志
        </button>
      </div>
    </div>

    <div class="demo-item">
      <h4>综合事件监听示例</h4>
      <p class="description">同时监听所有事件的综合示例</p>

      <div class="control-panel">
        <button @click="addComprehensiveItem">添加项目</button>
        <button @click="removeComprehensiveItem">删除项目</button>
        <button @click="toggleComprehensiveSize">切换容器大小</button>
        <span>项目数：{{ comprehensiveItems.length }}</span>
      </div>

      <div
        class="comprehensive-container"
        :class="{ 'small-container': isSmallContainer }"
      >
        <MList
          v-model="selectedValue4"
          :showMoreBtn="true"
          :overflowX="true"
          @update:modelValue="handleComprehensiveModelValue"
          @sliceIndex="handleComprehensiveSliceIndex"
          @moreVnodeList="handleComprehensiveMoreVnode"
          class="comprehensive-list"
        >
          <div
            v-for="item in comprehensiveItems"
            :key="item.id"
            class="comprehensive-item"
          >
            {{ item.label }}
          </div>

          <template #moreBtn="{ vnodeList }">
            <div class="comprehensive-more">
              <span class="more-text">更多</span>
              <span class="more-count">{{ vnodeList.length }}</span>
            </div>
          </template>
        </MList>
      </div>

      <div class="comprehensive-status">
        <div class="status-row">
          <strong>当前选中：</strong>{{ selectedValue4 || "未选择" }}
        </div>
        <div class="status-row">
          <strong>切片索引：</strong>{{ comprehensiveSliceIndex }}
        </div>
        <div class="status-row">
          <strong>隐藏节点：</strong>{{ comprehensiveMoreCount }}
        </div>
      </div>

      <div class="event-log">
        <h5>综合事件日志：</h5>
        <div class="log-list comprehensive-logs">
          <div
            v-for="(log, index) in comprehensiveLogs"
            :key="index"
            class="log-item"
            :class="`log-${log.type}`"
          >
            <span class="log-time">{{ log.time }}</span>
            <span class="log-event">{{ log.event }}</span>
            <span class="log-value">{{ log.value }}</span>
          </div>
        </div>
        <button @click="comprehensiveLogs = []" class="clear-btn">
          清空所有日志
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedValue1 = ref<string | null>(null);
const selectedValue2 = ref<string | null>(null);
const selectedValue3 = ref<string | null>(null);
const selectedValue4 = ref<string | null>(null);

// 事件日志
const modelValueLogs = ref<Array<{ time: string; value: any }>>([]);
const sliceIndexLogs = ref<Array<{ time: string; value: any }>>([]);
const moreVnodeListLogs = ref<Array<{ time: string; count: number }>>([]);
const comprehensiveLogs = ref<
  Array<{ time: string; event: string; value: any; type: string }>
>([]);

// sliceIndex相关
const currentSliceIndex = ref(0);

// moreVnodeList相关
const moreVnodeList = ref<any[]>([]);

// 综合示例相关
const comprehensiveItems = ref([
  { id: "comp1", label: "综合项目 1" },
  { id: "comp2", label: "综合项目 2" },
  { id: "comp3", label: "综合项目 3" },
  { id: "comp4", label: "综合项目 4" },
  { id: "comp5", label: "综合项目 5" },
]);
const isSmallContainer = ref(false);
const comprehensiveSliceIndex = ref(0);
const comprehensiveMoreCount = ref(0);

/**
 * 获取当前时间字符串
 */
const getCurrentTime = () => {
  return new Date().toLocaleTimeString();
};

/**
 * 处理modelValue更新事件
 */
const handleModelValueUpdate = (value: any) => {
  modelValueLogs.value.unshift({
    time: getCurrentTime(),
    value: value || "null",
  });
  // 限制日志数量
  if (modelValueLogs.value.length > 10) {
    modelValueLogs.value = modelValueLogs.value.slice(0, 10);
  }
};

/**
 * 处理sliceIndex事件
 */
const handleSliceIndex = (index: number) => {
  currentSliceIndex.value = index;
  sliceIndexLogs.value.unshift({
    time: getCurrentTime(),
    value: index,
  });
  if (sliceIndexLogs.value.length > 10) {
    sliceIndexLogs.value = sliceIndexLogs.value.slice(0, 10);
  }
};

/**
 * 处理moreVnodeList事件
 */
const handleMoreVnodeList = (vnodeList: any[]) => {
  moreVnodeList.value = vnodeList;
  moreVnodeListLogs.value.unshift({
    time: getCurrentTime(),
    count: vnodeList.length,
  });
  if (moreVnodeListLogs.value.length > 10) {
    moreVnodeListLogs.value = moreVnodeListLogs.value.slice(0, 10);
  }
};

/**
 * 添加综合示例项目
 */
const addComprehensiveItem = () => {
  const newId = `comp${comprehensiveItems.value.length + 1}`;
  comprehensiveItems.value.push({
    id: newId,
    label: `综合项目 ${comprehensiveItems.value.length + 1}`,
  });
};

/**
 * 删除综合示例项目
 */
const removeComprehensiveItem = () => {
  if (comprehensiveItems.value.length > 2) {
    const removed = comprehensiveItems.value.pop();
    if (removed && selectedValue4.value === removed.id) {
      selectedValue4.value = null;
    }
  }
};

/**
 * 切换容器大小
 */
const toggleComprehensiveSize = () => {
  isSmallContainer.value = !isSmallContainer.value;
};

/**
 * 处理综合示例的modelValue事件
 */
const handleComprehensiveModelValue = (value: any) => {
  comprehensiveLogs.value.unshift({
    time: getCurrentTime(),
    event: "update:modelValue",
    value: value || "null",
    type: "modelValue",
  });
  if (comprehensiveLogs.value.length > 20) {
    comprehensiveLogs.value = comprehensiveLogs.value.slice(0, 20);
  }
};

/**
 * 处理综合示例的sliceIndex事件
 */
const handleComprehensiveSliceIndex = (index: number) => {
  comprehensiveSliceIndex.value = index;
  comprehensiveLogs.value.unshift({
    time: getCurrentTime(),
    event: "sliceIndex",
    value: index,
    type: "sliceIndex",
  });
  if (comprehensiveLogs.value.length > 20) {
    comprehensiveLogs.value = comprehensiveLogs.value.slice(0, 20);
  }
};

/**
 * 处理综合示例的moreVnodeList事件
 */
const handleComprehensiveMoreVnode = (vnodeList: any[]) => {
  comprehensiveMoreCount.value = vnodeList.length;
  comprehensiveLogs.value.unshift({
    time: getCurrentTime(),
    event: "moreVnodeList",
    value: `${vnodeList.length} 个VNode`,
    type: "moreVnode",
  });
  if (comprehensiveLogs.value.length > 20) {
    comprehensiveLogs.value = comprehensiveLogs.value.slice(0, 20);
  }
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
    margin-bottom: 10px;
    color: #666;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  .description {
    margin: 0 0 20px 0;
    color: #888;
    font-style: italic;
    background: #f8f9fa;
    padding: 8px 12px;
    border-radius: 4px;
    border-left: 3px solid #409eff;
  }
}

.control-panel {
  margin-bottom: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  button {
    padding: 6px 12px;
    background: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;

    &:hover {
      background: #337ecc;
    }
  }
}

// 通用列表样式
.event-list,
.slice-list,
.vnode-list,
.comprehensive-list {
  display: flex;
  gap: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fafafa;
  margin-bottom: 20px;
}

.event-item,
.slice-item,
.vnode-card,
.comprehensive-item {
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

// 溢出演示
.overflow-demo,
.vnode-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.container-wrapper {
  width: 280px;
  border: 2px dashed #ccc;
  border-radius: 6px;
  padding: 10px;
  background: #f9f9f9;
}

.slice-list {
  overflow: hidden;
  white-space: nowrap;
}

.slice-item {
  flex-shrink: 0;
}

.slice-more-btn {
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

.slice-info,
.vnode-info {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;

  p {
    margin: 5px 0;
    font-size: 14px;
  }
}

// VNode演示
.vnode-list {
  height: 120px;
  overflow: hidden;
  flex-direction: column;
}

.vnode-card {
  flex-shrink: 0;
  margin-bottom: 5px;
}

.vnode-more-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #6c5ce7;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  .badge {
    background: rgba(255, 255, 255, 0.3);
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 12px;
  }

  &:hover {
    background: #5f3dc4;
  }
}

.vnode-details {
  .vnode-keys {
    margin-top: 10px;

    .vnode-key {
      display: inline-block;
      background: #409eff;
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
}

// 综合示例
.comprehensive-container {
  width: 500px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 15px;
  background: #f9f9f9;
  transition: width 0.3s ease;

  &.small-container {
    width: 300px;
  }
}

.comprehensive-list {
  overflow: hidden;
}

.comprehensive-more {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #fd79a8;
  color: white;
  border-radius: 20px;
  cursor: pointer;

  .more-count {
    background: rgba(255, 255, 255, 0.3);
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 12px;
  }

  &:hover {
    background: #e84393;
  }
}

.comprehensive-status {
  margin: 15px 0;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;

  .status-row {
    margin: 5px 0;
    font-size: 14px;
  }
}

// 事件日志
.event-log {
  margin-top: 20px;

  h5 {
    margin: 0 0 10px 0;
    color: #666;
    font-size: 16px;
  }

  .log-list {
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;

    &.comprehensive-logs {
      max-height: 300px;
    }
  }

  .log-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px solid #f5f5f5;
    font-size: 13px;
    font-family: "Monaco", "Consolas", monospace;

    &:last-child {
      border-bottom: none;
    }

    .log-time {
      color: #888;
      margin-right: 10px;
      min-width: 80px;
    }

    .log-event {
      color: #409eff;
      font-weight: 600;
      margin-right: 10px;
      min-width: 120px;
    }

    .log-value {
      color: #333;
      background: #f8f9fa;
      padding: 2px 6px;
      border-radius: 3px;
    }

    // 综合日志的不同类型样式
    &.log-modelValue {
      border-left: 3px solid #67c23a;
    }

    &.log-sliceIndex {
      border-left: 3px solid #e6a23c;
    }

    &.log-moreVnode {
      border-left: 3px solid #f56c6c;
    }
  }

  .clear-btn {
    margin-top: 10px;
    padding: 6px 12px;
    background: #f56c6c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      background: #f78989;
    }
  }
}
</style>
