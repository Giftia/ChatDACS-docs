# 开发者指南

本页记录 ChatDACS 当前工程化基线，面向维护者、插件作者和参与迭代的开发者。这里仅描述已经在主仓落地的行为，不代表尚未发布的长期架构承诺。

## 运行环境

- Node.js 以 `18.20.8` 为验证基准，对应主仓 `package.json` 的 `engines.node`。
- Windows 本地开发建议使用 nvm-windows 切换到 Node 18.20.8 后再安装依赖。
- `canvas`、`sqlite3`、`nodejs-jieba` 等原生依赖需要匹配当前 Node ABI；遇到原生模块加载问题时，先确认 Node 版本。

## 本地验证

主仓提供统一验证脚本：

```bash
npm run check:syntax
npm run test:ci
npm run ci:verify
```

- `check:syntax` 会检查 `index.js` 和 `src/**/*.js` 的 JavaScript 语法。
- `test:ci` 使用 Jest 串行执行，避免端口、原生模块 mock 和数据库状态相互影响。
- `ci:verify` 串联语法检查与单元测试，是提交前推荐执行的最小验证集。

## 插件运行时

插件协议保持兼容，旧插件仍使用：

- `插件名`
- `指令`
- `版本`
- `作者`
- `描述`
- `使用示例`
- `预期返回`
- `init`
- `execute`

主仓内部通过插件运行时统一加载和执行插件。平台适配器会把消息整理成内部 `messageContext`，运行时再调用旧插件接口：

```js
execute(msg, userId, userName, groupId, groupName, options)
```

插件可以继续返回空字符串、字符串或 `{ type, content }`。运行时会统一处理响应、错误、插件开关缓存和软超时。默认软超时为 8000ms，超时会返回文本提示，但不会强制终止插件内部 Promise。

## GitHub Actions

主仓 CI 分两层：

- `Verify ChatDACS`：在 Pull Request 和 push 时运行，覆盖 Ubuntu 与 Windows，执行 Node 18.20.8、`npm ci`、语法检查和 Jest。
- `Build ChatDACS One-Click-To-Deploy Package`：在 `master` push 或手动触发时运行，构建全矩阵一键运行包。

打包矩阵包含：

- `linux-x64`
- `linux-arm64`
- `win-x64`
- `win-arm64`
- `macos-x64`
- `macos-arm64`

打包产物包含运行所需的 `config/`、`static/`、`plugins/`、`migrations/`、`node_modules`、`README.md`、`LICENSE`、`package.json` 和平台可执行文件。
