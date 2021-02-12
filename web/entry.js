/*
  @author 你好2007
  2020年6月8日于大同
 */

import QuickPaper from 'quick-paper';

// 引入启动界面
import App from './App.paper';

// 引入基础样式
import '@hai2007/style/normalize.css';

// 引入公共样式
import './assets/styles/style.scss';

// Mac电脑特殊样式
import './assets/styles/mac.scss';

// 引入全局指令
import './directive/index';

// 简单的传递信息给node.js的全局方法
QuickPaper.prototype.emit = (event) => nodeRequire('electron').ipcRenderer.send(event);

// 引入全局通知机制
import event from './plug/@event.js'; QuickPaper.use(event);

// 通过浏览器打开外部链接方法集
import browserLink from './plug/browserLink'; QuickPaper.use(browserLink);

//根对象
window.quickPaper = new QuickPaper({

    //挂载点
    el: document.getElementById('root'),

    // 启动QuickPaper
    render: createElement => createElement(App),

    mounted() {

        const Menu = nodeRequire('electron').remote.Menu;

        let menuObj = Menu.buildFromTemplate([
            {
                label: 'Open Code Editor',
                submenu: [
                    {
                        label: '退出程序',
                        accelerator: 'CmdOrCtrl+Q',
                        click: function () {
                            quickPaper.emit("quit");
                        }
                    }
                ]
            },
            {
                label: '文件',
                submenu: [
                    {
                        label: '新建文件',
                        accelerator: 'CmdOrCtrl+N',
                        click: function () {
                            quickPaper.trigger("newBlankFile");
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: '打开文件',
                        accelerator: 'CmdOrCtrl+O',
                        click: function () {
                            alert('打开文件');
                        }
                    }, {
                        label: '打开文件夹',
                        accelerator: 'CmdOrCtrl+Shift+O',
                        click: function () {
                            quickPaper.trigger("openFolder");
                        }
                    }, {
                        label: '最近打开',
                        click: function () {
                            alert('最近打开');
                        }
                    }, {
                        type: 'separator'
                    },
                    {
                        label: '保存文件',
                        accelerator: 'CmdOrCtrl+S',
                        click: function () {
                            quickPaper.trigger("saveFile");
                        }
                    }
                ]
            },
            {
                label: '帮助',
                submenu: [
                    {
                        label: '关于我们',
                        click: function () {
                            alert('点击了关于我们');
                        }
                    }
                ]
            }
        ]);

        Menu.setApplicationMenu(menuObj);

    }

});
