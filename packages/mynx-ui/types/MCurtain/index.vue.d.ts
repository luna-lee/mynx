/**
 * MCurtain组件的props接口定义
 */
interface MCurtainProps {
    /** 双向绑定的值，控制窗帘的开关状态 */
    modelValue?: boolean;
    /** 折叠状态下的样式 */
    foldStyle?: Record<string, any>;
    /** 展开状态下的样式 */
    openStyle?: Record<string, any>;
    /** 触发器位置 */
    triggerPosition?: 'left' | 'right' | 'top' | 'bottom';
    /** 是否显示触发器 */
    showTrigger?: boolean;
}
declare var __VLS_1: {}, __VLS_3: {
    isOpen: boolean;
}, __VLS_5: {
    isOpen: boolean;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    trigger?: (props: typeof __VLS_3) => any;
} & {
    'trigger-content'?: (props: typeof __VLS_5) => any;
};
declare const __VLS_component: import("vue").DefineComponent<MCurtainProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<MCurtainProps> & Readonly<{
    "onUpdate:modelValue"?: (value: boolean) => any;
}>, {
    modelValue: boolean;
    foldStyle: Record<string, any>;
    openStyle: Record<string, any>;
    triggerPosition: "left" | "right" | "top" | "bottom";
    showTrigger: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
