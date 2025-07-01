<template>
  <div class="m-text-ellips">
    <div class="m-text-ellips-container" ref="boxRef">
      {{ textShow }}
      <div v-if="isEllipsis" class="m-text-toggle-btn" @click="toggleExpand">
        <slot name="fold-btn" :isExpanded="isExpanded">
          <a href="javascript:void(0)">
            {{ isExpanded ? '收起' : '展开' }}
          </a>
        </slot>
      </div>
    </div>
    <div class="m-text-ellips-text-temp" ref="tempRef" :style="sampleStyle">
      {{ text }}
    </div>
    <div class="m-text-toggle-btn-temp" ref="toggleBtnTempRef">
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
  }

  /**
   * 定义组件属性
   */
  const props = withDefaults(defineProps<Props>(), {
    text: '',
    lineClamp: 1,
  });

  /**
   * 定义组件选项
   */
  defineOptions({
    name: 'TextFollow',
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
  const boxRefWidth = ref<number>(0);

  const tempRef = ref<HTMLSpanElement>();
  const toggleBtnTempRef = ref<HTMLDivElement>();
  // 响应式数据
  const isEllipsis = ref(false);
  const isExpanded = ref(false);
  const sampleStyle = reactive<Record<string, any>>({});
  const textShow = ref('');

  // 是否展示全部内容
  const isShowAll = computed(() => {
    return !isEllipsis.value || isExpanded.value;
  });

  // 监听 isShowAll 变化并发出事件
  watch(
    isShowAll,
    (newValue) => {
      if (newValue) {
        textShow.value = props.text;
      } else {
        checkEllipsis();
      }
      emit('update:showAll', newValue);
    },
    { immediate: true },
  );
  watch(
    () => [props.text, props.lineClamp],
    () => {
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
   * 组件挂载后初始化
   */
  onMounted(() => {
    if (!tempRef.value || !boxRef.value) return;
    // 监听容器元素尺寸变化
    useResizeObserver(boxRef, () => {
      if (boxRef.value) {
        if (boxRefWidth.value !== boxRef.value.clientWidth) {
          boxRefWidth.value = boxRef.value.clientWidth;
        } else return;
        // 让模板元素的宽度与容器元素的宽度一致，并设置行高、内边距等样式
        const computedStyle = getComputedStyle(boxRef.value);

        // 复制所有影响文本渲染的样式
        const stylesToCopy = [
          'fontSize',
          'fontFamily',
          'fontWeight',
          'fontStyle',
          'letterSpacing',
          'wordSpacing',
          'textTransform',
          'fontVariant',
          'fontStretch',
          'lineHeight',
          'textIndent',
          'fontFeatureSettings',
          'fontVariationSettings',
        ];
        stylesToCopy.forEach((prop) => {
          tempRef.value.style[prop] = computedStyle[prop];
        });
      }
      checkEllipsis();
    });

    // 初始检查
    // checkEllipsis();
  });

  function checkEllipsis() {
    // 使用 clientWidth 计算可用宽度
    const clientWidth = boxRef.value.clientWidth; // content + padding (不含border和scrollbar)
    const computedStyle = getComputedStyle(boxRef.value);

    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(computedStyle.paddingRight) || 0;

    // 纯内容区域宽度
    const contentWidth = clientWidth - paddingLeft - paddingRight;
    const temp = tempRef.value;
    // 测量省略号宽度
    temp.textContent = '...';
    const ellipsisWidth = temp.offsetWidth;
    const toggleBtnWidth = toggleBtnTempRef.value.offsetWidth;
    const availableWidth = contentWidth - ellipsisWidth - toggleBtnWidth - 20;

    // 快速检查是否需要截取
    temp.textContent = props.text;

    if (temp.clientWidth <= contentWidth * props.lineClamp) {
      textShow.value = props.text;
      isEllipsis.value = false;
      return;
    }
    isEllipsis.value = true;
    // 二分查找最大可见长度
    let left = 0;
    let right = props.text.length;
    let maxVisibleLength = 0;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const testText = props.text.substring(0, mid);
      temp.textContent = testText;

      if (temp.clientWidth <= contentWidth * (props.lineClamp - 1) + availableWidth) {
        maxVisibleLength = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    textShow.value = props.text.substring(0, maxVisibleLength) + '...';
  }
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

  .m-text-ellips-text-temp,
  .m-text-toggle-btn-temp {
    position: fixed;
    right: 0;
    bottom: 0;
    opacity: 0;
    z-index: -1;
    visibility: hidden;
    white-space: nowrap;
    pointer-events: none;
    margin: 0;
    border: none;
    padding: 0;
    box-sizing: content-box;
  }
</style>
