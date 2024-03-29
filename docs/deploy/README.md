# 部署说明

## ⚡️ 快速部署 Quick Start

来试试小夜的一键运行包吧，无需任何配置，一键运行，一分钟运行一个属于自己的小夜，好耶！

1. 首先点击进入 [小夜的最新发行包页面](https://github.com/Giftia/ChatDACS/releases/latest)

2. 在页面下方的资产 `Assets` 里点击下载适合您系统的压缩包 `ChatDACS-vX.X.X_系统.zip`

<img :src="$withBase('/static/run-step1.jpg')" alt="步骤1">

3. 解压 `ChatDACS-vX.X.X_系统.zip` 压缩包，注意文件路径不得存在非 ASCII 字符

<img :src="$withBase('/static/run-step2.jpg')" alt="步骤2">

4. 直接运行文件夹里的 `chatdacs.exe` 就可以辣。运行后将会弹出两个窗口，一个是小夜后台窗口，一个是 QQ 登陆窗口，两个都不可关闭，关闭会导致小夜失联。按 qq 登陆窗口提示用 QQ 扫描二维码即可登陆 QQ。若提示需要滑条验证码，请按提示操作进行验证操作。

<img :src="$withBase('/static/run-step3.jpg')" alt="步骤3">

部署完成后请依个人喜好，酌量修改小夜配置文件 `/config/config.yaml` 。如果在部署过程中有任何问题的话，请进 QQ 群 `157311946` 来提问吧，有问必答噢。

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
1. 小夜一键运行包目前支持 `Windows 64位` 、 `Linux 64位` 系统，如果您的系统不支持一键运行包，请呼叫开发组申请增加对应系统平台的一键运行包，或移步下方 手动编译 章节查看如何进行自行编译。

2. 本项目使用了 `ffmpeg` 依赖，用于 `go-cqhttp` 的语音格式转码，为了减小发行包体积，发行包内并没有内置 `ffmpeg`。故请自行下载 `ffmpeg.exe` 并放置于 `/plugins/go-cqhttp/` 文件夹下。下载地址：[https://giftia.lanzouf.com/ir05s05q67bg](https://giftia.lanzouf.com/ir05s05q67bg)，若链接失效，请移步QQ群 `157311946` 群共享自取。如果您不需要 QQ 端发送语音，可以无视本步骤。

3. 建议使用注册时间久一些的 QQ 号作为小夜号登陆使用，不容易被封号。因为新号很容易因为疼讯检测到的突然频繁发言而被风控。

4. 如果想要切换小夜使用的 QQ 账号，请先关闭两个程序窗口，进入 `plugins` 文件夹里的 `go-cqhttp` 文件夹，删除 `device.json` 和 `session.token` 这两个文件，随后启动 `chatdacs.exe` 即可重新扫码登陆。

5. 若想跳过 QQ 扫码登陆，保持 QQ 持久化登录，请先关闭两个程序窗口，请进入 `plugins` 文件夹里的 `go-cqhttp` 文件夹，修改第 4、5 行的 uin 和 password 为 QQ 账号和密码，以后的启动都会保持 QQ 登陆。

6. 若不想使用某些插件功能，如色图功能，请直接删除 `plugins` 文件夹里的对应插件，并重启小夜。也可以把插件的文件后缀名 `.js` 改为别的。

7. 如果在启动过程中无限检查更新报错 `Error: unable to verify the first certificate` ，请检查是否开启了代理软件，如 `steam++` ，由于证书校验的原因，需要关闭代理软件，小夜才可以检查更新。

8. 请避免在程序界面的窗口中点击或者拖动，否则会由于触发Windows命令行窗口的快速编辑选择文字操作，导致程序时停。小夜会在首次启动时关闭系统的快速编辑，但首次启动的本体由于启动时还未关闭快速编辑，所以此时时停还是会触发。后续小夜的启动不再会触发快速编辑。

9. 如果观察到程序左上角出现了 `选择` 字样，说明已经进入了不可避免的 ~~`The World!`~~ 时停，在时停期间的所有请求都会阻塞，请在窗口内 `黑色背景区域` 右键一下以退出时停，才可以继续运行。如果程序时停过长，解除时停后会将所有时停期间的消息进行瞬间处理，有可能会导致处理量过大导致小夜猛烈响应输出。这种时候建议别解除时停了，直接重开，右上角 X 掉，重新启动。
:::

## 🐱‍💻 增量更新 Incremental Update

`Update-Package` 是适用于前一版本的增量更新包，解压后将内容物直接放入前一版本的文件夹，全部替换即可完成增量更新。

1. 首先点击进入 [小夜的最新发行包页面](https://github.com/Giftia/ChatDACS/releases/latest)

2. 在页面下方的资产 `Assets` 里点击下载增量更新包 `ChatDACS-vX.X.X_Update-Package.zip`

3. 解压增量更新包，将内容物全部放入前一版本的文件夹，全部替换即可。

4. 启动 `chatdacs.exe` ，即可完成增量更新。数据库更新会在程序启动时自动应用。

## 🐋 使用 Docker 部署 Deploy With Docker

对于一键运行包不适配的系统，小夜也可以使用 Docker 部署！~~群晖用户大喜~~

小夜的 Docker 镜像地址是：[https://hub.docker.com/repository/docker/giftina/chatdacs](https://hub.docker.com/repository/docker/giftina/chatdacs)

对于没有自带 Docker 的平台，请参考网上教程安装合适的 [Docker](https://docs.docker.com/get-docker/)。

## 🆕 尝试最新测试版 Try Latest Beta Version

最新测试版一般都会 `修复上个版本的问题`、`增加一些新功能` ，会在完善稳定之后发布为下个版本。如果你对小夜最新的一键运行包不满意的话，那就请试试看最新测试版吧：

1. 首先点击进入小夜的自动构建 → <a href="https://github.com/Giftia/ChatDACS/actions/workflows/build.yml" target="_blank"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/Giftia/ChatDACS/Build%20ChatDACS%20One-Click-To-Deploy%20Package%20(ChatDACS%E4%B8%80%E9%94%AE%E8%BF%90%E8%A1%8C%E5%8C%85%E6%9E%84%E5%BB%BA)?label=%E8%87%AA%E5%8A%A8%E6%9E%84%E5%BB%BA&logo=node.js&style=for-the-badge" alt="Workflow" /></a>

2. 点击最新成功构建的一键运行包工作流 `Build ChatDACS One-Click-To-Deploy Package`

3. 在页面下方的制品 `Artifacts` 里点击下载自动构建好的 `ChatDACS` 压缩包

4. 解压 `ChatDACS` 压缩包，直接运行 `chatdacs.exe` 就可以启动测试版小夜辣

## 🛠 手动编译 Manual Compile

### 手动编译流程需要一定的编码和 debug 基础，不建议新手操作

如果小夜的一键运行包已经失效，维护者已经失踪，

如果小夜的自动构建 <a href="https://github.com/Giftia/ChatDACS/actions/workflows/build.yml" target="_blank"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/Giftia/ChatDACS/Build%20ChatDACS%20One-Click-To-Deploy%20Package%20(ChatDACS%E4%B8%80%E9%94%AE%E8%BF%90%E8%A1%8C%E5%8C%85%E6%9E%84%E5%BB%BA)?label=%E8%87%AA%E5%8A%A8%E6%9E%84%E5%BB%BA&logo=node.js&style=for-the-badge" alt="Workflow" /></a> 年久失修，一直失败，没有更新，

或是您的操作系统或 CPU 架构并不是常见的 `Windows 64位` 、 `Ubuntu 64位` 等等，

或者是在快速启动、部署过程出现了无法解决的错误，

亦或者您是想要了解小夜背后的 `Node.js` 与 `一系列构建流程` 是如何构建出小夜的，

没有问题，请按如下操作进行手动编译操作：

1. 首先去 [https://nodejs.org/zh-cn/about/releases/](https://nodejs.org/zh-cn/about/releases/) 下载对应你系统的 Node.js `v14 长期维护版` ，在安装过程中请注意勾选 `Automatically install the necessary tools. Note that this will also install Chocolatey.` 以便自动安装一些必要的工具和编译链。具体安装方法请参考网上教程

2. 然后下载小夜最新代码的压缩包 [https://github.com/Giftia/ChatDACS/archive/refs/heads/master.zip](https://github.com/Giftia/ChatDACS/archive/refs/heads/master.zip) ，解压之

3. 打开系统的 `shell` ，也就是泛指的 `命令行` ，如 `CMD(dos)`、`PowerShell(win)`、`Bash(linux)`、`iTerm2(mac)` 等，用 `cd` 命令**进入小夜代码根目录**后，运行：

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

::: tip 提示
该步骤目的是安装 `cnpm` ，用于安装依赖组件。`cnpm` 是淘宝的 `npm` 镜像源，用于在中国大陆加速安装依赖的速度和成功率。
:::

4. 等待进度完成后运行：

```bash
cnpm ci
```

::: tip 提示
该步骤会安装小夜的依赖组件。对比网上教程常用的 `npm i` ，`cnpm ci` 的效率和安装成功率更高。
:::

5. 等待进度完成后运行小夜：

```bash
node index.js
```

好了，小夜应该已经启动了 🎉。确认小夜运行无误后，是时候该生成适合您的系统的可执行文件了，**进入小夜代码根目录**后使用手动打包指令：

```bash
cnpm install pkg -g
cnpm run pkg
```

## 🧐 一问一答 Q&A

::: tips
Q: 在拉取代码后如何运行？

A: 在控制台输入 node . 并回车运行
:::
