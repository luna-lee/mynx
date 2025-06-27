# 安装

## npm 安装

```javascript
npm i moon-ui -S
```

## 引入 MoonUI

<div style="background:var(--vp-code-block-bg);margin-bottom:-15px;border-bottom:1px solid #ccc; padding:5px 10px">
 main.ts
 </div>

```ts
ts;
import { createApp } from "vue";
import MoonUI from "moon-ui";
import "moon-ui/style.css";
import App from "./App.vue";

const app = createApp(App);

app.use(MoonUI);
app.mount("#app");
```

## ts配置

<div style="background:var(--vp-code-block-bg);margin-bottom:-15px;border-bottom:1px solid #ccc; padding:5px 10px"> tsconfig.json</div>

```ts
{
    "compilerOptions": {
        "types": [
            //...,
            "moon-ui/client"
        ],
    }
}
```
