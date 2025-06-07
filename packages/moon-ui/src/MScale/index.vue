<template>
    <div class="m-scale">
        <div class="m-scale-body" v-resize="onReize" :style="scaleBodyStyle">
            <div
                class="m-scale-design-view"
                :style="{ height: designHeight + 'px', width: designWidth + 'px', ...transformStyle }"
            >
                <slot />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    inheritAttrs: false,
    name: 'MScale',
    props: {
        designWidth: {
            type: [Number, String],
            default: 835
        },
        designHeight: {
            type: [Number, String],
            default: 367
        },
        //contain模式下 缩放后是否保持居中
        containCenter: {
            type: Boolean,
            default: false
        },
        fit: {
            type: String,
            default: 'fill'
        }
    },
    data() {
        return {
            inner_height: 0,
            scaleBodyStyle: {},
            transformStyle: {
                transformOrigin: 'top left',
                transform: 'scaleX(1)'
            }
        };
    },
    mounted() {},
    computed: {
        designWidthNum() {
            return parseInt(this.designWidth);
        },
        designHeightNum() {
            return parseInt(this.designHeight);
        }
    },
    methods: {
        onReize(e) {
            let rateWidth = e.offsetWidth / this.designWidthNum || 1;
            let rateHeight = e.offsetHeight / this.designHeightNum || 1;
            if (this.fit == 'fill') this.transformStyle.transform = `scaleX(${rateWidth}) scaleY(${rateHeight})`;
            if (this.fit == 'contain') {
                // 获取最小的缩放尺度
                let miniRate = rateWidth;
                if (rateWidth > rateHeight) miniRate = rateHeight;
                this.transformStyle.transform = `scaleX(${miniRate}) scaleY(${miniRate})`;
                if (this.containCenter) {
                    this.scaleBodyStyle = {
                        paddingLeft: (e.offsetWidth - this.designWidthNum * miniRate) / 2 + 'px',
                        paddingTop: (e.offsetHeight - this.designHeightNum * miniRate) / 2 + 'px'
                    };
                }
            }

            if (this.fit == 'containX') {
                this.transformStyle.transform = `scaleX(${rateWidth}) scaleY(${rateWidth})`;
                this.scaleBodyStyle = {
                    height: this.designHeightNum * rateWidth + 'px'
                };
                if (this.containCenter) {
                    this.scaleBodyStyle = {
                        paddingLeft: (e.offsetWidth - this.designWidthNum * rateWidth) / 2 + 'px',
                        paddingTop: (e.offsetHeight - this.designHeightNum * rateWidth) / 2 + 'px'
                    };
                }
            }

            if (this.fit == 'containY') {
                this.transformStyle.transform = `scaleX(${rateHeight}) scaleY(${rateHeight})`;
                this.scaleBodyStyle = {
                    width: this.designWidthNum * rateHeight + 'px'
                };
                if (this.containCenter) {
                    this.scaleBodyStyle = {
                        paddingLeft: (e.offsetWidth - this.designWidthNum * rateHeight) / 2 + 'px',
                        paddingTop: (e.offsetHeight - this.designHeightNum * rateHeight) / 2 + 'px'
                    };
                }
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.m-scale {
    width: 100%;
    height: 100%;
    .m-scale-body {
        width: 100%;
        height: 100%;
        .m-scale-design-view {
            position: relative; //兜底
            & > ::v-deep(div) {
                height: 100%;
                width: 100%;
            }
        }
    }
}
</style>
