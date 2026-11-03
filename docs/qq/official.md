# 官方 QQ 机器人接入

适用于支持 `CONNECT_QQ_OFFICIAL_SWITCH` 的 ChatDACS 模块化版本。
使用腾讯官方 Connector 扫码绑定和 QQBot Node.js SDK 收发消息，保持小夜人格、旧插件接口和聊天核心。
SDK 在 ChatDACS 同一进程运行，不需要 DeepSeek Harness、独立网关或公网回调端口。

## 1. 准备运行环境

源码部署以主仓 `.nvmrc` 为准，当前使用 Node.js `26.13.0`；切换版本后在项目根目录运行 `npm ci`，不要沿用旧 Node 18/24 的 `node_modules`。
使用有相应权限的官方机器人应用，并允许访问 QQ 官方 API 和 WebSocket Gateway。
这是机器人应用身份，不是个人 QQ 登录，不能继承原账号群号、好友关系和管理员权限。

## 2. 扫码绑定

```bash
npm run qq:official:bind
```

手机 QQ 扫码后，凭据写入 `config/qq-official.credentials.json`，命令不输出密钥。
二维码过期由官方 Connector 刷新，`Ctrl+C` 取消。Linux / macOS 文件权限为 0600；
Windows 应限制凭据目录仅部署用户可读。

也可以成对设置 `QQBOT_APPID`、`QQBOT_SECRET`，它们优先于文件；只设置一个会拒绝启动该通道。
自定义文件使用 `npm run qq:official:bind -- --file /private/bot.credentials.json`，
并将下方 `credentialsFile` 指向相同路径。凭据不要进入 Git、日志、公开目录或发布包。

## 3. 启用通道

在现有配置中合并以下内容，不要覆盖其他配置节：

```yaml
System:
  CONNECT_QQ_OFFICIAL_SWITCH: true

qqOfficial:
  credentialsFile: 'config/qq-official.credentials.json'
  pluginAllowlist: ['ping', 'help']
  access:
    c2cMode: 'open'
    c2cAllow: []
    groupMode: 'open'
    groupAllow: []
```

运行 `npm run dev`，等待“QQ官方机器人已连接”。默认开关为 false；缺凭据和连接失败只影响本通道。
仅使用官方通道时可关闭 `CONNECT_ONE_BOT_SWITCH`、`GO_CQHTTP_SWITCH`。
访问模式支持 `open` / `allowlist` / `disabled`；白名单填写原始 openid，不能用普通 QQ 号。
错误模式值按 disabled 处理。

## 4. 能力边界

支持私聊和群 @ 的文本消息、文本回复、HTTPS 图片回复。图片权限仍需真实机器人验证。
普通群消息不触发应答。默认只启用 `ping`、`help`；allowlist 使用插件文件名，不带扩展名。
扩展列表前必须检查插件对 OneBot API、CQ 码、QQ 号和平台管理能力的依赖。
官方 `/help` 只列出允许的插件；不兼容插件命令会返回提示而不执行。

旧式 `插件开 连通性测试插件` / `插件关 连通性测试插件` 都执行状态切换，与原行为一致，
请以回复的实际状态为准。官方状态按 AppID、会话类型及 openid 隔离，存储于新表，
不改变旧 QQ 群插件开关。此版本未新增管理身份授权模型。

禁言、戳一戳、地雷、伪造转发、群成员查询和 CQ 码不属于官方通道能力。
暂不开放主动推送、流式、语音转码、本地文件发送和 Agent 工具执行。
文字每块最多 1500 Unicode 字符，最多两块，超出会截断；不自动改用主动消息绕过限额。
同会话串行且最多排队 3 条，全局最多 64 条在途消息；每用户 / 群 / 全局每分钟
分别最多 12 / 30 / 60 条。插件沿用软超时，聊天超时为 12 秒，迟到回复不再投递。
去重仅在当前进程内有效；发送失败不自动重复执行插件或外发第二条错误消息。

## 5. 验收

### 新鉴权失败、旧频道仍可用

官方 access-token 接口可能返回 HTTP 200 但业务 `code: 100016`，表示 AppID / ClientSecret
未通过校验；不能只看 HTTP 状态。控制台只有一个 AppSecret 字段不等于填错配置。
若同一值能通过旧版 Bot 鉴权，也只能确认旧链路可用，不能推断新 access-token 鉴权已通过。

新版保留 `CONNECT_QQ_GUILD_SWITCH`、`QQ_GUILD_APP_ID`、`QQ_GUILD_TOKEN` 的频道接入路径。
可以先独立验收已有频道文字消息；旧频道、频道私信、QQ 单聊和普通群聊需要分开记录结果。
频道私信已增加独立开关与应答模块，配置见 [QQ 频道接入](/qqGuild/)；真人验收需独立完成。
新官方通道仍要求有效的 access token。
不要静默回退旧鉴权来宣称接通新场景，也不要为排查擅自重置影响线上连接的凭据。

参考：[官方访问凭证与错误码](https://bot.q.qq.com/wiki/develop/api-v2/dev-prepare/access-token.html)。

### 验证命令

```bash
npm run verify:release
```

本地验证包括主项目测试、真实 Web / Socket 烟测和真实官方 SDK 中间件的离线烟测。
通过后还需在授权测试私聊、群中验证 `/ping`、`/help`、普通聊天、图片、白名单及断线恢复。
离线通过不表示真实账号授权和收发已经通过。
停止 ChatDACS、删除本地凭据仅取消本地连接，上游撤销需在官方平台操作。

官方参考：[DSH 插件](https://github.com/tencent-connect/dsh-qqbot)、
[QQBot SDK](https://github.com/tencent-connect/qqbot-nodejs)、
[扫码 Connector](https://www.npmjs.com/package/@tencent-connect/qqbot-connector)。
