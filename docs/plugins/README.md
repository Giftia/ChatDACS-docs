# 插件开发指北

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
   * ### 插件处理完成后需要返回处理结果，若无需回复则返回空： `return ""`
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

**当接收到 `/ping` 指令时，小夜将会返回 `Pong!`。**

## 使用插件
