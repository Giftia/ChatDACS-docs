# 部署说明

## ⚡️ 快速部署 Quick Start

来试试小夜的一键运行包吧，无需任何配置，一键运行，一分钟运行一个属于自己的小夜，好耶！

1. 首先点击进入 [小夜的最新发行包页面](https://github.com/Giftia/ChatDACS/releases/latest)

2. 在页面下方的资产 `Assets` 里点击下载适合您系统的压缩包 `ChatDACS-vX.X.X_系统.zip`

<img :src="$withBase('/static/run-step1.jpg')" alt="步骤1">

3. 解压 `ChatDACS-vX.X.X_系统.zip` 压缩包，注意文件路径不得存在非 ASCII 字符

<img :src="$withBase('/static/run-step2.jpg')" alt="步骤2">

4. Windows 运行文件夹里的 `ChatDACS.cmd`；Linux 和 macOS 运行 `./chatdacs`。运行包已经包含对应平台的 Node.js，不需要另外安装 Node。启用内置 go-cqhttp 时，Windows 和 Linux 会再打开 QQ 登录流程，请按提示扫码或完成验证。

<img :src="$withBase('/static/run-step3.jpg')" alt="步骤3">

部署完成后请依个人喜好，酌量修改小夜配置文件 `/config/config.yml`。如果在部署过程中有任何问题的话，请进 QQ 群 `157311946` 来提问吧，有问必答噢。

### 宿主机配置

由于使用了 `Node.js` 编写，小夜可以运行在大部分常见平台上。

小夜的食量很小，资源占用量很省，各种云服务商提供的低配学生服务器便足矣，如果想用树莓派的话也很极客不是吗！

在 Windows 系统下，装载了完整插件的小夜在启动瞬间会占用 `~350MB` 内存，随后内存数据逐渐会进入硬盘交换区，最终会占用 `~30MB` 的物理内存。

在 Linux 系统下，装载了完整插件的小夜在启动瞬间会占用 `~300MB` 内存，随后内存数据逐渐会进入硬盘交换区，最终会占用 `~10MB` 的物理内存。Docker 环境同理。

如果你不想让小夜占用太多服务器资源，你可以通过删减插件来调整内存资源的使用量。

可以在右下角托盘栏双击小夜头像查看小夜当前的资源占用情况。

```yaml
- 最低的宿主机配置如下： # 大概是树莓派的配置
  - 1核 CPU # 启动时会有点卡
  - 512MB 内存 # 消息处理时会有点卡
  - 10G 硬盘 # 本地缓存会有点挤
  - 1Mbps 带宽 # 发送图片和音频会有点慢
```

```yaml
- 推荐的宿主机配置如下：  # 大概是比较良心的学生服务器的配置，一年 ~100元
  - 2核 CPU
  - 2G 内存
  - 50G 硬盘
  - 4Mbps 上下行均衡带宽
```

```yaml
- 小夜的宿主机配置如下：  # 大概是比较贵的服务器的配置（其实是我的工位电脑
  - 12核 CPU
  - 16G 内存
  - 500G 硬盘
  - 10Mbps 上下行均衡带宽
```

### 一些有用的帮助：

::: tip 可选项
小夜是无需手动配置，开箱即用的，但是由于使用了一些第三方收费接口， `随机昵称、赛博百科问答、随机买家秀、微信息知频道消息推送` 功能是默认不启用的。若想使用小夜更完整的功能，请自行访问以下申请地址，申请自己的接口密钥后，修改 `config` 文件夹内的 `config.yml` 文件中的对应配置项：
  - 天行接口，用于 [随机昵称](https://www.tianapi.com/apiview/36)、[赛博百科问答](https://www.tianapi.com/apiview/31) 功能 → [申请地址](https://www.tianapi.com/)
  - 卡特实验室接口，用于 [随机买家秀](https://api.sumt.cn/docs-rand.tbimg.html) 功能 → [申请地址](https://api.sumt.cn/)
  - 息知频道 key，用于 微信息知频道消息推送 功能 → [申请地址](https://xz.qqoq.net/)
:::

::: tip 提示
1. 自动构建目前覆盖 `linux-x64`、`linux-arm64`、`win-x64`、`win-arm64`、`macos-x64` 和 `macos-arm64`。必须下载与操作系统和 CPU 架构一致的运行包。

2. 本项目使用了 `ffmpeg` 依赖，用于 `go-cqhttp` 的语音格式转码，为了减小发行包体积，发行包内并没有内置 `ffmpeg`。故请自行下载 `ffmpeg.exe` 并放置于 `/plugins/go-cqhttp/` 文件夹下。下载地址：[https://giftia.lanzouf.com/ir05s05q67bg](https://giftia.lanzouf.com/ir05s05q67bg)，若链接失效，请移步QQ群 `157311946` 群共享自取。如果您不需要 QQ 端发送语音，可以无视本步骤。

3. 建议使用注册时间久一些的 QQ 号作为小夜号登陆使用，不容易被封号。因为新号很容易因为疼讯检测到的突然频繁发言而被风控。

4. 如果想要切换小夜使用的 QQ 账号，请先停止 ChatDACS 和 go-cqhttp，进入 `plugins/go-cqhttp/`，删除 `device.json` 和 `session.token`，随后重新启动 ChatDACS 即可扫码登录。

5. 若想跳过 QQ 扫码登陆，保持 QQ 持久化登录，请先关闭两个程序窗口，请进入 `plugins` 文件夹里的 `go-cqhttp` 文件夹，修改第 4、5 行的 uin 和 password 为 QQ 账号和密码，以后的启动都会保持 QQ 登陆。

6. 若不想使用某些插件功能，如色图功能，请直接删除 `plugins` 文件夹里的对应插件，并重启小夜。也可以把插件的文件后缀名 `.js` 改为别的。

7. 如果在启动过程中无限检查更新报错 `Error: unable to verify the first certificate` ，请检查是否开启了代理软件，如 `steam++` ，由于证书校验的原因，需要关闭代理软件，小夜才可以检查更新。

8. 请避免在程序界面的窗口中点击或者拖动，否则会由于触发Windows命令行窗口的快速编辑选择文字操作，导致程序时停。小夜会在首次启动时关闭系统的快速编辑，但首次启动的本体由于启动时还未关闭快速编辑，所以此时时停还是会触发。后续小夜的启动不再会触发快速编辑。

9. 如果观察到程序左上角出现了 `选择` 字样，说明已经进入了不可避免的 ~~`The World!`~~ 时停，在时停期间的所有请求都会阻塞，请在窗口内 `黑色背景区域` 右键一下以退出时停，才可以继续运行。如果程序时停过长，解除时停后会将所有时停期间的消息进行瞬间处理，有可能会导致处理量过大导致小夜猛烈响应输出。这种时候建议别解除时停了，直接重开，右上角 X 掉，重新启动。
:::

## 🐱‍💻 从 v3.7 升级 Upgrade From v3.7

不要把新版运行包直接覆盖到正在使用的旧目录，这可能覆盖配置或数据库。建议并行解压和验证：

1. 停止 ChatDACS 和 go-cqhttp，把旧版 `config/config.yml` 与 `config/db.db` 备份到安装目录之外。
2. 将新版运行包解压到新目录，再把备份的两个文件复制到新版 `config/`。
3. 启动新版。程序会先建立 v3.7 数据库迁移基线，再应用后续迁移；迁移完成后才开放 Web 和平台服务。
4. 打开 Web 控制台，依次验证 `/ping` 和普通聊天；启用 OneBot 时再验证群消息收发。
5. 验收通过前保留旧版目录。需要回滚时，停止新版并恢复升级前的 `config.yml` 与 `db.db` 原始备份，不要让 v3.7 打开已迁移的数据库。

新版会自动映射 v3.7 的 `CONNECT_GO_CQHTTP_SWITCH`、`GO_CQHTTP_SERVICE_ANTI_POST_API` 和 `GO_CQHTTP_SERVICE_API_URL`。新旧键同时存在时，以新键为准。

## 🐋 使用 Docker 部署 Deploy With Docker

对于一键运行包不适配的系统，小夜也可以使用 Docker 部署！~~群晖用户大喜~~

小夜的 Docker 镜像地址是：[https://hub.docker.com/repository/docker/giftina/chatdacs](https://hub.docker.com/repository/docker/giftina/chatdacs)

对于没有自带 Docker 的平台，请参考网上教程安装合适的 [Docker](https://docs.docker.com/get-docker/)。

## 🆕 尝试最新测试版 Try Latest Beta Version

最新测试版一般都会 `修复上个版本的问题`、`增加一些新功能` ，会在完善稳定之后发布为下个版本。如果你对小夜最新的一键运行包不满意的话，那就请试试看最新测试版吧：

1. 首先点击进入小夜的自动构建 → <a href="https://github.com/Giftia/ChatDACS/actions/workflows/build.yml" target="_blank"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/Giftia/ChatDACS/Build%20ChatDACS%20One-Click-To-Deploy%20Package%20(ChatDACS%E4%B8%80%E9%94%AE%E8%BF%90%E8%A1%8C%E5%8C%85%E6%9E%84%E5%BB%BA)?label=%E8%87%AA%E5%8A%A8%E6%9E%84%E5%BB%BA&logo=node.js&style=for-the-badge" alt="Workflow" /></a>

2. 点击最新成功构建的一键运行包工作流 `Build ChatDACS One-Click-To-Deploy Package`

3. 在页面下方的制品 `Artifacts` 里点击下载自动构建好的 `ChatDACS` 压缩包

4. 解压 `ChatDACS` 压缩包，Windows 运行 `ChatDACS.cmd`，Linux 和 macOS 运行 `./chatdacs`

## 🛠 手动编译 Manual Compile

### 手动编译流程需要一定的编码和 debug 基础，不建议新手操作

如果小夜的一键运行包已经失效，维护者已经失踪，

如果小夜的自动构建 <a href="https://github.com/Giftia/ChatDACS/actions/workflows/build.yml" target="_blank"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/Giftia/ChatDACS/Build%20ChatDACS%20One-Click-To-Deploy%20Package%20(ChatDACS%E4%B8%80%E9%94%AE%E8%BF%90%E8%A1%8C%E5%8C%85%E6%9E%84%E5%BB%BA)?label=%E8%87%AA%E5%8A%A8%E6%9E%84%E5%BB%BA&logo=node.js&style=for-the-badge" alt="Workflow" /></a> 年久失修，一直失败，没有更新，

或是您的操作系统或 CPU 架构并不是常见的 `Windows 64位` 、 `Ubuntu 64位` 等等，

或者是在快速启动、部署过程出现了无法解决的错误，

亦或者您是想要了解小夜背后的 `Node.js` 与 `一系列构建流程` 是如何构建出小夜的，

没有问题，请按如下操作进行手动编译操作：

1. 首先去 [https://nodejs.org/zh-cn/about/releases/](https://nodejs.org/zh-cn/about/releases/) 下载对应你系统的 Node.js `v18.20.8`，这是当前主仓验证和 GitHub Actions 使用的基准版本。在安装过程中请注意勾选 `Automatically install the necessary tools. Note that this will also install Chocolatey.` 以便自动安装一些必要的工具和编译链。具体安装方法请参考网上教程

2. 然后下载小夜最新代码的压缩包 [https://github.com/Giftia/ChatDACS/archive/refs/heads/master.zip](https://github.com/Giftia/ChatDACS/archive/refs/heads/master.zip) ，解压之

3. 打开系统的 `shell`，如 `CMD`、`PowerShell`、`Bash` 或 `iTerm2`，用 `cd` 命令**进入小夜代码根目录**后运行：

```bash
npm ci
```

::: tip 提示
`npm ci` 会严格按照 `package-lock.json` 安装依赖。遇到 `canvas` 等原生模块错误时，先确认当前 Node.js 为 `18.20.8`，再重新安装依赖。
:::

4. 提交或打包前执行完整发布验证：

```bash
npm run verify:release
```

该命令会执行运行文件语法检查、全部 Jest 测试，以及真实插件加载、HTTP 首页、Web Session、`/ping` 和普通聊天链路烟测。

5. 运行小夜：

```bash
node index.js
```

6. 确认运行无误后，可以生成当前系统和 CPU 架构的一键运行包：

```bash
npm run pkg
```

产物位于 `.release/ChatDACS-v版本_平台.zip`。构建脚本只允许在目标平台和架构的原生环境打包，并把当前 Node.js `18.20.8` 运行时、生产依赖和应用源码作为一个完整部署单元。不要只复制启动器或 `runtime/`。

## 🧐 一问一答 Q&A

::: tips
Q: 在拉取代码后如何运行？

A: 在控制台输入 node . 并回车运行
:::
