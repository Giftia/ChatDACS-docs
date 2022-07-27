# 使用说明 <Badge text="最新公开版本 v3.6.3" type="warning"/>

<table width="100%" border="0">
  <tr>
  <td style="width:80%;vertical-align:top;">
    <h1 align="center">
      <img src="/static/heroImage.jpg" width="200" height="200" alt="ChatDACS"/><br/>
      星野夜蝶<br/>
      Hoshino Yedie<br/>
    </h1>
    <h2 align="center">
      沙雕Ai聊天系统<br/>
      ChatDACS<br/>
      (Chatbot : shaDiao Ai Chat System)
    </h2>
    <p align="center">
      一个简单的聊天机器人框架，支持接入多个平台，具备全功能的网页控制台。<br/>
      技术栈：后端 —— Node.js，前端组件库 —— layui。<br/>
      画师：塘 李<br/>
    </p>
    <hr>
    <p align="center">
      开源地址：<a href="https://github.com/Giftia/ChatDACS">https://github.com/Giftia/ChatDACS</a><br/>
      示例 DEMO：<a href="http://110.42.221.72/" target="_blank">http://110.42.221.72/</a><br/>
      语录来自小夜：<a href="https://github.com/Giftia/Project_Xiaoye" target="_blank">github.com/Giftia/Project_Xiaoye</a><br/>
      <p align="center">
        <a href="https://stats.uptimerobot.com/JYr8kI8jqg" target="_blank"><img src="https://img.shields.io/uptimerobot/ratio/m783632550-7da46d24226cb151b978c810?label=%E8%BF%90%E8%A1%8C%E6%83%85%E5%86%B5&style=for-the-badge" alt="Uptime(30 days)" /></a>
        &nbsp;
        <a href="http://110.42.221.72/" target="_blank"><img src="https://img.shields.io/website?label=demo&style=for-the-badge&up_message=online&url=http://110.42.221.72/" alt="Demo" /></a>
        &nbsp;
        <a href="https://github.com/Giftia/ChatDACS/actions/workflows/build.yml" target="_blank"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/Giftia/ChatDACS/Build%20ChatDACS%20One-Click-To-Deploy%20Package%20(ChatDACS%E4%B8%80%E9%94%AE%E8%BF%90%E8%A1%8C%E5%8C%85%E6%9E%84%E5%BB%BA)?label=%E8%87%AA%E5%8A%A8%E6%9E%84%E5%BB%BA&logo=node.js&style=for-the-badge" alt="Workflow" /></a>
        &nbsp;
        <img src="https://img.shields.io/github/license/Giftia/ChatDACS?label=%E5%BC%80%E6%BA%90%E8%AE%B8%E5%8F%AF&style=for-the-badge" alt="License" />
        &nbsp;
        <img src="https://img.shields.io/github/languages/code-size/Giftia/ChatDACS?label=%E4%BB%A3%E7%A0%81%E5%A4%A7%E5%B0%8F&style=for-the-badge" alt="Code size" />
      </p>
    </p>
  </td>

  <td style="width:20%;vertical-align:middle;">
    <img src="https://i.loli.net/2021/08/25/sILl6XREJMDPAmt.png" width="200" alt="stand" />
    <p align="center">
      星野夜蝶 立绘
    </p>
  </td>
  </tr>
</table>

---

## 😘 你好 Hi

在线体验地址：[沙雕 Ai 聊天系统](http://110.42.221.72/)

如有任何疑问、建议或者需要联系我们，请加群 [【星野夜蝶 粉丝群】 120243247 ](https://jq.qq.com/?_wv=1027&k=ovqyydCe)

如果您想要在自己的群内体验小夜功能，您可以添加官方的免费公共小夜 `1648468212` 为好友，并邀请小夜入群，根据提示添加我为好友并发送群资料截图，我会及时批准您的入群请求。你也可以加入小夜的粉丝群，群里有不少群友自己个人部署的第三方小夜，你可以申请使用群友搭建的小夜。

**不过由于公共小夜服务的群比较多，导致小夜qq号会经常出现封号的状况而离线不可用，所以我们更推荐您自己部署小夜来使用，自行部署小夜的好处都有啥：**

- 保护您的隐私，您的小夜完全属于您，我无法得知您的小夜的任何信息，我甚至无法知道您部署了一个小夜
- 高可用度，稳定的功能，您的小夜的在线与否取决于您，并不会因为公共小夜离线而无法使用
- 属于您自己的独立词库，您的小夜不会出现您不可控的回复
- 可自行定制您的小夜的头像、名字、配置，甚至是自己增减功能
- 减轻我的服务器负担，让公共小夜活得更久，可循环利用理念
- 通过小夜的搭建流程体验，学习一些实用的技术，很 cool ，很极客
- 在部署时有任何问题，我们会在群里为您提供解疑和技术支持
- 共同打造一个小夜多元宇宙！(划掉

**自行部署教程请点击跳转至 [部署说明](/deploy/) 章节。**

---

## 💬 功能指令介绍 Commands

### 在所有平台端都可用的功能：

::: tip 画师算命插件 v2.0
插件文件名：`avgPainter.js`，作者：Giftina

介绍：avg小说模板，由一段段随机语料拼凑成一段完整的小故事，可以参考示例写法自由扩展，写简单的随机小故事。

使用例：`画师算命`

效果示意：


<img :src="$withBase('/static/avgPainter.jpg')" alt="插件效果示意">
:::

---

::: tip 敷衍语料教学插件 v2.2
插件文件名：`perfunctoryTeach.js`，作者：Giftina

介绍：敷衍语料教学，教给小夜一些比较通用的回复。对于一些难以回复的对话，小夜的词库中没有搜索到回复的时候，小夜会随机回复这些回复作为敷衍，回复了，但完全没有回复的意义。

使用例：`说不出话 v我50`

效果示意：

<img :src="$withBase('/static/perfunctoryTeach.jpg')" alt="插件效果示意">
:::

---

::: tip 微信息知频道消息推送插件 v2.3
插件文件名：`chatPush.js`，作者：Giftina

介绍：将指定格式的消息推送至微信息知指定频道，适合传送消息至微信。

使用例：`推送我晚上要手冲`

效果示意：

<img :src="$withBase('/static/chatPush.jpg')" alt="插件效果示意">
:::

---

::: tip 聊天教学插件 v2.2
插件文件名：`chatTeach.js`，作者：Giftina

介绍：添加一组新的聊天回复，抄板于虹原翼版小夜v3教学系统。来调教小夜说话吧！在优秀的聊天算法加成下，帮助养成由数万用户调教练就的嘴臭词库。当小夜收到含有 `关键词` 的语句时便会有几率触发回复。若该关键词有多个回复，将会随机选择一个回复。支持图片问答。注意！冒号是中文全角的 `：`，而不是英文半角的 `:`，并且在 `关键词` 和 `答：` 之间有一个空格。注意注意！如果像这样 `问：小夜的主人到底是谁呀 答：是你呀` 直接教完整的一句话的话是很难有效触发的，这就很考验你应该如何选择关键词了。像上面那个例子，更好的教学是： `问：主人 答：是你呀`

使用例：`问：HELLO 答：WORLD`

效果示意：

<img :src="$withBase('/static/chatTeach.jpg')" alt="插件效果示意">
:::

---

::: tip cos图片插件 v3.0
插件文件名：`cos.js`，作者：Giftina

介绍：在普通限度的尺度下发送一张合法的 cos 三次元图, 图片来源哔哩哔哩cos专栏。

使用例：`cos图`

效果示意：

<img :src="$withBase('/static/cos.jpg')" alt="插件效果示意">
:::

---

::: tip cp文生成插件 v2.0
插件文件名：`cp.js`，作者：Giftina

介绍：cp文生成器，生成一段简单的 cp 文。简简单单，就是最好的爱。语料来自 https://github.com/mxhcpstories/mxh-cp-stories/blob/master/src/assets/story.json

使用例：`cp 小夜 小雫`

效果示意：

<img :src="$withBase('/static/cp.jpg')" alt="插件效果示意">
:::

---

::: tip 疯狂星期四插件 v1.2
插件文件名：`crazyThursday.js`，作者：Giftina

介绍：全自动学习关于 `疯狂星期四` 的语料。只要聊天对话中包含了 `疯狂星期四` ，就会自动学习之，并且回复一段其他的语料。

使用例：`认清一个失败的人生，源自于我发现无论发多少条肯德基疯狂星期四文案，都不会有人请我吃的瞬间。`

效果示意：

<img :src="$withBase('/static/crazyThursday.jpg')" alt="插件效果示意">
:::

---

::: tip 赛博百科问答插件 v2.0
插件文件名：`cyberPedia.js`，作者：Giftina

介绍：非常赛博朋克的百科知识问答题。

使用例：`赛博朋克`

效果示意：

<img :src="$withBase('/static/cyberPedia.jpg')" alt="插件效果示意">
:::

---

::: tip 舞立方信息查询插件 v2.1
插件文件名：`danceCube.js`，作者：Giftina

介绍：小夜有幸成为了第一个舞立方bot。舞立方信息查询，可以查询玩家信息以及机台状态。数据来源以及素材版权归属 胜骅科技 https://www.arccer.com/ ，如有侵权请联系作者删除。

使用例：`个人信息`

效果示意：

<img :src="$withBase('/static/danceCube1.jpg')" alt="插件效果示意">

<img :src="$withBase('/static/danceCube2.jpg')" alt="插件效果示意">
:::

---

::: tip 名场面插件 v1.1
插件文件名：`dialogue.js`，作者：Giftina

介绍：根据字幕台词搜索名场面出处，原作：https://github.com/windrises/dialogue.moe

使用例：`名场面 不能逃避`

效果示意：

<img :src="$withBase('/static/dialogue.jpg')" alt="插件效果示意">
:::

---

::: tip 报错插件 v2.0
插件文件名：`feedback.js`，作者：Giftina

介绍：向小夜开发组报错消息，消息会实时转达到小夜开发成员。

使用例：`报错 对象不存在`

效果示意：

<img :src="$withBase('/static/feedback1.jpg')" alt="插件效果示意">

小夜开发组群内效果：
<img :src="$withBase('/static/feedback2.jpg')" alt="插件效果示意">
:::

---

::: tip 最新本子插件 v1.0
插件文件名：`getNewestFeed.js`，作者：Giftina

介绍：从 https://cangku.icu/feed 获取最新投稿。

使用例：`最新本子`

效果示意：

<img :src="$withBase('/static/getNewestFeed.jpg')" alt="插件效果示意">
:::

---

::: tip 黑白生草图生成器插件 v2.1
插件文件名：`grassPictureGenerate.js`，作者：Giftina

介绍：生成一张黑白生草图。

使用例：`黑白图 当你凝望神圣手雷的时候，神圣手雷也在凝望你 あなたが神圣手雷を見つめるとき、神圣手雷もあなたを見つめています[图片]`

效果示意：

<img :src="$withBase('/static/grassPictureGenerate.jpg')" alt="插件效果示意">
:::

---

::: tip 帮助插件 v2.3
插件文件名：`help.js`，作者：Giftina

介绍：小夜会回复系统当前可用插件列表，描述插件版本和对应的使用示例。

使用例：`帮助`

效果示意：

<img :src="$withBase('/static/help.jpg')" alt="插件效果示意">
:::

---

::: tip 人生重开模拟器插件 v1.0
插件文件名：`lifeRestart.js`，作者：Giftina

介绍：一个人生重开模拟器，区别于原作，该版本非常和谐，非常真实，请务必体验一下。原作 https://github.com/VickScarlet/lifeRestart

使用例：`人生重开`

效果示意：

<img :src="$withBase('/static/lifeRestart.jpg')" alt="插件效果示意">
:::

---

::: tip 今日不带套插件 v2.0
插件文件名：`noCondom.js`，作者：Giftina

介绍：小夜在2018年七夕节限定的彩蛋功能，让小夜帮你计算今天不带套的结果，仅供娱乐。

使用例：`今天不带套`

效果示意：

<img :src="$withBase('/static/noCondom.jpg')" alt="插件效果示意">
:::

---

::: tip 猫语翻译器插件 v2.0
插件文件名：`nyaTranslate.js`，作者：Giftina

介绍：可以将内容加密为 `喵嗷呜` 格式的喵语，也可将喵语解密成原始内容。解密不需要猫语前缀，直接原样发送即可。支持文本、图片、链接等等一切能显示出来的内容。原作 https://github.com/ezshine/chrome-extension-catroom

使用例：`猫语 喵~`

效果示意：

<img :src="$withBase('/static/nyaTranslate.jpg')" alt="插件效果示意">
:::

---

::: tip 连通性测试插件 v2.0
插件文件名：`ping.js`，作者：Giftina

介绍：PingPong，最基础的响应插件，可基于本插件学习插件的开发。该插件实现了一个可以测试小夜的连通性的功能。

使用例：`/ping`

效果示意：

<img :src="$withBase('/static/ping.jpg')" alt="插件效果示意">
:::

---

::: tip 迫害生草图生成器插件 v2.2
插件文件名：`poHaiGenerate.js`，作者：Giftina

介绍：让小夜来制作缺德的迫害表情包吧。现在可以迫害的对象：唐可可，上原步梦，猛男狗，令和，鸭鸭，陈睿，寄。

使用例：`迫害 上原步梦 是我，是我先，明明都是我先来的……接吻也好，拥抱也好，还是喜欢上那家伙也好。`

效果示意：

<img :src="$withBase('/static/poHaiGenerate.jpg')" alt="插件效果示意">
:::

---

::: tip prpr插件 v2.0
插件文件名：`prpr.js`，作者：Giftina

介绍：让小夜帮你舔 ta 吧。模仿自 jjbot 的功能。

使用例：`prpr 嘉然`

效果示意：

<img :src="$withBase('/static/prpr.jpg')" alt="插件效果示意">
:::

---

::: tip 二维码生成插件 v2.0
插件文件名：`qr.js`，作者：Giftina

介绍：快速生成一个二维码，使用sumt的api。

使用例：`qr 114514`

效果示意：

<img :src="$withBase('/static/qr.jpg')" alt="插件效果示意">
:::

---

::: tip r18色图插件 v3.0
插件文件名：`r18.js`，作者：Giftina

介绍：在危险的尺度下发送一张非法的 r18 二次元色图，图片来源api.lolicon.app。

使用例：`可以色色`

效果示意：


……这个请自己尝试！
:::

---

::: tip 随机二次元图插件 v3.0
插件文件名：`randomECY.js`，作者：Giftina

介绍：发送一张正常尺度的二次元图。

使用例：`二次元`

效果示意：


……这个请自己尝试！
:::

---

::: tip 本地随机图插件 v3.0
插件文件名：`randomLocalPicture.js`，作者：Giftina

介绍：从指定的本地图片文件夹随机发送一张图片，默认使用其他插件自动下载保存的图库文件夹。

使用例：`让我康康`

效果示意：


……这个请自己尝试！
:::

---

::: tip 随机网图插件 v2.1
插件文件名：`randomPicture.js`，作者：Giftina

介绍：从随机网络图源下载图片后发送图片，图源可以自定义，网上很多。

使用例：`随机网图`

效果示意：


……这个请自己尝试！
:::

---

::: tip 复读机插件 v2.1
插件文件名：`repeat.js`，作者：Giftina

介绍：特殊插件，没有主动触发指令。当某条消息重复指定次数时，`小夜牌高保真复读机` 会跟风复读一次。

使用例：`[当某条消息重复了2次]`

效果示意：

<img :src="$withBase('/static/repeat.jpg')" alt="插件效果示意">
:::

---

::: tip roll插件 v2.0
插件文件名：`roll.js`，作者：Giftina

介绍：简单的骰娘。随机 roll 出 0 到 1000000 的随机数，可以自行跟随参数。

使用例：`roll`

效果示意：

<img :src="$withBase('/static/roll.jpg')" alt="插件效果示意">
:::

---

::: tip 日程计划提醒插件 v1.0
插件文件名：`schedule.js`，作者：Giftina

介绍：计划提醒功能，小夜会在指定时刻提醒你。

使用例：`提醒我待会要手冲`

效果示意：

<img :src="$withBase('/static/schedule.jpg')" alt="插件效果示意">
:::

---

::: tip 搜图插件 v3.0
插件文件名：`searchTag.js`，作者：Giftina

介绍：搜索一张指定tag的二次元图。`好的` 代表正常尺度，`坏的` 代表🔞。图片来源api.lolicon.app。

使用例：`来点坏的白丝`

效果示意：


……这个请自己尝试！
:::

---

::: tip 系统配置查询插件 v2.2
插件文件名：`status.js`，作者：Giftina

介绍：查询小夜的相关运行信息。

使用例：`系统状态`

效果示意：

<img :src="$withBase('/static/status.jpg')" alt="插件效果示意">
:::

---

::: tip 淘宝买家秀色图插件 v3.0
插件文件名：`tbShow.js`，作者：Giftina

介绍：查询小夜的相关运行信息。

使用例：`买家秀`

效果示意：


……这个请自己尝试！
:::

---

::: tip 状态栏提示插件 v2.1
插件文件名：`tray.js`，作者：Giftina

介绍：自动在任务栏显示一个常驻托盘，仅在Windows系统下有效。弹窗指令会在小夜宿主电脑上弹出一条消息通知。

使用例：`弹窗 您可能是盗版软件的受害者`

效果示意：

<img :src="$withBase('/static/tray.jpg')" alt="插件效果示意">
:::

---

::: tip 语音合成插件 v2.1
插件文件名：`tts.js`，作者：Giftina

介绍：让小夜开口说话吧。小夜使用基于大数据的情感幼女语音合成技术，能吠出更自然的发音、更丰富的情感和更强大的表现力。可以插入一些棒读音以提高生草效果。

使用例：`吠 太好听了吧啊，你唱歌真的好嗷好听啊，简直就是天岸籁，我刚才听到你唱歌了，我们以后一起唱好不好，一起唱昂，一起做学园偶像昂`

效果示意：

<img :src="$withBase('/static/tts.jpg')" alt="插件效果示意">
:::

---

::: tip 今日老婆插件 v1.2
插件文件名：`waifuToday.js`，作者：Giftina

介绍：将随机一名群友和你组成一对cp。

使用例：`今日老婆`

效果示意：

<img :src="$withBase('/static/waifuToday.jpg')" alt="插件效果示意">
:::

### QQ端 独占的功能

::: tip 群服务开关
介绍：小夜的群服务开关。如果觉得小夜太吵了，想让小夜安静一会，那么在群里发 `闭菊` 即可关闭群内小夜的服务。`张菊@小夜` 为启用指定小夜的群服务。请勿光速一开一合调整菊部呼吸导致呼吸困难。

使用例：`闭菊`

效果示意：

<img :src="$withBase('/static/serviceSwitch.jpg')" alt="功能效果示意">
:::

---

::: tip 戳一戳
介绍：戳一戳小夜有利于身心健康。连续戳小夜 `3` 下就会生气把你禁言。

使用例：`[戳一戳小夜]`

效果示意：

<img :src="$withBase('/static/poke.jpg')" alt="功能效果示意">
:::

---

::: tip 孤寡
介绍：七夕节快乐，小夜收到了你的孤寡订单，现在就开始孤寡 ta 辣！

使用例：`孤寡 @Giftina`

效果示意：

<img :src="$withBase('/static/guGua.jpg')" alt="功能效果示意">
:::

---

::: tip 我有个朋友
介绍：小夜会 P 一张你朋友说的图。

使用例：`我有个朋友说我好了@Giftina`

效果示意：

<img :src="$withBase('/static/myFriendSays.jpg')" alt="功能效果示意">
:::

---

::: tip 强制迫害
介绍：小夜转发了一段来自平行世界的对话，适度娱乐噢。

使用例：`强制迫害 (@对象) (说了什么) (小夜说了什么)`

效果示意：

<img :src="$withBase('/static/fakeForward.jpg')" alt="功能效果示意">
:::

---

::: tip 手动复读
介绍：手动复读，小夜会复读回复中指定的消息。也许可以用来复现撤回的消息。

使用例：`[对某个消息回复复读]`

效果示意：

<img :src="$withBase('/static/fudu.jpg')" alt="功能效果示意">
:::

### QQ 地 雷 战（需小夜是 QQ 群管理时有效）

::: tip 埋地雷
介绍：在群内埋下一坨极不稳定的地雷，有 30% 的几率是掺了沙子的哑雷。在接下来的发言群员中会有一名幸运群友一脚踩到地雷，将会被炸伤 0 到 120 秒（禁言）。

使用例：`埋地雷`

效果示意：

<img :src="$withBase('/static/setMine.jpg')" alt="功能效果示意">
:::

---

::: tip 踩地雷
介绍：觉得手雷和地雷都伤不到你，自带主角光环？还是说想当排雷步兵？不如来试试踩地雷吧！一脚踩到群友埋的地雷上，对你造成 60 到 240 秒的暴击伤害。

使用例：`踩地雷`

效果示意：

<img :src="$withBase('/static/stepOnAMine.jpg')" alt="功能效果示意">
:::

---

::: tip 一个手雷
介绍：向@被害者丢出一个手雷，一位幸运玩家将会被炸伤 0 到 120 秒（禁言）。有千分之一的概率手雷会转化为神圣手雷（Holly Hand Grenade），将会炸伤所有无辜群友（全体禁言）。

使用例：`一个手雷 @被害者`

效果示意：

<img :src="$withBase('/static/handGrenade.jpg')" alt="功能效果示意">

神圣手雷：
<img :src="$withBase('/static/hollyHandGrenade.jpg')" alt="功能效果示意">
:::

---

::: tip 希望的花
介绍：团长，你在做什么啊！团长！朝 @希望目标 丢出一朵希望的花，救活目标（解除禁言），但是团长自己会被炸成重伤，造成 60 到 600 秒的暴击伤害。

使用例：`希望的花 @希望目标`

效果示意：

<img :src="$withBase('/static/flowerOfHope.jpg')" alt="功能效果示意">
:::

---

::: tip 击鼓传雷
介绍：小夜会传给你一个手雷，你必须在 60 秒内正确回答一个问题，不然就会在你手上爆炸噢。在回答正确之后，小夜会随机抽取一名幸运群友，把手雷传给 ta，ta 的回答时间是前一个玩家回答之后所剩的时间，依次类推，直到手雷在某个不幸群友手上爆炸。这是一个只有死亡才能结束的游戏，做好准备了吗。

使用例：`击鼓传雷`

效果示意：

<img :src="$withBase('/static/loopBomb.jpg')" alt="功能效果示意">
:::
