<template>
  <div>
    <h1>Moon Demo{{ count }}</h1>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  defineProps<{
    name: string;
  }>();
  const count = ref<number>(0);
</script>

<style scoped>
  .demo {
    color: red;
  }
</style>
