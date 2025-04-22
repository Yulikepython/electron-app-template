// src/renderer/index.ts

// DOM要素の取得
const button = document.getElementById('myButton') as HTMLButtonElement;
const output = document.getElementById('message') as HTMLDivElement;

// TypeScript用にElectron APIの型定義を追加
interface ElectronAPI {
    getAppInfo: () => {
        versions: NodeJS.ProcessVersions;
        platform: NodeJS.Platform;
    };
    invokeAction: (channel: string, ...args: unknown[]) => Promise<unknown>;
    on: (channel: string, listener: (...args: unknown[]) => void) => () => void;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}

// ボタンのクリックイベントリスナーを追加
button.addEventListener('click', async () => {
    try {
        // 安全なIPC通信を使用してメインプロセスとやり取り
        const response = await window.electronAPI.invokeAction('app:ping');
        output.innerHTML = `サーバーからの応答: <br>${JSON.stringify(response, null, 2)}`;
    } catch (error) {
        console.error('通信エラー:', error);
        output.innerHTML = `エラーが発生しました: ${error instanceof Error ? error.message : String(error)}`;
    }
});

// 初期化処理
async function init(): Promise<void> {
    output.innerText = 'アプリケーションが起動しました。';

    try {
        // アプリケーション情報を取得して表示
        const appInfo = window.electronAPI.getAppInfo();
        console.log('アプリケーション情報:', appInfo);

        // 通知リスナーを設定
        const removeListener = window.electronAPI.on('app:notification', (message) => {
            console.log('通知を受信:', message);
            // 必要に応じてUIを更新
        });

        // クリーンアップ用に保存（必要に応じて使用）
        window.addEventListener('beforeunload', () => {
            removeListener();
        });

    } catch (error) {
        console.error('初期化エラー:', error);
    }
}

// ページが読み込まれたときに初期化処理を実行
window.onload = init;