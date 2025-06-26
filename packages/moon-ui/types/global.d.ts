import type { DefineComponent } from 'vue';
import type { MHierarchy, MCurtain, MList, MDiv, MScale, MTextellips, MIfShow, MValidator, MScroll, MSubsection } from './index';

// 全局组件类型声明
declare module 'vue' {
  export interface GlobalComponents {
    MHierarchy: typeof MHierarchy
    MCurtain: typeof MCurtain
    MList: typeof MList
    MDiv: typeof MDiv
    MScale: typeof MScale
    MTextellips: typeof MTextellips
    MIfShow: typeof MIfShow
    MValidator: typeof MValidator
    MScroll: typeof MScroll
    MSubsection: typeof MSubsection
  }
}
export {};