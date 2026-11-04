# 开发者指南

本页记录 ChatDACS 当前工程化基线，面向维护者、插件作者和参与迭代的开发者。这里仅描述已经在主仓落地的行为，不代表尚未发布的长期架构承诺。

## 运行环境

- Node.js 固定为 `26.13.0`，与主仓 `.nvmrc`、`package.json` 的 `engines.node` 和 Docker 定义一致。
- 切换版本后在隔离候选目录重新运行 `npm ci`，不要沿用旧 Node 18/24 的 `node_modules`，也不要直接替换在线服务依赖。
- `canvas`、`sqlite3`、`nodejs-jieba` 等原生依赖需要匹配当前 Node ABI；遇到原生模块加载问题时，先确认 Node 版本。
- Canvas 已升级到 3.2.3；`nodejs-jieba@0.3.0` 的 engines 声明仍止于 Node 22，npm 会给出警告。Windows x64 隔离候选已验证实际加载和分词，不修改依赖声明来隐藏警告，不据此推断其他平台兼容。

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
- `verify:release` 在上述检查后加载真实插件，验证迁移、HTTP 首页、Web Session、`/ping` 与普通聊天，执行官方 QQ SDK 离线烟测，最后运行 `smoke:startup` 的真实 main 隔离启动与 graceful stop 检查。

### 真实 main 与 shadow smoke

主入口接口为 `main({configPath, pluginDependencyOverrides, checkUpdates = true} = {})`，返回 `{http, io, stop}`。未传参数时保留原有配置读取、默认插件依赖和更新检查；`pluginDependencyOverrides` 只覆盖指定插件依赖，仍执行真实 main、迁移和插件初始化。`checkUpdates: false` 用于隔离测试中关闭更新检查，不能代替测试配置或网络隔离。

源码完整入口支持在 ChatDACS 根目录运行：

```bash
node index.js --config /private/local.yml
```

Windows 可使用 `C:/private/local.yml`。此参数只选择 YAML，不改变 cwd；相对凭据路径仍从 cwd 解析，不从 YAML 所在目录解析。不覆盖原有配置、数据库或个人人设；独立 YAML 不会自动隔离数据库，隔离测试仍须按下文提前设置数据库路径。

`CHATDACS_DB_PATH` 必须在 require index 或数据库模块前设置，数据库路径在 Sequelize 模块加载时固定，不能在 require 之后补设环境变量。`System.WEB_HOST` 可选，省略时保留旧 listen 绑定，不会自动改成 loopback。`scripts/verify-startup.js` 的 shadow 固定使用 `127.0.0.1` 和临时端口、独立 fixture 配置/SQL 数据库，替换托盘依赖并禁用更新检查；不读取真实账号配置，也不把外部平台上线作为前提。

```bash
npm run smoke:startup
```

该入口已加入 `npm run verify:release`、`scripts/ci-runtime.js production` 和包内 `bundle` 验证。`84c51d7` 已完成 Node 26 本地全量 verify：60 个套件、1743 项测试通过，1 项 Windows 符号链接测试跳过，176 项语法检查和 actual main smoke 通过。隔离验证覆盖真实 main 的 HTTP、会话、插件/聊天与退出，不连接真实 QQ，不能代替上线或实际投递验收。

单个平台连接/启动失败会报告对应固定安全 code，Web 和其他平台继续运行，不自动切换 provider，不伪装该平台已就绪；配置读取、迁移和控制器契约错误仍按各自失败策略处理，不作无条件吞错。

默认日志 transport 只有 Console 与 cwd 下的 `error.log`、`combined.log` 两个本地文件，不默认向 `localhost:80` HTTP POST 日志。无需为默认日志启动额外 HTTP 接收器；该边界不等于平台、更新检查或聊天服务的网络全部关闭。

完整 index 源码/云端验证与真实 QQ 私聊群聊送达分别验收，本轮真实收发待手机确认，历史受限入口不能替代。

`await stop()` 幂等管理 QQ/official QQ/Guild/Bilibili/Telegram 控制器、socket/HTTP、进程异常监听和 SQL 连接。Bili/TG 新增 mock 安全关闭及停止后抑制迟到输出；真实托盘资源和自动拉起的 go-cqhttp 子进程不在其纳管内。此处不承诺全进程、全平台退出验收，也不把 mock 替代真实平台送达与恢复测试。

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

此前云端 actual main smoke 的 `PLUGIN_RUNTIME_ERROR` / `SQLITE_BUSY` 已定位并修复：`GetGroupPluginStatus.findOrCreate` 的读事务与 `AddMessage` / `UpdateLoginTimes` 写竞争。当前插件状态路径使用不创建该读事务的 `findCreateFind`，并对同群状态操作进行 per-group 序列化，避免同群并发更新相互覆盖。不以自动重试掩盖锁竞争，也不把该修复扩大为所有 SQLite 并发场景的通过结论；该问题不再列为当前未修阻断。

主动发送的 `canSend` 已纳入群服务开关，执行“闭菊”停用服务后不主动发送；禁言状态与 LLM/proactive 双插件开关仍需通过检查。

`src/plugins/authorization.js` 在执行和切换前区分宿主权限与会话权限。`wallpaper`、`tray`、`chatPush` 的执行及开关仅允许可信 QQ/NapCat（OneBot）事件中的 `QQBOT_ADMIN_LIST` 宿主管理员；归一化身份必须与原始事件一致，不能只相信调用者填入的 ID。普通群插件切换和群服务启停需群 `admin` / `owner` 或宿主管理员；私聊普通插件开关只影响调用者本人的会话，按平台、机器人 self 与用户隔离，不写成共享空群号状态。公开游戏、语料和 LLM 人设查询不因此封禁，官方通道仍遵守原有 allowlist。

## Web 运行时

主仓 Web 端由以下模块组成，前端 LayIM 事件和 `ChatdacsID` cookie 名保持兼容：

浏览器仅精确读取 `ChatdacsID`，不以整个 `document.cookie` 作为 CID；percent decode 与服务端 `cookie.parse` 保持一致，非法编码保留原值，缺失、空值或保留机器人 ID `'0'` 会触发重建。其他 cookie 不再影响初始化或造成自己的消息双显，actual callback 测试已覆盖这些场景。CID 是匿名用户标识，不是鉴权/授权凭据，不代表本轮新增登录体系。

- `src/web/session.js`：处理 `ChatdacsID`、用户资料初始化、在线人数、归属地展示、随机昵称降级和 `disconnect` / `typing` / `typingOver` / `getSettings` 等基础 socket 事件。
- `src/web/messageHandler.js`：处理 Web 消息清洗、消息入库、用户消息广播、插件执行、Web 响应格式转换和聊天兜底。
- `src/web/uploads.js`：复用 multer 接收文件，异步重命名并返回带安全显示名的 HTTP JSON，不再独立广播媒体事件；静态上传文件安全头也集中在这里。
- `static/uploadMedia.js`：提供共享安全显示名、严格本机上传标记识别，以及应用层 LayIM parser 包装，保持发送端和接收端的音视频播放器能力。
- `static/renderSecurity.js`：在 LayIM 展开之后净化最终 HTML，并独立保护昵称、文本状态与媒体 URL 的二次使用。

新用户进入 Web 端时，如果随机昵称外部接口失败、超时或返回空值，Web Session 会降级为 `匿名` 并继续完成连接。随机昵称请求当前限制为 3 秒，不应让外部 API 阻断网页聊天。Web Message 只发送非空字符串聊天回复，避免把 `undefined`、`null` 或对象误发成机器人消息。

断线 cleanup 在异步读取用户资料前通过 `once` 注册，在线计数只释放一次。若读取资料或随机昵称期间断线，后续不再新建用户、欢迎或注册 socket 处理器；`src/server.js` 在等待初始化结束后也会检查连接是否已经断开。正常新用户帮助、老用户登录信息和基础事件载荷保持不变。插件返回已处理结果后停止聊天兜底，即使该结果没有可显示的内容也不产生第二条普通聊天回复。日志不记录 Web 消息正文或 `req.file` 对象。

上传接口成功返回 HTTP `201` 和 `{code: 0, data: {src, name}}`。`name` 使用共享的 `safeDisplayName`，将方括号、括号、HTML 特殊字符、引号、`@`、路径分隔符及控制/格式字符等替换为下划线，空值回退为 `file`，避免原始文件名进入 LayIM 标记后再次扩展为可执行内容。缺文件或不支持的图片返回 `400`，保存失败返回 `500`，multer 文件超限错误返回 `413`。本次没有新增上传大小上限。图片接口只允许已列出的光栅图片扩展名和非 SVG/XML/HTML 的 `image/*` MIME，不解码鉴真文件内容。普通文件仍可上传，HTML、SVG、JavaScript、XML 等非内联白名单类型强制以 `application/octet-stream` 附件下载。常见图片和音视频保留内联行为。

`/uploads` 的 `nosniff` 和 CSP sandbox 头在 `express.static` 前设置，静态文件回调还会校验解析后的文件路径，覆盖编码斜杠等 URL 写法。上传接口不再独立发送 `picture` / `file` / `video` / `audio` 广播，只走 LayIM 成功回调自动发送的普通 socket `message` 链路，消除两条上传展示路径造成的双显。

`ChatDacsUploadMedia.install(layui)` 在应用层包装 `layui.data.content`，不改第三方 LayIM 源码。它只把严格本机 `/uploads/<32位十六进制随机名>[.<扩展名>]` 和安全显示名组成的音视频 `file(url)[name]` 转换为既有播放器语法；外部地址、畸形标记不转换。纯本机上传标记消息仍入库并广播，但跳过插件与普通聊天，避免额外机器人回复；有其他文本的混合消息不走此快捷路径。

上传链路已有定向测试及真实 LayIM parser、Chrome DOM 复验：已测恶意文件名样例未产生可执行节点，音视频播放器正常。该结论限于已测上传场景，不宣称所有输入均已安全，也不把旧的独立媒体广播视为最终上传契约。

共享 `express.json` 的 `verify` 将原始 payload 复制到 `req.rawBody` Buffer，供 OneBot 回调签名校验使用；不改 `req.body`、不外发原文，JSON 默认限制保持 `100kb`。维护 Web 端代码时优先测试这些模块，`src/server.js` 保留 Express、profile、HTTP listen 和模块装配职责。

监听端口占用 `EADDRINUSE` 仅安排一个 10 秒重试，不调用 `http.close()`，因此不会提前触发 index 的 dispose/stop。成功监听或显式最终关闭会取消重试；其他监听错误只报告固定安全 code、不自动重试，最终关闭清理仍由 index 负责。

定向回归使用 mock、临时目录和 loopback 临时端口，不连接真实聊天、配置、数据库或凭据：

```bash
npm test -- --runInBand --runTestsByPath src/web/session.test.js src/web/messageHandler.test.js src/web/uploads.test.js
```

### 最终 HTML 与独立文本边界

`ChatDacsRenderSecurity.install(layui, {purify: window.DOMPurify, layim})` 包装最终 `layui.data.content` 输出，在 LayIM 展开之后调用 DOMPurify，避免“输入已过滤、parser 又生成危险 HTML”的漏洞。DOMPurify 固定为 `3.4.17`，应用的同源 `/vendor/purify.min.js` 路由从本地依赖提供文件，无 CDN；不需要手工建立 `static/vendor/` 副本。净化器缺失、不受支持或抛错时只显示转义文字，不放行原 HTML。

昵称经独立转义进入消息模板，typing / 在线状态使用 `textContent`，settings 的昵称和 CID 在进入带引号的表单值前单独转义。不能把正文净化当成这些入口的保护。用户提供的显示 HTML 不再接受 `style`、`id`、`name`、普通事件属性、表单或可执行标签；正常代码、引用、表格排版、图片和音视频继续保留。应用自带静态表单与必要播放器控制节点不是任意用户显示属性的通行证。

`src`、`href`、`poster` 和媒体控制器 `data-src` 的危险 URL 分隔符会安全序列化，防止实际 `playVideo` 与图片双击/放大代码读取 DOM 属性后再次拼接 HTML 时注入节点。`layim-event` / `data-src` 仅在合法音视频控制节点上保留；无效协议、伪造控制器不得借此获得交互能力。base64 图片以及相对、协议相对音视频地址已有兼容回归，不能为避险一律删除媒体或在后续代码里重新插值未经编码的 URL。

统一渲染边界已有定向测试与独立 DOM 复验，属于离线场景，不等于线上或所有输入的安全验收。main 依赖注入、`WEB_HOST` 与正常路径、平台降级、默认日志策略见本页真实 main 小节；本地验证与最终云端结果分别记录。

### 托盘通知的进程边界

`plugins/tray.js` 的用户通知通过 `execFile` 调用 `msg.exe`，传参为 `[username, 'ChatDACS: ' + text]`，不经过 shell，保持 Unicode argv。固定前缀防止以 `/server` 等开头的用户文本成为 msg.exe 选项；托盘 notify 仍收到原文，不把系统消息前缀加到托盘正文。此处不声称托盘的其他菜单命令全部完成 execFile 迁移。

源码与 mock 断言现已包含 `windowsHide: true`、`timeout: 5000`、`maxBuffer: 65536`。进程错误/超时不回退到 shell，不记录原始错误或输出；回复区分两个发送路径的成功、部分成功和失败。mock 验证不代表宿主桌面实际通知或线上操作已验收。

```bash
npm test -- --runInBand --runTestsByPath src/web/renderSecurity.test.js src/plugins/trayPlugin.test.js
```

## GitHub Actions

主仓 CI 分两层：

- `Verify ChatDACS`：配置在 Pull Request 和 push 时运行，覆盖 Ubuntu 与 Windows，从 `.nvmrc` 读取 Node `26.13.0`，执行 `npm ci` 和 `node scripts/ci-runtime.js verify`。
- `Build ChatDACS One-Click-To-Deploy Package`：在 `master` push 或手动触发时运行，构建全矩阵一键运行包。

截至 2026-11-04，云端状态如下。不同候选分别记录，不能将前一候选的成功结果视为最终版本通过：

| 候选 | 检查 / run | 状态 |
| --- | --- | --- |
| `572e` | build `41757018129` | 6/6 全部通过，含 Windows ARM |
| `84c51d7` | CI `41757622782` | Ubuntu、Windows 均通过 |
| `8ebd580` | CI `41758028133` | success |
| `8ebd580` | 最终只读权限 build `41758029637` | 6/6 全部通过，6 个 artifact 已生成 |

`8ebd580` 仅修改两个 workflow 与 `ci-runtime.test`，应用代码与 `84c51d7` 相同，权限回归 32 项测试通过。两个 workflow 均显式声明 `permissions: contents: read`，测试断言没有 job 覆盖权限。此声明不代表仓库默认权限已修改。该候选已完成六平台生产依赖安装、原生探针、真实 main 烟测、实际 ZIP 解压运行和启动器验证，并生成六个 artifact；未合并主分支或发布正式 Release。

ARM 限制：`linux-arm64` 打包排除仓内 ELF 机器类型为 62（x86-64）的 go-cqhttp，Node 与适配器仍使用原生 ARM64；QQ 接入使用独立部署的外部 OneBot/NapCat/SnowLuma 服务，不下载或自动替换协议程序。`win-arm64` 的 x64 仿真包仍可包含 x64 go-cqhttp。Canvas ARM64 源码编译涉及外部 Cairo/Pango 依赖；上述 runner 通过不等于任意 ARM 主机免系统依赖运行或真机验收通过。

构建不再使用旧 `pkg` 快照。每个 job 配置为先安装生产依赖并运行原生模块探针、Web 与真实 main startup 烟测，再使用独立安装的打包工具构建 Node.js `26.13.0` 运行包。`scripts/ci-runtime.js bundle` 检查包内运行时、manifest、入口语法、原生模块功能、真实 main shadow 启停和 ZIP 文件项，不能仅凭压缩成功判断可运行。

Windows x64 隔离验证已有干净安装、Node `26.13.0` / ABI `147` 下的 Canvas/SQLite/分词/Sharp 功能探针、Web/官方 QQ 离线烟测、生产依赖安装和实际 ZIP 检查证据。当前 `84c51d7` 的本地全量 verify 结果见真实 main 小节；运行包发布仍以该候选最终 build 为准，不将本地通过等同于六平台发布、Docker 镜像或真实 QQ 验收通过。

`win-arm64` 因原生依赖预编译支持限制，配置在 `windows-11-arm` runner 上使用 Node.js `26.13.0` x64，通过 Windows 11 ARM 的 x64 兼容层运行。`release-manifest.json` 明确记录 `runtimeArch: "x64"` 与 `compatibility: "x64-emulation"`，不得称为 ARM64 原生包或 ARM 真机已通过。

运行包包含 `config/`、`static/`、`plugins/`、`integrations/`、`migrations/`、`src/`、`node_modules/`、`runtime/`、`README.md`、`UPGRADE.md`、`package.json`、`release-manifest.json` 和平台启动器。Windows 入口是 `ChatDACS.cmd`，Linux 与 macOS 入口是 `chatdacs`。构建只收集 Git 已跟踪或未忽略的产品文件，并按目标系统筛选 go-cqhttp 可执行文件；运行期图片缓存和本机脏数据库不会进入产物。

## 配置与数据库迁移

- `src/config/runtimeConfig.js` 统一规范化当前配置，并兼容 v3.7 的 `CONNECT_GO_CQHTTP_SWITCH`、`GO_CQHTTP_SERVICE_ANTI_POST_API`、`GO_CQHTTP_SERVICE_API_URL`。
- `plugins/system/utils.js` 通过 `ConfigureRuntime` 使用同一份规范化配置，群列表、图片发送等旧工具函数不会继续读取到未映射的 OneBot 地址。
- `src/core/migrations.js` 在进程内执行迁移。检测到完整 v3.7 表结构且没有 `SequelizeMeta` 时，会建立初始迁移基线并保留数据；无法识别的部分初始化数据库会拒绝启动。
- 迁移在 Web 服务、插件和平台 Adapter 启动前完成。`messages.CID` 不再误设为唯一，同一 Web 用户可以连续写入多条消息。

升级前必须备份 `config/config.yml` 和 `config/db.db`。回滚时恢复升级前的数据库副本，不要让 v3.7 打开已迁移数据库。

`System.ERROR_NOTIFY_GROUP_ID` 为可选纯数字群号字符串，YAML 中需加引号，默认规范化为 `undefined`，即不发送异常群通知，取代旧版硬编码群。只有显式配置并启用 OneBot 才会发送；通知仅有固定安全 code（如 `PROCESS_UNCAUGHT_EXCEPTION` / `PROCESS_UNHANDLED_REJECTION`），无原始异常、stack 或用户消息，通知失败不阻断错误处理。

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

官方 QQ 通道与 OneBot 相互独立。接入步骤见 [官方 QQ 机器人](/qq/official.html)。
`src/bots/qqOfficial/` 在同一 Node 进程中动态加载官方 SDK，将消息转换成
`platform: 'qqOfficial'` 的上下文后直接交给插件运行时，未处理时才走 `ChatProcess`。
它不加载 DSH Agent，不把官方 openid 伪装成 QQ 号，也不复用 OneBot 群管理处理器。
runtime 用可选 `conversationState` 存储官方会话开关；新增迁移只创建
`conversationPluginStates`，旧 `qqGroups` 表和旧回调签名保持原逻辑。
官方通道默认只允许 `ping` / `help`，限制在插件执行前生效；`/help` 只列出允许的插件。
`npm run smoke:qq-official` 使用真实 SDK 中间件与 fake transport 验证私聊、群 @、去重和聊天兜底，
不连接真实 QQ，不能替代账号授权和实际收发验收。

`ONE_BOT_PROVIDER` 明确协议实现：`napcat` 仍是推荐路径，`snowluma` 是独立的代码接入路径，`external` 保持通用 OneBot 11 接入，`go-cqhttp` 用于旧部署。`GO_CQHTTP_SWITCH: true` 优先级最高，以确保旧配置仍能启动内置进程。SnowLuma 与 NapCat 分别管理配置和登录数据，不自动切换、互相启动或覆盖对方配置；本轮不启动 SnowLuma。

SnowLuma 源码 v2.4.0 使用 `networks` / `enabled` / `accessToken` / `messageFormat`，不是 NapCat 的 `network` / `enable` / `token` / `messagePostFormat`。回调契约为 `X-Signature: sha1=<hex>`，即以 access token 为 key 对原始 payload 字节计算 HMAC-SHA1，不能改用 `JSON.stringify(req.body)`。schema 生成与 raw HMAC 校验已实现，细节见主仓 `integrations/snowluma/README.md` 和对应离线测试；工具不下载、安装或启动协议端，不承诺真实账号、私聊或群消息验收。只读就绪检查也会请求实际服务，需另行授权；当前文档不要求读者开启该 provider。

接入层通过 HTTP 对接独立部署的 SnowLuma，不捆绑其源码、程序或原生组件。上游 [v2.4.0 许可](https://github.com/SnowLuma/SnowLuma/blob/v2.4.0/LICENSE) 为源码可见非商业许可，不是 OSI 开源许可；商业使用和再分发应核对上游条款。`ONE_BOT_CREDENTIALS_FILE` 的相对路径始终从进程 cwd 解析，不从 `--config` 的 YAML 目录解析，CLI 与主程序相同。

NapCat 是独立运行的外部组件。启动时 `src/bots/qq/napcat.js` 调用 `get_version_info` 检查 OneBot 11 兼容性；失败只记录警告，不阻断 Web 服务。QQ Adapter 随后仍会执行群列表初始化，协议端恢复后需要重启 ChatDACS。`scripts/generate-napcat-config.js` 从规范化后的 ChatDACS 配置生成 HTTP Server 与反向 HTTP Client 配置，并强制 `messagePostFormat: string`，保持现有 CQ 码解析。

QQ 群聊适配器内部通过 `src/platforms/oneBotSender.js` 统一拼装 OneBot HTTP API URL。新代码不应在 QQ 处理器里手写 `send_group_msg`、`set_group_ban`、`get_group_info` 等 URL，优先通过 sender 方法完成发送、禁言、群信息读取和请求审批。

Guild 内嵌 OneBot 发送也已使用 `createOneBotSender` 和 `createOneBotHttpClient`，统一鉴权、超时与 URL 参数编码，不再手拼回复 URL。该 OneBot 路径与独立官方 Guild SDK 通道仍须区分，代码/mock 回归不代表任一路径的真实送达已经通过。

这个边界的目的不是替换 OneBot 协议，而是把平台 I/O 和业务处理分开，便于单元测试继续 mock HTTP 调用，避免测试环境必须启动真实 OneBot 服务。

OneBot webhook 收到事件后立即返回 HTTP `204`，事件在后台继续处理，异常只记录到日志，不会重复操作已经结束的 HTTP 响应。进程级异常通知也会隔离 QQ 管理员通知失败，Web-only 模式不依赖 OneBot 在线。

QQ 消息入口先丢弃自身 `message_sent` 和自身消息，避免机器人回复回流。仅普通 `message` 按 self / scope / peer / sender / message ID 隔离去重，窗口 5 分钟、最多 4096 项；缺失或无效 ID 不去重，处理失败不自动重试。`notice` / `poke` 保留原事件路径，不被消息去重拦截。该进程内有界去重不提供跨重启或 exactly-once 保证。

`src/platforms/oneBotHttp.js` 保留 scoped Bearer 与超时边界，只向配置的 API origin 和基路径注入 token，禁止跟随重定向。token 来自私密 JSON 的 `accessToken` 或优先的 `CHATDACS_ONEBOT_ACCESS_TOKEN`，默认文件为 `config/onebot.credentials.json`，不应写入日志、Git 或文档示例。NapCat 与 SnowLuma 默认都必须使用真实有效的 token，回环部署也不豁免。只有 provider 未声明、`external` 或旧 go-cqhttp 路径，在未设置 token 环境变量、未显式声明凭据文件且默认文件不存在时才兼容旧无 token 模式；显式空值、不可读文件、非法 JSON 或无效 token 均拒绝回退。

回调兼容仅 Bearer 鉴权；若同时提供 `X-Signature`，原始请求体 HMAC 必须有效，不能用 Bearer 绕过无效签名。`System.ONE_BOT_SELF_ID` 可校验入站回调的 `self_id`，拒绝账号不匹配的事件。不要将协议端 API 端口直接暴露到公网，跨机须使用 TLS 或加密隧道及访问控制；provider 配置、回调鉴权和账号收发需分别验收。

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
