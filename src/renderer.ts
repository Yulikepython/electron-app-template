// src/renderer.ts

// DOM要素の取得
const button = document.getElementById('myButton') as HTMLButtonElement;
const output = document.getElementById('message') as HTMLDivElement;

// ボタンのクリックイベントリスナーを追加
button.addEventListener('click', () => {
    output.innerText = 'ボタンがクリックされました！';
});

// 初期化処理
function init(): void {
    output.innerText = 'アプリケーションが起動しました。';
}

// ページが読み込まれたときに初期化処理を実行
window.onload = init;

// TypeScript用に型定義を追加
interface ElectronAPI {
    // 必要に応じてElectron APIの型定義を追加
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}