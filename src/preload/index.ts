// src/preload/index.ts
import { contextBridge, ipcRenderer } from 'electron';

// 安全にレンダラープロセスに公開するAPIを定義
// タイプセーフな形でAPIを公開
contextBridge.exposeInMainWorld('electronAPI', {
    // アプリケーションバージョン情報（読み取り専用）
    getAppInfo: () => ({
        versions: process.versions,
        platform: process.platform
    }),

    // IPCを介した安全な通信
    // 戻り値を返すような非同期操作
    invokeAction: (channel: string, ...args: unknown[]) => {
        // 許可されたチャネルのみ通信可能に制限
        const validChannels = ['app:ping', 'app:getData'];
        if (validChannels.includes(channel)) {
            return ipcRenderer.invoke(channel, ...args);
        }
        return Promise.reject(new Error(`Channel ${channel} is not allowed`));
    },

    // イベントリスナーの登録（単方向通信）
    on: (channel: string, listener: (...args: unknown[]) => void) => {
        const validChannels = ['app:update', 'app:notification'];
        if (validChannels.includes(channel)) {
            // オリジナルのリスナーをラップして安全に実行
            const subscription = (_event: Electron.IpcRendererEvent, ...args: unknown[]) =>
                listener(...args);
            ipcRenderer.on(channel, subscription);

            // クリーンアップ関数を返す（リスナー解除用）
            return () => {
                ipcRenderer.removeListener(channel, subscription);
            };
        }
        console.warn(`Channel ${channel} is not allowed for event listeners`);
        return () => { }; // 無効なチャネルの場合は何もしないクリーンアップ関数
    }
});

console.log('セキュアなプリロードスクリプトが読み込まれました');