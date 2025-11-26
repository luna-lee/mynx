<template>
  <div class="m-subsection" ref="subsectionRef">
    <MScroll ref="scrollViewRef" :key="scrollKey" v-bind="scrollAttrs">
      <div ref="tabHeaderRef" class="m-subsection__tab-header">
        <div
          ref="tabItemRefs"
          v-for="(tab, index) in tabs"
          :key="index"
          class="m-subsection__tab-item"
          :class="{ 'm-subsection__tab-item--active': currentActiveTabIndex === index }"
          @click="handleTabSwitch(index)"
        >
          <slot :name="'tab-title-' + index" :tab="tab">{{ tab.title }}</slot>
        </div>
        <div class="m-subsection__tab-indicator" :style="indicatorStyle"></div>
      </div>
    </MScroll>
    <div class="m-subsection__tab-content">
      <transition name="m-subsection__tab-transition" mode="out-in">
        <div :key="currentActiveTabIndex" class="m-subsection__tab-pane">
          <slot :name="'tab-content-' + currentActiveTabIndex"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, nextTick, onMounted } from 'vue';
  import { useResizeObserver } from '@vueuse/core';
  import MScroll from '../MScroll/index.vue';

  /**
   * 标签页数据接口
   */
  interface TabItem {
    /** 标签页标题 */
    title: string;
    /** 其他扩展属性 */
    [key: string]: any;
  }

  /**
   * 滚动配置接口
   */
  interface scrollAttrs {
    /** 是否显示滚动按钮 */
    scrollBtnShow?: boolean;
    /** 其他滚动配置 */
    [key: string]: any;
  }

  /**
   * 子选择器组件 Props 接口定义
   */
  interface SubsectionProps {
    /** 标签页数据 */
    tabs?: TabItem[];
    /** 当前激活的标签页索引（v-model） */
    modelValue?: number;
    /** 滚动组件配置选项 */
    scrollAttrs?: scrollAttrs;
  }

  /**
   * 组件事件定义
   */
  interface SubsectionEmits {
    /** 更新 modelValue 事件 */
    (event: 'update:modelValue', value: number): void;
  }

  // 定义组件名称
  defineOptions({
    name: 'MSubsection',
  });

  // 定义 Props 并设置默认值
  const props = withDefaults(defineProps<SubsectionProps>(), {
    tabs: () => [{ title: '标签一' }, { title: '标签二' }],
    modelValue: 0,
    scrollAttrs: () => ({
      scrollBtnShow: false,
    }),
  });

  // 定义事件
  const emit = defineEmits<SubsectionEmits>();

  // 模板引用
  const subsectionRef = ref<HTMLDivElement>();
  const tabItemRefs = ref<HTMLDivElement[]>([]);

  // 响应式状态
  const currentActiveTabIndex = ref<number>(0);
  const indicatorWidth = ref<number>(0);
  const indicatorLeft = ref<number>(0);
  const scrollKey = ref<number>(Date.now());

  /**
   * 指示器样式计算属性
   */
  const indicatorStyle = computed(() => ({
    width: `${indicatorWidth.value}px`,
    transform: `translateX(${indicatorLeft.value}px)`,
  }));

  /**
   * 处理标签页切换
   * @param index - 目标标签页索引
   */
  const scrollViewRef = ref<InstanceType<typeof MScroll>>();
  const tabHeaderRef = ref<HTMLDivElement>();
  const handleTabSwitch = (index: number): void => {
    const scrollViewWidth = scrollViewRef.value?.$el.offsetWidth;
    const tabHeaderWidth = tabHeaderRef.value?.offsetWidth;
    //  只有需要滚动时才平滑滚动到视图区域
    if (scrollViewWidth < tabHeaderWidth)
      // 平滑滚动到视图区域
      tabItemRefs.value[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });

    if (currentActiveTabIndex.value !== index) {
      currentActiveTabIndex.value = index;
    }
  };

  /**
   * 更新指示器位置和宽度
   */
  const updateIndicatorPosition = (): void => {
    if (!subsectionRef.value) return;

    const tabItemElements = subsectionRef.value.querySelectorAll('.m-subsection__tab-item');

    if (tabItemElements.length === 0 || currentActiveTabIndex.value >= tabItemElements.length) {
      return;
    }

    const activeTabElement = tabItemElements[currentActiveTabIndex.value] as HTMLElement;
    indicatorWidth.value = activeTabElement.offsetWidth;

    // 计算左边距离
    let leftOffset = 0;
    for (let i = 0; i < currentActiveTabIndex.value; i++) {
      leftOffset += (tabItemElements[i] as HTMLElement).offsetWidth;
    }
    indicatorLeft.value = leftOffset;
  };

  /**
   * 重置组件状态
   */
  const resetComponentState = (): void => {
    currentActiveTabIndex.value = 0;
    scrollKey.value = Date.now();
    nextTick(() => {
      updateIndicatorPosition();
    });
  };

  // 监听 modelValue 变化
  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue !== currentActiveTabIndex.value) {
        currentActiveTabIndex.value = newValue;
      }
    },
    { immediate: true },
  );

  // 监听 tabs 变化
  watch(
    () => props.tabs,
    () => {
      resetComponentState();
    },
  );

  // 监听当前激活标签页变化
  watch(currentActiveTabIndex, () => {
    if (currentActiveTabIndex.value !== props.modelValue) {
      emit('update:modelValue', currentActiveTabIndex.value);
    }
    nextTick(() => {
      updateIndicatorPosition();
    });
  });

  // 使用 ResizeObserver 监听容器尺寸变化
  useResizeObserver(subsectionRef, () => {
    updateIndicatorPosition();
  });

  // 组件挂载后初始化
  onMounted(() => {
    nextTick(() => {
      updateIndicatorPosition();
    });
  });
</script>

<style>
  :root {
    --m-subsection-radius: 5px;
    --m-subsection-tab-item-height: 30px;
    --m-subsection-tab-item-font-size: 14px;
    --m-subsection-tab-item-color: #303030;
    --m-subsection-tab-item-active-color: #fff;
    --m-subsection-tab-item-active-background-color: #4269fd;
  }
</style>

<style lang="scss" scoped>
  .m-subsection {
    display: flex;
    flex-direction: column;
    .m-scroll {
      height: auto;
      & > ::v-deep(.m-scroll-container) {
        border-radius: var(--m-subsection-radius);
      }
    }
    &__tab-header {
      width: fit-content;
      display: flex;
      position: relative;
      background: #dbe1ff;
      border-radius: var(--m-subsection-radius);
    }

    &__tab-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      height: var(--m-subsection-tab-item-height);
      font-size: var(--m-subsection-tab-item-font-size);
      cursor: pointer;
      position: relative;
      transition: all 0.3s ease;
      user-select: none;
      z-index: 1;

      &--active {
        font-weight: 600;
        color: var(--m-subsection-tab-item-active-color);
      }
    }

    &__tab-indicator {
      position: absolute;
      bottom: 0;
      height: 100%;
      border-radius: var(--m-subsection-radius);
      background-color: var(--m-subsection-tab-item-active-background-color);
      transition: all 0.3s ease;
      z-index: 0;
    }

    &__tab-content {
      position: relative;
      flex: 1;
    }

    &__tab-pane {
      width: 100%;
    }

    // 过渡动画效果
    &__tab-transition-enter-active,
    &__tab-transition-leave-active {
      transition:
        opacity 0.3s ease,
        transform 0.3s ease;
    }

    &__tab-transition-enter-from {
      opacity: 0;
      transform: translateX(10px);
    }

    &__tab-transition-enter-to {
      opacity: 1;
      transform: translateX(0);
    }

    &__tab-transition-leave-from {
      opacity: 1;
      transform: translateX(0);
    }

    &__tab-transition-leave-to {
      opacity: 0;
      transform: translateX(-10px);
    }
  }
</style>
