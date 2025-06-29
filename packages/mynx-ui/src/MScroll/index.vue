<template>
  <div class="m-scroll" :class="{ 'm-scroll-btn-show': shouldShowScrollButtons }">
    <div 
      v-if="shouldShowScrollButtons" 
      class="m-scroll-btn m-scroll-btn-left" 
      :class="{ 'm-scroll-btn-disabled': isAtScrollStart }" 
      @click="handleLeftButtonClick"
    >
      <slot name="left-btn" :isScrollBegin="isAtScrollStart">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="m4.431 12.822l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645" />
        </svg>
      </slot>
    </div>
    <div 
      class="m-scroll-body" 
      ref="scrollBodyRef" 
      :style="bodyStyle" 
      @scroll="handleScroll"
    >
      <slot></slot>
    </div>
    <div 
      v-if="shouldShowScrollButtons" 
      class="m-scroll-btn m-scroll-btn-right" 
      :class="{ 'm-scroll-btn-disabled': isAtScrollEnd }" 
      @click="handleRightButtonClick"
    >
      <slot name="right-btn" :isScrollEnd="isAtScrollEnd">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M5.536 21.886a1 1 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886" />
        </svg>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUpdated, type CSSProperties } from 'vue'

/**
 * 滚动组件 Props 接口定义
 */
interface ScrollProps {
  /** 滚动步长，单位为像素 */
  scrollStep?: number
  /** 是否显示滚动按钮 */
  scrollBtnShow?: boolean
  /** 滚动容器的样式 */
  bodyStyle?: CSSProperties
}

// 定义组件名称
defineOptions({
  name: 'MScroll'
})

// 定义 Props 并设置默认值
const props = withDefaults(defineProps<ScrollProps>(), {
  scrollStep: 200,
  scrollBtnShow: false,
  bodyStyle: () => ({})
})

// 模板引用
const scrollBodyRef = ref<HTMLDivElement>()

// 响应式状态
const isAtScrollStart = ref<boolean>(false)
const isAtScrollEnd = ref<boolean>(false)

/**
 * 计算是否应该显示滚动按钮
 * 当滚动按钮显示开关打开且内容需要滚动时显示
 */
const shouldShowScrollButtons = computed<boolean>(() => {
  // 如果滚动条显示，并且开始和结束滚动按钮状态不能同时为true，则显示滚动按钮
  // 同时为true时，则表示内容无需滚动
  return props.scrollBtnShow && !(isAtScrollStart.value && isAtScrollEnd.value)
})

/**
 * 处理左侧按钮点击事件 - 向左滚动
 */
const handleLeftButtonClick = (): void => {
  if (!scrollBodyRef.value) return
  
  scrollBodyRef.value.scrollTo({
    left: scrollBodyRef.value.scrollLeft - props.scrollStep,
    behavior: 'smooth'
  })
}

/**
 * 处理右侧按钮点击事件 - 向右滚动
 */
const handleRightButtonClick = (): void => {
  if (!scrollBodyRef.value) return
  
  scrollBodyRef.value.scrollTo({
    left: scrollBodyRef.value.scrollLeft + props.scrollStep,
    behavior: 'smooth'
  })
}

/**
 * 处理滚动事件
 */
const handleScroll = (): void => {
  updateScrollStatus()
}

/**
 * 检查是否滚动到开始位置
 */
const checkScrollStart = (): void => {
  if (!scrollBodyRef.value) return
  isAtScrollStart.value = scrollBodyRef.value.scrollLeft === 0
}

/**
 * 检查是否滚动到结束位置
 */
const checkScrollEnd = (): void => {
  if (!scrollBodyRef.value) return
  const { scrollLeft, scrollWidth, clientWidth } = scrollBodyRef.value
  isAtScrollEnd.value = scrollLeft === scrollWidth - clientWidth
}

/**
 * 更新滚动状态
 */
const updateScrollStatus = (): void => {
  checkScrollStart()
  checkScrollEnd()
}

// 生命周期钩子
onMounted(() => {
  updateScrollStatus()
})

onUpdated(() => {
  updateScrollStatus()
})
</script>

<style>
  :root {
    --m-scrollbar-width: 0px;
    --m-scrollbar-height: 0px;
    --m-scrollbar-thumb-bg: #3ab0f3;
    --m-scrollbar-border-radius: 20px;
    --m-scrollbar-track-bg: #d8d8d8;
  }
</style>
<style lang="scss" scoped>
  .m-scroll {
    position: relative;
    height: 100%;
    width: 100%;
    .m-scroll-body {
      overflow: auto;
      height: 100%;
      width: 100%;
      /* offset */
      position: relative;
      /* 整个滚动条 */
      &::-webkit-scrollbar {
        width: var(--m-scrollbar-width);
        height: var(--m-scrollbar-height);
        z-index: 12;
      }

      /* 滚动条上的滚动滑块 */
      &::-webkit-scrollbar-thumb {
        background-color: var(--m-scrollbar-thumb-bg);
        border-radius: var(--m-scrollbar-border-radius);
      }

      /* 滚动条轨道 */
      &::-webkit-scrollbar-track {
        background-color: var(--m-scrollbar-track-bg);
        border-radius: var(--m-scrollbar-border-radius);
      }
      /* 整个滚动条 */
      &::-ms-scrollbar {
        width: var(--m-scrollbar-width);
        height: var(--m-scrollbar-height);
      }

      /* 滚动条上的滚动滑块 */
      &::-ms-scrollbar-thumb {
        background-color: var(--m-scrollbar-thumb-bg);
        border-radius: var(--m-scrollbar-border-radius);
      }

      /* 滚动条轨道 */
      &::-moz-scrollbar-track {
        background-color: var(--m-scrollbar-track-bg);
        border-radius: var(--m-scrollbar-border-radius);
      }

      /* 设置滚动条宽度 */
      -moz-scrollbar-width: none;
    }

    .m-scroll-btn {
      cursor: pointer;
      position: absolute;
      width: 20px;
      height: 100%;
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .m-scroll-btn-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .m-scroll-btn-left {
      left: 0;
      top: 0;
    }
    .m-scroll-btn-right {
      right: 0;
      top: 0;
    }
    &.m-scroll-btn-show {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
</style>
