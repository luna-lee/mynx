<template>
  <div class="demo-container">
    <p>控制是否显示错误提示信息</p>
    
    <div class="toggle-section">
      <label class="toggle-label">
        <input 
          type="checkbox" 
          v-model="showErrorTip" 
          class="toggle-input"
        />
        <span class="toggle-text">显示错误提示 (showErrorMsgTip)</span>
      </label>
    </div>
    
    <div class="comparison-container">
      <div class="validator-section">
        <h4>当前设置: {{ showErrorTip ? '显示' : '隐藏' }} 错误提示</h4>
        
        <MValidator 
          :mode="formData" 
          :rules="validationRules"
          :showErrorMsgTip="showErrorTip"
          ref="validatorRef"
        >
          <div class="form-group">
            <label>用户名 (必填, 最少3个字符):</label>
            <input 
              v-model="formData.username" 
              validate-prop="username"
              placeholder="请输入用户名"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label>邮箱 (必填, 邮箱格式):</label>
            <input 
              v-model="formData.email" 
              validate-prop="email"
              placeholder="请输入邮箱"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label>密码 (必填, 6-20个字符):</label>
            <input 
              v-model="formData.password" 
              validate-prop="password"
              type="password"
              placeholder="请输入密码"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label>确认密码 (必须与密码一致):</label>
            <input 
              v-model="formData.confirmPassword" 
              validate-prop="confirmPassword"
              type="password"
              placeholder="请确认密码"
              class="form-input"
            />
          </div>
        </MValidator>
        
        <div class="button-group">
          <button @click="handleValidate" class="btn btn-primary">验证表单</button>
          <button @click="handleClear" class="btn btn-secondary">清除验证</button>
          <button @click="fillTestData" class="btn btn-info">填充测试数据</button>
        </div>
      </div>
    </div>
    
    <div class="info-section">
      <h4>功能说明:</h4>
      <ul>
        <li><strong>showErrorMsgTip = true:</strong> 显示错误提示信息，在输入框下方显示红色错误文本</li>
        <li><strong>showErrorMsgTip = false:</strong> 隐藏错误提示信息，只显示红色边框样式</li>
        <li>无论是否显示提示信息，验证逻辑都会正常执行</li>
        <li>可以通过切换开关实时查看效果差异</li>
      </ul>
    </div>
    
    <div v-if="validationResult" class="result-section">
      <h4>最近验证结果:</h4>
      <pre>{{ JSON.stringify(validationResult, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import MValidator from '../../packages/moon-ui/src/MValidator/index.vue'

const validatorRef = ref()
const showErrorTip = ref(true)
const validationResult = ref(null)

const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validationRules = {
  username: {
    required: true,
    min: 3,
    message: '用户名不能为空且至少3个字符'
  },
  email: {
    required: true,
    type: 'email',
    message: '请输入有效的邮箱地址'
  },
  password: {
    required: true,
    min: 6,
    max: 20,
    message: '密码长度必须在6-20个字符之间'
  },
  confirmPassword: [
    {
      required: true,
      message: '请确认密码'
    },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (value !== formData.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }
    }
  ]
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

const fillTestData = () => {
  formData.username = 'testuser'
  formData.email = 'test@example.com'
  formData.password = '123456'
  formData.confirmPassword = '123456'
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.toggle-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #e3f2fd;
  border-radius: 8px;
  border: 1px solid #bbdefb;
}

.toggle-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.toggle-input {
  margin-right: 10px;
  transform: scale(1.2);
}

.toggle-text {
  color: #1976d2;
}

.comparison-container {
  margin-bottom: 30px;
}

.validator-section {
  padding: 25px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.validator-section h4 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #495057;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #495057;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.15s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.button-group {
  margin: 25px 0;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.info-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
}

.info-section h4 {
  margin-top: 0;
  color: #856404;
}

.info-section ul {
  margin: 0;
  padding-left: 20px;
}

.info-section li {
  margin-bottom: 8px;
  color: #856404;
  line-height: 1.5;
}

.result-section {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.result-section h4 {
  margin-top: 0;
  color: #495057;
}

.result-section pre {
  margin: 0;
  font-size: 12px;
  color: #495057;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  overflow-x: auto;
}
</style> 