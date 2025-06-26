import type { HierarchyMode, LayoutDirection, TreeNodeData, TreeOptions, HierarchyConfig } from './types';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    mode: {
        type: () => HierarchyMode;
        default: string;
        validator: (value: string) => value is HierarchyMode;
    };
    layout: {
        type: () => LayoutDirection;
        default: string;
    };
    limit: {
        type: NumberConstructor;
        default: number;
    };
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
}>, {}, {
    show: boolean;
}, {}, {
    /**
     * 根据ID获取节点
     * @param id 节点ID
     */
    getNodeById(id: string): any;
    /**
     * 获取所有节点
     */
    getAllNode(): any[];
    /**
     * 移动到中心位置
     */
    moveToCenter(): void;
    /**
     * 设置缩放比例
     * @param scale 缩放比例
     */
    zoom(scale: number): void;
    /**
     * 添加节点
     * @param targetNodeId 目标节点ID
     * @param childrenNode 子节点数据
     * @param _sign 符号标识
     */
    addNode(targetNodeId: string, childrenNode: any, _sign?: number): void;
    /**
     * 根据ID删除节点
     * @param id 节点ID或ID数组
     */
    removeNodeById(id: string | string[]): void;
    /**
     * 暂停缩放功能
     */
    pauseZoom(): void;
    /**
     * 恢复缩放功能
     */
    continueZoom(): void;
    /**
     * 显示自定义视图
     * @param e 事件对象
     * @param d 数据对象
     * @param width 宽度
     * @param height 高度
     * @param priority 优先级
     */
    showCustomView(e: Event, d: any, width?: number, height?: number, priority?: number): void;
    /**
     * 隐藏自定义视图
     */
    hiddenCustomView(): void;
    /**
     * 根据数据更新节点
     * @param data 节点数据或数据数组
     */
    updateNodeByData(data: any | any[]): void;
    /**
     * 移动到指定节点
     * @param targetNodeId 目标节点ID
     * @param eventList 事件列表
     */
    moveToNode(targetNodeId: string, eventList?: string[]): void;
    /**
     * 展开所有节点
     */
    expendAllNode(): void;
    /**
     * 折叠所有节点
     */
    foldAllNode(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    mode: {
        type: () => HierarchyMode;
        default: string;
        validator: (value: string) => value is HierarchyMode;
    };
    layout: {
        type: () => LayoutDirection;
        default: string;
    };
    limit: {
        type: NumberConstructor;
        default: number;
    };
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
}>> & Readonly<{}>, {
    layout: LayoutDirection;
    limit: number;
    mode: HierarchyMode;
    treeData: TreeNodeData[];
    treeOptions: TreeOptions;
    defaultOpenLevel: number;
    duration: number;
    negativeIds: string[];
    config: HierarchyConfig;
    canExpendFold: boolean | Function;
}, {}, {
    horizontal: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
        treeLayout(data: any): import("d3").HierarchyPointNode<any>;
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
            expendAllNode(): void;
            foldAllNode(): void;
            expendToNode(sourceData: any): void;
            moveToNode(targetNodeId: any, eventList?: any[]): void;
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
    vertical: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
        treeLayout(data: any): import("d3").HierarchyPointNode<any>;
        addNodeWidthToData(list: any): void;
        getTranslateOffset(d: any): any;
        setLoadingIcon(source: any, flag?: boolean): void;
        getFormatTextArr(item: any, lineNum?: number, ellipse?: string): any[];
        drawCustomView(e: any, d: any, width: any, height: any, priority: any, duration: any): void;
    }, {
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
            expendAllNode(): void;
            foldAllNode(): void;
            expendToNode(sourceData: any): void;
            moveToNode(targetNodeId: any, eventList?: any[]): void;
        };
    }, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        layout: {
            type: StringConstructor;
            default: string;
        };
    }>> & Readonly<{}>, {
        layout: string;
    }, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
