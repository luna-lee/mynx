/**
 * 缩放适配模式
 */
type FitMode = 'fill' | 'contain' | 'containX' | 'containY';
/**
 * 组件属性定义
 */
interface Props {
    /** 设计稿宽度 */
    designWidth?: number | string;
    /** 设计稿高度 */
    designHeight?: number | string;
    /** contain模式下缩放后是否保持居中 */
    containCenter?: boolean;
    /** 缩放适配模式 */
    fit?: FitMode;
}
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
    designWidth: number | string;
    designHeight: number | string;
    containCenter: boolean;
    fit: FitMode;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
