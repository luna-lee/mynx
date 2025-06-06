# MoonList

### 作者：闰月飞鸟；时间：2024年08月28日14:02:14

### 开发目的

- 封装列表项选择状态的处理逻辑
- 支持层级嵌套。
- 支持内容元素溢出后显示更多控件。

### Props

| 参数            | 说明                                          | 类型              | 可选值 | 默认值      |
| --------------- | --------------------------------------------- | ----------------- | ------ | ----------- |
| v-mode          | 当前选中项的key                               | sting number null | -      | null        |
| activeClass     | 选中项的class，当前value值全等元素的key值     | string            | -      | active      |
| activeClassHalf | 半选中项的class，当前value值包含元素的key值， | string            | -      | active-half |
| showMoreBtn     | 当内容溢出时，是否出现更多按钮                | Boolean           | -      | false        |
| overflowX       | 是否开启宽度溢出判断                          | Boolean           | -      | true        |
| overflowY       | 是否开启高度溢出判断                          | Boolean           | -      | false        |

### slot

| 参数    | 说明                                         |
| ------- | -------------------------------------------- |
| default | 只有绑定了key的元素才会触发，选中事件。      |
| moreBtn | 更多按钮 对应的元素,参数:vnodeList(溢出元素) |

### Event

| 名称          | 说明                | 参数 |
| ------------- | ------------------- | ---- |
| sliceIndex    | 切分下标            | -    |
| moreVnodeList | 溢出元素的vndoeList | -    |

```javascript
<template>
  <MoonList v-model:value="value" class="list" activeClass="active">
    <div class="item" key="1">1</div>
    <div class="item" key="2">2</div>
    <div class="item">3 </div>
  </MoonList>
</template>
<style lang="scss" scoped>
  .list {
    display: flex;
    .item {
      width: 200px;
      height: 50px;
    }
    .active {
      background: red;
    }
  }
</style>
```

```javascript
<template>
  <moon-list class="moon-list" :show-more-btn="true">
            <div class="item">1</div>
            <div class="item">2</div>
            <div class="item">3</div>
            <div class="item">4</div>
            <div class="item">5</div>
            <template #moreBtn>
                <div class="more-btn">more</div>
            </template>
        </moon-list>
</template>
<style lang="scss" scoped>
  .moon-list {
    margin-top: 200px;
    width: 100%;
    display: flex;
    border: 1px solid red;
    // width: 539px;
    gap: 10px;
    .item {
        flex-shrink: 0;
        width: 200px;
        border: 1px solid blue;
    }
    .more-btn {
        flex-shrink: 0;
        width: 50px;
        border: 1px solid blue;
    }
}
</style>
```

```javascript
<template>
    <div class="contain">
        <el-button @click="showItem = !showItem">{{ showItem ? '隐藏4,5项' : '显示4,5项' }}</el-button>
        <moon-div style="border: 1px solid red">
            <moon-list
                class="moon-list"
                @moreVnodeList="onMoreVnodeList"
                :key="showItem"
                :overflowX="true"
                :overflowY="false"
                showMoreBtn
            >
                <div class="item">1</div>
                <div class="item">2</div>
                <div class="item">3</div>
                <div v-if="showItem" class="item">4</div>
                <div v-if="showItem" class="item">5</div>
                <template #moreBtn="{ vnodeList }">
                    <el-popover placement="bottom" title="标题" width="200" trigger="click">
                        <el-button slot="reference">更多</el-button>
                        <!-- <moreDom :vnode="moreVnode"></moreDom> -->
                    </el-popover>
                </template>
            </moon-list>
        </moon-div>
        <moon-list class="moon-list">
            <moreDom :vnode="moreVnode"></moreDom>
        </moon-list>
    </div>
</template>

<script lang="jsx">
export default {
    name: 'test',
    data() {
        return {
            showItem: false,
            moreVnode: []
        };
    },
    components: {
        moreDom: {
            props: ['vnode'],
            render() {
                return <div>{this.vnode}</div>;
            }
        }
    },
    methods: {
        onMoreVnodeList(vnodeList) {
            this.moreVnode = vnodeList;
        }
    }
};
</script>

<style lang="scss">
.contain {
    display: flex;
    height: 100vh;
    width: 100%;
    flex-direction: column;
}
.moon-list {
    width: 100%;
    height: 100%;
    display: flex;
    // flex-wrap: wrap;

    border: 1px solid red;
    // width: 539px;
    gap: 10px;
    .item {
        flex-shrink: 0;
        width: 200px;
        height: 100px;
        border: 1px solid blue;
    }
    .more-btn {
        flex-shrink: 0;
        width: 50px;
        border: 1px solid blue;
    }
}
</style>


```
