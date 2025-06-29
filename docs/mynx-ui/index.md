# 安装

## npm 安装

```javascript
npm i mynx-ui -S
```

## 引入 MynxUI

<div style="background:var(--vp-code-block-bg);margin-bottom:-15px;border-bottom:1px solid #ccc; padding:5px 10px">
 main.ts
 </div>

```ts
ts;
import { createApp } from "vue";
import MynxUI from "mynx-ui";
import "mynx-ui/style.css";
import App from "./App.vue";

const app = createApp(App);

app.use(MynxUI);
app.mount("#app");
```

## ts配置

<div style="background:var(--vp-code-block-bg);margin-bottom:-15px;border-bottom:1px solid #ccc; padding:5px 10px"> tsconfig.json</div>

```ts
{
    "compilerOptions": {
        "types": [
            //...,
            "mynx-ui/client"
        ],
    }
}
```
