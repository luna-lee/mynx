<template>
    <div class="m-scale">
        <div class="m-scale-body" ref="scaleBodyRef" :style="scaleBodyStyle">
            <div
                class="m-scale-design-view"
                :style="{ height: designHeightNum + 'px', width: designWidthNum + 'px', ...transformStyle }"
            >
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useResizeObserver } from '@vueuse/core'

/**
 * 缩放适配模式
 */
type FitMode = 'fill' | 'contain' | 'containX' | 'containY'

/**
 * 组件属性定义
 */
interface Props {
  /** 设计稿宽度 */
  designWidth?: number | string
  /** 设计稿高度 */
  designHeight?: number | string
  /** contain模式下缩放后是否保持居中 */
  containCenter?: boolean
  /** 缩放适配模式 */
  fit?: FitMode
}

/**
 * 定义组件属性
 */
const props = withDefaults(defineProps<Props>(), {
  designWidth: 835,
  designHeight: 367,
  containCenter: false,
  fit: 'fill'
})

/**
 * 定义组件选项
 */
defineOptions({
  name: 'MScale',
  inheritAttrs: false
})

// 模板引用
const scaleBodyRef = ref<HTMLDivElement>()

// 响应式数据
const scaleBodyStyle = ref<Record<string, string>>({})
const transformStyle = reactive({
  transformOrigin: 'top left',
  transform: 'scaleX(1)'
})

/**
 * 计算设计稿宽度数值
 */
const designWidthNum = computed((): number => {
  return parseInt(String(props.designWidth))
})

/**
 * 计算设计稿高度数值
 */
const designHeightNum = computed((): number => {
  return parseInt(String(props.designHeight))
})

/**
 * 处理容器尺寸变化
 * @param e - 容器元素
 */
const onResize = (e: HTMLElement): void => {
  const rateWidth = e.offsetWidth / designWidthNum.value || 1
  const rateHeight = e.offsetHeight / designHeightNum.value || 1

  if (props.fit === 'fill') {
    transformStyle.transform = `scaleX(${rateWidth}) scaleY(${rateHeight})`
  }

  if (props.fit === 'contain') {
    // 获取最小的缩放尺度
    const miniRate = Math.min(rateWidth, rateHeight)
    transformStyle.transform = `scaleX(${miniRate}) scaleY(${miniRate})`
    
    if (props.containCenter) {
      scaleBodyStyle.value = {
        paddingLeft: (e.offsetWidth - designWidthNum.value * miniRate) / 2 + 'px',
        paddingTop: (e.offsetHeight - designHeightNum.value * miniRate) / 2 + 'px'
      }
    }
  }

  if (props.fit === 'containX') {
    transformStyle.transform = `scaleX(${rateWidth}) scaleY(${rateWidth})`
    scaleBodyStyle.value = {
      height: designHeightNum.value * rateWidth + 'px'
    }
    
    if (props.containCenter) {
      scaleBodyStyle.value = {
        paddingLeft: (e.offsetWidth - designWidthNum.value * rateWidth) / 2 + 'px',
        paddingTop: (e.offsetHeight - designHeightNum.value * rateWidth) / 2 + 'px'
      }
    }
  }

  if (props.fit === 'containY') {
    transformStyle.transform = `scaleX(${rateHeight}) scaleY(${rateHeight})`
    scaleBodyStyle.value = {
      width: designWidthNum.value * rateHeight + 'px'
    }
    
    if (props.containCenter) {
      scaleBodyStyle.value = {
        paddingLeft: (e.offsetWidth - designWidthNum.value * rateHeight) / 2 + 'px',
        paddingTop: (e.offsetHeight - designHeightNum.value * rateHeight) / 2 + 'px'
      }
    }
  }
}

// 使用 ResizeObserver 监听尺寸变化
useResizeObserver(scaleBodyRef, (entries) => {
  const entry = entries[0]
  if (entry) {
    onResize(entry.target as HTMLElement)
  }
})
</script>

<style lang="scss" scoped>
.m-scale {
    width: 100%;
    height: 100%;
    .m-scale-body {
        width: 100%;
        height: 100%;
        .m-scale-design-view {
            position: relative; //兜底
            & > :deep(div) {
                height: 100%;
                width: 100%;
            }
        }
    }
}
</style>
