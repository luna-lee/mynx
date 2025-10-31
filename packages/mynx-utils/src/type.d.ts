declare global {
  namespace MynxUtils {
    // 通用Record类型
    type Recordable<T = any> = Record<string, T>;
    // 树形结构项类型
    type TreeFactoryItemType<T> = {
      id: string;
      pId: string;
      children?: TreeFactoryItemType<T>[];
      data: T;
      parentIds?: string[];
      childrenIds?: string[];
      level?: number;
      [k: string]: any;
    };
  }
}

// 需要添加 export {} 使其成为模块
export {};
