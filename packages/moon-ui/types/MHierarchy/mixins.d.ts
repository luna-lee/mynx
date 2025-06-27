import type { TreeNodeData, TreeOptions, HierarchyConfig } from './types';
declare const _default: {
    props: {
        treeData: {
            type: () => TreeNodeData[];
            default: () => TreeNodeData[];
        };
        treeOptions: {
            type: () => TreeOptions;
            default: () => TreeOptions;
        };
        defaultOpenLevel: {
            type: NumberConstructor;
            default: number;
        };
        duration: {
            type: () => number;
            default: number;
        };
        negativeIds: {
            type: () => string[];
            default: () => string[];
        };
        config: {
            type: () => HierarchyConfig;
            default: () => HierarchyConfig;
        };
        canExpendFold: {
            type: (BooleanConstructor | FunctionConstructor)[];
            default: boolean;
        };
        expendShape: {
            type: () => string;
        };
        foldShape: {
            type: () => string;
        };
    };
    mounted(): void;
    data(): {
        svg: any;
        zoom: any;
        container: any;
        hierarchyLayoutData: any;
        lastClickNode: any;
        nodesContainer: any;
        linksContainer: any;
        currentScale: number;
        treeDataFactory: {
            treeData: any[];
            leafs: any[];
            objById: {};
            flatData: any[];
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
        centerPosition(): {
            x: number;
            y: number;
        };
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
        addListener(selectionNode: any, listener: {}, except: any[], qd: any): void;
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
        getAllNode(): any[];
        getNodeId(id: any): string;
        getLinkId(sId: any, tId: any): string;
        setPaddingFormat(inputValue: any): () => number[];
        setShapClass(d: any, sharpName: any, nodeconfig: any): string;
        calculateTextWidth(text: any, fontSize: any, fontFamily: any): number;
        createOrUpdateForeignObject(attrs: any): void;
        updateCustomView(): void;
        hiddenCustomView(): void;
        expandAllNode(): void;
        foldAllNode(): void;
        expendToNode(sourceData: any): void;
        moveToNode(targetNodeId: any, eventList?: any[]): void;
    };
};
export default _default;
