<template>
    <div class="m-text-ellips">
        <el-tooltip
            :disabled="!showTooltip || !isEllipsis || isExpanded"
            v-bind="{ effect: 'dark', placement: 'top', ...elToolTipAttrs }"
        >
            <template #content>
                <slot>
                    {{ text }}
                </slot>
            </template>
            <div class="m-text-ellips-container" ref="box" :style="lineClampStyle">
                <slot>
                    {{ text }}
                </slot>
            </div>
        </el-tooltip>

        <div v-if="isEllipsis && showFoldBtn" class="toggle-btn" @click="toggleExpand">
            <slot name="fold-btn" :isExpanded="isExpanded">
                <a href="javascript:void(0)">
                    {{ isExpanded ? '收起' : '展开' }}
                </a>
            </slot>
        </div>

        <span class="m-text-ellips-text-sample" ref="content">
            <slot>
                {{ text }}
            </slot>
        </span>
    </div>
</template>
<script>
import { useResizeObserver } from '@vueuse/core';
import { ref, computed, onMounted } from 'vue';

export default {
    name: 'MTextEllips',
    inheritAttrs: false,
    props: {
        text: {
            type: String,
            default: ''
        },
        lineClamp: {
            type: Number,
            default: 1
        },
        elToolTipAttrs: {
            type: Object,
            default: () => ({})
        },
        showFoldBtn: {
            type: Boolean,
            default: false
        },
        showTooltip: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const isEllipsis = ref(false);
        const box = ref(null);
        const content = ref(null);
        const isExpanded = ref(false);
        const toggleExpand = () => {
            isExpanded.value = !isExpanded.value;
        };
        const lineClampStyle = computed(() => {
            if (isExpanded.value) {
                return {};
            }
            if (props.lineClamp > 1)
                return {
                    display: '-webkit-box',
                    '-webkit-box-orient': 'vertical',
                    '-webkit-line-clamp': props.lineClamp
                };
            return {
                'white-space': 'nowrap'
            };
        });
        onMounted(() => {
            useResizeObserver(content, () => {
                const { stop } = useResizeObserver(box, (entries) => {
                    const entry = entries[0];
                    if (Math.ceil(content.value.offsetWidth) > Math.ceil(entry.contentRect.width * props.lineClamp))
                        isEllipsis.value = true;
                    else isEllipsis.value = false;
                    stop();
                });
            });
        });
        return {
            content,
            box,
            isEllipsis,
            lineClampStyle,
            isExpanded,
            toggleExpand
        };
    }
};
</script>

<style lang="scss" scoped>
.m-text-ellips {
    display: flex;
    gap: 2px;
    .toggle-btn {
        flex-shrink: 0;
        line-height: 1.5em;
    }
}
.m-text-ellips-container {
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 1.5em;
}

.m-text-ellips-text-sample {
    position: fixed;
    top: 0;
    height: 0;
    overflow: hidden;
    white-space: nowrap;
}
</style>
