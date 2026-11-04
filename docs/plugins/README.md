# 插件开发指北

配置模型服务请查看 [LLM 插件接入](./llm.md)，支持旧 Ollama 与 OpenAI 兼容服务。

::: tip LLM、上下文与主动聊天
源码已实现 QQ 全文本响应、内存上下文及单群主动聊天，并已有定向测试覆盖。QQ 文本无需 @或“小夜”前缀，按“旧插件 → 真实语料匹配 → LLM”处理；“小夜”前缀仍可显式调用。上下文按平台、机器人 self、私聊用户或群隔离，最多 40 条、有效期 2 小时，历史加当前 user 最多 16000 个 UTF-16 字符，不是精确 token 数。上下文只存内存，重启清空，切换人设清空对应会话。

主动聊天默认关闭，`llm.proactive` 仅在 `enabled: true` 且配置单个授权群时启用，`groupIds` 默认 `[]`，多群配置拒绝。间隔 10–30 分钟、每日最多 12 条，上海时间 23:00–08:00 严格静默；发送前的 `canSend` 检查群服务开关、NapCat 禁言状态及 LLM/proactive 双插件开关，未知或关闭不发，执行“闭菊”停用群服务后不主动发送。没有适合上下文或模型决定不发就跳过，不补发，失败不重发，stop 清理定时器；额度仅当前进程内存计数，重启清空、不跨进程共享。

配置和保护边界见 [LLM 插件接入](./llm.md)。授权部署、真实手机收发与云端构建需分别验证，源码和定向测试通过不等于这些验收通过。
:::

前辈有句老话说得好，[一个成功的机器人离不开强大的指令系统。](https://koishi.js.org/guide/command/#:~:text=%E7%B3%BB%E7%BB%9F%E5%88%9D%E6%8E%A2-,%E4%B8%80%E4%B8%AA%E6%88%90%E5%8A%9F%E7%9A%84%E6%9C%BA%E5%99%A8%E4%BA%BA%E7%A6%BB%E4%B8%8D%E5%BC%80%E5%BC%BA%E5%A4%A7%E7%9A%84%E6%8C%87%E4%BB%A4%E7%B3%BB%E7%BB%9F%E3%80%82,-%E6%AD%A3%E5%9B%A0%E4%B8%BA%E5%A6%82%E6%AD%A4)正因为如此，我们在开发时综合考虑了`我们所掌握的技术栈`以及`第三方插件开发者、爱好者所掌握的编码能力`，最终觉得，`从零开始的开发难度`更贴近大众所希望的开发流程，谁不会喜欢一个简单好玩成就感满满的玩具呢。下面我们将会介绍`小夜的插件系统是如何实现的`、`如何开发一个插件`，以及`如何使用插件`。

## 小夜的插件系统

小夜的插件系统非常基础，它围绕[Node.js原生的简单模块加载系统](https://nodejs.org/docs/latest-v14.x/api/modules.html#modules_modules_commonjs_modules)为核心而开发。使用`module`的导出语法`module.exports`，我们可以将一个独立功能的文件导出为一个可以被`require`的插件。

小夜的插件加载器使用了[require.all](https://github.com/desislavsd/require.all)模块，这是一个用来`读取指定目录中的所有文件，并可选择使用自定义函数或参数解析它们`的模块。

插件会暴露出它自己的插件对象，其中包含`name`、`version`、`description`、`author`、`execute`等属性。最重要的是`execute`属性，它是一个函数，当插件被插件遍历器所调用时，`execute`内的函数会被调用。

当小夜启动时，插件加载器会从`plugins`文件夹中读取所有的插件，并将其加载到`plugins`对象中。就那么简单！

...

以上部分实际上是底层实现，稍作了解即可，并不会影响接下来的插件开发。接下来我们将会介绍如何给小夜开发一个插件。

## 开发一个插件

我们拿一个非常简单的`连通性测试插件`插件作为插件模板来讲。

```js
module.exports = {
  插件名: "连通性测试插件", // 插件名，会在插件说明中展示
  指令: "^[/!]?ping$", // 插件触发的指令，可使用正则表达式匹配关键词，仅在插件加载时展示
  版本: "2.0", // 插件版本，会在插件说明中展示
  作者: "Giftina", // 插件作者，仅在插件加载时展示
  描述: "PingPong，最基础的响应插件，可基于本插件学习插件的开发。该插件实现了一个可以测试小夜的连通性的功能。", // 插件说明，仅在插件加载时展示
  使用示例: "/ping", // 插件的触发示例，会在插件说明中展示
  预期返回: "Pong!", // 简单描述一下插件的预期返回，会在插件说明中展示

  /**
   * ### 插件加载器将会给插件传入如下参数以供下文使用:
   * @param {String} msg 消息全文
   * @param {String} userId 用户id
   * @param {String} userName 用户名
   * @param {String} groupId 群id
   * @param {String} groupName 群名
   * @param {Any} options 其他可选参数
   * @returns {Object} { type: "返回类型", content: "返回内容" }
   * ### 插件处理完成后需要返回处理结果，若无需回复则返回空文本： { type: "text", content: "" }
   * ### 返回值是一个对象，包含以下属性: `{ type: "返回类型", content: "返回内容" }`
   * ### 返回值的 返回类型 目前有 5 种类型： "text", "picture", "audio", "video", "file":
   * - text 为文本回复；
   * - picture 为图片回复，content 可以使用图片链接或者base64编码的图片数据；
   * - audio 为音频回复，content 可以使用音频链接或者base64编码的音频数据；
   * - video 为视频回复，content 可以使用视频链接；
   * - file 为文件回复，content 可以使用文件链接；
   */
  execute: async function (msg, userId, userName, groupId, groupName, options) {
    /**
     * 返回 Pong!
     */
    const replyText = "Pong!";
    return { type: "text", content: replyText };
  },
};
```

这个插件的功能很好理解：

**当小夜接收到 `/ping` 或 `!ping` 或 `ping` 消息时，小夜将会直接回复 `Pong!`。**

还没写完

## 使用插件

普通游戏、语料和 LLM 人设查询仍可公开使用，不因宿主权限收紧而统一封禁。插件执行权限与插件开关权限分别判断：

| 操作 | 允许身份 | 影响范围 |
| --- | --- | --- |
| 执行或切换 `wallpaper`、`tray`、`chatPush` | 可信 QQ/NapCat（OneBot）事件中的 `QQBOT_ADMIN_LIST` 宿主管理员 | 宿主能力；普通群管理员无权操作 |
| 切换群内普通插件、启停群服务 | 群 `admin` / `owner` 或宿主管理员 | 当前群 |
| 切换私聊普通插件 | 可信私聊中的本人 | 当前平台、机器人与用户对应的本人会话，不影响其他私聊或群 |

宿主授权会核对归一化上下文和原始事件的身份一致性，不能仅凭消息或调用参数里的 QQ 号授予权限。官方 QQ 通道仍由原有 allowlist 约束，不因此开放宿主能力。源码与离线测试不等于宿主通知、桌面操作或真实 QQ 收发已验收。

群插件状态查询已由 `findOrCreate` 改为 `findCreateFind`，避免其读事务与 `AddMessage` / `UpdateLoginTimes` 写入竞争引发 `SQLITE_BUSY`；同群状态操作采用 per-group 序列化，插件作者不应绕过此路径并发覆盖状态。

QQ 入口丢弃自身 `message_sent` 和自身消息，普通 `message` 按 self / scope / peer / sender / message ID 隔离去重，窗口 5 分钟、最多 4096 项。缺失或无效 ID 不去重，失败不自动重试；`notice` / `poke` 保留原处理路径。去重不是发送成功或 exactly-once 保证，不能据此补发失败回复。
