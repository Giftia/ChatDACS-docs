# 部署说明

## ⚡️ 快速启动 Quick Start

来试试快速启动吧，`1`键运行，`1`分钟运行`1`个属于自己的小夜：

1. 首先点击进入 [最新发行包页面](https://github.com/Giftia/ChatDACS/releases/latest) ，

2. 在页面下方的产品 `Assets` 里点击下载 `ChatDACS-vX.X.X.zip` 压缩包，

3. 解压 `ChatDACS-vX.X.X.zip` 压缩包，直接运行 `chatdacs.exe` 就可以辣。

4. 按提示用 qq 扫描二维码即可登陆。

如果在操作过程中有任何问题的话，请进 QQ 群 `120243247` 来问问题吧，有问必答噢。

::: warning
**注意**

- 若想使用更完善的功能，请访问以下申请地址，申请自己的接口密钥后，修改 `config` 文件夹内的 `config.yml` 文件:

  - 天行接口，用于 随机昵称、赛博百科问答 功能，申请地址 https://www.tianapi.com/
  - 卡特实验室接口，用于 随机买家秀 功能，申请地址 https://api.sumt.cn/
  - 息知频道 key，用于 微信息知频道消息推送 功能，申请地址 https://xz.qqoq.net/

- 建议使用注册久点的 QQ 号作为机器人登陆使用，不容易被封号，新号很容易因为疼讯检测到突然频繁发言而被风控。

- 请避免在程序窗口中点击或者拖动，否则会由于触发窗口的文字选择，导致程序时停。如果观察到程序左上角出现了 `选择` 字样，说明已经进入了时停，请在窗口内 `黑色背景区域` 右键一下以退出时停，才可以继续运行。

- 如果程序时停过长，解除时停后会将所有时停期间的消息进行瞬间处理，有可能会导致伤害过大导致小夜猛烈输出。这种时候建议选择右上角 X 掉，重新启动。

- 如果想要切换机器人使用的 QQ 账号，请先关闭两个程序窗口，进入 `plugins` 文件夹里的 `go-cqhttp` 文件夹，删除 `device.json` 和 `session.token` 这两个文件，随后重新启动 `chatdacs.exe` 即可重新扫码登陆。

- 若想跳过 qq 扫码登陆，保持 qq 持久化登录，请先关闭两个程序窗口，请进入 `plugins` 文件夹里的 `go-cqhttp` 文件夹，修改第 4、5 行的 uin 和 password 为 qq 账号和密码，以后的启动都会保持登陆。

:::

## 🆕 最新测试版 Latest Test Version

想要试试最新的功能吗，请试试看最新测试版吧：

首先点击进入自动化部署工作流 `Actions` https://github.com/Giftia/ChatDACS/actions ，

点击最新成功构建的工作流 `Compile ChatDACS for Windows` ，

在页面下方的产品 `Artifacts` 里点击下载自动构建好的 `ChatDACS` 压缩包，

解压 `ChatDACS` 压缩包，直接运行 `chatdacs.exe` 就可以辣。

如果在操作过程中有任何问题的话，请进 QQ 群 `120243247` 来问问题吧，有问必答噢。

## 🛠 手动编译 Manual Compile

**该流程需要一定的编码和 debug 基础，不建议新手操作**

如果自动化部署工作流 `Actions` 年久失修，没有更新，

若您的操作系统和架构并不是常见的 Windows OS x64，

或者是在快速启动、部署过程出现了错误，

亦或者是想要了解小夜背后的 nodejs 是如何构建出小夜的，

请按如下操作进行手动编译：

1. 首先去 https://nodejs.org/zh-cn/ 下载安装 LTS(长期支持版) Node.js，

2. 然后下载最新代码压缩包 https://github.com/Giftia/ChatDACS/archive/refs/heads/master.zip ，解压之，

3. 打开系统的 `shell` ，如 `Bash`、`CMD`、`PowerShell` 等，用 `cd` 命令进入代码根目录运行：

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

4. 等待进度完成后运行：

```bash
cnpm ci
```

5. 等待进度完成后运行：

```bash
node index.js
```

好了，它应该已经启动了 🎉。更详细的部署和配置说明请查看 `index.js` 文件。插件位于 `plugins` 文件夹。

如果想要手动生成适合您的系统的可执行文件，可以使用手动打包指令：

```bash
npm install pkg -g
npm pkg
```