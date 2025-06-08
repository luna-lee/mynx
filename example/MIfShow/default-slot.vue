<template>
  <div class="demo-container">
    <div class="demo-item">
      <el-form-item label="延迟时间：">
        <el-slider v-model="delay" :min="0" :max="5" show-stops :marks="marks" />
      </el-form-item>
      <div class="controls">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Tab 1" name="tab1"> </el-tab-pane>
          <el-tab-pane label="Tab 2" name="tab2"> </el-tab-pane>
        </el-tabs>
      </div>
      <div class="content-wrapper" :key="delay">
        <MIfShow :show="activeTab === 'tab1'" :delay="delay * 1000">
          <Item>
            <div class="content">
              <h6>这是MIfShow的默认插槽内容</h6>
              <p>当show属性为true时，这个内容会被渲染到DOM中。</p>
              <p>当show属性为false时，这个内容不会被渲染。</p>
            </div>
          </Item>
        </MIfShow>
        <MIfShow :show="activeTab === 'tab2'">
          <Item>
            <div class="content">
              <h6>这是MIfShow的默认插槽内容</h6>
              <p>当show属性为true时，这个内容会被渲染到DOM中。</p>
              <p>当show属性为false时，这个内容不会被渲染。</p>
            </div>
          </Item>
        </MIfShow>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Item from "./_c/item.vue";
const activeTab = ref("tab1");
const delay = ref(0);
/**
 * 滑块标记
 */
const marks = {
  0: "0s",
  1: "1s",
  2: "2s",
  3: "3s",
  4: "4s",
  5: "5s",
};
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
}

.demo-item {
  margin-bottom: 40px;
}

.controls {
  margin-top: 15px;
  margin-bottom: 15px;
}
.content-wrapper {
  min-height: 100px;
  border: 2px dashed #e4e7ed;
  border-radius: 4px;
  padding: 15px;
  background: #fafafa;
}
</style>
