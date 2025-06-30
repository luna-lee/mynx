/**
 * 文本省略号工具类
 * 提供多种文本截断和省略号实现方案
 * 
 * @author AI Assistant
 * @version 1.0.0
 */

/**
 * 基础文本省略号类
 * 使用 Canvas API 进行精确的文本宽度测量
 */
class TextEllipsis {
    constructor(options = {}) {
        this.options = {
            ellipsis: '...',           // 省略号字符
            tolerance: 2,              // 容错像素值
            cacheEnabled: true,        // 是否启用缓存
            ...options
        };
        
        // 创建 Canvas 上下文用于文本测量
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // 缓存系统
        this.cache = new Map();
        this.fontCache = new Map();
    }
    
    /**
     * 获取元素的完整字体样式字符串
     * @param {HTMLElement} element - 目标元素
     * @returns {string} 字体样式字符串
     */
    getFontStyle(element) {
        const cacheKey = element;
        
        if (this.options.cacheEnabled && this.fontCache.has(cacheKey)) {
            return this.fontCache.get(cacheKey);
        }
        
        const style = window.getComputedStyle(element);
        const fontString = [
            style.fontStyle,
            style.fontVariant,
            style.fontWeight,
            style.fontSize + '/' + style.lineHeight,
            style.fontFamily
        ].join(' ');
        
        if (this.options.cacheEnabled) {
            this.fontCache.set(cacheKey, fontString);
        }
        
        return fontString;
    }
    
    /**
     * 测量文本在指定字体下的宽度
     * @param {string} text - 要测量的文本
     * @param {string} font - 字体样式
     * @returns {number} 文本宽度（像素）
     */
    measureText(text, font) {
        const cacheKey = `${text}|${font}`;
        
        if (this.options.cacheEnabled && this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        this.ctx.font = font;
        const width = this.ctx.measureText(text).width;
        
        if (this.options.cacheEnabled) {
            this.cache.set(cacheKey, width);
        }
        
        return width;
    }
    
    /**
     * 应用单行文本省略号效果
     * @param {HTMLElement} element - 目标元素
     * @param {string} text - 原始文本
     * @param {number} maxWidth - 最大宽度（可选，默认使用元素宽度）
     * @returns {string} 处理后的文本
     */
    applySingleLine(element, text, maxWidth = null) {
        const font = this.getFontStyle(element);
        const containerWidth = maxWidth || element.clientWidth;
        const ellipsisWidth = this.measureText(this.options.ellipsis, font);
        
        // 如果文本不超出容器，直接返回原文本
        if (this.measureText(text, font) <= containerWidth) {
            element.textContent = text;
            return text;
        }
        
        // 使用二分查找优化性能
        const truncateIndex = this.binarySearchTruncate(text, containerWidth - ellipsisWidth, font);
        const result = text.substring(0, truncateIndex) + this.options.ellipsis;
        
        element.textContent = result;
        return result;
    }
    
    /**
     * 使用二分查找算法找到最适合的截断位置
     * @param {string} text - 原始文本
     * @param {number} maxWidth - 最大宽度
     * @param {string} font - 字体样式
     * @returns {number} 截断位置索引
     */
    binarySearchTruncate(text, maxWidth, font) {
        let left = 0;
        let right = text.length;
        let result = 0;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const testText = text.substring(0, mid);
            const width = this.measureText(testText, font);
            
            if (width <= maxWidth) {
                result = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    /**
     * 应用多行文本省略号效果
     * @param {HTMLElement} element - 目标元素
     * @param {string} text - 原始文本
     * @param {number} maxLines - 最大行数
     * @returns {string} 处理后的文本
     */
    applyMultiLine(element, text, maxLines = 2) {
        // 清空元素内容
        element.innerHTML = '';
        
        // 获取行高
        const style = window.getComputedStyle(element);
        const lineHeight = parseInt(style.lineHeight) || parseInt(style.fontSize) * 1.2;
        const maxHeight = lineHeight * maxLines;
        
        // 创建测试元素
        const testElement = this.createTestElement(element);
        
        let currentText = '';
        const chars = text.split('');
        
        try {
            for (let i = 0; i < chars.length; i++) {
                const testText = currentText + chars[i];
                testElement.textContent = testText + this.options.ellipsis;
                
                if (testElement.offsetHeight > maxHeight) {
                    element.textContent = currentText + this.options.ellipsis;
                    return currentText + this.options.ellipsis;
                }
                
                currentText = testText;
            }
            
            // 如果所有文本都能显示
            element.textContent = currentText;
            return currentText;
            
        } finally {
            // 清理测试元素
            document.body.removeChild(testElement);
        }
    }
    
    /**
     * 创建用于测试的隐藏元素
     * @param {HTMLElement} referenceElement - 参考元素
     * @returns {HTMLElement} 测试元素
     */
    createTestElement(referenceElement) {
        const testElement = referenceElement.cloneNode(false);
        testElement.style.cssText = `
            position: absolute;
            visibility: hidden;
            top: -9999px;
            left: -9999px;
            width: ${referenceElement.offsetWidth}px;
            height: auto;
            overflow: visible;
        `;
        document.body.appendChild(testElement);
        return testElement;
    }
    
    /**
     * 清除缓存
     */
    clearCache() {
        this.cache.clear();
        this.fontCache.clear();
    }
    
    /**
     * 销毁实例，清理资源
     */
    destroy() {
        this.clearCache();
        this.canvas = null;
        this.ctx = null;
    }
}

/**
 * 响应式文本省略号类
 * 支持自动响应容器尺寸变化
 */
class ResponsiveTextEllipsis extends TextEllipsis {
    constructor(options = {}) {
        super(options);
        this.observers = new Map();
        this.resizeHandler = this.handleResize.bind(this);
    }
    
    /**
     * 开始观察元素的尺寸变化
     * @param {HTMLElement} element - 目标元素
     * @param {string} originalText - 原始文本
     * @param {Object} options - 配置选项
     */
    observe(element, originalText, options = {}) {
        const config = {
            type: 'single',  // 'single' | 'multi'
            maxLines: 2,     // 多行模式的最大行数
            ...options
        };
        
        // 立即应用省略号效果
        this.applyEllipsis(element, originalText, config);
        
        // 设置观察器
        if (window.ResizeObserver) {
            const observer = new ResizeObserver(entries => {
                for (const entry of entries) {
                    this.applyEllipsis(entry.target, originalText, config);
                }
            });
            
            observer.observe(element);
            this.observers.set(element, { observer, originalText, config });
        } else {
            // 降级方案：监听窗口 resize 事件
            if (this.observers.size === 0) {
                window.addEventListener('resize', this.resizeHandler);
            }
            this.observers.set(element, { originalText, config });
        }
    }
    
    /**
     * 处理窗口尺寸变化（降级方案）
     */
    handleResize() {
        this.observers.forEach((data, element) => {
            if (!data.observer) {
                this.applyEllipsis(element, data.originalText, data.config);
            }
        });
    }
    
    /**
     * 应用省略号效果
     * @param {HTMLElement} element - 目标元素
     * @param {string} originalText - 原始文本
     * @param {Object} config - 配置
     */
    applyEllipsis(element, originalText, config) {
        if (config.type === 'multi') {
            return this.applyMultiLine(element, originalText, config.maxLines);
        } else {
            return this.applySingleLine(element, originalText);
        }
    }
    
    /**
     * 停止观察元素
     * @param {HTMLElement} element - 目标元素
     */
    unobserve(element) {
        const observerData = this.observers.get(element);
        if (observerData) {
            if (observerData.observer) {
                observerData.observer.unobserve(element);
            }
            this.observers.delete(element);
            
            // 如果没有观察的元素了，移除窗口事件监听
            if (this.observers.size === 0) {
                window.removeEventListener('resize', this.resizeHandler);
            }
        }
    }
    
    /**
     * 停止观察所有元素
     */
    unobserveAll() {
        this.observers.forEach((data, element) => {
            if (data.observer) {
                data.observer.unobserve(element);
            }
        });
        this.observers.clear();
        window.removeEventListener('resize', this.resizeHandler);
    }
    
    /**
     * 销毁实例
     */
    destroy() {
        this.unobserveAll();
        super.destroy();
    }
}

/**
 * 便捷的工具函数
 */
const TextEllipsisUtils = {
    /**
     * 单例模式的默认实例
     */
    _instance: null,
    
    /**
     * 获取默认实例
     * @returns {TextEllipsis}
     */
    getInstance() {
        if (!this._instance) {
            this._instance = new TextEllipsis();
        }
        return this._instance;
    },
    
    /**
     * 快速应用单行省略号
     * @param {HTMLElement|string} element - 元素或选择器
     * @param {string} text - 文本内容
     * @param {Object} options - 配置选项
     * @returns {string} 处理后的文本
     */
    applySingle(element, text, options = {}) {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (!el) return text;
        
        const instance = this.getInstance();
        return instance.applySingleLine(el, text, options.maxWidth);
    },
    
    /**
     * 快速应用多行省略号
     * @param {HTMLElement|string} element - 元素或选择器
     * @param {string} text - 文本内容
     * @param {number} maxLines - 最大行数
     * @returns {string} 处理后的文本
     */
    applyMulti(element, text, maxLines = 2) {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (!el) return text;
        
        const instance = this.getInstance();
        return instance.applyMultiLine(el, text, maxLines);
    },
    
    /**
     * 自动检测并应用合适的省略号效果
     * @param {HTMLElement|string} element - 元素或选择器
     * @param {string} text - 文本内容
     * @param {Object} options - 配置选项
     */
    auto(element, text, options = {}) {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (!el) return text;
        
        const config = {
            preferMultiLine: false,  // 是否优先使用多行
            maxLines: 2,             // 多行模式的最大行数
            responsive: false,       // 是否启用响应式
            ...options
        };
        
        if (config.responsive) {
            const responsiveInstance = new ResponsiveTextEllipsis();
            const observeConfig = {
                type: config.preferMultiLine ? 'multi' : 'single',
                maxLines: config.maxLines
            };
            responsiveInstance.observe(el, text, observeConfig);
            return responsiveInstance;
        } else if (config.preferMultiLine) {
            return this.applyMulti(el, text, config.maxLines);
        } else {
            return this.applySingle(el, text, config);
        }
    }
};

// 导出类和工具函数
if (typeof module !== 'undefined' && module.exports) {
    // Node.js 环境
    module.exports = {
        TextEllipsis,
        ResponsiveTextEllipsis,
        TextEllipsisUtils
    };
} else if (typeof window !== 'undefined') {
    // 浏览器环境
    window.TextEllipsis = TextEllipsis;
    window.ResponsiveTextEllipsis = ResponsiveTextEllipsis;
    window.TextEllipsisUtils = TextEllipsisUtils;
} 