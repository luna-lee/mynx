declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    mode: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {
    show: boolean;
}, {}, {
    getNodeById(id: any): any;
    getAllNode(): any;
    moveToCenter(): void;
    zoom(scale: any): void;
    addNode(targetNodeId: any, childrenNode: any, _sign: any): void;
    removeNodeById(id: any): void;
    pauseZoom(): void;
    continueZoom(): void;
    showCustomView(e: any, d: any, width: any, height: any, priority: any): void;
    hiddenCustomView(): void;
    updateNodeByData(data: any): void;
    moveToNode(targetNodeId: any, eventList: any): void;
    expendAllNode(): void;
    foldAllNode(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    mode: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    mode: string;
}, {}, {
    horizontal: any;
    vertical: any;
}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
