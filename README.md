
<p align="center"><a href="https://github.com/hai2007/Open-Code-Editor" target="_blank">
<img width="400" src="./web/assets/images/logo.png" alt="Open Code Editor"></a></p>

📄👋🤖🗃️ 一个小巧且可个性化配置的代码编辑器。A small and personalized code editor.

<p align="center"><a href="https://github.com/hai2007/Open-Code-Editor" target="_blank">
<img width="700" src="./Open-Code-Editor.png" alt="Open Code Editor"></a></p>

## 开发须知

- 本项目选择的web框架为[quick-paper](https://github.com/hai2007/quick-paper),你可以[点击此处查阅文档](https://hai2007.gitee.io/quick-paper/),如果有任何问题请[点击此处提问](https://github.com/hai2007/quick-paper/issues)。

- 编辑器核心库选择的是[Open-Web-Editor](https://github.com/hai2007/Open-Web-Editor)用来提供编辑界面。

## 如何启动开发？

我们有两个程序需要分别启动，首先是web进程：

```bash
npm run web
```

只有在web进程启动成功以后才应该执行下面的命令以启动主进程：

```bash
npm run exe-win
```

当然，上面是windows下的命令，如果你是mac电脑请使用：

```bash
npm run exe-mac
```

## 如何调试主进程？

首先进入项目，运行：

```bash
npm run debug-win
```

上面是windows电脑，如果是mac电脑请使用：

```bash
npm run debug-mac
```

当然,你应该在调试的地方提前添加“ debugger ”语句，这和普通的web端调试一样，接着，在chrome浏览器地址栏中输入：

```
chrome://inspect/#devices
```

然后点击“ Open dedicated DevTools for Node ”后进入调试界面即可。

## 如何打包成exe或dmg等最终软件或安装包？

如果你是windows请执行：

```bash
npm run build-win
```

相应的mac电脑请执行：

```bash
npm run build-mac
```

## 联系我们

- QQ: 2501482523
- Email: 2501482523@qq.com

开源协议
---------------------------------------
[MIT](https://github.com/hai2007/quick-paper/blob/master/LICENSE)

Copyright (c) 2020-2021 [hai2007](https://hai2007.gitee.io/sweethome/) 走一步，再走一步。