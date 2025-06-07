import { VNode, PropType } from 'vue';
interface MListData {
    resizeObserver: ResizeObserver | null;
    current: string | number | null;
    sliceLength: number;
    moreLength: number;
    bodyWidth: number;
    bodyHeight: number;
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * 双向绑定的值，控制当前选中项
     */
    modelValue: {
        type: PropType<number | string | null>;
        default: null;
    };
    /**
     * 选中状态的CSS类名
     */
    activeClass: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 半选中状态的CSS类名
     */
    activeClassHalf: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 是否禁用组件
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否显示更多按钮
     */
    showMoreBtn: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否开启宽度溢出处理
     */
    overflowX: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否开启高度溢出处理
     */
    overflowY: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, MListData, {}, {
    /**
     * 获取更多按钮插槽内容
     */
    slotMoreBtn(): VNode;
    /**
     * 获取默认插槽内容
     */
    slotDefault(): VNode[];
    /**
     * 获取切片后的默认插槽内容
     */
    slotDefaultSlice(): VNode[];
    /**
     * 为子元素设置事件处理
     */
    setChildrenEvent(vnodeList: VNode[]): VNode[];
    /**
     * 处理项目点击事件
     */
    onItemClick(key: string | number): void;
    /**
     * 设置CSS类名
     */
    setClass(item: VNode): string;
    /**
     * 检查值是否为真值
     */
    isTruely(key: string | number | null | undefined): boolean;
    /**
     * 匹配切片长度
     */
    matchSliceLength(): void;
    /**
     * 初始化ResizeObserver
     */
    initResizeObserver(): void;
    /**
     * 更新更多按钮的vnodeList
     */
    emitMoreVnodeList(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    /**
     * 更新modelValue的事件
     * @param value - 新的值
     */
    'update:modelValue': (value: string | number | null) => boolean;
    /**
     * 切片索引变化事件
     * @param index - 切片索引
     */
    sliceIndex: (index: number) => boolean;
    /**
     * 更多节点列表事件
     * @param vnodeList - 虚拟节点列表
     */
    moreVnodeList: (vnodeList: VNode[]) => boolean;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * 双向绑定的值，控制当前选中项
     */
    modelValue: {
        type: PropType<number | string | null>;
        default: null;
    };
    /**
     * 选中状态的CSS类名
     */
    activeClass: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 半选中状态的CSS类名
     */
    activeClassHalf: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 是否禁用组件
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否显示更多按钮
     */
    showMoreBtn: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否开启宽度溢出处理
     */
    overflowX: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否开启高度溢出处理
     */
    overflowY: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | number | null) => any) | undefined;
    onSliceIndex?: ((index: number) => any) | undefined;
    onMoreVnodeList?: ((vnodeList: VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[]) => any) | undefined;
}>, {
    modelValue: string | number | null;
    activeClass: string;
    activeClassHalf: string;
    disabled: boolean;
    showMoreBtn: boolean;
    overflowX: boolean;
    overflowY: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
