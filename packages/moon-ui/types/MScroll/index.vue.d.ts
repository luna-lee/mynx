import { type CSSProperties } from 'vue';
/**
 * 滚动组件 Props 接口定义
 */
interface ScrollProps {
    /** 滚动步长，单位为像素 */
    scrollStep?: number;
    /** 是否显示滚动按钮 */
    scrollBtnShow?: boolean;
    /** 滚动容器的样式 */
    bodyStyle?: CSSProperties;
}
declare var __VLS_1: {
    isScrollBegin: boolean;
}, __VLS_3: {}, __VLS_5: {
    isScrollEnd: boolean;
};
type __VLS_Slots = {} & {
    'left-btn'?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_3) => any;
} & {
    'right-btn'?: (props: typeof __VLS_5) => any;
};
declare const __VLS_component: import("vue").DefineComponent<ScrollProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ScrollProps> & Readonly<{}>, {
    scrollStep: number;
    scrollBtnShow: boolean;
    bodyStyle: CSSProperties;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
