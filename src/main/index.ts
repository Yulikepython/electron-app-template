// src/main/index.ts
import { app, BrowserWindow } from 'electron';
import path from 'node:path';

// ハードウェアアクセラレーションを無効化して、Vulkan/VA-API関連のエラーを回避
app.disableHardwareAcceleration();

// GPU関連のエラーメッセージを抑制するためのコマンドライン引数を追加
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.commandLine.appendSwitch('ignore-gpu-blacklist');

// 開発モードかどうかを判定
const isDev = process.env.NODE_ENV === 'development';

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

    // 開発モードの場合はデベロッパーツールを開く
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    // electron-viteの標準パスで自動的にレンダラーのコンテンツがロードされます
    mainWindow.loadURL(
        isDev
            ? process.env.ELECTRON_RENDERER_URL
            : `file://${path.join(__dirname, '../renderer/index.html')}`
    );
}

// アプリが準備完了したらウィンドウを作成
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        // macOSでは、Dockアイコンがクリックされ、他のウィンドウが
        // 開いていない場合、アプリでウィンドウを再作成するのが一般的です
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// macOS以外では、すべてのウィンドウが閉じられたときにアプリを終了します
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});