<template>
  <MCurtain
    v-model="isOpen"
    :foldStyle="{ width: '0', height: '200px' }"
    :openStyle="{ width: '500px', height: '200px' }"
  >
    <div>这里是窗帘内容</div>
    <template #trigger>
      <button class="moon-curtain-trigger" @click="isOpen = !isOpen">
        {{ isOpen ? "收起" : "展开" }}
      </button>
    </template>
  </MCurtain>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isOpen = ref(false);
</script>
<style scoped lang="scss">
.moon-curtain {
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.moon-curtain-trigger {
  position: absolute;
  top: 0;
  right: -100px;
  z-index: 1000;
  width: 100px;
  height: 50px;
  border: 1px solid blue;
}
</style>
