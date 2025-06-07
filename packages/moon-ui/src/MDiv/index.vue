<template>
  <div class="m-div" ref="boxRef" v-bind="$attrs" :style="{ ...style }">
    <slot></slot>
    <div v-if="dragPosition.includes('top')" class="m-div-bar m-div-bar-top" ref="topBorderRef">
      <slot v-if="$slots['bar-top']" name="bar-top"></slot>
      <slot v-else name="bar"></slot>
    </div>
    <div v-if="dragPosition.includes('left')" class="m-div-bar m-div-bar-left" ref="leftBorderRef">
      <slot v-if="$slots['bar-left']" name="bar-left"></slot>
      <slot v-else name="bar"></slot>
    </div>
    <div v-if="dragPosition.includes('right')" class="m-div-bar m-div-bar-right" ref="rightBorderRef">
      <slot v-if="$slots['bar-right']" name="bar-right"></slot>
      <slot v-else name="bar"> </slot>
    </div>
    <div v-if="dragPosition.includes('bottom')" class="m-div-bar m-div-bar-bottom" ref="bottomBorderRef">
      <slot v-if="$slots['bar-bottom']" name="bar-bottom"></slot>
      <slot v-else name="bar"> </slot>
    </div>

    <div v-if="dragPosition.includes('br')" class="m-div-corner m-div-corner-br" ref="cornerBrRef">
      <slot v-if="$slots['corner-br']" name="corner-br"></slot>
      <slot v-else name="corner">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
          <path fill="currentColor" d="M6.7 16L16 6.7V5.3L5.3 16zm3 0L16 9.7V8.3L8.3 16zm3 0l3.3-3.3v-1.4L11.3 16zm3 0l.3-.3v-1.4L14.3 16z" />
        </svg>
      </slot>
    </div>
    <div v-if="dragPosition.includes('bl')" class="m-div-corner m-div-corner-bl" ref="cornerBlRef">
      <slot v-if="$slots['corner-bl']" name="corner-bl"></slot>
      <slot v-else name="corner"></slot>
    </div>
    <div v-if="dragPosition.includes('tl')" class="m-div-corner m-div-corner-tl" ref="cornerTlRef">
      <slot v-if="$slots['corner-tl']" name="corner-tl"></slot>
      <slot v-else name="corner"></slot>
    </div>
    <div v-if="dragPosition.includes('tr')" class="m-div-corner m-div-corner-tr" ref="cornerTrRef">
      <slot v-if="$slots['corner-tr']" name="corner-tr"></slot>
      <slot v-else name="corner"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';

  /**
   * 拖拽位置类型
   */
  type DragPosition = 'top' | 'left' | 'right' | 'bottom' | 'tl' | 'tr' | 'bl' | 'br';

  /**
   * 组件属性定义
   */
  interface Props {
    /** 可以拖拽的边和角 */
    dragPosition?: DragPosition[];
  }

  /**
   * 定义组件属性
   */
  const props = withDefaults(defineProps<Props>(), {
    dragPosition: () => ['top', 'left', 'right', 'bottom', 'tl', 'tr', 'bl', 'br'],
  });
  defineOptions({
    name: 'MDiv',
    inheritAttrs: false,
  });

  // 模板引用
  const boxRef = ref<HTMLDivElement>();
  const topBorderRef = ref<HTMLDivElement>();
  const leftBorderRef = ref<HTMLDivElement>();
  const rightBorderRef = ref<HTMLDivElement>();
  const bottomBorderRef = ref<HTMLDivElement>();
  const cornerBrRef = ref<HTMLDivElement>();
  const cornerBlRef = ref<HTMLDivElement>();
  const cornerTlRef = ref<HTMLDivElement>();
  const cornerTrRef = ref<HTMLDivElement>();

  const style = reactive<Record<string, string>>({
    position: 'relative',
    overflow: 'hidden',
  });
  /**
   * 初始化鼠标拖拽事件
   */
  const initMouseMove = (): void => {
    if (!boxRef.value) return;

    const box = boxRef.value;
    // 左边框拖拽
    if (props.dragPosition.includes('left') && leftBorderRef.value) {
      leftBorderRef.value.onmousedown = (ev: MouseEvent) => {
        ev = ev || window.event;
        const disX = ev.clientX;
        const disW = box.offsetWidth;

        document.onmousemove = (ev: MouseEvent) => {
          ev = ev || window.event;
          const W = disW - (ev.clientX - disX);
          style.width = W + 'px';
        };

        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }

    // 右边框拖拽
    if (props.dragPosition.includes('right') && rightBorderRef.value) {
      rightBorderRef.value.onmousedown = (ev: MouseEvent) => {
        ev = ev || window.event;
        const disX = ev.clientX;
        const disW = box.offsetWidth;

        document.onmousemove = (ev: MouseEvent) => {
          ev = ev || window.event;
          const W = disW + ev.clientX - disX;
          style.width = W + 'px';
        };

        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }

    // 底部边框拖拽
    if (props.dragPosition.includes('bottom') && bottomBorderRef.value) {
      bottomBorderRef.value.onmousedown = (ev: MouseEvent) => {
        ev = ev || window.event;
        const disY = ev.clientY;
        const disH = box.offsetHeight;

        document.onmousemove = (ev: MouseEvent) => {
          ev = ev || window.event;
          const H = disH + ev.clientY - disY;
          style.height = H + 'px';
        };

        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }

    // 顶部边框拖拽
    if (props.dragPosition.includes('top') && topBorderRef.value) {
      topBorderRef.value.onmousedown = (ev: MouseEvent) => {
        ev = ev || window.event;
        const disY = ev.clientY;
        const disH = box.offsetHeight;

        document.onmousemove = (ev: MouseEvent) => {
          ev = ev || window.event;
          const H = disH - (ev.clientY - disY);
          style.height = H + 'px';
        };

        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }

    // 右下角拖拽
    if (props.dragPosition.includes('br') && cornerBrRef.value) {
      cornerBrRef.value.onmousedown = (ev: MouseEvent) => {
        ev = ev || window.event;
        const disX = ev.clientX;
        const disY = ev.clientY;
        const disW = box.offsetWidth;
        const disH = box.offsetHeight;

        document.onmousemove = (ev: MouseEvent) => {
          ev = ev || window.event;
          const W = disW + ev.clientX - disX;
          const H = disH + ev.clientY - disY;
          style.width = W + 'px';
          style.height = H + 'px';
        };

        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }

    // 左下角拖拽
    if (props.dragPosition.includes('bl') && cornerBlRef.value) {
      cornerBlRef.value.onmousedown = (ev: MouseEvent) => {
        ev = ev || window.event;
        const disX = ev.clientX;
        const disY = ev.clientY;
        const disW = box.offsetWidth;
        const disH = box.offsetHeight;

        document.onmousemove = (ev: MouseEvent) => {
          ev = ev || window.event;
          const W = disW - (ev.clientX - disX);
          const H = disH + ev.clientY - disY;
          style.width = W + 'px';
          style.height = H + 'px';
        };

        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }

    // 左上角拖拽
    if (props.dragPosition.includes('tl') && cornerTlRef.value) {
      cornerTlRef.value.onmousedown = (ev: MouseEvent) => {
        ev = ev || window.event;
        const disX = ev.clientX;
        const disY = ev.clientY;
        const disW = box.offsetWidth;
        const disH = box.offsetHeight;

        document.onmousemove = (ev: MouseEvent) => {
          ev = ev || window.event;
          const W = disW - (ev.clientX - disX);
          const H = disH - (disY - ev.clientY);
          style.width = W + 'px';
          style.height = H + 'px';
        };

        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }

    // 右上角拖拽
    if (props.dragPosition.includes('tr') && cornerTrRef.value) {
      cornerTrRef.value.onmousedown = (ev: MouseEvent) => {
        ev = ev || window.event;
        const disX = ev.clientX;
        const disY = ev.clientY;
        const disW = box.offsetWidth;
        const disH = box.offsetHeight;

        document.onmousemove = (ev: MouseEvent) => {
          ev = ev || window.event;
          const W = disW + ev.clientX - disX;
          const H = disH - (disY - ev.clientY);
          style.width = W + 'px';
          style.height = H + 'px';
        };

        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  };

  // 组件挂载后初始化拖拽功能
  onMounted(() => {
    initMouseMove();
  });
</script>

<style>
  :root {
    --m-div-bar-color: rgba(144, 147, 153, 0.3);
    --m-div-bar-size: 5px;
    --m-div-corner-size: 10px;
  }
</style>

<style lang="scss" scoped>
  .m-div {
    position: relative;
    overflow: hidden;
    .m-div-bar {
      position: absolute;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      z-index: 1;

      &:hover {
        background-color: var(--m-div-bar-color);
      }
    }
    .m-div-bar-left {
      width: var(--m-div-bar-size);
      height: 100%;
      left: 0;
      top: 0;
      &:hover {
        cursor: col-resize;
      }
    }
    .m-div-bar-right {
      width: var(--m-div-bar-size);
      height: 100%;
      top: 0;
      right: 0;
      &:hover {
        cursor: col-resize;
      }
    }
    .m-div-bar-bottom {
      width: 100%;
      height: var(--m-div-bar-size);
      bottom: 0;
      left: 0;
      &:hover {
        cursor: row-resize;
      }
    }
    .m-div-bar-top {
      width: 100%;
      height: var(--m-div-bar-size);
      top: 0;
      left: 0;
      &:hover {
        cursor: row-resize;
      }
    }
    .m-div-corner {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--m-div-corner-size);
      height: var(--m-div-corner-size);
      font-size: var(--m-div-corner-size);
      background-color: transparent;
      z-index: 2;

      &.m-div-corner-tl {
        top: 0;
        left: 0;
        cursor: nwse-resize;
      }

      &.m-div-corner-tr {
        top: 0;
        right: 0;
        cursor: nesw-resize;
      }

      &.m-div-corner-bl {
        bottom: 0;
        left: 0;
        cursor: nesw-resize;
      }

      &.m-div-corner-br {
        bottom: 0;
        right: 0;
        cursor: nwse-resize;
      }
    }
  }
</style>
