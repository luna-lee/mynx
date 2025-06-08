<template>
  <div class="m-l-20px m-r-20px">
    <p>通过 bodyStyle 属性可以自定义滚动容器的样式，如高度、背景等。</p>

    <div style="margin-bottom: 20px">
      <h4>控制面板</h4>
      <div
        style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        "
      >
        <div>
          <label style="display: block; margin-bottom: 5px">容器高度:</label>
          <select
            v-model="containerHeight"
            style="
              width: 100%;
              padding: 5px;
              border: 1px solid #ddd;
              border-radius: 4px;
            "
          >
            <option value="80px">80px (矮)</option>
            <option value="120px">120px (标准)</option>
            <option value="200px">200px (高)</option>
            <option value="300px">300px (超高)</option>
          </select>
        </div>
        <div>
          <label style="display: block; margin-bottom: 5px">背景色:</label>
          <select
            v-model="backgroundColor"
            style="
              width: 100%;
              padding: 5px;
              border: 1px solid #ddd;
              border-radius: 4px;
            "
          >
            <option value="transparent">透明</option>
            <option value="#f8f9fa">浅灰</option>
            <option value="#e3f2fd">浅蓝</option>
            <option value="#f3e5f5">浅紫</option>
            <option value="linear-gradient(45deg, #ffeaa7, #fab1a0)">
              渐变橙
            </option>
          </select>
        </div>
        <div>
          <label style="display: block; margin-bottom: 5px">边框样式:</label>
          <select
            v-model="borderStyle"
            style="
              width: 100%;
              padding: 5px;
              border: 1px solid #ddd;
              border-radius: 4px;
            "
          >
            <option value="none">无边框</option>
            <option value="1px solid #ddd">细边框</option>
            <option value="2px solid #4269fd">蓝色边框</option>
            <option value="3px dashed #e74c3c">红色虚线</option>
          </select>
        </div>
        <div>
          <label style="display: block; margin-bottom: 5px">圆角:</label>
          <select
            v-model="borderRadius"
            style="
              width: 100%;
              padding: 5px;
              border: 1px solid #ddd;
              border-radius: 4px;
            "
          >
            <option value="0">无圆角</option>
            <option value="8px">小圆角</option>
            <option value="16px">大圆角</option>
            <option value="50px">超大圆角</option>
          </select>
        </div>
      </div>
    </div>

    <div style="width: 600px; margin: 20px 0">
      <h4>自定义样式滚动容器</h4>
      <MScroll :scrollBtnShow="true" :bodyStyle="customBodyStyle">
        <div style="display: flex; gap: 15px; padding: 20px">
          <div
            v-for="i in 12"
            :key="i"
            style="
              min-width: 150px;
              padding: 15px;
              background: white;
              border-radius: 10px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            <div
              style="
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(45deg, #667eea, #764ba2);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                margin-bottom: 10px;
              "
            >
              {{ i }}
            </div>
            <h5 style="margin: 0 0 5px 0; font-size: 14px; text-align: center">
              项目 {{ i }}
            </h5>
            <p
              style="
                margin: 0;
                font-size: 12px;
                color: #666;
                text-align: center;
              "
            >
              描述信息
            </p>
          </div>
        </div>
      </MScroll>
    </div>

    <div style="width: 500px; margin: 20px 0">
      <h4>固定高度垂直居中</h4>
      <MScroll
        :scrollBtnShow="true"
        :bodyStyle="{
          height: '150px',
          background: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
        }"
      >
        <div style="display: flex; gap: 10px; padding: 0 20px">
          <div
            v-for="i in 15"
            :key="i"
            style="
              min-width: 100px;
              height: 80px;
              background: #28a745;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
            "
          >
            {{ i }}
          </div>
        </div>
      </MScroll>
    </div>

    <div style="width: 400px; margin: 20px 0">
      <h4>多行内容滚动</h4>
      <MScroll
        :scrollBtnShow="true"
        :bodyStyle="{
          height: '200px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          padding: '10px',
        }"
      >
        <div style="display: flex; gap: 12px; min-height: 100%">
          <div
            v-for="i in 8"
            :key="i"
            style="
              min-width: 120px;
              background: rgba(255, 255, 255, 0.9);
              border-radius: 10px;
              padding: 15px;
              display: flex;
              flex-direction: column;
              gap: 8px;
            "
          >
            <div
              style="
                width: 100%;
                height: 60px;
                background: #ff7675;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
              "
            >
              {{ i }}
            </div>
            <h6 style="margin: 0; font-size: 12px">标题 {{ i }}</h6>
            <p
              style="margin: 0; font-size: 10px; color: #666; line-height: 1.4"
            >
              这是第 {{ i }} 个项目的详细描述内容，展示多行文本的布局效果。
            </p>
            <button
              style="
                padding: 4px 8px;
                border: none;
                background: #4269fd;
                color: white;
                border-radius: 4px;
                font-size: 10px;
                cursor: pointer;
              "
            >
              查看详情
            </button>
          </div>
        </div>
      </MScroll>
    </div>

    <div style="margin-top: 20px; padding: 10px; background: #f5f5f5">
      <h4>当前自定义样式</h4>
      <pre
        style="
          background: white;
          padding: 10px;
          border-radius: 4px;
          font-size: 12px;
          margin: 10px 0;
          overflow: auto;
        "
        >{{ JSON.stringify(customBodyStyle, null, 2) }}</pre
      >

      <h4>样式说明</h4>
      <ul>
        <li>
          <strong>高度控制:</strong> 通过 height 属性控制滚动容器的固定高度
        </li>
        <li><strong>背景设置:</strong> 支持纯色、渐变色等各种背景样式</li>
        <li>
          <strong>边框样式:</strong> 可设置边框粗细、颜色、样式（实线/虚线等）
        </li>
        <li><strong>圆角设置:</strong> 通过 borderRadius 控制容器的圆角程度</li>
        <li>
          <strong>布局控制:</strong> 可使用 display、alignItems
          等属性控制内容布局
        </li>
        <li><strong>响应式:</strong> 样式会实时应用到滚动容器上</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import MScroll from "../../packages/moon-ui/src/MScroll/index.vue";
import MDiv from "../../packages/moon-ui/src/MDiv/index.vue";

const containerHeight = ref("120px");
const backgroundColor = ref("transparent");
const borderStyle = ref("1px solid #ddd");
const borderRadius = ref("8px");

const customBodyStyle = computed(() => ({
  height: containerHeight.value,
  background: backgroundColor.value,
  border: borderStyle.value,
  borderRadius: borderRadius.value,
}));
</script>
