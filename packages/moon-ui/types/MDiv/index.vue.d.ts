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
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {}, __VLS_7: {}, __VLS_9: {}, __VLS_11: {}, __VLS_13: {}, __VLS_15: {}, __VLS_17: {}, __VLS_19: {}, __VLS_21: {}, __VLS_23: {}, __VLS_25: {}, __VLS_27: {}, __VLS_29: {}, __VLS_31: {}, __VLS_33: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    'bar-top'?: (props: typeof __VLS_3) => any;
} & {
    bar?: (props: typeof __VLS_5) => any;
} & {
    'bar-left'?: (props: typeof __VLS_7) => any;
} & {
    bar?: (props: typeof __VLS_9) => any;
} & {
    'bar-right'?: (props: typeof __VLS_11) => any;
} & {
    bar?: (props: typeof __VLS_13) => any;
} & {
    'bar-bottom'?: (props: typeof __VLS_15) => any;
} & {
    bar?: (props: typeof __VLS_17) => any;
} & {
    'corner-br'?: (props: typeof __VLS_19) => any;
} & {
    corner?: (props: typeof __VLS_21) => any;
} & {
    'corner-bl'?: (props: typeof __VLS_23) => any;
} & {
    corner?: (props: typeof __VLS_25) => any;
} & {
    'corner-tl'?: (props: typeof __VLS_27) => any;
} & {
    corner?: (props: typeof __VLS_29) => any;
} & {
    'corner-tr'?: (props: typeof __VLS_31) => any;
} & {
    corner?: (props: typeof __VLS_33) => any;
};
declare const __VLS_component: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
    dragPosition: DragPosition[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
