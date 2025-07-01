/**
 * 组件属性定义
 */
interface Props {
    /** 显示的文本内容 */
    text?: string;
    /** 行数限制 */
    lineClamp?: number;
}
declare var __VLS_1: {
    isExpanded: boolean;
}, __VLS_3: {
    isExpanded: boolean;
};
type __VLS_Slots = {} & {
    'fold-btn'?: (props: typeof __VLS_1) => any;
} & {
    'fold-btn'?: (props: typeof __VLS_3) => any;
};
declare const __VLS_component: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:showAll": (isShowAll: boolean) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    "onUpdate:showAll"?: (isShowAll: boolean) => any;
}>, {
    text: string;
    lineClamp: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
