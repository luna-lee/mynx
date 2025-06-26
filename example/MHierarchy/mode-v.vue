<template>
  <div style="position: relative; width: 100%; height: 700px">
    <div class="pannel">
      <div class="button-group">
        <button @click="hierarchyRef?.moveToCenter()">移动到中心</button>
        <button @click="hierarchyRef?.setZoom(1.5)">放大</button>
        <button @click="hierarchyRef?.setZoom(0.5)">缩小</button>
        <button @click="hierarchyRef?.pauseZoom()">暂停缩放</button>
        <button @click="hierarchyRef?.continueZoom()">恢复缩放</button>
        <button @click="hierarchyRef?.expandAllNodes()">展开全部节点</button>
        <button @click="hierarchyRef?.collapseAllNodes()">折叠全部节点</button>
        <button @click="moveToSpecificNode">移动到指定节点</button>
      </div>
      <div style="margin-top: 10px">
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
      :mode="'v'"
      :layout="layout"
      :tree-data="treeData"
      :tree-options="{ id: 'code', pId: 'pcode', name: 'name' }"
      :default-open-level="2"
      :duration="400"
      :config="config"
      :negative-ids="['qydak', 'ywsjk']"
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
import { ref, onMounted } from "vue";
import type { LayoutDirection } from "moon-ui/types/MHierarchy/types";

const hierarchyRef = ref();
const currentNode = ref<any>({});
const layout = ref<LayoutDirection>("tb");

// 使用与示例相同的数据结构
const treeData = ref();

const config = ref({
  node: {
    on: {
      click: (e: any, d: any, el: any, svg: any) => {
        svg.selectAll(".active-node").classed("active-node", false);
        el.classed("active-node", true);
        console.log("节点点击:", d.data);
        hierarchyRef.value?.hiddenCustomView();
      },
      contextmenu: (e: any, d: any, node: any, svg: any) => {
        e.preventDefault();
        currentNode.value = d.data;
        hierarchyRef.value?.showCustomView(e, d, 120, 110);
      },
    },
    rect: {
      attrs: {
        fill: "#f0f9ff",
        stroke: "#0ea5e9",
        "stroke-width": 1,
      },
    },
    text: {
      attrs: {
        "font-size": 14,
        "font-family": "Arial",
      },
    },
  },
  customView: {
    width: 120,
    height: 110,
    duration: 400,
  },
});

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
const onDrawDone = ({ svg }: any) => {
  svg.on("click", () => {
    hierarchyRef.value?.hiddenCustomView();
  });
};

const moveToSpecificNode = () => {
  hierarchyRef.value?.moveToNode("qyfxsbpggl", ["click", "contextmenu"]);
};

const onAdd = () => {
  hierarchyRef.value?.addNode(
    currentNode.value.code,
    [
      {
        id: "new" + new Date().getTime(),
        name: "企业信息" + "new" + new Date().getTime(),
        code: "new" + new Date().getTime(),
        modelType: "",
        domainId: "",
        pcode: currentNode.value.code,
      },
    ],
    -1
  );
  hierarchyRef.value?.hiddenCustomView();
};

const onRemove = () => {
  hierarchyRef.value?.removeNodeById(currentNode.value.code);
  hierarchyRef.value?.hiddenCustomView();
};

const onUpdate = () => {
  hierarchyRef.value?.updateNodesByData({
    ...currentNode.value,
    name: currentNode.value.name + "(已更新)",
  });
  hierarchyRef.value?.hiddenCustomView();
};
</script>

<style scoped>
.pannel {
  left: 0;
  top: 0;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  background-color: rgba(250, 250, 250, 0.9);
  z-index: 10;
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

label {
  cursor: pointer;
  margin-left: 5px;
  margin-right: 15px;
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
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
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
}

.contentmenu-item:hover {
  background-color: #f5f7fa;
}
</style>
