// electron/main.ts
import { app, BrowserWindow } from 'electron';
import path from 'path';

// ハードウェアアクセラレーションを無効化して、Vulkan/VA-API関連のエラーを回避
app.disableHardwareAcceleration();

// GPU関連のエラーメッセージを抑制するためのコマンドライン引数を追加
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.commandLine.appendSwitch('ignore-gpu-blacklist');

function createWindow(): void {
    // ウィンドウの作成
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preload/index.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    // 開発モードの場合はViteの開発サーバーを使用
    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:3000');
        // 開発者ツールを開く
        mainWindow.webContents.openDevTools();
    } else {
        // プロダクションモードではビルドされたファイルを使用
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

// アプリが準備完了したらウィンドウを作成
app.whenReady().then(() => {
    createWindow();
});

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