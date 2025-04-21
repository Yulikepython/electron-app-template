// src/renderer.js

// DOM要素の取得
const button = document.getElementById('myButton');
const output = document.getElementById('message');

// ボタンのクリックイベントリスナーを追加
button.addEventListener('click', () => {
    output.innerText = 'ボタンがクリックされました！';
});

// 初期化処理
function init() {
    output.innerText = 'アプリケーションが起動しました。';
}

// ページが読み込まれたときに初期化処理を実行
window.onload = init;