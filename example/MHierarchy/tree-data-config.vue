<template>
  <div style="position: relative; width: 100%; height: 700px">
    <div class="document">
      <a href="https://github.com/luna-lee/moon-hierarchy" target="_blank"
        >github地址</a
      >
    </div>

    <div class="pannel">
      <div class="button-group">
        <button @click="changeData">切换数据源</button>
        <button @click="changeConfig">切换配置主题</button>
        <button @click="hierarchyRef?.moveToCenter()">移动到中心</button>
        <button @click="hierarchyRef?.setZoom(1.5)">放大</button>
        <button @click="hierarchyRef?.setZoom(0.5)">缩小</button>
        <button @click="hierarchyRef?.pauseZoom()">暂停缩放</button>
        <button @click="hierarchyRef?.continueZoom()">恢复缩放</button>
        <button @click="fetchAsyncChildren">异步加载示例</button>
      </div>
    </div>

    <MHierarchy
      ref="hierarchyRef"
      class="moon-hierarchy"
      :mode="'h'"
      :tree-data="currentTreeData"
      :tree-options="treeOptions"
      :default-open-level="3"
      :duration="600"
      :config="currentConfig"
      :negative-ids="negativeIds"
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

const hierarchyRef = ref();
const currentNode = ref<any>({});

// 第一套数据：企业业务架构（原示例数据）
const treeData1 = ref([]);

// 第二套数据：技术架构
const treeData2 = ref([]);

const currentTreeData = ref(treeData1.value);

const treeOptions = ref({
  id: "code",
  pId: "pcode",
  name: "name",
});

const negativeIds = computed(() => {
  return dataToggle.value ? ["frontend", "backend"] : ["qydak", "ywsjk"];
});

// 配置1：企业主题（蓝色）
const config1 = computed(() => ({
  node: {
    on: {
      clickFetchChildren: async (data: any, node: any, svg: any) => {
        console.log("异步加载子节点:", data);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                code: "async" + Date.now(),
                name: "异步子节点" + Date.now().toString().slice(-3),
                pcode: data.code,
              },
              {
                code: "async2" + Date.now(),
                name: "异步子节点2" + Date.now().toString().slice(-3),
                pcode: data.code,
              },
            ]);
          }, 2000);
        });
      },
      click: (e: any, d: any, el: any, svg: any) => {
        svg.selectAll(".active-node").classed("active-node", false);
        el.classed("active-node", true);
        console.log("节点点击:", d.data);
        hierarchyRef.value?.hideCustomView();
      },
      contextmenu: (e: any, d: any, node: any, svg: any) => {
        e.preventDefault();
        currentNode.value = d.data;
        hierarchyRef.value?.showCustomView(e, d, 120, 110);
      },
    },
    rect: {
      attrs: {
        fill: "#dbeafe",
        stroke: "#3b82f6",
        "stroke-width": 2,
        rx: 6,
      },
    },
    text: {
      attrs: {
        "font-size": 14,
        "font-family": "Arial",
        fill: "#1e40af",
      },
    },
    plus: {
      attrs: {
        r: 8,
        fill: "#3b82f6",
        stroke: "#1e40af",
      },
    },
  },
  link: {
    stroke: "#3b82f6",
    "stroke-width": 2,
  },
  arrow: {
    show: true,
    attrs: {
      fill: "#3b82f6",
    },
  },
  customView: {
    width: 120,
    height: 110,
    duration: 400,
  },
}));

// 配置2：技术主题（绿色）
const config2 = computed(() => ({
  node: {
    on: {
      clickFetchChildren: async (data: any, node: any, svg: any) => {
        console.log("技术栈异步加载:", data);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                code: "tech" + Date.now(),
                name: "技术组件" + Date.now().toString().slice(-3),
                pcode: data.code,
              },
            ]);
          }, 1500);
        });
      },
      click: (e: any, d: any, el: any, svg: any) => {
        svg.selectAll(".active-node").classed("active-node", false);
        el.classed("active-node", true);
        console.log("技术节点点击:", d.data);
        hierarchyRef.value?.hideCustomView();
      },
      contextmenu: (e: any, d: any, node: any, svg: any) => {
        e.preventDefault();
        currentNode.value = d.data;
        hierarchyRef.value?.showCustomView(e, d, 120, 110);
      },
    },
    rect: {
      attrs: {
        fill: "#dcfce7",
        stroke: "#22c55e",
        "stroke-width": 1.5,
        rx: 8,
      },
    },
    text: {
      attrs: {
        "font-size": 13,
        "font-family": "Microsoft YaHei",
        fill: "#166534",
      },
    },
    plus: {
      attrs: {
        r: 6,
        fill: "#22c55e",
        stroke: "#166534",
      },
    },
  },
  link: {
    stroke: "#22c55e",
    "stroke-width": 1.5,
  },
  arrow: {
    show: true,
    attrs: {
      fill: "#22c55e",
    },
  },
  customView: {
    width: 120,
    height: 110,
    duration: 400,
  },
}));

const currentConfig = ref(config1.value);
let dataToggle = ref(false);
let configToggle = ref(false);

onMounted(() => {
  fetchTreeData();
});

const fetchTreeData = async () => {
  try {
    const response = await fetch(
      "https://www.fste.top/files/d3335980e04011ed91b4f7437d34c747/dataTree.js"
    );
    const data = await response.text();
    const fetchedData = eval(data);

    // 将获取的数据设置为第一套数据源
    treeData1.value = fetchedData;
    currentTreeData.value = fetchedData;
  } catch (error) {
    console.error("远程数据加载失败:", error);
    // 保持默认数据作为备选
  }
};

const onDrawDone = ({ svg, container }: any) => {
  svg.on("click", () => {
    hierarchyRef.value?.hideCustomView();
  });
};

const changeData = () => {
  dataToggle.value = !dataToggle.value;
  currentTreeData.value = dataToggle.value ? treeData2.value : treeData1.value;
};

const changeConfig = () => {
  configToggle.value = !configToggle.value;
  currentConfig.value = configToggle.value ? config2.value : config1.value;
};

const fetchAsyncChildren = () => {
  // 这个演示如何通过API调用获取数据
  const rootNodeCode = dataToggle.value ? "tech-root" : "root";
  console.log("演示异步获取数据，目标节点:", rootNodeCode);
  alert("点击节点上的 + 号来触发异步加载功能");
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
  hierarchyRef.value?.hideCustomView();
};

const onRemove = () => {
  hierarchyRef.value?.removeNodeById(currentNode.value[treeOptions.value.id]);
  hierarchyRef.value?.hideCustomView();
};

const onUpdate = () => {
  hierarchyRef.value?.updateNodesByData({
    ...currentNode.value,
    name: currentNode.value.name + "(已更新)",
    children: [],
  });
  hierarchyRef.value?.hideCustomView();
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
