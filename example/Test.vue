<template>
  <div>
    {{ a }}
    <button @click="a++">add</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const a = ref(1);
</script>
<style lang="scss" scoped></style>
