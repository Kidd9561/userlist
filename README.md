# USER_LIST

This template should help get you started developing with Vue 3 in Vite.

## ����

����˿���`viote.config.js`�ļ��е�`serve.port�����У�Ĭ�϶˿�5173`��

�ӿڵ�ַ��`@/src/api/http.js`�ļ��У���ǰ����Ϊ��

```
var instance = axios.create({
    baseURL: 'http://dev.zhh0000zhh.com:36005/v1/',
    timeout: 1000 * 12
});
```

## npm����

```sh
npm install
```

### ������������

```sh
npm run dev
```

### ������С�������

```sh
npm run build
```
