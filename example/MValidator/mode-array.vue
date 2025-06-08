<template>
  <div class="demo-container">
    <h3>MValidator Mode 数组模式示例</h3>
    <p>使用数组模式进行动态列表验证</p>
    
    <MValidator 
      :mode="formList" 
      :rules="validationRules"
      :showErrorMsgTip="true"
      ref="validatorRef"
    >
      <div class="list-header">
        <h4>用户列表 ({{ formList.length }} 项)</h4>
        <button @click="addItem" class="btn btn-success">添加用户</button>
      </div>
      
      <div 
        v-for="(item, index) in formList" 
        :key="index"
        class="list-item"
      >
        <div class="item-header">
          <span class="item-title">用户 {{ index + 1 }}</span>
          <button @click="removeItem(index)" class="btn btn-danger btn-sm">删除</button>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>姓名:</label>
            <input 
              v-model="item.name" 
              :validate-prop="`${index}.name`"
              placeholder="请输入姓名"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label>年龄:</label>
            <input 
              v-model.number="item.age" 
              :validate-prop="`${index}.age`"
              type="number"
              placeholder="请输入年龄"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label>邮箱:</label>
            <input 
              v-model="item.email" 
              :validate-prop="`${index}.email`"
              placeholder="请输入邮箱"
              class="form-input"
            />
          </div>
        </div>
      </div>
      
      <div v-if="formList.length === 0" class="empty-state">
        <p>暂无数据，点击"添加用户"开始</p>
      </div>
    </MValidator>
    
    <div class="button-group">
      <button @click="handleValidate" class="btn btn-primary">验证所有</button>
      <button @click="handleClear" class="btn btn-secondary">清除验证</button>
      <button @click="handleReload" class="btn btn-warning">重新加载</button>
    </div>
    
    <div class="data-display">
      <h4>当前数组数据:</h4>
      <pre>{{ JSON.stringify(formList, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import MValidator from '../../packages/moon-ui/src/MValidator/index.vue'

interface UserItem {
  name: string
  age: number | null
  email: string
}

const validatorRef = ref()

const formList = reactive<UserItem[]>([
  { name: '', age: null, email: '' },
  { name: '', age: null, email: '' }
])

const validationRules = {
  type: 'array',
  defaultField: {
    type: 'object',
    fields: {
      name: {
        required: true,
        min: 2,
        message: '姓名至少2个字符'
      },
      age: {
        required: true,
        type: 'number',
        min: 18,
        max: 100,
        message: '年龄必须在18-100之间'
      },
      email: {
        required: true,
        type: 'email',
        message: '请输入有效的邮箱地址'
      }
    }
  }
}

const addItem = () => {
  formList.push({ name: '', age: null, email: '' })
}

const removeItem = (index: number) => {
  formList.splice(index, 1)
  // 重新加载验证器以更新DOM引用
  validatorRef.value?.reload()
}

const handleValidate = () => {
  const result = validatorRef.value?.validate(true)
  console.log('验证结果:', result)
}

const handleClear = () => {
  validatorRef.value?.clearValidate()
}

const handleReload = () => {
  validatorRef.value?.reload()
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.list-header h4 {
  margin: 0;
  color: #495057;
}

.list-item {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e9ecef;
}

.item-title {
  font-weight: bold;
  color: #495057;
  font-size: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #495057;
  font-size: 14px;
}

.form-input {
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.15s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #6c757d;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
}

.button-group {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.data-display {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.data-display pre {
  margin: 0;
  font-size: 12px;
  color: #495057;
  max-height: 300px;
  overflow-y: auto;
}
</style> 