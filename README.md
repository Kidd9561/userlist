# USER_LIST

This template should help get you started developing with Vue 3 in Vite.

## 设置

输出端口在`viote.config.js`文件中的`serve.port参数中，默认端口5173`。

接口地址在`@/src/api/http.js`文件中，当前参数为：

```
var instance = axios.create({
    baseURL: 'http://dev.zhh0000zhh.com:36005/v1/',
    timeout: 1000 * 12
});
```

## npm启动

```sh
npm install
```

### 启动开发环境

```sh
npm run dev
```

### 启动最小输出环境

```sh
npm run build
```
