# QQ机器人接入

需要腾讯官方机器人应用接入时，请查看 [官方 QQ 机器人接入](./official.md)。
官方通道使用单进程官方 SDK，继续由小夜和兼容插件应答；与下方个人 QQ / OneBot 接入相互独立。

ChatDACS 推荐使用 [NapCatQQ](https://github.com/NapNeko/NapCatQQ) 作为普通 QQ 群的 OneBot 11 协议端。NapCatQQ 独立安装和运行，ChatDACS 不捆绑、不自动修改 NTQQ，也不接管 QQ 登录数据。

SnowLuma 已增加独立 provider 的代码接入路径，本轮暂不启动，也没有真实 QQ 登录或消息送达验收。它与 NapCat 分开配置，不自动切换、启动或覆盖对方登录数据。下面仍是 NapCat 的安装与验收流程，不应把 `ONE_BOT_PROVIDER` 改成 `snowluma` 后照搬 NapCat 的 schema。SnowLuma 源码 v2.4.0 的 schema 与 raw HMAC 契约见 [开发者指南](/development/#onebot-适配边界)；具体工具与独立部署边界见主仓 `integrations/snowluma/README.md`。只读就绪检查会请求实际服务，需另行授权。

本项目通过 HTTP 对接独立部署的 SnowLuma，不捆绑其源码、程序或原生组件。上游 [v2.4.0 许可](https://github.com/SnowLuma/SnowLuma/blob/v2.4.0/LICENSE) 为源码可见非商业许可，不是 OSI 开源许可；商业使用和再分发请先核对上游条款。CLI 的凭据相对路径以进程 cwd 为准，不随 YAML 文件位置变化。

> QQ 频道官方机器人使用另一套接口，请查看 [QQ频道机器人接入](/qqGuild/)。

## 1. 安装 NapCatQQ

按 [NapCatQQ 官方文档](https://napneko.github.io/) 安装适合当前系统的版本，并在 NapCat WebUI 中完成机器人 QQ 登录。建议先在专用测试群验收，避免直接影响现有运营群。

NapCat 登录普通 QQ 账号，不使用官方机器人 AppID / AppSecret。建议使用独立账号，
并注意非官方接入的账号风控风险。Windows 可选官方发布的 `NapCat.Shell.Windows.Node.zip`；
本机验证版本 v4.18.42 包含独立 Node 和 QQ 内核，不必修补或升级日常桌面 QQ。
核对发布包 SHA-256 后，为该进程单独设置 `NAPCAT_QQ_DATA_DIR` 和 `NAPCAT_WORKDIR`，
将 WebUI 绑定到 `127.0.0.1` 并设置非默认密码。不要运行终止所有 QQ 进程的脚本。

## 2. 配置 ChatDACS

编辑 `config/config.yml`：

```yaml
System:
  CONNECT_ONE_BOT_SWITCH: true
  ONE_BOT_PROVIDER: 'napcat'
  GO_CQHTTP_SWITCH: false
  ONE_BOT_ANTI_POST_API: '/bot'
  ONE_BOT_API_URL: '127.0.0.1:5700'
  ONE_BOT_CONNECT_TIMEOUT_MS: 3000
  WEB_PORT: 80
```

`GO_CQHTTP_SWITCH` 为 `true` 时会覆盖 provider 并启动旧 go-cqhttp，因此迁移 NapCat 时必须关闭。

NapCat 与 SnowLuma 默认必须使用真实有效的 access token，包括回环部署。通过 `CHATDACS_ONEBOT_ACCESS_TOKEN` 或 `System.ONE_BOT_CREDENTIALS_FILE` 指定的私密 JSON 文件提供，文件字段为 `accessToken`，默认路径为 `config/onebot.credentials.json`；协议端配置同一 token。环境变量优先，不要使用空值或示例占位值。

## 3. 生成 NapCat 网络配置

源码部署可在 ChatDACS 根目录使用单独准备的 YAML 导出私密配置。下面的路径仅为示例，输出目录需预先存在且由本人控制：

```powershell
npm run qq:onebot:config -- --config C:/private/chatdacs.yml --provider napcat --output C:/private/napcat.credentials.json
```

生成文件可能含 access token，必须使用 `.credentials.json` 后缀，独占创建、不覆盖已有文件；不要写入仓库普通 JSON、提交 Git、放进静态目录或运行包。`ONE_BOT_CREDENTIALS_FILE` 的相对路径仍从进程 cwd 解析，不随 `--config` 的 YAML 位置改变。该命令只生成配置，不启动协议端。

一键运行包用户也可以直接参考 `integrations/napcat/onebot11.json.example`，在 NapCat WebUI 中建立等价配置：

- HTTP Server：`127.0.0.1:5700`
- HTTP Client：`http://127.0.0.1/bot`
- 消息格式：`string`
- 上报自身消息：关闭
- WebSocket：关闭

如果 ChatDACS 不在本机，将回调主机改为 NapCat 能访问的私有地址。容器部署可使用 `--event-host host.docker.internal` 生成配置，但实际名称应以容器网络为准。

## 4. 启动与验收

源码完整入口在 ChatDACS 根目录运行：

```bash
node index.js --config /private/local.yml
```

Windows 可使用 `C:/private/local.yml`。`--config` 不改变 cwd，相对凭据路径仍从 cwd 解析，不从 YAML 目录解析；不要覆盖原有配置、数据库或个人人设，选择独立 YAML 也不等于数据库自动隔离。

完整 index 源码/云端验证与真实 QQ 私聊群聊送达分别验收，本轮真实收发待手机确认，历史受限入口不能替代。

先验收基础文本，再逐项开放媒体、管理插件和群玩法。私聊与测试群分别验证 `/ping` 和普通聊天，
同时核对程序入站、插件或聊天处理、OneBot `status=ok / retcode=0` 及手机实际收到。
单靠接口成功不能证明送达，临时基础验收入口通过也不等于全部旧 QQ 功能通过。

1. 启动并登录 NapCatQQ。
2. 源码部署运行 `npm run qq:napcat:check`，确认兼容性、登录态和可见群数量正常；该命令不会输出 QQ 号或昵称。
3. 启动 ChatDACS，确认日志显示 `NapCat OneBot 11 已连接`。
4. 在测试群发送 `/ping`，确认回复 `Pong!`。
5. 发送普通聊天消息，确认小夜返回非空回复。
6. 验证需要管理员权限的群玩法和图片消息。
7. 停止 NapCat，确认 ChatDACS Web 页面仍正常；恢复 NapCat 并重启 ChatDACS 后重新测试群消息。

NapCat 启动探测失败不会让 ChatDACS 退出，这是为了保证 Web 与其他平台可独立运行。由于 QQ Adapter 需要在启动时读取群列表，NapCat 恢复后仍需重启 ChatDACS。

可配置 `System.ONE_BOT_SELF_ID`，同时校验 OneBot API 登录账号与入站回调的 `self_id`，避免接错账号。SnowLuma 还会检查 `get_status` 的在线及链路健康状态，因为登录信息本身不代表在线。检查失败时不初始化 QQ 群服务或主动聊天，Web 与其他平台仍可使用；先恢复 OneBot 服务，再重启 ChatDACS。就绪检查成功不等于消息送达。

自身 `message_sent` 和自身消息在入口丢弃，避免回复回流。普通 `message` 按 self / scope / peer / sender / message ID 隔离去重，窗口 5 分钟、最多 4096 项；缺失或无效 ID 不去重，失败不自动重试。`notice` / `poke` 保留原处理路径，不参与消息去重。主动发送的 `canSend` 包含群服务开关，执行“闭菊”后不再主动发送。

原插件状态 `findOrCreate` 的读事务会与消息写入竞争并触发 `SQLITE_BUSY`；已改为 `findCreateFind`，同群插件状态操作进行 per-group 序列化。该修复的隔离验证与真实账号验收须分开判断。

## 安全说明

公共 OneBot sender 已使用独立查询参数编码，避免回复中的 `&`、`#`、`+` 或 CQ 码改变收件人、截断文本。

OneBot HTTP 客户端保留 scoped Bearer，仅向配置的 API origin 与基路径注入 token，并禁止跟随重定向。回调保留原始请求体 HMAC-SHA1 的 `X-Signature: sha1=...`，兼容仅 Bearer 回调；提供签名时必须有效，不能用 Bearer 绕过无效签名，也不能用重新序列化的 JSON 代替原始请求体。

只有 provider 未声明、`external` 或旧 go-cqhttp 路径，在未设置 token 环境变量、未显式声明凭据文件且默认文件不存在时，才兼容旧无 token 模式。显式空值、不可读文件、非法 JSON 或无效 token 均不能回退。不要把 token 写入 Git 或日志，不要将 `5700` 端口暴露到公网；跨主机须使用 TLS 或加密隧道及访问控制。配置生成与鉴权代码不等于真实账号已经验收。

宿主 `wallpaper`、`tray`、`chatPush` 的执行与开关仅限可信 QQ/NapCat（OneBot）事件中的 `QQBOT_ADMIN_LIST` 宿主管理员；群管理员不能据此操作宿主。普通群插件切换与群服务启停需群 `admin` / `owner` 或宿主管理员，私聊普通插件开关只影响调用者本人的会话。公开游戏、语料和 LLM 人设查询不因此封禁。

## 旧 go-cqhttp 回退

go-cqhttp 已停止维护，但 ChatDACS 暂时保留兼容模式。需要回退时停止 NapCat，将 `GO_CQHTTP_SWITCH` 设为 `true`，并使用原有 go-cqhttp 登录目录。不要删除迁移前的旧目录，直到 NapCat 在测试群和运营群均验收通过。

相关资料：

- [NapCat 网络配置](https://github.com/NapNeko/NapCatDocs/blob/main/src/onebot/network.md)
- [NapCat 基础配置](https://github.com/NapNeko/NapCatDocs/blob/main/src/config/basic.md)
- [go-cqhttp 停止维护说明](https://github.com/Mrs4s/go-cqhttp)
