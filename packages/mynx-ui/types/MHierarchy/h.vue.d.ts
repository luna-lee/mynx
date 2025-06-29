declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    layout: {
        type: StringConstructor;
        default: string;
    };
    limit: {
        type: NumberConstructor;
        default: number;
    };
}>, {
    width: import("vue").ShallowRef<number, number>;
    height: import("vue").ShallowRef<number, number>;
}, {}, {
    nodeConfig(): {
        fontSize: any;
        padding: any;
        plusCircleWidth: number;
        nodeHeight: any;
        nodeSize: any[];
        separation: any;
        shaps: any[];
    };
}, {
    setSign(): void;
    setLimtNode(): void;
    initLayoutData(): void;
    onLimitNodeExpendOrFold(sourceData: any): void;
    onNodeExpendTranslate(d: any): string;
    onNodeFoldTranslate(d: any, source: any): string;
    addLinks(links: any): void;
    updateLinks(links: any): void;
    setLinkPath({ source, target }: {
        source: any;
        target: any;
    }): string;
    nodeToCenterXY(node: any): {
        x: number;
        y: any;
    };
    treeLayout(data: any): d3.HierarchyPointNode<any>;
    addNodeWidthToData(list: any): void;
    addNodeOffset(treeData: any): void;
    findTreeSameLevelData(treeList: any, item: any): any[];
    getTranslateOffset(d: any): any;
    getNodeWidth(item: any): any;
    setLoadingIcon(source: any, flag?: boolean): void;
    drawCustomView(e: any, d: any, width: any, height: any, priority: any, duration: any): void;
}, any, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    layout: {
        type: StringConstructor;
        default: string;
    };
    limit: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{}>, {
    layout: string;
    limit: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
import * as d3 from 'd3';
