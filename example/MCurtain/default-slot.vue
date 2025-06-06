<template>
  <div class="demo-container">
    <h3>默认插槽内容示例</h3>
    
    <div class="demo-item">
      <h4>文本内容</h4>
      <MCurtain
        v-model="isOpen1"
        :foldStyle="{ width: '0', height: '120px' }"
        :openStyle="{ width: '350px', height: '120px' }"
        triggerPosition="right"
      >
        <div class="text-content">
          <h5>这是窗帘的默认插槽</h5>
          <p>可以放置任意的文本内容，包括标题、段落、列表等。</p>
        </div>
      </MCurtain>
    </div>

    <div class="demo-item">
      <h4>表单内容</h4>
      <MCurtain
        v-model="isOpen2"
        :foldStyle="{ width: '0', height: '200px' }"
        :openStyle="{ width: '300px', height: '200px' }"
        triggerPosition="right"
      >
        <div class="form-content">
          <h5>用户信息</h5>
          <form>
            <div class="form-group">
              <label>姓名：</label>
              <input type="text" placeholder="请输入姓名" />
            </div>
            <div class="form-group">
              <label>邮箱：</label>
              <input type="email" placeholder="请输入邮箱" />
            </div>
            <button type="submit">提交</button>
          </form>
        </div>
      </MCurtain>
    </div>

    <div class="demo-item">
      <h4>列表内容</h4>
      <MCurtain
        v-model="isOpen3"
        :foldStyle="{ width: '0', height: '180px' }"
        :openStyle="{ width: '280px', height: '180px' }"
        triggerPosition="right"
      >
        <div class="list-content">
          <h5>任务列表</h5>
          <ul>
            <li v-for="item in tasks" :key="item.id">
              <input type="checkbox" :checked="item.completed" />
              {{ item.text }}
            </li>
          </ul>
        </div>
      </MCurtain>
    </div>

    <div class="demo-item">
      <h4>媒体内容</h4>
      <MCurtain
        v-model="isOpen4"
        :foldStyle="{ width: '0', height: '200px' }"
        :openStyle="{ width: '320px', height: '200px' }"
        triggerPosition="right"
      >
        <div class="media-content">
          <h5>图片展示</h5>
          <div class="image-placeholder">
            <div class="placeholder-icon">🖼️</div>
            <p>图片占位符</p>
          </div>
          <p>这里可以放置图片、视频等媒体内容</p>
        </div>
      </MCurtain>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen1 = ref(false);
const isOpen2 = ref(false);
const isOpen3 = ref(false);
const isOpen4 = ref(false);

const tasks = ref([
  { id: 1, text: "完成项目文档", completed: true },
  { id: 2, text: "代码审查", completed: false },
  { id: 3, text: "测试功能", completed: false },
  { id: 4, text: "部署上线", completed: false }
]);
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}

.demo-item {
  margin-bottom: 30px;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 4px;
  
  h4 {
    margin-top: 0;
    color: #666;
  }
}

.text-content {
  padding: 15px;
  background: #e8f4fd;
  border-radius: 4px;
  color: #333;
  
  h5 {
    margin: 0 0 10px 0;
    color: #409eff;
  }
  
  p {
    margin: 0;
    line-height: 1.5;
  }
}

.form-content {
  padding: 15px;
  background: #f0f9ff;
  border-radius: 4px;
  
  h5 {
    margin: 0 0 15px 0;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 12px;
    
    label {
      display: inline-block;
      width: 50px;
      font-size: 14px;
      color: #666;
    }
    
    input {
      padding: 6px 8px;
      border: 1px solid #ddd;
      border-radius: 3px;
      font-size: 14px;
      width: 180px;
    }
  }
  
  button {
    padding: 6px 20px;
    background: #409eff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
      background: #337ecc;
    }
  }
}

.list-content {
  padding: 15px;
  background: #f6f8fa;
  border-radius: 4px;
  
  h5 {
    margin: 0 0 12px 0;
    color: #333;
  }
  
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    
    li {
      padding: 6px 0;
      font-size: 14px;
      
      input {
        margin-right: 8px;
      }
    }
  }
}

.media-content {
  padding: 15px;
  background: #fef7e0;
  border-radius: 4px;
  text-align: center;
  
  h5 {
    margin: 0 0 15px 0;
    color: #333;
  }
  
  .image-placeholder {
    width: 100%;
    height: 80px;
    background: #fff;
    border: 2px dashed #ddd;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    
    .placeholder-icon {
      font-size: 24px;
      margin-bottom: 5px;
    }
    
    p {
      margin: 0;
      font-size: 12px;
      color: #999;
    }
  }
  
  > p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
}
</style> 