<template>
  <div style="position: relative; width: 100%; height: 600px">
    <MHierarchy
      ref="hierarchyRef"
      :mode="'h'"
      :tree-data="treeData"
      :tree-options="{ id: 'code', pId: 'pcode', name: 'name' }"
      :default-open-level="2"
      :config="config"
      @draw-done="onDrawDone"
    >
      <!-- 默认插槽：右键菜单 -->
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
const hierarchyRef = ref();
const currentNode = ref<any>({});

// 使用真实的树形数据结构
const treeData = ref([]);

const config = ref({
  node: {
    on: {
      click: (e: any, d: any, el: any, svg: any) => {
        svg.selectAll(".active-node").classed("active-node", false);
        el.classed("active-node", true);
        hierarchyRef.value?.hiddenCustomView();
      },
      contextmenu: (e: any, d: any, node: any, svg: any) => {
        e.preventDefault();
        currentNode.value = d.data;
        hierarchyRef.value?.showCustomView(e, d, 120, 110);
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

const onAdd = () => {
  hierarchyRef.value?.addNode(currentNode.value.code, [
    {
      code: "new" + Date.now(),
      name: "新节点" + Date.now().toString().slice(-4),
      pcode: currentNode.value.code,
    },
  ]);
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
