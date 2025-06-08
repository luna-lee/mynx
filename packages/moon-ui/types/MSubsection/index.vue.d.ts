/**
 * 标签页数据接口
 */
interface TabItem {
    /** 标签页标题 */
    title: string;
    /** 其他扩展属性 */
    [key: string]: any;
}
/**
 * 滚动配置接口
 */
interface scrollAttrs {
    /** 是否显示滚动按钮 */
    scrollBtnShow?: boolean;
    /** 其他滚动配置 */
    [key: string]: any;
}
/**
 * 子选择器组件 Props 接口定义
 */
interface SubsectionProps {
    /** 标签页数据 */
    tabs?: TabItem[];
    /** 当前激活的标签页索引（v-model） */
    modelValue?: number;
    /** 滚动组件配置选项 */
    scrollAttrs?: scrollAttrs;
}
declare var __VLS_6: string, __VLS_7: {
    tab: TabItem;
}, __VLS_14: string, __VLS_15: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_6>]?: (props: typeof __VLS_7) => any;
} & {
    [K in NonNullable<typeof __VLS_14>]?: (props: typeof __VLS_15) => any;
};
declare const __VLS_component: import("vue").DefineComponent<SubsectionProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: number) => any;
}, string, import("vue").PublicProps, Readonly<SubsectionProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}>, {
    modelValue: number;
    tabs: TabItem[];
    scrollAttrs: scrollAttrs;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
