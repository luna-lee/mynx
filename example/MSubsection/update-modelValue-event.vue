<template>
  <div class="p-20px">
    <p>展示如何监听标签页切换事件并执行相应的逻辑处理。</p>
    
    <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
      <h4>事件监听状态</h4>
      <p><strong>当前激活标签页:</strong> {{ activeIndex }}</p>
      <p><strong>切换次数:</strong> {{ switchCount }}</p>
      <p><strong>最后切换时间:</strong> {{ lastSwitchTime }}</p>
      <p><strong>切换历史:</strong> {{ switchHistory.join(' → ') }}</p>
    </div>

    <MSubsection 
      :tabs="tabs"
      v-model="activeIndex"
      @update:modelValue="handleTabSwitch"
    >
      <template #tab-content-0>
        <div class="mt-20px" style="padding: 20px; background: #e8f5e8;">
          <h4>标签页 A - 数据展示</h4>
          <p>这是第一个标签页，每次切换到这里都会触发数据加载。</p>
          <div v-if="tabData.A.loading" style="color: #666;">
            正在加载数据...
          </div>
          <div v-else>
            <p><strong>数据内容:</strong> {{ tabData.A.content }}</p>
            <p><strong>加载时间:</strong> {{ tabData.A.loadTime }}</p>
            <p><strong>访问次数:</strong> {{ tabData.A.visitCount }}</p>
          </div>
        </div>
      </template>

      <template #tab-content-1>
        <div class="mt-20px" style="padding: 20px; background: #e8f0ff;">
          <h4>标签页 B - 用户操作</h4>
          <p>每次切换到这个标签页时会记录用户行为。</p>
          <div style="margin-top: 15px;">
            <button 
              @click="performAction('点击操作')"
              style="margin-right: 10px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
            >
              执行操作
            </button>
            <button 
              @click="performAction('重置数据')"
              style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;"
            >
              重置
            </button>
          </div>
          <div style="margin-top: 15px;">
            <p><strong>标签页 B 数据:</strong> {{ tabData.B.content }}</p>
            <p><strong>最后操作:</strong> {{ tabData.B.lastAction }}</p>
            <p><strong>访问次数:</strong> {{ tabData.B.visitCount }}</p>
          </div>
        </div>
      </template>

      <template #tab-content-2>
        <div style="padding: 20px; background: #fff8e8;">
          <h4>标签页 C - 设置面板</h4>
          <p>切换到设置面板时会保存当前状态。</p>
          <div style="margin-top: 15px;">
            <div style="margin-bottom: 10px;">
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" v-model="settings.autoSave" @change="saveSettings" />
                自动保存
              </label>
            </div>
            <div style="margin-bottom: 10px;">
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" v-model="settings.notifications" @change="saveSettings" />
                开启通知
              </label>
            </div>
            <div style="margin-bottom: 10px;">
              <label style="display: block; margin-bottom: 5px;">主题设置:</label>
              <select v-model="settings.theme" @change="saveSettings" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                <option value="light">浅色主题</option>
                <option value="dark">深色主题</option>
                <option value="auto">自动</option>
              </select>
            </div>
          </div>
          <div style="margin-top: 15px;">
            <p><strong>当前设置:</strong> {{ JSON.stringify(settings, null, 2) }}</p>
            <p><strong>设置保存次数:</strong> {{ tabData.C.saveCount }}</p>
            <p><strong>访问次数:</strong> {{ tabData.C.visitCount }}</p>
          </div>
        </div>
      </template>
    </MSubsection>

    <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
      <h4>事件处理说明</h4>
      <ul>
        <li>每次切换标签页时都会触发 <code>update:modelValue</code> 事件</li>
        <li>可以在事件处理器中执行数据加载、状态保存、埋点统计等操作</li>
        <li>支持异步处理和错误捕获</li>
        <li>事件参数包含新的标签页索引值</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import MSubsection from '../../packages/moon-ui/src/MSubsection/index.vue'

const activeIndex = ref(0)
const switchCount = ref(0)
const lastSwitchTime = ref('')
const switchHistory = ref(['A'])

const tabs = ref([
  { title: '数据展示' },
  { title: '用户操作' },
  { title: '设置面板' }
])

// 标签页数据
const tabData = reactive({
  A: {
    content: '初始数据',
    loadTime: '',
    visitCount: 1,
    loading: false
  },
  B: {
    content: '操作面板数据',
    lastAction: '无',
    visitCount: 0
  },
  C: {
    visitCount: 0,
    saveCount: 0
  }
})

// 设置数据
const settings = reactive({
  autoSave: true,
  notifications: false,
  theme: 'light'
})

// 标签页切换处理器
const handleTabSwitch = async (newIndex) => {
  console.log('标签页切换到:', newIndex)
  
  switchCount.value++
  lastSwitchTime.value = new Date().toLocaleString()
  
  const tabNames = ['A', 'B', 'C']
  const currentTab = tabNames[newIndex]
  
  // 记录切换历史
  switchHistory.value.push(currentTab)
  if (switchHistory.value.length > 10) {
    switchHistory.value = switchHistory.value.slice(-10)
  }
  
  // 增加访问次数
  tabData[currentTab].visitCount++
  
  // 根据不同标签页执行不同逻辑
  switch (newIndex) {
    case 0: // 数据展示标签页
      await loadTabData()
      break
    case 1: // 用户操作标签页
      trackUserVisit()
      break
    case 2: // 设置面板标签页
      loadUserSettings()
      break
  }
}

// 模拟异步数据加载
const loadTabData = async () => {
  tabData.A.loading = true
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    tabData.A.content = `随机数据: ${Math.floor(Math.random() * 1000)}`
    tabData.A.loadTime = new Date().toLocaleString()
  } catch (error) {
    tabData.A.content = '数据加载失败'
  } finally {
    tabData.A.loading = false
  }
}

// 跟踪用户访问
const trackUserVisit = () => {
  console.log('用户访问了操作面板')
  tabData.B.lastAction = '页面访问'
}

// 加载用户设置
const loadUserSettings = () => {
  console.log('加载用户设置')
  // 这里可以从本地存储或服务器加载设置
}

// 执行操作
const performAction = (action) => {
  tabData.B.lastAction = action
  console.log('执行操作:', action)
}

// 保存设置
const saveSettings = () => {
  tabData.C.saveCount++
  console.log('设置已保存:', settings)
}

// 初始化
lastSwitchTime.value = new Date().toLocaleString()
</script>

<style scoped>
code {
  background: #f1f3f4;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 13px;
}
:deep(.m-subsection__tab-item) {
  padding: 0 40px;
}
</style> 