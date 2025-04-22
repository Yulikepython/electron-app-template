"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// electron/main.ts
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
// ハードウェアアクセラレーションを無効化して、Vulkan/VA-API関連のエラーを回避
electron_1.app.disableHardwareAcceleration();
// GPU関連のエラーメッセージを抑制するためのコマンドライン引数を追加
electron_1.app.commandLine.appendSwitch('disable-gpu');
electron_1.app.commandLine.appendSwitch('disable-software-rasterizer');
electron_1.app.commandLine.appendSwitch('disable-gpu-compositing');
electron_1.app.commandLine.appendSwitch('ignore-gpu-blacklist');
function createWindow() {
    // ウィンドウの作成
    const mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path_1.default.join(__dirname, '../preload/index.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    // 開発モードの場合はViteの開発サーバーを使用
    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:3000');
        // 開発者ツールを開く
        mainWindow.webContents.openDevTools();
    }
    else {
        // プロダクションモードではビルドされたファイルを使用
        mainWindow.loadFile(path_1.default.join(__dirname, '../dist/index.html'));
    }
}
// アプリが準備完了したらウィンドウを作成
electron_1.app.whenReady().then(() => {
    createWindow();
});
// macOSでは、すべてのウィンドウが閉じられたときにアプリを終了する
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// macOSでは、アプリがアクティブになったときにウィンドウを再作成する
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
