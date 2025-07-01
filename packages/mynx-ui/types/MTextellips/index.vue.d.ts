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
declare var __VLS_1: {}, __VLS_3: {
    isExpanded: true;
}, __VLS_5: {}, __VLS_7: {
    isExpanded: boolean;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    'fold-btn'?: (props: typeof __VLS_3) => any;
} & {
    default?: (props: typeof __VLS_5) => any;
} & {
    'fold-btn'?: (props: typeof __VLS_7) => any;
};
declare const __VLS_component: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:showAll": (isShowAll: boolean) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    "onUpdate:showAll"?: (isShowAll: boolean) => any;
}>, {
    text: string;
    lineClamp: number;
    showFoldBtn: boolean;
    foldBtnInline: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
