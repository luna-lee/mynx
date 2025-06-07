<template>
    <div class="m-if-show" v-if="compile" v-show="show">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

/**
 * 组件属性定义
 */
interface Props {
  /** 是否显示 */
  show?: boolean
  /** 延迟时间（毫秒） */
  delay?: number
}

/**
 * 定义组件属性
 */
const props = withDefaults(defineProps<Props>(), {
  show: false,
  delay: 0
})

/**
 * 定义组件选项
 */
defineOptions({
  name: 'MIfShow',
  inheritAttrs: false
})

// 响应式数据
const compile = ref(false)

/**
 * 监听 show 属性变化
 */
watch(
  () => props.show,
  (val: boolean) => {
    if (val && !compile.value) {
      setTimeout(() => {
        compile.value = true
      }, props.delay)
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.m-if-show {
    width: 100%;
    height: 100%;
}
</style>
