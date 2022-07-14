# 插件开发指北

有句老话说得好，[一个成功的机器人离不开强大的指令系统。](https://koishi.js.org/guide/command/#:~:text=%E7%B3%BB%E7%BB%9F%E5%88%9D%E6%8E%A2-,%E4%B8%80%E4%B8%AA%E6%88%90%E5%8A%9F%E7%9A%84%E6%9C%BA%E5%99%A8%E4%BA%BA%E7%A6%BB%E4%B8%8D%E5%BC%80%E5%BC%BA%E5%A4%A7%E7%9A%84%E6%8C%87%E4%BB%A4%E7%B3%BB%E7%BB%9F%E3%80%82,-%E6%AD%A3%E5%9B%A0%E4%B8%BA%E5%A6%82%E6%AD%A4)正因为如此，我们在开发时综合考虑了`我们所掌握的技术栈`以及`第三方插件开发者、爱好者所掌握的编码能力`，最终觉得，`从零开始的开发难度`更贴近大众所希望的开发流程，谁不会喜欢一个简单好玩的玩具呢。下面我们将会介绍`小夜的插件系统是如何实现的`、`如何开发一个插件`，以及`如何使用插件`。

## 小夜的插件系统

小夜的插件系统非常基础，它围绕[Node.js原生的简单模块加载系统](https://nodejs.org/docs/latest-v14.x/api/modules.html#modules_modules_commonjs_modules)为核心而开发。使用`module`的导出语法`module.exports`，我们可以将一个独立功能的文件导出为一个可以被`require`的插件。

小夜的插件加载器使用了[require.all](https://github.com/desislavsd/require.all)模块，这是一个用来`读取指定目录中的所有文件，并可选择使用自定义函数或参数解析它们`的模块。

当小夜启动时，插件加载器会从`plugins`文件夹中读取所有的插件，并将其加载到`plugins`对象中。

...

以上部分实际上是底层实现，稍作了解即可，并不会影响接下来的插件开发。接下来我们将会介绍如何开发一个插件。

## 开发一个插件

## 使用插件
