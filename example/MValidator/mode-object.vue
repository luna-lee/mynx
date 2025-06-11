<template>
  <div class="demo-container">
    <p>使用对象模式进行表单验证</p>

    <MValidator
      :mode="formData"
      :rules="validationRules"
      :showErrorMsgTip="true"
      ref="validatorRef"
    >
      <div class="form-section">
        <h4>用户信息</h4>
        <div class="form-group">
          <label>姓名:</label>
          <input
            v-model="formData.name"
            validate-prop="name"
            placeholder="请输入姓名"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label>手机号:</label>
          <input
            v-model="formData.phone"
            validate-prop="phone"
            placeholder="请输入手机号"
            class="form-input"
          />
        </div>
      </div>

      <div class="form-section">
        <h4>地址信息</h4>
        <div class="form-group">
          <label>省份:</label>
          <select
            v-model="formData.address.province"
            validate-prop="address.province"
            class="form-input"
          >
            <option value="">请选择省份</option>
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
            <option value="guangdong">广东</option>
          </select>
        </div>

        <div class="form-group">
          <label>详细地址:</label>
          <textarea
            v-model="formData.address.detail"
            validate-prop="address.detail"
            placeholder="请输入详细地址"
            class="form-input"
            rows="3"
          ></textarea>
        </div>
      </div>
    </MValidator>

    <div class="button-group">
      <button @click="handleValidate" class="btn btn-primary">验证表单</button>
      <button @click="handleClear" class="btn btn-secondary">清除验证</button>
      <button @click="handleAddField" class="btn btn-success">
        动态添加字段
      </button>
    </div>

    <div class="data-display">
      <h4>当前表单数据:</h4>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import MValidator from "../../packages/moon-ui/src/MValidator/index.vue";

const validatorRef = ref();

const formData = reactive({
  name: "",
  phone: "",
  address: {
    province: "",
    detail: "",
  },
  email: "" as string | undefined,
});

const validationRules = {
  name: {
    required: true,
    min: 2,
    message: "姓名至少2个字符",
  },
  phone: {
    required: true,
    pattern: /^1[3-9]\d{9}$/,
    message: "请输入有效的手机号",
  },
  address: {
    type: "object",
    required: true,
    fields: {
      province: {
        required: true,
        message: "请选择省份",
      },
      detail: {
        required: true,
        min: 5,
        message: "详细地址至少5个字符",
      },
    },
  },
};

const handleValidate = () => {
  const result = validatorRef.value?.validate(true);
  console.log("验证结果:", result);
};

const handleClear = () => {
  validatorRef.value?.clearValidate();
};

const handleAddField = () => {
  // 动态添加字段演示
  if (!formData.email) {
    formData.email = "test@example.com";
  }
};
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}

.form-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.form-section h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #495057;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #495057;
}

.form-input {
  width: 100%;
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

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
}
</style>
