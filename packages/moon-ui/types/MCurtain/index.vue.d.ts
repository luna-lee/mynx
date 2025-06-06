declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    value: {
        type: BooleanConstructor;
        default: boolean;
    };
    foldStyle: {
        type: ObjectConstructor;
        default: () => {
            width: string;
            height: string;
        };
    };
    openStyle: {
        type: ObjectConstructor;
        default: () => {
            width: string;
            height: string;
        };
    };
    triggerPosition: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {
    isOpen: boolean;
}, {}, {
    toggle(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: BooleanConstructor;
        default: boolean;
    };
    foldStyle: {
        type: ObjectConstructor;
        default: () => {
            width: string;
            height: string;
        };
    };
    openStyle: {
        type: ObjectConstructor;
        default: () => {
            width: string;
            height: string;
        };
    };
    triggerPosition: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    value: boolean;
    foldStyle: Record<string, any>;
    openStyle: Record<string, any>;
    triggerPosition: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
