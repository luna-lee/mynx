export const sourceData = [
  {
    id: "1",
    parentId: "",
    name: "一",
  },
  {
    id: "1-1",
    parentId: "1",
    name: "一、 一",
  },
  {
    id: "1-1-1",
    parentId: "1-1",
    name: "一、 一、一",
  },
  {
    id: "2",
    parentId: "",
    name: "二",
  },
  {
    id: "2-1",
    parentId: "2",
    name: "二、二",
  },
  {
    id: "3",
    parentId: "",
    name: "三",
  },
];

export const structureTreeData = [
  {
    id: "1",
    pId: "",
    children: [
      {
        id: "1-1",
        pId: "1",
        children: [
          {
            id: "1-1-1",
            pId: "1-1",
            data: {
              id: "1-1-1",
              parentId: "1-1",
              name: "一、 一、一",
            },
            parentIds: ["1", "1-1", "1-1-1"],
            childrenIds: [],
            level: 3,
          },
        ],
        data: {
          id: "1-1",
          parentId: "1",
          name: "一、 一",
        },
        parentIds: ["1", "1-1"],
        childrenIds: ["1-1-1"],
        level: 2,
      },
    ],
    data: {
      id: "1",
      parentId: "",
      name: "一",
    },
    parentIds: ["1"],
    childrenIds: ["1-1", "1-1-1"],
    level: 1,
  },
  {
    id: "2",
    pId: "",
    children: [
      {
        id: "2-1",
        pId: "2",
        data: {
          id: "2-1",
          parentId: "2",
          name: "二、二",
        },
        parentIds: ["2", "2-1"],
        childrenIds: [],
        level: 2,
      },
    ],
    data: {
      id: "2",
      parentId: "",
      name: "二",
    },
    parentIds: ["2"],
    childrenIds: ["2-1"],
    level: 1,
  },
  {
    id: "3",
    pId: "",
    data: {
      id: "3",
      parentId: "",
      name: "三",
    },
    parentIds: ["3"],
    childrenIds: [],
    level: 1,
  },
];
export const objByIdTreeData = {
  "1": {
    id: "1",
    pId: "",
    children: [
      {
        id: "1-1",
        pId: "1",
        children: [
          {
            id: "1-1-1",
            pId: "1-1",
            data: {
              id: "1-1-1",
              parentId: "1-1",
              name: "一、 一、一",
            },
            parentIds: ["1", "1-1", "1-1-1"],
            childrenIds: [],
            level: 3,
          },
        ],
        data: {
          id: "1-1",
          parentId: "1",
          name: "一、 一",
        },
        parentIds: ["1", "1-1"],
        childrenIds: ["1-1-1"],
        level: 2,
      },
    ],
    data: {
      id: "1",
      parentId: "",
      name: "一",
    },
    parentIds: ["1"],
    childrenIds: ["1-1", "1-1-1"],
    level: 1,
  },
  "2": {
    id: "2",
    pId: "",
    children: [
      {
        id: "2-1",
        pId: "2",
        data: {
          id: "2-1",
          parentId: "2",
          name: "二、二",
        },
        parentIds: ["2", "2-1"],
        childrenIds: [],
        level: 2,
      },
    ],
    data: {
      id: "2",
      parentId: "",
      name: "二",
    },
    parentIds: ["2"],
    childrenIds: ["2-1"],
    level: 1,
  },
  "3": {
    id: "3",
    pId: "",
    data: {
      id: "3",
      parentId: "",
      name: "三",
    },
    parentIds: ["3"],
    childrenIds: [],
    level: 1,
  },
  "1-1": {
    id: "1-1",
    pId: "1",
    children: [
      {
        id: "1-1-1",
        pId: "1-1",
        data: {
          id: "1-1-1",
          parentId: "1-1",
          name: "一、 一、一",
        },
        parentIds: ["1", "1-1", "1-1-1"],
        childrenIds: [],
        level: 3,
      },
    ],
    data: {
      id: "1-1",
      parentId: "1",
      name: "一、 一",
    },
    parentIds: ["1", "1-1"],
    childrenIds: ["1-1-1"],
    level: 2,
  },
  "1-1-1": {
    id: "1-1-1",
    pId: "1-1",
    data: {
      id: "1-1-1",
      parentId: "1-1",
      name: "一、 一、一",
    },
    parentIds: ["1", "1-1", "1-1-1"],
    childrenIds: [],
    level: 3,
  },
  "2-1": {
    id: "2-1",
    pId: "2",
    data: {
      id: "2-1",
      parentId: "2",
      name: "二、二",
    },
    parentIds: ["2", "2-1"],
    childrenIds: [],
    level: 2,
  },
};
export const leavesTreeData = [
  {
    id: "1-1-1",
    pId: "1-1",
    data: {
      id: "1-1-1",
      parentId: "1-1",
      name: "一、 一、一",
    },
    parentIds: ["1", "1-1", "1-1-1"],
    childrenIds: [],
    level: 3,
  },
  {
    id: "2-1",
    pId: "2",
    data: {
      id: "2-1",
      parentId: "2",
      name: "二、二",
    },
    parentIds: ["2", "2-1"],
    childrenIds: [],
    level: 2,
  },
  {
    id: "3",
    pId: "",
    data: {
      id: "3",
      parentId: "",
      name: "三",
    },
    parentIds: ["3"],
    childrenIds: [],
    level: 1,
  },
];

export const flatDataTreeData = [
  {
    id: "1",
    pId: "",
    children: [
      {
        id: "1-1",
        pId: "1",
        children: [
          {
            id: "1-1-1",
            pId: "1-1",
            data: {
              id: "1-1-1",
              parentId: "1-1",
              name: "一、 一、一",
            },
            parentIds: ["1", "1-1", "1-1-1"],
            childrenIds: [],
            level: 3,
          },
        ],
        data: {
          id: "1-1",
          parentId: "1",
          name: "一、 一",
        },
        parentIds: ["1", "1-1"],
        childrenIds: ["1-1-1"],
        level: 2,
      },
    ],
    data: {
      id: "1",
      parentId: "",
      name: "一",
    },
    parentIds: ["1"],
    childrenIds: ["1-1", "1-1-1"],
    level: 1,
  },
  {
    id: "1-1",
    pId: "1",
    children: [
      {
        id: "1-1-1",
        pId: "1-1",
        data: {
          id: "1-1-1",
          parentId: "1-1",
          name: "一、 一、一",
        },
        parentIds: ["1", "1-1", "1-1-1"],
        childrenIds: [],
        level: 3,
      },
    ],
    data: {
      id: "1-1",
      parentId: "1",
      name: "一、 一",
    },
    parentIds: ["1", "1-1"],
    childrenIds: ["1-1-1"],
    level: 2,
  },
  {
    id: "1-1-1",
    pId: "1-1",
    data: {
      id: "1-1-1",
      parentId: "1-1",
      name: "一、 一、一",
    },
    parentIds: ["1", "1-1", "1-1-1"],
    childrenIds: [],
    level: 3,
  },
  {
    id: "2",
    pId: "",
    children: [
      {
        id: "2-1",
        pId: "2",
        data: {
          id: "2-1",
          parentId: "2",
          name: "二、二",
        },
        parentIds: ["2", "2-1"],
        childrenIds: [],
        level: 2,
      },
    ],
    data: {
      id: "2",
      parentId: "",
      name: "二",
    },
    parentIds: ["2"],
    childrenIds: ["2-1"],
    level: 1,
  },
  {
    id: "2-1",
    pId: "2",
    data: {
      id: "2-1",
      parentId: "2",
      name: "二、二",
    },
    parentIds: ["2", "2-1"],
    childrenIds: [],
    level: 2,
  },
  {
    id: "3",
    pId: "",
    data: {
      id: "3",
      parentId: "",
      name: "三",
    },
    parentIds: ["3"],
    childrenIds: [],
    level: 1,
  },
];
