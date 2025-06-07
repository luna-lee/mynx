<template>
    <div class="moon-div" ref="box">
        <slot></slot>
        <div v-if="dragPosition.includes('top')" class="moon-div-bar moon-div-bar-top" ref="topborder">
            <slot v-if="$slots['bar-top']" name="bar-top"></slot>
            <slot v-else name="bar"></slot>
        </div>
        <div v-if="dragPosition.includes('left')" class="moon-div-bar moon-div-bar-left" ref="leftborder">
            <slot v-if="$slots['bar-left']" name="bar-left"></slot>
            <slot v-else name="bar"></slot>
        </div>
        <div v-if="dragPosition.includes('right')" class="moon-div-bar moon-div-bar-right" ref="rightborder">
            <slot v-if="$slots['bar-right']" name="bar-right"></slot>
            <slot v-else name="bar"> </slot>
        </div>
        <div v-if="dragPosition.includes('bottom')" class="moon-div-bar moon-div-bar-bottom" ref="bottomborder">
            <slot v-if="$slots['bar-bottom']" name="bar-bottom"></slot>
            <slot v-else name="bar"> </slot>
        </div>

        <div v-if="dragPosition.includes('br')" class="moon-div-corner moon-div-corner-br" ref="cornerbr">
            <slot v-if="$slots['corner-br']" name="corner-br"></slot>
            <slot v-else name="corner">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                    <path
                        fill="currentColor"
                        d="M6.7 16L16 6.7V5.3L5.3 16zm3 0L16 9.7V8.3L8.3 16zm3 0l3.3-3.3v-1.4L11.3 16zm3 0l.3-.3v-1.4L14.3 16z"
                    />
                </svg>
            </slot>
        </div>
        <div v-if="dragPosition.includes('bl')" class="moon-div-corner moon-div-corner-bl" ref="cornerbl">
            <slot v-if="$slots['corner-bl']" name="corner-bl"></slot>
            <slot v-else name="corner"></slot>
        </div>
        <div v-if="dragPosition.includes('tl')" class="moon-div-corner moon-div-corner-tl" ref="cornertl">
            <slot v-if="$slots['corner-tl']" name="corner-tl"></slot>
            <slot v-else name="corner"></slot>
        </div>
        <div v-if="dragPosition.includes('tr')" class="moon-div-corner moon-div-corner-tr" ref="cornertr">
            <slot v-if="$slots['corner-tr']" name="corner-tr"></slot>
            <slot v-else name="corner"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    components: {},
    inheritAttrs: false,
    props: {
        //可以拖拽的边
        dragPosition: {
            type: Array,
            default: () => ['top', 'left', 'right', 'bottom', 'tl', 'tr', 'bl', 'br']
        }
    },
    data() {
        return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.initMouseMove();
    },
    methods: {
        initMouseMove() {
            let disX = 0; //鼠标按下时光标的X值
            let disY = 0; //鼠标按下时光标的Y值
            let disW = 0; //拖拽前div的宽
            let disH = 0; // 拖拽前div的高
            let box = this.$refs.box;
            //固定样式，即不可更改
            box.style.position = 'relative';
            box.style.overflow = 'hidden';
            if (this.dragPosition.includes('left')) {
                this.$refs.leftborder.onmousedown = function (ev) {
                    ev = ev || window.event;
                    disX = ev.clientX; // 获取鼠标按下时光标x的值
                    disY = ev.clientY; // 获取鼠标按下时光标Y的值
                    disW = box.offsetWidth; // 获取拖拽前div的宽
                    disH = box.offsetHeight; // 获取拖拽前div的高
                    document.onmousemove = function (ev) {
                        ev = ev || window.event;
                        //拖拽时为了对宽和高 限制一下范围，定义两个变量
                        let W = disW - (ev.clientX - disX);
                        box.style.width = W + 'px'; // 拖拽后物体的宽
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
            if (this.dragPosition.includes('right')) {
                this.$refs.rightborder.onmousedown = function (ev) {
                    ev = ev || window.event;
                    disX = ev.clientX; // 获取鼠标按下时光标x的值
                    disY = ev.clientY; // 获取鼠标按下时光标Y的值
                    disW = box.offsetWidth; // 获取拖拽前div的宽
                    disH = box.offsetHeight; // 获取拖拽前div的高
                    document.onmousemove = function (ev) {
                        ev = ev || window.event;
                        //拖拽时为了对宽和高 限制一下范围，定义两个变量
                        let W = disW + ev.clientX - disX;
                        box.style.width = W + 'px'; // 拖拽后物体的宽
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
            if (this.dragPosition.includes('bottom')) {
                this.$refs.bottomborder.onmousedown = function (ev) {
                    ev = ev || window.event;
                    disX = ev.clientX; // 获取鼠标按下时光标x的值
                    disY = ev.clientY; // 获取鼠标按下时光标Y的值
                    disW = box.offsetWidth; // 获取拖拽前div的宽
                    disH = box.offsetHeight; // 获取拖拽前div的高
                    document.onmousemove = function (ev) {
                        ev = ev || window.event;
                        let H = disH + ev.clientY - disY;
                        box.style.height = H + 'px'; // 拖拽后物体的宽
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
            if (this.dragPosition.includes('top')) {
                this.$refs.topborder.onmousedown = function (ev) {
                    ev = ev || window.event;
                    disX = ev.clientX; // 获取鼠标按下时光标x的值
                    disY = ev.clientY; // 获取鼠标按下时光标Y的值
                    disW = box.offsetWidth; // 获取拖拽前div的宽
                    disH = box.offsetHeight; // 获取拖拽前div的高
                    document.onmousemove = function (ev) {
                        ev = ev || window.event;
                        let H = disH - (ev.clientY - disY);
                        box.style.height = H + 'px'; // 拖拽后物体的宽
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
            if (this.dragPosition.includes('br')) {
                this.$refs.cornerbr.onmousedown = function (ev) {
                    ev = ev || window.event;
                    disX = ev.clientX; // 获取鼠标按下时光标x的值
                    disY = ev.clientY; // 获取鼠标按下时光标Y的值
                    disW = box.offsetWidth; // 获取拖拽前div的宽
                    disH = box.offsetHeight; // 获取拖拽前div的高

                    document.onmousemove = function (ev) {
                        ev = ev || window.event;
                        let W = disW + ev.clientX - disX;
                        let H = disH + ev.clientY - disY;
                        box.style.width = W + 'px';
                        box.style.height = H + 'px';
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
            if (this.dragPosition.includes('bl')) {
                this.$refs.cornerbl.onmousedown = function (ev) {
                    ev = ev || window.event;
                    disX = ev.clientX; // 获取鼠标按下时光标x的值
                    disY = ev.clientY; // 获取鼠标按下时光标Y的值
                    disW = box.offsetWidth; // 获取拖拽前div的宽
                    disH = box.offsetHeight; // 获取拖拽前div的高

                    document.onmousemove = function (ev) {
                        ev = ev || window.event;
                        let W = disW - (ev.clientX - disX);
                        let H = disH + ev.clientY - disY;
                        box.style.width = W + 'px';
                        box.style.height = H + 'px';
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
            if (this.dragPosition.includes('tl')) {
                this.$refs.cornertl.onmousedown = function (ev) {
                    ev = ev || window.event;
                    disX = ev.clientX; // 获取鼠标按下时光标x的值
                    disY = ev.clientY; // 获取鼠标按下时光标Y的值
                    disW = box.offsetWidth; // 获取拖拽前div的宽
                    disH = box.offsetHeight; // 获取拖拽前div的高

                    document.onmousemove = function (ev) {
                        ev = ev || window.event;
                        let W = disW - (ev.clientX - disX);
                        let H = disH - (disY - ev.clientY);
                        box.style.width = W + 'px';
                        box.style.height = H + 'px';
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
            if (this.dragPosition.includes('tr')) {
                this.$refs.cornertr.onmousedown = function (ev) {
                    ev = ev || window.event;
                    disX = ev.clientX; // 获取鼠标按下时光标x的值
                    disY = ev.clientY; // 获取鼠标按下时光标Y的值
                    disW = box.offsetWidth; // 获取拖拽前div的宽
                    disH = box.offsetHeight; // 获取拖拽前div的高

                    document.onmousemove = function (ev) {
                        ev = ev || window.event;
                        let W = disW + ev.clientX - disX;
                        let H = disH - (disY - ev.clientY);
                        box.style.width = W + 'px';
                        box.style.height = H + 'px';
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
        }
    }
};
</script>
<style>
:root {
    --moon-div-bar-color: rgba(144, 147, 153, 0.3);
    --moon-div-bar-size: 5px;
    --moon-div-corner-size: 10px;
}
</style>
<style lang="scss" scoped>
.moon-div {
    position: relative;
    overflow: hidden;
    .moon-div-bar {
        position: absolute;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        &:hover {
            background-color: var(--moon-div-bar-color);
        }
    }
    .moon-div-bar-left {
        width: var(--moon-div-bar-size);
        height: 100%;
        left: 0;
        top: 0;
        &:hover {
            cursor: col-resize;
        }
    }
    .moon-div-bar-right {
        width: var(--moon-div-bar-size);
        height: 100%;
        top: 0;
        right: 0;
        &:hover {
            cursor: col-resize;
        }
    }
    .moon-div-bar-bottom {
        width: 100%;
        height: var(--moon-div-bar-size);
        bottom: 0;
        left: 0;
        &:hover {
            cursor: row-resize;
        }
    }
    .moon-div-bar-top {
        width: 100%;
        height: var(--moon-div-bar-size);
        top: 0;
        left: 0;
        &:hover {
            cursor: row-resize;
        }
    }
    .moon-div-corner {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--moon-div-corner-size);
        height: var(--moon-div-corner-size);
        font-size: var(--moon-div-corner-size);
        background-color: transparent;
        z-index: 2;

        &.moon-div-corner-tl {
            top: 0;
            left: 0;
            cursor: nwse-resize;
        }

        &.moon-div-corner-tr {
            top: 0;
            right: 0;
            cursor: nesw-resize;
        }

        &.moon-div-corner-bl {
            bottom: 0;
            left: 0;
            cursor: nesw-resize;
        }

        &.moon-div-corner-br {
            bottom: 0;
            right: 0;
            cursor: nwse-resize;
        }
    }
}
</style>
