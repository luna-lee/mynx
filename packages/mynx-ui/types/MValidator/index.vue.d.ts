import { type ValidateError } from 'async-validator';
interface Props {
    mode?: Record<string, any> | any[];
    rules?: Record<string, any>;
    showErrorMsgTip?: boolean;
}
interface ValidateResult {
    flag: boolean;
    errors: ValidateError[] | null;
    fields: any | null;
    fieldKeys: string[];
}
declare function validate(): ValidateResult;
declare function clearValidate(): void;
declare function reload(): void;
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<Props, {
    validate: typeof validate;
    clearValidate: typeof clearValidate;
    reload: typeof reload;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
    mode: Record<string, any> | any[];
    rules: Record<string, any>;
    showErrorMsgTip: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
