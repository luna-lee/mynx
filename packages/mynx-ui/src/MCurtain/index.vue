<template>
  <div class="m-curtain" :class="{ 'm-curtain-is-open': isOpen }" :style="isOpen ? openStyle : foldStyle">
    <div class="m-curtain-content">
      <slot></slot>
    </div>
    <slot name="trigger" :isOpen="isOpen">
      <div
        class="m-curtain-toggle"
        v-if="showTrigger"
        :class="{
          'm-curtain-toggle-position-right': triggerPosition == 'right',
          'm-curtain-toggle-position-left': triggerPosition == 'left',
          'm-curtain-toggle-position-bottom': triggerPosition == 'bottom',
          'm-curtain-toggle-position-top': triggerPosition == 'top',
        }"
        @click="toggle"
      >
        <slot name="trigger-content" :isOpen="isOpen">
          <svg class="m-curtain-toggle-icon" :class="{ 'm-curtain-toggle-icon-open': isOpen }" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m9 5l6 7l-6 7" />
          </svg>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script setup lang="tsx">
  import { ref, watch } from 'vue';

  /**
   * 定义组件选项
   */
  defineOptions({
    name: 'MCurtain',
  });

  /**
   * MCurtain组件的props接口定义
   */
  interface MCurtainProps {
    /** 双向绑定的值，控制窗帘的开关状态 */
    modelValue?: boolean;
    /** 折叠状态下的样式 */
    foldStyle?: Record<string, any>;
    /** 展开状态下的样式 */
    openStyle?: Record<string, any>;
    /** 触发器位置 */
    triggerPosition?: 'left' | 'right' | 'top' | 'bottom';
    /** 是否显示触发器 */
    showTrigger?: boolean;
  }

  /**
   * MCurtain组件的emits接口定义
   */
  interface MCurtainEmits {
    /** 更新modelValue的事件 */
    (e: 'update:modelValue', value: boolean): void;
  }

  // 定义props，使用withDefaults设置默认值
  const props = withDefaults(defineProps<MCurtainProps>(), {
    modelValue: true,
    foldStyle: () => ({
      width: '0',
      height: '100%',
    }),
    openStyle: () => ({
      width: '500px',
      height: '100%',
    }),
    triggerPosition: 'right',
    showTrigger: true,
  });

  // 定义emits
  const emit = defineEmits<MCurtainEmits>();

  // 响应式数据
  const isOpen = ref<boolean>(false);

  // 监听modelValue变化
  watch(
    () => props.modelValue,
    (val) => {
      isOpen.value = val;
    },
    { immediate: true },
  );

  /**
   * 切换窗帘开关状态
   */
  const toggle = () => {
    isOpen.value = !isOpen.value;
    emit('update:modelValue', isOpen.value);
  };
</script>

<style lang="scss" scoped>
  .m-curtain {
    position: relative;
    transition: all 0.5s ease-in-out;
    .m-curtain-content {
      width: 100%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
    }
    .m-curtain-toggle {
      position: absolute;
      cursor: pointer;
      z-index: 100;

      .m-curtain-toggle-icon {
        transition: all 0.5s ease-in-out;
      }
      // 左中
      &.m-curtain-toggle-position-left {
        left: 0;
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateX(-100%);

        .m-curtain-toggle-icon {
          transform: rotate(180deg);

          &.m-curtain-toggle-icon-open {
            transform: rotate(0deg);
          }
        }
      }
      // 右中
      &.m-curtain-toggle-position-right {
        right: 0;
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateX(100%);
        .m-curtain-toggle-icon-open {
          transform: rotate(180deg);
        }
      }
      // 上中
      &.m-curtain-toggle-position-top {
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(-100%);
        .m-curtain-toggle-icon {
          transform: rotate(-90deg);

          &.m-curtain-toggle-icon-open {
            transform: rotate(90deg);
          }
        }
      }
      // 下中
      &.m-curtain-toggle-position-bottom {
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(100%);
        .m-curtain-toggle-icon {
          transform: rotate(90deg);

          &.m-curtain-toggle-icon-open {
            transform: rotate(-90deg);
          }
        }
      }
    }
  }
</style>
