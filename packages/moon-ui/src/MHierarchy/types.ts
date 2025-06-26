import type { ComponentPublicInstance } from 'vue'

/**
 * 层次结构模式
 */
export type HierarchyMode = 'h' | 'v'

/**
 * 布局方向
 */
export type LayoutDirection = 'lr' | 'rl' | 'tb' | 'bt' | 'bf'

/**
 * 树节点数据接口
 */
export interface TreeNodeData {
  [key: string]: any
  children?: TreeNodeData[]
}

/**
 * 树选项配置
 */
export interface TreeOptions {
  id: string
  pId: string
  name: string
}

/**
 * 节点配置
 */
export interface NodeConfig {
  rect?: {
    attrs?: Record<string, any>
  }
  text?: {
    attrs?: Record<string, any>
  }
  plus?: {
    attrs?: Record<string, any>
    show?: boolean
  }
  on?: {
    click?: (e: Event, d: any, el: any, svg: any) => void
    contextmenu?: (e: Event, d: any, node: any, svg: any) => void
    clickFetchChildren?: (data: any, node: any, svg: any) => Promise<any[]>
    mouseover?: (e: Event, d: any, el: any, svg: any) => void
    mouseout?: (e: Event, d: any, el: any, svg: any) => void
  }
  exShaps?: any[]
}

/**
 * 链接配置
 */
export interface LinkConfig {
  stroke?: string
  'stroke-width'?: number
  fill?: string
}

/**
 * 箭头配置
 */
export interface ArrowConfig {
  show?: boolean
  attrs?: Record<string, any>
  path?: string
}

/**
 * 自定义视图配置
 */
export interface CustomViewConfig {
  width?: number
  height?: number
  duration?: number
}

/**
 * 缩放配置
 */
export interface ZoomConfig {
  defaultScale?: number
}

/**
 * 层次结构配置
 */
export interface HierarchyConfig {
  node?: NodeConfig
  link?: LinkConfig
  arrow?: ArrowConfig
  customView?: CustomViewConfig
  zoom?: ZoomConfig
}

/**
 * 组件实例方法接口
 */
export interface HierarchyComponentInstance extends ComponentPublicInstance {
  getNodeById: (id: string) => any
  getAllNodes: () => any[]
  moveToCenter: () => void
  setZoom: (scale: number) => void
  addNode: (targetNodeId: string, childrenNode: any, _sign?: number) => void
  removeNodeById: (id: string | string[]) => void
  pauseZoom: () => void
  continueZoom: () => void
  drawCustomView: (e: Event, d: any, width?: number, height?: number, priority?: number) => void
  hiddenCustomView: () => void
  updateNodesByData: (data: any | any[]) => void
  moveToNode: (targetNodeId: string, eventList?: string[]) => void
  expandAllNodes: () => void
  collapseAllNodes: () => void
}

/**
 * Props接口
 */
export interface HierarchyProps {
  mode?: HierarchyMode
  layout?: LayoutDirection
  width?: number
  height?: number
  treeData?: TreeNodeData[]
  treeOptions?: TreeOptions
  defaultOpenLevel?: number
  duration?: number
  negativeIds?: string[]
  config?: HierarchyConfig
  canExpandFold?: boolean | Function
  expendShape?: string
  foldShape?: string
}

/**
 * D3相关类型
 */
export interface D3Node {
  data: any
  depth: number
  height: number
  parent: D3Node | null
  children?: D3Node[]
  x: number
  y: number
  x0?: number
  y0?: number
}

/**
 * 树工厂数据
 */
export interface TreeDataFactory {
  treeData: any[]
  leafs: any[]
  objById: Record<string, any>
  flatData: any[]
} 