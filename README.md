# 使用
## 分支
- master分支是互联网应用开发课程结束的分支
- se3353分支是应用系统体系架构课程结束的分支
## 架构
- 采用 react + vite + react query + zustand + axios + antd
- 前后端交互的api参见hooks, 可根据实现的不同修改, 基本与https://apifox.com/apidoc/shared-663d000b-fc08-412b-944a-b6f587db33f3/api-149700766 相同,在此基础上添加
## quickStart
1. 下载依赖(建议使用交大源)
```
npm install
```
2. 创建.env文件
```
VITE_BACKEND_URL="https://localhost:8443"
WS_BACKEND_URL="wss://localhost:8443"
```
根据实际后端情况定义这两个环境变量即可,
如果是master分支无websocket不需要定义`WS_BACKEND_URL`

3. `npm run dev`启动测试环境, 即可在浏览器中查看

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
