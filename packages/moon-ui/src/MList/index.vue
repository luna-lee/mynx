<script lang="tsx">
  import { Fragment, h, defineComponent, VNode, PropType } from 'vue';

  interface MListData {
    resizeObserver: ResizeObserver | null;
    current: string | number | null;
    sliceLength: number;
    moreLength: number;
    bodyWidth: number;
    bodyHeight: number;
  }

  interface MoreBtnData {
    vnodeList: VNode[];
  }

  export default defineComponent({
    name: 'MoonList',
    props: {
      /**
       * 双向绑定的值，控制当前选中项
       */
      modelValue: {
        type: [Number, String] as PropType<number | string | null>,
        default: null,
      },
      /**
       * 选中状态的CSS类名
       */
      activeClass: {
        type: String,
        default: 'active',
      },
      /**
       * 半选中状态的CSS类名
       */
      activeClassHalf: {
        type: String,
        default: 'active-half',
      },
      /**
       * 是否禁用组件
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * 是否显示更多按钮
       */
      showMoreBtn: {
        type: Boolean,
        default: false,
      },
      /**
       * 是否开启宽度溢出处理
       */
      overflowX: {
        type: Boolean,
        default: true,
      },
      /**
       * 是否开启高度溢出处理
       */
      overflowY: {
        type: Boolean,
        default: false,
      },
    },
    emits: {
      /**
       * 更新modelValue的事件
       * @param value - 新的值
       */
      'update:modelValue': (value: string | number | null) => {
        return value === null || typeof value === 'string' || typeof value === 'number';
      },
      /**
       * 切片索引变化事件
       * @param index - 切片索引
       */
      sliceIndex: (index: number) => {
        return typeof index === 'number' && index >= 0;
      },
      /**
       * 更多节点列表事件
       * @param vnodeList - 虚拟节点列表
       */
      moreVnodeList: (vnodeList: VNode[]) => {
        return Array.isArray(vnodeList);
      },
    },
    render() {
      return (
        <div ref="body">
          {this.setChildrenEvent(this.slotDefaultSlice())}
          {this.sliceLength !== 0 && this.showMoreBtn && this.slotMoreBtn()}
        </div>
      );
    },
    data(): MListData {
      return {
        resizeObserver: null,
        current: null,
        sliceLength: 0,
        moreLength: 0,
        bodyWidth: 0,
        bodyHeight: 0,
      };
    },
    watch: {
      modelValue: {
        handler() {
          if (this.modelValue !== null && this.modelValue != this.current) {
            this.current = this.modelValue;
          }
        },
        immediate: true,
      },
      sliceLength: {
        handler() {
          this.emitMoreVnodeList();
        },
        immediate: true,
      },
    },
    updated() {
      this.matchSliceLength();
    },
    mounted() {
      this.initResizeObserver();
      this.matchSliceLength();

      this.$watch(
        () => [this.bodyWidth, this.bodyHeight],
        () => {
          this.sliceLength = 0;
          this.moreLength = 0;
          this.$forceUpdate();
        },
        { deep: true },
      );
    },
    beforeUnmount() {
      // 清理观察器
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
    },
    methods: {
      /**
       * 获取更多按钮插槽内容
       */
      slotMoreBtn(): VNode {
        const moreBtnSlot = this.$slots.moreBtn;
        const moreBtnData: MoreBtnData = {
          vnodeList: [],
        };
        if (this.sliceLength === 0) {
          moreBtnData.vnodeList = [];
        }
        if (this.sliceLength > 0) {
          moreBtnData.vnodeList = this.setChildrenEvent(this.slotDefault().slice(this.sliceLength));
        }
        if (this.sliceLength < 0) {
          moreBtnData.vnodeList = this.setChildrenEvent(this.slotDefault().slice(1));
        }
        return <div ref="moreBtn"> {moreBtnSlot ? moreBtnSlot(moreBtnData) : '更多'}</div>;
      },
      /**
       * 获取默认插槽内容
       */
      slotDefault(): VNode[] {
        return (this.$slots.default?.() || []).reduce((acc: VNode[], item: VNode) => {
          if (item.type === Fragment) {
            if (Array.isArray(item.children)) {
              acc.push(...(item.children as VNode[]));
            }
          } else {
            acc.push(item);
          }
          return acc;
        }, []);
      },
      /**
       * 获取切片后的默认插槽内容
       */
      slotDefaultSlice(): VNode[] {
        // 当sliceLength > 0 时，展示sliceLength个item
        if (this.sliceLength > 0) {
          return this.slotDefault().slice(0, this.sliceLength);
        }
        // 当sliceLength < 0 时，展示第一个item
        if (this.sliceLength < 0) {
          return this.slotDefault().slice(0, 1);
        }
        // 当sliceLength === 0 时，展示所有item
        return this.slotDefault();
      },
      /**
       * 为子元素设置事件处理
       */
      setChildrenEvent(vnodeList: VNode[]): VNode[] {
        return vnodeList.map((item: VNode) => {
          if (item.key && (typeof item.key === 'string' || typeof item.key === 'number')) {
            return h(item, {
              onClick: () => {
                const onClick = item.props?.onClick;
                if (typeof onClick === 'function') {
                  onClick();
                }
                this.onItemClick(item.key as string | number);
              },
              class: this.setClass(item),
            });
          }
          if (Array.isArray(item.children)) {
            item.children = this.setChildrenEvent(item.children as VNode[]);
          }
          return item;
        });
      },
      /**
       * 处理项目点击事件
       */
      onItemClick(key: string | number): void {
        if (this.isTruely(key) && !this.disabled) {
          this.current = key;
          this.$emit('update:modelValue', key);
        }
        // 更新更多按钮的vnodeList
        this.emitMoreVnodeList();
      },
      /**
       * 设置CSS类名
       */
      setClass(item: VNode): string {
        if (this.isTruely(this.current) && item.key && (typeof item.key === 'string' || typeof item.key === 'number')) {
          const itemKey = item.key as string | number;
          if (this.current === itemKey) return this.activeClass;
          else if (typeof this.current === 'string' && typeof itemKey === 'string' && this.current.includes(itemKey)) {
            return this.activeClassHalf;
          }
        }
        return '';
      },
      /**
       * 检查值是否为真值
       */
      isTruely(key: string | number | null | undefined): boolean {
        return Boolean(key) || key === 0;
      },
      /**
       * 匹配切片长度
       */
      matchSliceLength(): void {
        const body = this.$refs.body as HTMLElement;
        if (!body) return;

        /*
            const style = getComputedStyle(body);
            const borderRightWidth = parseInt(style.borderRightWidth, 10);
            const borderLeftWidth = parseInt(style.borderLeftWidth, 10);
            const boxSizing = style.boxSizing;
            let computedBorder = 0;
            // 判断border是否会撑开body
              if (boxSizing === 'border-box') {
                  computedBorder = borderRightWidth + borderLeftWidth;
              } else {
                  computedBorder = 0;
              }
            */
        // 当body.scrollWidth 大于 body.clientWidth 时，计算溢出分割下标，以及溢出元素的个数
        if (this.overflowX && this.sliceLength >= 0 && Math.ceil(body.scrollWidth) > Math.ceil(body.clientWidth)) {
          this.sliceLength = this.slotDefault().length - this.moreLength;
          if (this.sliceLength >= 0) this.moreLength += 1;
        }

        if (this.overflowY && this.sliceLength >= 0 && Math.ceil(body.scrollHeight) > Math.ceil(body.clientHeight)) {
          this.sliceLength = this.slotDefault().length - this.moreLength;
          if (this.sliceLength >= 0) this.moreLength += 1;
        }
      },
      /**
       * 初始化ResizeObserver
       */
      initResizeObserver(): void {
        const body = this.$refs.body as HTMLElement;
        if (!body) return;

        this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
          for (const entry of entries) {
            const { width, height } = entry.contentRect;
            // 宽度改变可能导致高度改变，但高度改变不会导致宽度改变
            if (this.overflowX || this.overflowY) this.bodyWidth = width;
            if (this.overflowY) this.bodyHeight = height;
          }
        });
        // 开始观察目标元素
        this.resizeObserver.observe(body);
      },
      /**
       * 更新更多按钮的vnodeList
       */
      emitMoreVnodeList(): void {
        if (this.sliceLength === 0) {
          this.$emit('sliceIndex', this.slotDefault().length);
          this.$emit('moreVnodeList', []);
        }
        if (this.sliceLength > 0) {
          this.$emit('sliceIndex', this.sliceLength);
          this.$emit('moreVnodeList', this.setChildrenEvent(this.slotDefault().slice(this.sliceLength)));
        }
        if (this.sliceLength < 0) {
          this.$emit('sliceIndex', 1);
          this.$emit('moreVnodeList', this.setChildrenEvent(this.slotDefault().slice(1)));
        }
      },
    },
  });
</script>

<style lang="scss" scoped>
  .m-list-more-btn {
    white-space: nowrap;
  }
</style>
