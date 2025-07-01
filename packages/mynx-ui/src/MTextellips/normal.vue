<template>
  <div class="m-text-ellips">
    <div class="m-text-ellips-container" ref="boxRef" :style="lineClampStyle">
      <slot>
        {{ text }}
      </slot>
      <div v-if="foldBtnInline && isExpanded && isEllipsis && showFoldBtn" class="m-text-toggle-btn" @click="toggleExpand">
        <slot name="fold-btn" :isExpanded="isExpanded">
          <a href="javascript:void(0)">
            {{ isExpanded ? '收起' : '展开' }}
          </a>
        </slot>
      </div>
    </div>
    <div class="m-text-ellips-text-sample" ref="contentRef" :style="sampleStyle">
      <slot>
        {{ text }}
      </slot>
    </div>
    <div v-if="isEllipsis && showFoldBtn && (!foldBtnInline || (foldBtnInline && !isExpanded))" class="m-text-toggle-btn" @click="toggleExpand">
      <slot name="fold-btn" :isExpanded="isExpanded">
        <a href="javascript:void(0)">
          {{ isExpanded ? '收起' : '展开' }}
        </a>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useResizeObserver } from '@vueuse/core';
  import { ref, reactive, computed, onMounted, watch } from 'vue';

  /**
   * 组件属性定义
   */
  interface Props {
    /** 显示的文本内容 */
    text?: string;
    /** 行数限制 */
    lineClamp?: number;
    /** 是否显示展开/收起按钮 */
    showFoldBtn?: boolean;
    /**  是否收起按钮紧跟内容。 */
    foldBtnInline?: boolean;
  }

  /**
   * 定义组件属性
   */
  const props = withDefaults(defineProps<Props>(), {
    text: '',
    lineClamp: 1,
    showFoldBtn: false,
    foldBtnInline: true,
  });

  /**
   * 定义组件选项
   */
  defineOptions({
    name: 'MTextEllips',
    inheritAttrs: false,
  });

  /**
   * 定义事件
   */
  const emit = defineEmits<{
    /** 显示状态更新事件 */
    'update:showAll': [isShowAll: boolean];
  }>();

  // 模板引用
  const boxRef = ref<HTMLDivElement>();
  const contentRef = ref<HTMLSpanElement>();

  // 响应式数据
  const isEllipsis = ref(false);
  const isExpanded = ref(false);
  const sampleStyle = reactive<Record<string, any>>({});

  // 是否展示全部内容
  const isShowAll = computed(() => {
    return !isEllipsis.value || isExpanded.value;
  });

  // 监听 isShowAll 变化并发出事件
  watch(
    isShowAll,
    (newValue) => {
      emit('update:showAll', newValue);
    },
    { immediate: true },
  );
  watch(
    () => [props.text, props.lineClamp],
    () => {
      isExpanded.value = false;
      isEllipsis.value = false;
      checkEllipsis();
    },
    {
      deep: true,
    },
  );

  /**
   * 切换展开/收起状态
   */
  const toggleExpand = (): void => {
    isExpanded.value = !isExpanded.value;
  };

  /**
   * 计算行限制样式
   */
  const lineClampStyle = computed((): Record<string, any> => {
    if (isExpanded.value) {
      return {};
    }

    if (props.lineClamp > 1) {
      return {
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': props.lineClamp,
      };
    }

    return {
      'white-space': 'nowrap',
    };
  });

  /**
   * 检查是否需要省略
   */
  const checkEllipsis = (): void => {
    if (!contentRef.value || !boxRef.value) return;
    // 通过比较模板元素的高度和容器元素的高度来判断是否已省略
    const computedStyle = getComputedStyle(boxRef.value);
    const lineHeight = parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * 1.5;
    // 计算最大高度
    const maxHeight =
      lineHeight * props.lineClamp +
      parseFloat(computedStyle.paddingTop) +
      parseFloat(computedStyle.paddingBottom) +
      parseFloat(computedStyle.borderTopWidth) +
      parseFloat(computedStyle.borderBottomWidth);
    // 计算实际高度
    const actualHeight = contentRef.value.offsetHeight;
    // 判断是否需要省略
    isEllipsis.value = actualHeight > maxHeight;
  };

  /**
   * 组件挂载后初始化
   */
  onMounted(() => {
    if (!contentRef.value || !boxRef.value) return;

    // 监听内容元素尺寸变化
    useResizeObserver(contentRef, () => {
      checkEllipsis();
    });

    // 监听容器元素尺寸变化
    useResizeObserver(boxRef, () => {
      if (boxRef.value) {
        // 让模板元素的宽度与容器元素的宽度一致，并设置行高、内边距等样式
        const computedStyle = getComputedStyle(boxRef.value);
        const paddingTop = computedStyle.paddingTop;
        const paddingBottom = computedStyle.paddingBottom;
        const paddingLeft = computedStyle.paddingLeft;
        const paddingRight = computedStyle.paddingRight;
        const lineHeight = computedStyle.lineHeight;
        const borderTopWidth = computedStyle.borderTopWidth;
        const borderBottomWidth = computedStyle.borderBottomWidth;
        const borderLeftWidth = computedStyle.borderLeftWidth;
        const borderRightWidth = computedStyle.borderRightWidth;
        const boxSizing = computedStyle.boxSizing;
        const width = computedStyle.width;

        sampleStyle.width = width;
        sampleStyle.lineHeight = lineHeight;
        sampleStyle.paddingTop = paddingTop;
        sampleStyle.paddingBottom = paddingBottom;
        sampleStyle.paddingLeft = paddingLeft;
        sampleStyle.paddingRight = paddingRight;
        sampleStyle.boxSizing = boxSizing;
        sampleStyle.borderTop = 'solid ' + borderTopWidth;
        sampleStyle.borderBottom = 'solid ' + borderBottomWidth;
        sampleStyle.borderLeft = 'solid ' + borderLeftWidth;
        sampleStyle.borderRight = 'solid ' + borderRightWidth;
      }
      checkEllipsis();
    });

    // 初始检查
    checkEllipsis();
  });
</script>

<style lang="scss" scoped>
  .m-text-ellips {
    display: flex;
    gap: 2px;
    .m-text-toggle-btn {
      display: inline-flex;
      align-items: self-start;
    }
  }
  .m-text-ellips-container {
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    line-height: 1.5em;
  }

  .m-text-ellips-text-sample {
    position: fixed;
    right: 0;
    bottom: 0;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    z-index: -1;
  }
</style>
