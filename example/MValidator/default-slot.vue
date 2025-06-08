<template>
  <div class="demo-container">
    <h3>MValidator 默认插槽示例</h3>
    <p>在默认插槽中放置需要验证的表单元素</p>
    
    <MValidator 
      :mode="formData" 
      :rules="validationRules"
      :showErrorMsgTip="true"
      ref="validatorRef"
    >
      <div class="form-group">
        <label>用户名:</label>
        <input 
          v-model="formData.username" 
          validate-prop="username"
          placeholder="请输入用户名"
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label>邮箱:</label>
        <input 
          v-model="formData.email" 
          validate-prop="email"
          placeholder="请输入邮箱"
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label>年龄:</label>
        <input 
          v-model.number="formData.age" 
          validate-prop="age"
          type="number"
          placeholder="请输入年龄"
          class="form-input"
        />
      </div>
    </MValidator>
    
    <div class="button-group">
      <button @click="handleValidate" class="btn btn-primary">验证表单</button>
      <button @click="handleClear" class="btn btn-secondary">清除验证</button>
      <button @click="handleReset" class="btn btn-warning">重置表单</button>
    </div>
    
    <div v-if="validationResult" class="result">
      <h4>验证结果:</h4>
      <pre>{{ JSON.stringify(validationResult, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import MValidator from '../../packages/moon-ui/src/MValidator/index.vue'

const validatorRef = ref()
const validationResult = ref(null)

const formData = reactive({
  username: '',
  email: '',
  age: null
})

const validationRules = {
  username: {
    required: true,
    message: '用户名不能为空'
  },
  email: {
    required: true,
    type: 'email',
    message: '请输入有效的邮箱地址'
  },
  age: {
    required: true,
    type: 'number',
    min: 18,
    max: 100,
    message: '年龄必须在18-100之间'
  }
}

const handleValidate = () => {
  const result = validatorRef.value?.validate(true)
  validationResult.value = result
  console.log('验证结果:', result)
}

const handleClear = () => {
  validatorRef.value?.clearValidate()
  validationResult.value = null
}

const handleReset = () => {
  formData.username = ''
  formData.email = ''
  formData.age = null
  validationResult.value = null
  validatorRef.value?.clearValidate()
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
}

.button-group {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn:hover {
  opacity: 0.8;
}

.result {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.result pre {
  margin: 0;
  font-size: 12px;
}
</style> 