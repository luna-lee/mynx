<template>
  <div class="p-20px">
    <p>通过 tab-title-{index} 插槽可以自定义每个标签页的标题内容。</p>

    <MSubsection :tabs="tabs" v-model="activeIndex">
      <!-- 自定义第一个标签页标题 -->
      <template #tab-title-0="{ tab }">
        <div style="display: flex; align-items: center; gap: 6px">
          <span style="color: #ff4757">🏠</span>
          <span>{{ tab.title }}</span>
          <span
            v-if="tab.badge"
            style="
              background: #ff4757;
              color: white;
              font-size: 12px;
              padding: 2px 6px;
              border-radius: 10px;
            "
          >
            {{ tab.badge }}
          </span>
        </div>
      </template>

      <!-- 自定义第二个标签页标题 -->
      <template #tab-title-1="{ tab }">
        <div style="display: flex; align-items: center; gap: 6px">
          <span style="color: #2ed573">📊</span>
          <span>{{ tab.title }}</span>
          <span
            v-if="tab.count !== undefined"
            style="
              background: #2ed573;
              color: white;
              font-size: 12px;
              padding: 2px 6px;
              border-radius: 50%;
              min-width: 20px;
              text-align: center;
            "
          >
            {{ tab.count }}
          </span>
        </div>
      </template>

      <!-- 自定义第三个标签页标题 -->
      <template #tab-title-2="{ tab }">
        <div
          style="display: flex; align-items: center; gap: 6px"
        >
          <span style="color: #3742fa">⚙️</span>
          <span style="font-weight: bold">{{ tab.title }}</span>
          <span
            v-if="tab.isNew"
            style="
              background: linear-gradient(45deg, #3742fa, #2f3542);
              color: white;
              font-size: 10px;
              padding: 1px 4px;
              border-radius: 3px;
            "
          >
            NEW
          </span>
        </div>
      </template>

      <!-- 标签页内容 -->
      <template #tab-content-0>
        <div class="mt-20px" style="padding: 20px; background: #fff5f5">
          <h4>🏠 首页内容</h4>
          <p>这是首页内容，带有红色徽章提醒。</p>
          <p>插槽参数 tab 包含: {{ JSON.stringify(tabs[0], null, 2) }}</p>
        </div>
      </template>

      <template #tab-content-1>
        <div class="mt-20px" style="padding: 20px; background: #f0fff4">
          <h4>📊 数据统计</h4>
          <p>这是数据统计页面，显示数量徽章。</p>
          <p>插槽参数 tab 包含: {{ JSON.stringify(tabs[1], null, 2) }}</p>
        </div>
      </template>

      <template #tab-content-2>
        <div class="mt-20px" style="padding: 20px; background: #f0f0ff">
          <h4>⚙️ 系统设置</h4>
          <p>这是系统设置页面，标记为新功能。</p>
          <p>插槽参数 tab 包含: {{ JSON.stringify(tabs[2], null, 2) }}</p>
        </div>
      </template>
    </MSubsection>

    <div style="margin-top: 20px; padding: 10px; background: #f5f5f5">
      <p><strong>说明:</strong></p>
      <ul>
        <li>每个 tab-title-{index} 插槽都会接收到 { tab } 参数</li>
        <li>可以根据 tab 对象的属性来渲染不同的内容</li>
        <li>支持图标、徽章、计数器等自定义元素</li>
        <li>当前激活的标签页: {{ activeIndex }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MSubsection from "../../packages/moon-ui/src/MSubsection/index.vue";

const activeIndex = ref(0);

const tabs = ref([
  {
    title: "首页",
    badge: "热门",
    description: "首页内容",
  },
  {
    title: "数据统计",
    count: 99,
    description: "统计信息",
  },
  {
    title: "系统设置",
    isNew: true,
    description: "配置选项",
  },
]);
</script>
<style scoped>
:deep(.m-subsection__tab-item) {
  padding: 0 40px;
}
</style>
