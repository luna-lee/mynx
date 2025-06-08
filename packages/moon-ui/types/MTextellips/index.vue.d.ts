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
}
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {
    isExpanded: boolean;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_3) => any;
} & {
    'fold-btn'?: (props: typeof __VLS_5) => any;
};
declare const __VLS_component: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:showAll": (isShowAll: boolean) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    "onUpdate:showAll"?: ((isShowAll: boolean) => any) | undefined;
}>, {
    text: string;
    lineClamp: number;
    showFoldBtn: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
