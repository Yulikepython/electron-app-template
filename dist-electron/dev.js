"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// electron/dev.ts
const child_process_1 = require("child_process");
const electron_1 = require("electron");
// 開発サーバーの起動
function startDevServer() {
    const server = (0, child_process_1.spawn)('npm', ['run', 'dev'], {
        shell: true,
        stdio: 'inherit'
    });
    server.on('close', (code) => {
        console.log(`開発サーバーが終了しました（コード: ${code}）`);
        process.exit(code || 0);
    });
    // アプリが終了するときに開発サーバーも終了
    electron_1.app.on('quit', () => {
        server.kill();
    });
}
// 開発環境の場合は開発サーバーを起動
if (process.env.NODE_ENV === 'development') {
    startDevServer();
}
