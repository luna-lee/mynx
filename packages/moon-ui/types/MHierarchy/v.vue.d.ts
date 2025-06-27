declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    layout: {
        type: StringConstructor;
        default: string;
    };
}>, {
    width: import("vue").ShallowRef<number, number>;
    height: import("vue").ShallowRef<number, number>;
}, {}, {
    nodeConfig(): {
        fontSize: any;
        padding: any;
        nodeHeight: any;
        nodeWidth: any;
        nodeSize: any[];
        separation: any;
        plusCircleWidth: number;
        shaps: any[];
    };
}, {
    setSign(): void;
    initLayoutData(): void;
    onNodeExpendTranslate(d: any): string;
    onNodeFoldTranslate(d: any, source: any): string;
    addLinks(links: any): void;
    updateLinks(links: any): void;
    setLinkPath({ source, target }: {
        source: any;
        target: any;
    }): string;
    nodeToCenterXY(node: any): {
        x: any;
        y: number;
    };
    treeLayout(data: any): d3.HierarchyPointNode<any>;
    addNodeWidthToData(list: any): void;
    getTranslateOffset(d: any): any;
    setLoadingIcon(source: any, flag?: boolean): void;
    getFormatTextArr(item: any, lineNum?: number, ellipse?: string): any[];
    drawCustomView(e: any, d: any, width: any, height: any, priority: any, duration: any): void;
}, any, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    layout: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    layout: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
import * as d3 from 'd3';
