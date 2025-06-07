<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>同步多个组件</h4>
      <div class="control-panel">
        <label>共享值：</label>
        <input
          v-model="sharedValue"
          placeholder="输入要选中的值"
          style="width: 150px; margin-right: 10px"
        />
        <button @click="sharedValue = null">重置</button>
      </div>

      <div class="sync-container">
        <div class="sync-group">
          <h5>列表 A</h5>
          <MList v-model="sharedValue" class="list-container">
            <div key="red" class="color-item red">红色</div>
            <div key="blue" class="color-item blue">蓝色</div>
            <div key="green" class="color-item green">绿色</div>
          </MList>
        </div>

        <div class="sync-group">
          <h5>列表 B</h5>
          <MList v-model="sharedValue" class="list-container">
            <div key="red" class="color-item red">红色系</div>
            <div key="blue" class="color-item blue">蓝色系</div>
            <div key="green" class="color-item green">绿色系</div>
            <div key="yellow" class="color-item yellow">黄色系</div>
          </MList>
        </div>
      </div>

      <p>
        共享选中值：<strong>{{ sharedValue || "未选择" }}</strong>
      </p>
    </div>

    <div class="demo-item">
      <h4>动态选项</h4>
      <div class="control-panel">
        <button @click="addOption">添加选项</button>
        <button @click="removeOption">移除选项</button>
        <button @click="randomSelect">随机选择</button>
        <span style="margin-left: 10px"
          >选项数：{{ dynamicOptions.length }}</span
        >
      </div>

      <MList v-model="dynamicValue" class="list-container">
        <div
          v-for="option in dynamicOptions"
          :key="option.id"
          class="dynamic-item"
        >
          {{ option.label }}
        </div>
      </MList>

      <p>
        当前选中：<strong>{{ getCurrentLabel() || "未选择" }}</strong>
      </p>
    </div>

    <div class="demo-item">
      <h4>表单集成</h4>
      <form @submit.prevent="handleSubmit" class="form-container">
        <div class="form-group">
          <label>姓名：</label>
          <input v-model="formData.name" placeholder="请输入姓名" />
        </div>

        <div class="form-group">
          <label>性别：</label>
          <MList v-model="formData.gender" class="gender-list">
            <div key="male" class="gender-item">
              <span class="icon">👨</span>
              <span>男</span>
            </div>
            <div key="female" class="gender-item">
              <span class="icon">👩</span>
              <span>女</span>
            </div>
          </MList>
        </div>

        <div class="form-group">
          <label>爱好：</label>
          <MList v-model="formData.hobby" class="hobby-list">
            <div key="reading" class="hobby-item">📚 阅读</div>
            <div key="music" class="hobby-item">🎵 音乐</div>
            <div key="sports" class="hobby-item">⚽ 运动</div>
            <div key="travel" class="hobby-item">✈️ 旅行</div>
          </MList>
        </div>

        <button type="submit" class="submit-btn">提交表单</button>
      </form>

      <div class="form-data">
        <h5>表单数据：</h5>
        <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const sharedValue = ref<string | null>(null);
const dynamicValue = ref<string | null>(null);

// 动态选项
const dynamicOptions = ref([
  { id: "item1", label: "动态选项 1" },
  { id: "item2", label: "动态选项 2" },
  { id: "item3", label: "动态选项 3" },
]);

// 表单数据
const formData = ref({
  name: "",
  gender: null as string | null,
  hobby: null as string | null,
});

/**
 * 添加动态选项
 */
const addOption = () => {
  const newId = `item${dynamicOptions.value.length + 1}`;
  dynamicOptions.value.push({
    id: newId,
    label: `动态选项 ${dynamicOptions.value.length + 1}`,
  });
};

/**
 * 移除动态选项
 */
const removeOption = () => {
  if (dynamicOptions.value.length > 1) {
    const removed = dynamicOptions.value.pop();
    // 如果移除的是当前选中项，清空选择
    if (removed && dynamicValue.value === removed.id) {
      dynamicValue.value = null;
    }
  }
};

/**
 * 随机选择选项
 */
const randomSelect = () => {
  if (dynamicOptions.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * dynamicOptions.value.length);
    dynamicValue.value = dynamicOptions.value[randomIndex].id;
  }
};

/**
 * 获取当前选中的标签
 */
const getCurrentLabel = () => {
  const current = dynamicOptions.value.find(
    (opt) => opt.id === dynamicValue.value
  );
  return current?.label;
};

/**
 * 处理表单提交
 */
const handleSubmit = () => {
  alert(`表单提交成功！\n${JSON.stringify(formData.value, null, 2)}`);
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
    margin-bottom: 15px;
    color: #666;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  p {
    margin-top: 15px;
    color: #333;
    font-size: 14px;
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

  label {
    font-weight: 600;
    color: #333;
  }

  select,
  input {
    padding: 6px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
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

    &:hover {
      background: #337ecc;
    }
  }
}

.list-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fafafa;
  min-height: 60px;
}

.list-item,
.number-item,
.dynamic-item {
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

.color-item {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  &.red {
    background: #e74c3c;
    border-color: #c0392b;
  }

  &.blue {
    background: #3498db;
    border-color: #2980b9;
  }

  &.green {
    background: #2ecc71;
    border-color: #27ae60;
  }

  &.yellow {
    background: #f1c40f;
    border-color: #f39c12;
    color: #333;
    text-shadow: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &.active {
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
}

.sync-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  .sync-group {
    h5 {
      margin: 0 0 10px 0;
      color: #666;
      text-align: center;
    }
  }
}

.form-container {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
    }

    input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;

      &:focus {
        outline: none;
        border-color: #409eff;
        box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
      }
    }
  }

  .submit-btn {
    width: 100%;
    padding: 12px;
    background: #67c23a;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #5daf34;
    }
  }
}

.gender-list {
  display: flex;
  gap: 15px;

  .gender-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: white;
    border: 2px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    .icon {
      font-size: 20px;
    }

    &:hover {
      border-color: #409eff;
      transform: scale(1.05);
    }

    &.active {
      background: #409eff;
      color: white;
      border-color: #409eff;
    }
  }
}

.hobby-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  .hobby-item {
    padding: 10px 15px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;

    &:hover {
      background: #f0f8ff;
      border-color: #409eff;
      transform: translateY(-2px);
    }

    &.active {
      background: #409eff;
      color: white;
      border-color: #409eff;
    }
  }
}

.form-data {
  margin-top: 20px;

  h5 {
    margin: 0 0 10px 0;
    color: #666;
  }

  pre {
    background: #f4f4f4;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 12px;
    color: #333;
    overflow-x: auto;
  }
}
</style>
