# QQ机器人接入

ChatDACS 推荐使用 [NapCatQQ](https://github.com/NapNeko/NapCatQQ) 作为普通 QQ 群的 OneBot 11 协议端。NapCatQQ 独立安装和运行，ChatDACS 不捆绑、不自动修改 NTQQ，也不接管 QQ 登录数据。

> QQ 频道官方机器人使用另一套接口，请查看 [QQ频道机器人接入](/qqGuild/)。

## 1. 安装 NapCatQQ

按 [NapCatQQ 官方文档](https://napneko.github.io/) 安装适合当前系统的版本，并在 NapCat WebUI 中完成机器人 QQ 登录。建议先在专用测试群验收，避免直接影响现有运营群。

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

## 3. 生成 NapCat 网络配置

源码部署可在 ChatDACS 根目录运行：

```bash
npm run qq:napcat:config -- --output integrations/napcat/onebot11.json
```

一键运行包用户也可以直接参考 `integrations/napcat/onebot11.json.example`，在 NapCat WebUI 中建立等价配置：

- HTTP Server：`127.0.0.1:5700`
- HTTP Client：`http://127.0.0.1/bot`
- 消息格式：`string`
- 上报自身消息：关闭
- WebSocket：关闭

如果 ChatDACS 不在本机，将回调主机改为 NapCat 能访问的私有地址。容器部署可使用 `--event-host host.docker.internal` 生成配置，但实际名称应以容器网络为准。

## 4. 启动与验收

1. 启动并登录 NapCatQQ。
2. 启动 ChatDACS，确认日志显示 `NapCat OneBot 11 已连接`。
3. 在测试群发送 `/ping`，确认回复 `Pong!`。
4. 发送普通聊天消息，确认小夜返回非空回复。
5. 验证需要管理员权限的群玩法和图片消息。
6. 停止 NapCat，确认 ChatDACS Web 页面仍正常；恢复 NapCat 并重启 ChatDACS 后重新测试群消息。

NapCat 启动探测失败不会让 ChatDACS 退出，这是为了保证 Web 与其他平台可独立运行。由于 QQ Adapter 需要在启动时读取群列表，NapCat 恢复后仍需重启 ChatDACS。

## 安全说明

当前 ChatDACS 的旧 QQ API 调用尚未全部支持 OneBot token。默认生成配置因此只绑定回环地址且不设置 token。不要将 `5700` 端口暴露到公网；跨主机部署应使用防火墙、私有网络或受控反向代理。

## 旧 go-cqhttp 回退

go-cqhttp 已停止维护，但 ChatDACS 暂时保留兼容模式。需要回退时停止 NapCat，将 `GO_CQHTTP_SWITCH` 设为 `true`，并使用原有 go-cqhttp 登录目录。不要删除迁移前的旧目录，直到 NapCat 在测试群和运营群均验收通过。

相关资料：

- [NapCat 网络配置](https://github.com/NapNeko/NapCatDocs/blob/main/src/onebot/network.md)
- [NapCat 基础配置](https://github.com/NapNeko/NapCatDocs/blob/main/src/config/basic.md)
- [go-cqhttp 停止维护说明](https://github.com/Mrs4s/go-cqhttp)
