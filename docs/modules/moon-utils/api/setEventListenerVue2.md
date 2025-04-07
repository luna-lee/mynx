# setEventListenerVue2

为 Vue 2 组件添加 DOM 事件监听器，自动在组件销毁时移除事件。

## 类型签名

```typescript
(vm: Vue, eventName: string, element: Element | Window, callback: EventListener, options?: boolean | AddEventListenerOptions) => void
```

## 参数

- `vm` (Vue): Vue 2 组件实例
- `eventName` (string): 要监听的事件名称，如 'click', 'resize' 等
- `element` (Element | Window): 要添加事件监听器的 DOM 元素或窗口对象
- `callback` (EventListener): 事件触发时调用的回调函数
- `options` (boolean | AddEventListenerOptions, 可选): 事件监听器选项，与标准 addEventListener() 的选项相同

## 返回值

- (void): 此函数不返回任何值

## 描述

`setEventListenerVue2` 函数为 Vue 2 组件添加 DOM 事件监听器，并确保在组件销毁时自动移除这些事件监听器，防止内存泄漏。这对于手动添加的全局事件（如窗口大小调整、滚动事件等）特别有用，这些事件无法通过 Vue 的模板语法直接绑定。

## 示例

### 基本用法

```js
import { setEventListenerVue2 } from 'moon-utils';

export default {
  mounted() {
    // 为窗口添加 resize 事件
    setEventListenerVue2(
      this,
      'resize',
      window,
      this.handleResize
    );
    
    // 为文档添加点击事件
    setEventListenerVue2(
      this,
      'click',
      document,
      this.handleDocumentClick
    );
  },
  
  methods: {
    handleResize(event) {
      console.log('窗口大小改变:', window.innerWidth, window.innerHeight);
    },
    
    handleDocumentClick(event) {
      console.log('文档被点击:', event.target);
    }
  }
};
```

### 使用事件选项

```js
import { setEventListenerVue2 } from 'moon-utils';

export default {
  mounted() {
    // 添加带选项的滚动事件
    setEventListenerVue2(
      this,
      'scroll',
      window,
      this.handleScroll,
      { passive: true, capture: false }
    );
    
    // 使用事件捕获
    const menuElement = this.$refs.menu;
    setEventListenerVue2(
      this,
      'click',
      menuElement,
      this.handleMenuClick,
      true  // 使用捕获阶段
    );
  },
  
  methods: {
    handleScroll(event) {
      console.log('页面滚动:', window.scrollY);
    },
    
    handleMenuClick(event) {
      console.log('菜单被点击:', event.target);
    }
  }
};
```

### 使用组件引用的元素

```js
import { setEventListenerVue2 } from 'moon-utils';

export default {
  mounted() {
    // 确保引用存在
    if (this.$refs.customInput) {
      // 为自定义输入框添加焦点和失焦事件
      setEventListenerVue2(
        this,
        'focus',
        this.$refs.customInput,
        this.handleFocus
      );
      
      setEventListenerVue2(
        this,
        'blur',
        this.$refs.customInput,
        this.handleBlur
      );
    }
  },
  
  methods: {
    handleFocus(event) {
      console.log('输入框获得焦点');
      this.isFocused = true;
    },
    
    handleBlur(event) {
      console.log('输入框失去焦点');
      this.isFocused = false;
    }
  }
};
```

### 在自定义组件中使用

```js
import { setEventListenerVue2 } from 'moon-utils';

export default {
  name: 'OutsideClickDetector',
  
  props: {
    onOutsideClick: {
      type: Function,
      required: true
    }
  },
  
  mounted() {
    // 添加文档点击事件来检测外部点击
    setEventListenerVue2(
      this,
      'click',
      document,
      this.handleClickOutside
    );
  },
  
  methods: {
    handleClickOutside(event) {
      // 检查点击是否发生在组件元素外部
      if (!this.$el.contains(event.target)) {
        this.onOutsideClick(event);
      }
    }
  },
  
  render() {
    // 渲染组件的默认插槽
    return this.$slots.default[0];
  }
};
``` 