declare const _default: {
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
};
export default _default;
