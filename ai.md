# 提示词

@packages/moon-ui/src目录中每个子文件夹对应一个组件。 组件的文件是该文件夹中的index.vue文件。请为组件的每个slot、props、events。分别编写示例文件，排除MCurtain文件夹，该组件已有示例文件了。 示例文件名用每个slot的名、props属性组合、events名命名。
将示例文件存放到@example目录中对应组件名的文件夹下。若没有组件名的文件夹则新建一个。
然后在@docs/moon-ui中 仿照@docs/moon-ui/MCurtain.md 编写该组件的使用说明文档。
在packages/moon-ui/src/index.ts文件中引入组件，并在components对象中添加该组件
在docs/.vitepress/config.js文件中'/moon-ui/'数组中，第一个对象中的items里添加该组件