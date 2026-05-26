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

## 平台响应适配

主仓内部通过 `src/platforms/responseAdapter.js` 集中处理插件响应到各聊天平台格式的转换。新代码优先使用：

```js
formatPluginAnswer(platform, answer, { webPort })
```

当前支持的平台标识包括：

- `web`
- `onebot` / `go-cqhttp` / `qq`
- `qqGuild` / `qqInsideGuild`
- `telegram`

旧的 `utils.PluginAnswerToWebStyle`、`utils.PluginAnswerToGoCqhttpStyle`、`utils.PluginAnswerToQQGuildStyle`、`utils.PluginAnswerToTelegramStyle` 仍然保留，内部委托到同一个响应适配器。这样旧平台适配器和插件不用迁移，新平台或智能体接入可以复用同一条响应格式化链路。

## OneBot 适配边界

QQ 群聊适配器内部通过 `src/platforms/oneBotSender.js` 统一拼装 OneBot HTTP API URL。新代码不应在 QQ 处理器里手写 `send_group_msg`、`set_group_ban`、`get_group_info` 等 URL，优先通过 sender 方法完成发送、禁言、群信息读取和请求审批。

这个边界的目的不是替换 OneBot 协议，而是把平台 I/O 和业务处理分开，便于单元测试继续 mock HTTP 调用，避免测试环境必须启动真实 OneBot 服务。

## QQ 处理器拆分

`src/bots/qq.js` 仍然是 QQ 适配器入口，但已把高频入口逻辑拆成可测试模块：

- `src/bots/qq/eventPreflight.js`：处理频道消息、加好友、进群邀请、机器人被禁言等事件预处理。
- `src/bots/qq/mediaBridge.js`：处理 QQ 图片、视频转发到 Web Socket。
- `src/bots/qq/groupServiceGate.js`：处理群服务启用、停用和停用状态拦截。
- `src/bots/qq/pluginBridge.js`：把 QQ 群消息接入插件运行时，并通过 OneBot sender 发送插件回复。
- `src/bots/qq/chatReply.js`：处理随机复读、被 @ 后提权回复和聊天核心回复。

这些模块保持旧用户体验和旧插件协议不变。后续继续拆 QQ 群专有玩法时，应优先沿用这种边界：平台事件只在入口归一化，业务模块显式接收 `event`、`config`、`utils`、`oneBotSender`、`chatProcess` 等依赖，测试里不访问真实网络。

## 数据模型连接

系统插件模型统一复用 `plugins/system/model/database.js` 中的 Sequelize 实例。新增模型应从该文件引入：

```js
const {sequelize, DataTypes} = require('./database.js')
```

不要在单个 model 文件里重新 `new Sequelize(...)`。这样可以减少 SQLite 连接重复初始化，降低测试和启动时的隐式状态差异。
