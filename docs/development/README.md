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
npm run verify:release
```

- `check:syntax` 会检查根运行脚本以及 `config/`、`migrations/`、`plugins/`、`scripts/`、`src/` 中的 JavaScript 语法。
- `test:ci` 使用 Jest 串行执行，避免端口、原生模块 mock 和数据库状态相互影响。
- `ci:verify` 串联语法检查与单元测试，是提交前推荐执行的最小验证集。
- `verify:release` 在上述检查后加载真实插件，并验证迁移、HTTP 首页、Web Session、`/ping` 插件与普通聊天链路。

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

## Web 运行时

主仓 Web 端当前拆成两条内部运行时链路，前端 LayIM 事件和 cookie 名保持兼容：

- `src/web/session.js`：处理 `ChatdacsID`、用户资料初始化、在线人数、归属地展示、随机昵称降级和 `disconnect` / `typing` / `typingOver` / `getSettings` 等基础 socket 事件。
- `src/web/messageHandler.js`：处理 Web 消息清洗、消息入库、用户消息广播、插件执行、Web 响应格式转换和聊天兜底。

新用户进入 Web 端时，如果随机昵称外部接口失败、超时或返回空值，Web Session 会降级为 `匿名` 并继续完成连接。随机昵称请求当前限制为 3 秒，不应让外部 API 阻断网页聊天。Web Message 只发送非空字符串聊天回复，避免把 `undefined`、`null` 或对象误发成机器人消息。

维护 Web 端代码时，优先通过这两个运行时的单元测试覆盖行为，不要在 `src/server.js` 里继续堆连接、用户、消息处理逻辑。`src/server.js` 应保留 Express、上传、profile、HTTP listen 和运行时装配职责。

## GitHub Actions

主仓 CI 分两层：

- `Verify ChatDACS`：在 Pull Request 和 push 时运行，覆盖 Ubuntu 与 Windows，执行 Node 18.20.8、`npm ci` 和 `npm run verify:release`。
- `Build ChatDACS One-Click-To-Deploy Package`：在 `master` push 或手动触发时运行，构建全矩阵一键运行包。

打包矩阵包含：

- `linux-x64`
- `linux-arm64`
- `win-x64`
- `win-arm64`
- `macos-x64`
- `macos-arm64`

构建不再使用旧 `pkg` 快照。每个 job 安装生产依赖，执行 Web / 插件 / 普通聊天烟测，再打包精确的 Node.js `18.20.8` 运行时并校验包内入口语法。Linux、macOS 和 Windows x64 使用原生运行时。

Node.js 18 没有官方 Windows ARM64 运行时。`win-arm64` job 因此在 `windows-11-arm` runner 上安装并实测 Node.js 18 x64 运行时，产物通过 Windows 11 ARM 的 x64 兼容层运行。`release-manifest.json` 会明确记录 `runtimeArch: "x64"` 与 `compatibility: "x64-emulation"`，不会把兼容包描述为原生产物。

运行包包含 `config/`、`static/`、`plugins/`、`migrations/`、`src/`、`node_modules/`、`runtime/`、`README.md`、`UPGRADE.md`、`package.json`、`release-manifest.json` 和平台启动器。Windows 入口是 `ChatDACS.cmd`，Linux 与 macOS 入口是 `chatdacs`。构建只收集 Git 已跟踪或未忽略的产品文件，并按目标系统筛选 go-cqhttp 可执行文件；运行期图片缓存和本机脏数据库不会进入产物。

## 配置与数据库迁移

- `src/config/runtimeConfig.js` 统一规范化当前配置，并兼容 v3.7 的 `CONNECT_GO_CQHTTP_SWITCH`、`GO_CQHTTP_SERVICE_ANTI_POST_API`、`GO_CQHTTP_SERVICE_API_URL`。
- `plugins/system/utils.js` 通过 `ConfigureRuntime` 使用同一份规范化配置，群列表、图片发送等旧工具函数不会继续读取到未映射的 OneBot 地址。
- `src/core/migrations.js` 在进程内执行迁移。检测到完整 v3.7 表结构且没有 `SequelizeMeta` 时，会建立初始迁移基线并保留数据；无法识别的部分初始化数据库会拒绝启动。
- 迁移在 Web 服务、插件和平台 Adapter 启动前完成。`messages.CID` 不再误设为唯一，同一 Web 用户可以连续写入多条消息。

升级前必须备份 `config/config.yml` 和 `config/db.db`。回滚时恢复升级前的数据库副本，不要让 v3.7 打开已迁移数据库。

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

OneBot webhook 收到事件后立即返回 HTTP `204`，事件在后台继续处理，异常只记录到日志，不会重复操作已经结束的 HTTP 响应。进程级异常通知也会隔离 QQ 管理员通知失败，Web-only 模式不依赖 OneBot 在线。

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
