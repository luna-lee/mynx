<template>
  <horizontal
    v-if="mode === 'h'"
    ref="MoonHierarchy"
    :treeData="treeData"
    :treeOptions="treeOptions"
    :defaultOpenLevel="defaultOpenLevel"
    :duration="duration"
    :negativeIds="negativeIds"
    :config="config"
    :canExpendFold="canExpendFold"
    :expendShape="expendShape"
    :foldShape="foldShape"
    :layout="layout"
    :limit="limit"
    v-bind="$attrs"
  >
    <slot />
  </horizontal>
  <vertical
    v-else
    ref="MoonHierarchy"
    :treeData="treeData"
    :treeOptions="treeOptions"
    :defaultOpenLevel="defaultOpenLevel"
    :duration="duration"
    :negativeIds="negativeIds"
    :config="config"
    :canExpendFold="canExpendFold"
    :expendShape="expendShape"
    :foldShape="foldShape"
    :layout="layout"
    v-bind="$attrs"
  >
    <slot />
  </vertical>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import horizontal from './h.vue';
  import vertical from './v.vue';
  import type { HierarchyMode, HierarchyComponentInstance, LayoutDirection, TreeNodeData, TreeOptions, HierarchyConfig } from './types';

  export default defineComponent({
    name: 'MoonHierarchy',
    components: {
      horizontal,
      vertical,
    },
    inheritAttrs: false,

    props: {
      mode: {
        type: String as () => HierarchyMode,
        default: 'h',
        validator: (value: string): value is HierarchyMode => {
          return ['h', 'v'].includes(value);
        },
      },
      layout: {
        type: String as () => LayoutDirection,
        default: 'lr', //lr rl  //tb bt
      },
      // 子节点最大展示数，多余的出收起按钮
      limit: {
        type: Number,
        default: 3,
      },
      treeData: {
        type: Array as () => TreeNodeData[],
        default: () => [] as TreeNodeData[],
      },
      treeOptions: {
        type: Object as () => TreeOptions,
        default: () => ({}) as TreeOptions,
      },
      defaultOpenLevel: {
        type: Number,
        default: 2,
      },
      duration: {
        type: Number as () => number,
        default: 400,
      },
      //蝴蝶模型，指定负向数据对应的id 必须是根节点的直接子节点
      negativeIds: {
        type: Array as () => string[],
        default: () => [] as string[],
      },
      config: {
        type: Object as () => HierarchyConfig,
        default: () => ({}) as HierarchyConfig,
      },
      canExpendFold: {
        type: [Boolean, Function],
        default: true,
      },
      expendShape: {
        type: String as () => string,
      },
      foldShape: {
        type: String as () => string,
      },
    },
    data() {
      return {
        show: false,
      };
    },
    methods: {
      /**
       * 根据ID获取节点
       * @param id 节点ID
       */
      getNodeById(id: string) {
        const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance;
        return ref?.getNodeById(id);
      },

      /**
       * 获取所有节点
       */
      getAllNode() {
        const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance;
        return ref?.getAllNodes();
      },

      /**
       * 移动到中心位置
       */
      moveToCenter() {
        const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance;
        ref?.moveToCenter();
      },

      /**
       * 设置缩放比例
       * @param scale 缩放比例
       */
      zoom(scale: number) {
        const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance;
        ref?.scale(scale);
      },

      /**
       * 添加节点
       * @param targetNodeId 目标节点ID
       * @param childrenNode 子节点数据
       * @param _sign 符号标识
       */
      addNode(targetNodeId: string, childrenNode: any, _sign?: number) {
        const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance;
        ref?.addNodeToTargetNode(targetNodeId, childrenNode, _sign);
      },

      /**
       * 根据ID删除节点
       * @param id 节点ID或ID数组
       */
      removeNodeById(id: string | string[]) {
        const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance;
        ref?.removeNodeById(id);
      },

      /**
       * 暂停缩放功能
       */
      pauseZoom() {
        const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance;
        ref?.pauseZoom();
      },

      /**
       * 恢复缩放功能
       */
      continueZoom() {
        const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance;
        ref?.continueZoom();
      },

      /**
       * 显示自定义视图
       * @param e 事件对象
       * @param d 数据对象
       * @param width 宽度
       * @param height 高度
       * @param priority 优先级
       */
      showCustomView(e: Event, d: any, width?: number, height?: number, priority?: number) {
        const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance;
        ref?.drawCustomView(e, d, width, height, priority);
      },

      /**
       * 隐藏自定义视图
       */
      hiddenCustomView() {
        const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance;
        ref?.hiddenCustomView();
      },

      /**
       * 根据数据更新节点
       * @param data 节点数据或数据数组
       */
      updateNodeByData(data: any | any[]) {
        const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance;
        ref?.updateNodeByData(data);
      },

      /**
       * 移动到指定节点
       * @param targetNodeId 目标节点ID
       * @param eventList 事件列表
       */
      moveToNode(targetNodeId: string, eventList?: string[]) {
        const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance;
        ref?.moveToNode(targetNodeId, eventList);
      },

      /**
       * 展开所有节点
       */
      expandAllNode() {
        const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance;
        ref?.expandAllNode();
      },

      /**
       * 折叠所有节点
       */
      foldAllNode() {
        const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance;
        ref?.foldAllNode();
      },
    },
  });
</script>

<style lang="scss">
  .m-hierarchy-svg {
    .m-hierarchy-node {
      // 默认rect样式
      .m-hierarchy-rect {
        fill: #fff;
        stroke: rgb(216, 216, 216);
        stroke-width: 0.5;
      }

      // 默认text样式
      .m-hierarchy-text {
        fill: rgb(51, 51, 51);
      }

      // 默认plus样式
      .m-hierarchy-plus {
        stroke: rgb(153, 153, 153);
        fill: rgb(234, 242, 255);
        stroke-width: 1;
      }

      // 根节点样式
      &.m-hierarchy-node-root {
        .m-hierarchy-rect {
          fill: rgb(18, 137, 239);
        }
        .m-hierarchy-text {
          fill: #fff;
        }
        .m-hierarchy-plus {
          display: none;
        }
      }

      // 没有子节点的样式
      &:not(.m-hierarchy-node-haschildren) {
        .m-hierarchy-plus {
          display: none;
        }
      }

      // 非根节点的节点展开后样式
      &.m-hierarchy-node-expend:not(.m-hierarchy-node-root) {
        .m-hierarchy-text {
          fill: rgb(18, 139, 237);
        }
      }

      // 节点展开后样式
      &.m-hierarchy-node-expend {
        .m-hierarchy-plus {
          line:nth-of-type(2) {
            display: none;
          }
        }
      }

      // 展开限制节点的按钮型节点样式
      &.m-hierarchy-node-limit-button {
        .m-hierarchy-rect {
          fill: rgb(247, 247, 247);
        }
      }

      // 非展开限制节点的按钮型节点得节点鼠标悬停样式
      &:not(.m-hierarchy-node-limit-button):hover {
        .m-hierarchy-rect {
          stroke: rgb(18, 137, 239);
        }
      }
    }

    .m-hierarchy-custom-view {
      width: 100%;
      height: 100%;
      background-color: #fff;
      padding: 5px;
      border-radius: 8px;
      box-sizing: border-box;
      cursor: pointer;
    }

    .m-hierarchy-arrow {
      fill: #128bed;
    }

    .m-hierarchy-link {
      stroke: #d8d8d8;
      stroke-opacity: 1;
      stroke-width: 1;
    }

    .m-hierarchy-node-hover-link {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: m-hierarchy-link-run 20s linear infinite;
    }

    .m-hierarchy-loading {
      animation: m-hierarchy-rotate 3s linear infinite;
    }

    @keyframes m-hierarchy-rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes m-hierarchy-link-run {
      from {
        stroke-dasharray: 10, 5;
      }
      to {
        stroke-dasharray: 20, 5;
      }
    }
  }
</style>
