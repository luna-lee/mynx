import type { DefineComponent } from 'vue';
import type { MDemo } from './index';

// 全局组件类型声明
declare module 'vue' {
  export interface GlobalComponents {
    MDemo: typeof MDemo
  }
}
export {};