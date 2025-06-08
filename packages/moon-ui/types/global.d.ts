import type { DefineComponent } from 'vue';
import type { MCurtain, MList, MDiv, MScale, MTextellips, MIfShow } from './index';

// 全局组件类型声明
declare module 'vue' {
  export interface GlobalComponents {
    MCurtain: typeof MCurtain
    MList: typeof MList
    MDiv: typeof MDiv
    MScale: typeof MScale
    MTextellips: typeof MTextellips
    MIfShow: typeof MIfShow
  }
}
export {};