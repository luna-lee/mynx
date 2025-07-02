<template>
  <div class="demo-container">
    <p>使用数组模式进行动态列表验证</p>

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

      <div class="list-header">
        <h4>用户列表 ({{ formData.formList.length }} 项)</h4>
        <button @click="addItem" class="btn btn-success">添加用户</button>
      </div>
      <div validate-prop="formList" class="min-h-100px">
        <div
          v-for="(item, index) in formData.formList"
          :key="index"
          class="list-item"
        >
          <div class="item-header">
            <span class="item-title">用户 {{ index + 1 }}</span>
            <button @click="removeItem(index)" class="btn btn-danger btn-sm">
              删除
            </button>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>姓名:</label>
              <input
                v-model="item.name"
                :validate-prop="`formList.${index}.name`"
                placeholder="请输入姓名"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>年龄:</label>
              <input
                v-model.number="item.age"
                :validate-prop="`formList.${index}.age`"
                type="number"
                placeholder="请输入年龄"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>邮箱:</label>
              <input
                v-model="item.email"
                :validate-prop="`formList.${index}.email`"
                placeholder="请输入邮箱"
                class="form-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="formData.formList.length === 0" class="empty-state">
        <p>暂无数据，点击"添加用户"开始</p>
      </div>
    </MValidator>

    <div class="button-group">
      <button @click="handleValidate" class="btn btn-primary">验证所有</button>
      <button @click="handleClear" class="btn btn-secondary">清除验证</button>
    </div>

    <div class="data-display">
      <h4>当前数据:</h4>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

interface UserItem {
  name: string;
  age: number | null;
  email: string;
}

const validatorRef = ref();
const formData = reactive({
  name: "",
  phone: "",
  address: {
    province: "",
    detail: "",
  },
  email: "" as string | undefined,
  formList: [
    // { name: "", age: null, email: "" },
    // { name: "", age: null, email: "" },
  ] as UserItem[],
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
  formList: {
    type: "array",
    required: true,
    message: "用户列表至少2项",
    min: 2,
    defaultField: {
      type: "object",
      fields: {
        name: {
          required: true,
          min: 2,
          message: "姓名至少2个字符",
        },
        age: {
          required: true,
          type: "number",
          min: 18,
          max: 100,
          message: "年龄必须在18-100之间",
        },
        email: {
          required: true,
          type: "email",
          message: "请输入有效的邮箱地址",
        },
      },
    },
  },
};

const addItem = () => {
  formData.formList.push({ name: "", age: null, email: "" });
};

const removeItem = (index: number) => {
  formData.formList.splice(index, 1);
};

const handleValidate = () => {
  const result = validatorRef.value?.validate(false);
  console.log("验证结果:", result);
};

const handleClear = () => {
  validatorRef.value?.clearValidate();
};
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  max-height: 300px;
  overflow-y: auto;
}
</style>
