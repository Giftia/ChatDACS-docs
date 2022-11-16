# 如何接入 Telegram 机器人 <Badge text="注意" type="error"/>

::: danger 注意
需要良好的网络环境。
:::

## 第一步 创建机器人账号

在 Telegram 上向 @BotFather 发送消息以注册您的机器人并接收其身份验证令牌。[点击开始和 @BotFather 聊天](https://t.me/BotFather)

如有困惑，请按这个文档进行操作：[如何创建机器人](https://github.com/hosein2398/node-telegram-bot-api-tutorial#Creating+new+bot+with+BotFather)

配置完成后获取机器人的 `token` 供下一步使用。

## 第二步 配置机器人服务

打开 `config` 文件夹内的 `config.yml` 配置文件，打开 **接入Telegram开关** `CONNECT_TELEGRAM_SWITCH`，将从 @BotFather 获取的 `token` 填入配置文件中的对应配置项 `TELEGRAM_BOT_TOKEN` ，然后保存文件。

## 第三步 测试功能

启动 `chatdacs`，应该会显示 `小夜Telegram接入开启`，以及成功连接 Telegram 接口的响应。你的机器人已经自由了。
