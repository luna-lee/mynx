<template>
  <!-- 按钮跟随内容 -->
  <BtnFollowText v-if="text.length > 0 && foldBtnInline && showFoldBtn" :text="text" :lineClamp="lineClamp" @update:showAll="onShowAll">
    <template v-if="$slots['fold-btn']" #fold-btn="{ isExpanded }">
      <slot name="fold-btn" :isExpanded="isExpanded"> </slot>
    </template>
  </BtnFollowText>

  <Normal v-else :text="text" :lineClamp="lineClamp" :showFoldBtn="showFoldBtn" :foldBtnInline="foldBtnInline" @update:showAll="onShowAll">
    <template v-if="$slots.default" #default>
      <slot> </slot>
    </template>
    <template v-if="$slots['fold-btn']" #fold-btn="{ isExpanded }">
      <slot name="fold-btn" :isExpanded="isExpanded"> </slot>
    </template>
  </Normal>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted, watch } from 'vue';
  import BtnFollowText from './BtnFollowText.vue';
  import Normal from './normal.vue';
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

  const onShowAll = (isShowAll: boolean) => {
    emit('update:showAll', isShowAll);
  };
</script>

<style lang="scss" scoped></style>
