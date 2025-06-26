<template>
  <div style="position: relative; width: 100%; height: 700px">
    <div class="pannel">
      <div class="button-group">
        <button @click="addNew">新增根节点</button>
        <button @click="hierarchyRef?.moveToCenter()">移动到中心</button>
        <button @click="hierarchyRef?.setZoom(1.5)">放大</button>
        <button @click="hierarchyRef?.setZoom(0.5)">缩小</button>
        <button @click="hierarchyRef?.pauseZoom()">暂停缩放</button>
        <button @click="hierarchyRef?.continueZoom()">恢复缩放</button>
        <button @click="moveToSpecificNode">移动到指定节点</button>
        <button @click="hierarchyRef?.expandAllNodes()">展开全部节点</button>
        <button @click="hierarchyRef?.collapseAllNodes()">折叠全部节点</button>
      </div>
      <div style="margin-top: 10px">
        <input type="radio" id="h" value="h" v-model="mode" />
        <label for="h">水平模式</label>
        <input type="radio" id="v" value="v" v-model="mode" />
        <label for="v">垂直模式</label>
      </div>
      <div class="item" v-if="mode === 'h'">
        <div>
          <input type="radio" id="h-lr" value="lr" v-model="layout" />
          <label for="h-lr">左-右布局</label>
        </div>
        <div>
          <input type="radio" id="h-rl" value="rl" v-model="layout" />
          <label for="h-rl">右-左布局</label>
        </div>
        <div>
          <input type="radio" id="h-bf" value="bf" v-model="layout" />
          <label for="h-bf">蝴蝶布局</label>
        </div>
      </div>
      <div class="item" v-if="mode === 'v'">
        <div>
          <input type="radio" id="tb" value="tb" v-model="layout" />
          <label for="tb">上-下布局</label>
        </div>
        <div>
          <input type="radio" id="bt" value="bt" v-model="layout" />
          <label for="bt">下-上布局</label>
        </div>
        <div>
          <input type="radio" id="v-bf" value="bf" v-model="layout" />
          <label for="v-bf">蝴蝶布局</label>
        </div>
      </div>
    </div>

    <MHierarchy
      ref="hierarchyRef"
      class="moon-hierarchy"
      :mode="mode"
      :tree-data="treeData"
      :tree-options="treeOptions"
      :layout="layout"
      :negative-ids="['qydak', 'ywsjk', 'fxgl']"
      :config="config"
      @draw-done="onDrawDone"
    >
      <div class="contextmenu">
        <ul>
          <li class="contentmenu-item" @click="onAdd">新增子节点</li>
          <li class="contentmenu-item" @click="onRemove">删除节点</li>
          <li class="contentmenu-item" @click="onUpdate">更新数据</li>
        </ul>
      </div>
    </MHierarchy>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { LayoutDirection } from "moon-ui/types/MHierarchy/types";

const hierarchyRef = ref();
const mode = ref<"h" | "v">("v");
const layout = ref<LayoutDirection>("bf");
const currentNode = ref<any>({});

const treeOptions = ref({ id: "code", pId: "pcode", name: "name" });

// 使用与原示例相同的复杂树形数据结构
const treeData = ref([]);

const config = computed(() => ({
  node: {
    on: {
      clickFetchChildren: (data: any, node: any, svg: any): Promise<any[]> => {
        console.log("异步加载子节点:", data, node, svg);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                code: "async" + Date.now(),
                name: "异步子节点" + Date.now().toString().slice(-3),
                pcode: data.code,
              },
            ]);
          }, 1000);
        });
      },
      click: (e: any, d: any, el: any, svg: any) => {
        svg.selectAll(".active-node").classed("active-node", false);
        el.classed("active-node", true);
        console.log("节点点击:", d.data);
        console.log(hierarchyRef.value,hierarchyRef.value?.hiddenCustomView);
        hierarchyRef.value?.hiddenCustomView();
      },
      contextmenu: (e: any, d: any, node: any, svg: any) => {
        e.preventDefault();
        currentNode.value = d.data;
        hierarchyRef.value?.showCustomView(e, d, 120, 110);
      },
    },
    plus: {
      attrs: {},
      show: mode.value !== "h",
    },
  },
  customView: {
    width: 120,
    height: 110,
    duration: 400,
  },
  arrow: {
    show: true,
  },
}));

onMounted(() => {
  fetchTreeData();
});

const fetchTreeData = async () => {
  try {
    const response = await fetch(
      "https://www.fste.top/files/d3335980e04011ed91b4f7437d34c747/dataTree.js"
    );
    const data = await response.text();
    treeData.value = eval(data);
    
  } catch (error) {
    console.error("数据加载失败:", error);
    // 保持默认数据作为备选
  }
};

const onDrawDone = ({ svg, container }: any) => {
  svg.on("click", () => {
    hierarchyRef.value?.hiddenCustomView();
  });
};

const addNew = () => {
  hierarchyRef.value?.addNode("root", [
    {
      code: "new" + Date.now(),
      name: "新根节点" + Date.now().toString().slice(-4),
      pcode: "root",
    },
  ]);
};

const moveToSpecificNode = () => {
  hierarchyRef.value?.moveToNode("qyfxsbpggl", ["click", "contextmenu"]);
};

const onAdd = () => {
  hierarchyRef.value?.addNode(
    currentNode.value[treeOptions.value.id],
    [
      {
        code: "new" + Date.now(),
        name: "新节点" + Date.now().toString().slice(-4),
        pcode: currentNode.value[treeOptions.value.id],
      },
    ],
    -1
  );
  hierarchyRef.value?.hiddenCustomView();
};

const onRemove = () => {
  hierarchyRef.value?.removeNodeById(currentNode.value[treeOptions.value.id]);
  hierarchyRef.value?.hiddenCustomView();
};

const onUpdate = () => {
  hierarchyRef.value?.updateNodesByData({
    ...currentNode.value,
    name: currentNode.value.name + "(已更新)",
    children: [],
  });
  hierarchyRef.value?.hiddenCustomView();
};
</script>

<style lang="scss" scoped>
.moon-hierarchy {
  background: #edf0fd;

  :deep(.moon-hierarchy-node-root) {
    .moon-hierarchy-rect {
      fill: #003bc1;
    }
  }

  :deep(.moon-hierarchy-link) {
    stroke: #1961f5;
    stroke-opacity: 1;
    stroke-width: 1.3;
  }

  :deep(.moon-hierarchy-node) {
    &.moon-hierarchy-node-expend:not(.moon-hierarchy-node-root):not(
        .active-node
      ) {
      .moon-hierarchy-text {
        fill: rgb(51, 51, 51);
      }
    }

    &.deep-1-node:not(.active-node) {
      .moon-hierarchy-rect {
        fill: #0044fe !important;
      }
      .moon-hierarchy-text {
        fill: #fff !important;
      }
    }

    &.active-node {
      &:not(.moon-hierarchy-node-root) {
        .moon-hierarchy-rect {
          fill: #003bc1;
        }
        .moon-hierarchy-text {
          fill: #fff;
        }
      }
    }

    .moon-hierarchy-plus {
      stroke: #1961f5;

      &:hover {
        circle {
          fill: #5984f1;
        }
        line {
          stroke: #fff;
        }
      }
    }
  }
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.button-group button {
  padding: 4px 8px;
  font-size: 12px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.button-group button:hover {
  background: #f0f0f0;
}

.pannel {
  left: 0;
  top: 0;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  background-color: rgba(250, 250, 250, 0.9);
  z-index: 10;

  label {
    cursor: pointer;
    margin-left: 5px;
    margin-right: 15px;
  }

  .item {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-top: 1px solid #ddd;
    padding-top: 5px;

    div {
      padding: 5px;
    }
  }
}

.document {
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  gap: 20px;
  z-index: 15;
}

.contextmenu {
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 5px;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

.contentmenu-item {
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  color: #606266;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: #f5f7fa;
  }
}
</style>
