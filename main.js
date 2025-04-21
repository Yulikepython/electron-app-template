// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

// ハードウェアアクセラレーションを無効化して、Vulkan/VA-API関連のエラーを回避
app.disableHardwareAcceleration();

// GPU関連のエラーメッセージを抑制するためのコマンドライン引数を追加
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.commandLine.appendSwitch('ignore-gpu-blacklist');

function createWindow() {
    // ウィンドウの作成
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src/renderer.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    // index.html をロード
    mainWindow.loadFile(path.join(__dirname, 'src/index.html'));

    // 開発者ツールを開く
    // mainWindow.webContents.openDevTools();
}

// アプリが準備完了したらウィンドウを作成
app.whenReady().then(createWindow);

// macOSでは、すべてのウィンドウが閉じられたときにアプリを終了する
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// macOSでは、アプリがアクティブになったときにウィンドウを再作成する
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});