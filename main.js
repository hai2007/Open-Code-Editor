const { app, BrowserWindow } = require('electron');

function createWindow() {
    // 创建浏览器窗口
    let win = new BrowserWindow({
        width: 900,
        height: 600,
        minWidth: 700,
        minHeight: 500,
        resizable: true,
        frame: false,
        webPreferences: {
            /**
             * 因为 Electron 在运行环境中引入了 Node.js，所以在 DOM 中有一些额外的变量，比如 module、exports 和 require
             * 这导致 了许多库不能正常运行，因为它们也需要将同名的变量加入运行环境中
             * 我们可以通过禁用 Node.js 来解决这个问题
             * 可是，我们依然需要使用 Node.js 和 Electron 提供的 API，因此这里就不禁止了，而是选择在index.html的开头
             * 在引入那些库之前将这些变量重命名
             */
            nodeIntegration: true,

            // 由于electron窗口的同源策略的问题不允许加载本地文件
            webSecurity: false
        }
    });

    // 开发模式
    if ((process.env.NODE_ENV + "").trim() == 'development') {
        win.loadURL('http://localhost:20002/');
        win.webContents.openDevTools();
    }

    // 生产模式
    else {
        win.loadFile('index.html');
    }

    return win;

}

app.whenReady().then(() => {

    // 创建主界面
    let win = createWindow();

    // 监听来自主界面的请求
    require('./node.js/ipcMain.on.js')(win);

});

app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});