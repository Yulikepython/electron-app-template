// preload/index.ts
import { contextBridge } from 'electron';

// レンダラープロセスに公開するAPIを定義
contextBridge.exposeInMainWorld('electronAPI', {
    // ここにレンダラープロセスから呼び出したいAPIを追加
    // 例: versions: process.versions
});

console.log('プリロードスクリプトが読み込まれました');