<template>
  <div class="p-20px">
    <p>通过 tab-content-{index} 插槽可以为每个标签页定义不同的内容区域。</p>
    
    <MSubsection 
      :tabs="tabs"
      v-model="activeIndex"
    >
      <!-- 第一个标签页内容：表单示例 -->
      <template #tab-content-0>
        <div style="padding: 20px;">
          <h4>用户信息表单</h4>
          <form style="max-width: 400px;">
            <div style="margin-bottom: 15px;">
              <label style="display: block; margin-bottom: 5px;">姓名:</label>
              <input 
                type="text" 
                v-model="userForm.name"
                style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"
                placeholder="请输入姓名"
              />
            </div>
            <div style="margin-bottom: 15px;">
              <label style="display: block; margin-bottom: 5px;">邮箱:</label>
              <input 
                type="email" 
                v-model="userForm.email"
                style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"
                placeholder="请输入邮箱"
              />
            </div>
            <div style="margin-bottom: 15px;">
              <label style="display: block; margin-bottom: 5px;">描述:</label>
              <textarea 
                v-model="userForm.description"
                style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; min-height: 80px;"
                placeholder="请输入描述"
              ></textarea>
            </div>
            <button 
              type="button" 
              @click="saveUserInfo"
              style="background: #4269fd; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;"
            >
              保存信息
            </button>
          </form>
        </div>
      </template>

      <!-- 第二个标签页内容：图表示例 -->
      <template #tab-content-1>
        <div style="padding: 20px;">
          <h4>数据统计图表</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;">
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px; text-align: center;">
              <h5 style="margin: 0 0 10px 0; color: #495057;">总用户数</h5>
              <p style="font-size: 24px; font-weight: bold; color: #007bff; margin: 0;">{{ statistics.totalUsers }}</p>
            </div>
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px; text-align: center;">
              <h5 style="margin: 0 0 10px 0; color: #495057;">活跃用户</h5>
              <p style="font-size: 24px; font-weight: bold; color: #28a745; margin: 0;">{{ statistics.activeUsers }}</p>
            </div>
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px; text-align: center;">
              <h5 style="margin: 0 0 10px 0; color: #495057;">今日访问</h5>
              <p style="font-size: 24px; font-weight: bold; color: #ffc107; margin: 0;">{{ statistics.todayVisits }}</p>
            </div>
            <div style="padding: 15px; background: #f8f9fa; border-radius: 8px; text-align: center;">
              <h5 style="margin: 0 0 10px 0; color: #495057;">转化率</h5>
              <p style="font-size: 24px; font-weight: bold; color: #dc3545; margin: 0;">{{ statistics.conversionRate }}%</p>
            </div>
          </div>
          <button 
            @click="refreshData" 
            style="margin-top: 20px; background: #28a745; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;"
          >
            刷新数据
          </button>
        </div>
      </template>

      <!-- 第三个标签页内容：列表示例 -->
      <template #tab-content-2>
        <div style="padding: 20px;">
          <h4>操作历史记录</h4>
          <div style="margin-bottom: 15px;">
            <button 
              @click="addRecord" 
              style="background: #007bff; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;"
            >
              添加记录
            </button>
            <button 
              @click="clearRecords" 
              style="background: #dc3545; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;"
            >
              清空记录
            </button>
          </div>
          <div v-if="operationLogs.length === 0" style="text-align: center; color: #6c757d; padding: 40px;">
            暂无操作记录
          </div>
          <div v-else style="max-height: 300px; overflow-y: auto;">
            <div 
              v-for="(log, index) in operationLogs" 
              :key="index"
              style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee;"
            >
              <div>
                <strong>{{ log.action }}</strong>
                <p style="margin: 0; color: #6c757d; font-size: 14px;">{{ log.description }}</p>
              </div>
              <div style="text-align: right;">
                <small style="color: #6c757d;">{{ log.time }}</small>
              </div>
            </div>
          </div>
        </div>
      </template>
    </MSubsection>

    <div style="margin-top: 20px; padding: 10px; background: #f5f5f5;">
      <p><strong>当前表单数据:</strong> {{ JSON.stringify(userForm, null, 2) }}</p>
      <p><strong>当前激活标签页:</strong> {{ activeIndex }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MSubsection from '../../packages/moon-ui/src/MSubsection/index.vue'

const activeIndex = ref(0)

const tabs = ref([
  { title: '用户信息' },
  { title: '数据统计' },
  { title: '操作记录' }
])

// 表单数据
const userForm = ref({
  name: '',
  email: '',
  description: ''
})

// 统计数据
const statistics = ref({
  totalUsers: 1250,
  activeUsers: 892,
  todayVisits: 342,
  conversionRate: 12.5
})

// 操作日志
const operationLogs = ref([
  {
    action: '用户登录',
    description: '管理员登录系统',
    time: '2024-01-15 10:30:00'
  },
  {
    action: '数据更新',
    description: '更新用户统计信息',
    time: '2024-01-15 10:25:00'
  }
])

// 方法
const saveUserInfo = () => {
  alert('用户信息已保存: ' + JSON.stringify(userForm.value, null, 2))
  addRecord('保存用户信息', `保存了用户: ${userForm.value.name || '未命名'}`)
}

const refreshData = () => {
  statistics.value = {
    totalUsers: Math.floor(Math.random() * 2000) + 1000,
    activeUsers: Math.floor(Math.random() * 1000) + 500,
    todayVisits: Math.floor(Math.random() * 500) + 200,
    conversionRate: (Math.random() * 20 + 5).toFixed(1)
  }
  addRecord('刷新数据', '刷新了统计数据')
}

const addRecord = (action = '测试操作', description = '这是一个测试操作记录') => {
  operationLogs.value.unshift({
    action,
    description,
    time: new Date().toLocaleString()
  })
}

const clearRecords = () => {
  operationLogs.value = []
}
</script> 
<style scoped>
:deep(.m-subsection__tab-item) {
  padding: 0 40px;
}
</style> 