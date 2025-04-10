# setEventListenerVue2

为 Vue 2 组件添加 DOM 事件监听器，并在组件的不同生命周期阶段自动管理事件。

## 类型签名

```typescript
(binder: any, vm: any, evtName: string, listener: (...arg: any[]) => void, options?: any) => (() => void) | undefined
```

## 参数

- `binder` (Window | Document | Element): 事件绑定的目标元素，如 window 或 document
- `vm` (Vue): Vue 2 组件实例
- `evtName` (string): 要监听的事件名称，如 'click', 'resize' 等
- `listener` (Function): 事件触发时调用的回调函数
- `options` (boolean | AddEventListenerOptions, 可选): 事件监听器选项，与标准 addEventListener() 的选项相同

## 返回值

- `Function | undefined`: 返回一个用于手动移除事件监听的函数，如果参数不完整则返回 undefined

## 描述

`setEventListenerVue2` 函数用于在 Vue 2 组件中设置 DOM 事件监听器（主要针对 window 或 document），并在组件的不同生命周期阶段（mounted, activated, deactivated, beforeDestroy）自动管理事件的添加和移除，防止内存泄漏和无效事件监听。

该函数具有以下特性：

1. 只有在组件可见（宽高不为0）时才触发事件回调
2. 自动在组件销毁前移除事件监听
3. 根据组件的生命周期自动处理事件监听的添加和移除
4. 提供手动移除事件监听的方法

## 示例

### 基本用法

```js
import { setEventListenerVue2 } from 'moon-utils';

export default {
  mounted() {
    // 为窗口添加 resize 事件
    setEventListenerVue2(
      window,
      this,
      'resize',
      this.handleResize
    );
    
    // 为文档添加点击事件
    setEventListenerVue2(
      document,
      this,
      'click',
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
      window,
      this,
      'scroll',
      this.handleScroll,
      { passive: true, capture: false }
    );
  },
  
  methods: {
    handleScroll(event) {
      console.log('页面滚动:', window.scrollY);
    }
  }
};
```

### 手动移除事件监听

```js
import { setEventListenerVue2 } from 'moon-utils';

export default {
  data() {
    return {
      removeClickListener: null
    };
  },
  
  mounted() {
    // 保存返回的移除函数
    this.removeClickListener = setEventListenerVue2(
      document,
      this,
      'click',
      this.handleClick
    );
  },
  
  methods: {
    handleClick(event) {
      console.log('文档被点击:', event.target);
    },
    
    stopListening() {
      // 在需要时手动移除监听
      if (this.removeClickListener) {
        this.removeClickListener();
        this.removeClickListener = null;
      }
    }
  }
};
```

### 配合 keep-alive 组件使用

```js
import { setEventListenerVue2 } from 'moon-utils';

export default {
  // keep-alive 缓存的组件会触发 activated 和 deactivated 钩子
  mounted() {
    setEventListenerVue2(
      window,
      this,
      'resize',
      this.handleResize
    );
    // 函数会自动处理 activated 和 deactivated 生命周期
  },
  
  methods: {
    handleResize(event) {
      console.log('组件可见且窗口大小改变时触发');
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
      document,
      this,
      'click',
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

## 注意事项

1. 事件监听器包装了一个验证函数，只有当组件可见（宽高不为0）时才会触发原始的事件回调
2. 参数顺序与原生 addEventListener 不同，请注意正确传入参数
3. 该函数会自动处理组件的 mounted、activated、deactivated 和 beforeDestroy 生命周期钩子
4. 如果缺少任何必要的参数（binder、vm、evtName 或 listener），函数将直接返回而不添加事件监听器 