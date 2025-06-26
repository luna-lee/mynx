<template>
  <horizontal v-if="mode === 'h'" ref="MoonHierarchy" v-bind="$attrs">
    <slot />
  </horizontal>
  <vertical v-else ref="MoonHierarchy" v-bind="$attrs">
    <slot />
  </vertical>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import horizontal from './h.vue'
import vertical from './v.vue'
import type { HierarchyMode, HierarchyComponentInstance } from './types'

export default defineComponent({
  name: 'MoonHierarchy',
  components: { 
    horizontal, 
    vertical 
  },
  inheritAttrs: false,
  
  props: {
    mode: {
      type: String as () => HierarchyMode,
      default: 'h' as HierarchyMode,
      validator: (value: string): value is HierarchyMode => {
        return ['h', 'v'].includes(value)
      }
    }
  },
  
  data() {
    return {
      show: false
    }
  },
  
  methods: {
    /**
     * 根据ID获取节点
     * @param id 节点ID
     */
    getNodeById(id: string) {
      const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance
      return ref?.getNodeById(id)
    },
    
    /**
     * 获取所有节点
     */
    getAllNode() {
      const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance
      return ref?.getAllNodes()
    },
    
    /**
     * 移动到中心位置
     */
    moveToCenter() {
      const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance
      ref?.moveToCenter()
    },
    
    /**
     * 设置缩放比例
     * @param scale 缩放比例
     */
    zoom(scale: number) {
      const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance
      ref?.setZoom(scale)
    },
    
    /**
     * 添加节点
     * @param targetNodeId 目标节点ID
     * @param childrenNode 子节点数据
     * @param _sign 符号标识
     */
    addNode(targetNodeId: string, childrenNode: any, _sign?: number) {
      const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance
      ref?.addNode(targetNodeId, childrenNode, _sign)
    },
    
    /**
     * 根据ID删除节点
     * @param id 节点ID或ID数组
     */
    removeNodeById(id: string | string[]) {
      const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance
      ref?.removeNodeById(id)
    },
    
    /**
     * 暂停缩放功能
     */
    pauseZoom() {
      const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance
      ref?.pauseZoom()
    },
    
    /**
     * 恢复缩放功能
     */
    continueZoom() {
      const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance
      ref?.continueZoom()
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
      const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance
      ref?.showCustomView(e, d, width, height, priority)
    },
    
    /**
     * 隐藏自定义视图
     */
    hiddenCustomView() {
      const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance
      ref?.hideCustomView()
    },
    
    /**
     * 根据数据更新节点
     * @param data 节点数据或数据数组
     */
    updateNodeByData(data: any | any[]) {
      const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance
      ref?.updateNodesByData(data)
    },
    
    /**
     * 移动到指定节点
     * @param targetNodeId 目标节点ID
     * @param eventList 事件列表
     */
    moveToNode(targetNodeId: string, eventList?: string[]) {
      const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance
      ref?.moveToNode(targetNodeId, eventList)
    },
    
    /**
     * 展开所有节点
     */
    expendAllNode() {
      const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance
      ref?.expandAllNodes()
    },
    
    /**
     * 折叠所有节点
     */
    foldAllNode() {
      const ref = this.$refs.MoonHierarchy as HierarchyComponentInstance
      ref?.collapseAllNodes()
    }
  }
})
</script>

<style lang="scss">
.moon-hierarchy-svg {
  .moon-hierarchy-node {
    // 默认rect样式
    .moon-hierarchy-rect {
      fill: #fff;
      stroke: rgb(216, 216, 216);
      stroke-width: 0.5;
    }
    
    // 默认text样式
    .moon-hierarchy-text {
      fill: rgb(51, 51, 51);
    }
    
    // 默认plus样式
    .moon-hierarchy-plus {
      stroke: rgb(153, 153, 153);
      fill: rgb(234, 242, 255);
      stroke-width: 1;
    }

    // 根节点样式
    &.moon-hierarchy-node-root {
      .moon-hierarchy-rect {
        fill: rgb(18, 137, 239);
      }
      .moon-hierarchy-text {
        fill: #fff;
      }
      .moon-hierarchy-plus {
        display: none;
      }
    }
    
    // 没有子节点的样式
    &:not(.moon-hierarchy-node-haschildren) {
      .moon-hierarchy-plus {
        display: none;
      }
    }
    
    // 非根节点的节点展开后样式
    &.moon-hierarchy-node-expend:not(.moon-hierarchy-node-root) {
      .moon-hierarchy-text {
        fill: rgb(18, 139, 237);
      }
    }
    
    // 节点展开后样式
    &.moon-hierarchy-node-expend {
      .moon-hierarchy-plus {
        line:nth-of-type(2) {
          display: none;
        }
      }
    }
    
    // 展开限制节点的按钮型节点样式
    &.moon-hierarchy-node-limit-button {
      .moon-hierarchy-rect {
        fill: rgb(247, 247, 247);
      }
    }
    
    // 非展开限制节点的按钮型节点得节点鼠标悬停样式
    &:not(.moon-hierarchy-node-limit-button):hover {
      .moon-hierarchy-rect {
        stroke: rgb(18, 137, 239);
      }
    }
  }
  
  .moon-hierarchy-custom-view {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 5px;
    border-radius: 8px;
    box-sizing: border-box;
    cursor: pointer;
  }
  
  .moon-hierarchy-arrow {
    fill: #128bed;
  }
  
  .moon-hierarchy-link {
    stroke: #d8d8d8;
    stroke-opacity: 1;
    stroke-width: 1;
  }
  
  .moon-hierarchy-node-hover-link {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: moon-hierarchy-link-run 20s linear infinite;
  }
  
  .moon-hierarchy-loading {
    animation: moon-hierarchy-rotate 3s linear infinite;
  }
  
  @keyframes moon-hierarchy-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes moon-hierarchy-link-run {
    from {
      stroke-dasharray: 10, 5;
    }
    to {
      stroke-dasharray: 20, 5;
    }
  }
}
</style>
