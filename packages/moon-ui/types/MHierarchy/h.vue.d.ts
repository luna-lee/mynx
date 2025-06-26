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
        padding: () => number[];
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
    onNodeExpendTranslate(d: any): string | undefined;
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
    getNodeWidth(item: any): number;
    setLoadingIcon(source: any, flag?: boolean): void;
    drawCustomView(e: any, d: any, width: any, height: any, priority: any, duration: any): void;
}, {
    props: {
        treeData: {
            type: ArrayConstructor;
            default: () => never[];
        };
        treeOptions: {
            type: ObjectConstructor;
            default: () => {};
        };
        defaultOpenLevel: {
            type: NumberConstructor;
            default: number;
        };
        duration: {
            type: NumberConstructor;
            default: number;
        };
        negativeIds: {
            type: ArrayConstructor;
            default: () => never[];
        };
        config: {
            type: ObjectConstructor;
            default: () => {};
        };
        canExpendFold: {
            type: (BooleanConstructor | FunctionConstructor)[];
            default: boolean;
        };
        expendShape: {
            type: StringConstructor;
        };
        foldShape: {
            type: StringConstructor;
        };
    };
    mounted(): void;
    data(): {
        svg: null;
        zoom: null;
        container: null;
        hierarchyLayoutData: null;
        lastClickNode: null;
        nodesContainer: null;
        linksContainer: null;
        currentScale: number;
        treeDataFactory: {
            treeData: never[];
            leafs: never[];
            objById: {};
            flatData: never[];
        };
        exceptListener: string[];
        showCustomView: boolean;
        InnerChangeTreeData: boolean;
        width: number;
        height: number;
    };
    computed: {
        nodeListener(): any;
        symbolKey(): any;
        inner_treeOptions(): any;
        centerPosition(): any;
        linkConifg(): any;
        defsNodeConfig(): {
            loadingSize: number;
            nodeList: {
                name: string;
                attrs: any;
                children: {
                    name: string;
                    attrs: {
                        d: any;
                    };
                }[];
            }[];
        };
    };
    methods: {
        formatToArray(target: any): any[];
        initTreeData(): void;
        createSvg(): void;
        createContainDom(): void;
        drawSvg(): void;
        drawContainer(): void;
        defaultExpendLevel(): void;
        setLayoutData(): void;
        setNodeClassAttr(selectionNode: any): void;
        setNodeDefaultAttr(selectionNode: any): void;
        addNode(nodeList: any): void;
        updateNodeByData(dataList: any): void;
        updateNode(nodeList: any): void;
        removeNode(targetNodeId: any, redraw?: boolean, canRemoveExpendNode?: boolean): void;
        removeNodeById(ids: any): void;
        addShapEexpendFold(selectionNode: any, qt: any): void;
        addListener(selectionNode: any, listener: {} | undefined, except: never[] | undefined, qd: any): void;
        addOrUpdateNode(): void;
        onNodeClick(d: any): Promise<void>;
        onNodeExpendOrFold(node: any, expend?: boolean): Promise<void>;
        onNodeMouseOver(node: any): void;
        onNodeMouseOut(node: any): void;
        addNodeToTargetNode(targetNodeId: any, childrenList: any, _sign: any): void;
        onClickFetchChildren(sourceData: any): Promise<void>;
        addOrUpdateLinks(): void;
        foldLinksAndNodes(node: any, newNode: any, filter: any): void;
        drawView(): void;
        addDefs(): void;
        iteratorAddNode(selectionNode: any, nodeConfigList: any): void;
        moveToCenter(opt: any): void;
        initZoom(): void;
        pauseZoom(): void;
        continueZoom(): void;
        scale(scale: any): void;
        setAttrByOpt(selectionNode: any, opt?: {}): void;
        setComposeOpt(selectionNode: any, opt?: {}): void;
        getNodeById(id: any): {
            data: any;
            el: any;
        };
        getAllNode(): {
            data: any;
            el: any;
        }[];
        getNodeId(id: any): string;
        getLinkId(sId: any, tId: any): string;
        setPaddingFormat(inputValue: any): () => number[];
        setShapClass(d: any, sharpName: any, nodeconfig: any): string;
        calculateTextWidth(text: any, fontSize: any, fontFamily: any): number;
        createOrUpdateForeignObject(attrs: any): void;
        updateCustomView(): void;
        hiddenCustomView(): void;
        expendAllNode(): void;
        foldAllNode(): void;
        expendToNode(sourceData: any): void;
        moveToNode(targetNodeId: any, eventList?: never[]): void;
    };
}, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
