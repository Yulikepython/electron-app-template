// electron/dev.ts
import { spawn } from 'child_process';
import { app } from 'electron';
import path from 'path';

// 開発サーバーの起動
function startDevServer() {
    const server = spawn('npm', ['run', 'dev'], {
        shell: true,
        stdio: 'inherit'
    });

    server.on('close', (code) => {
        console.log(`開発サーバーが終了しました（コード: ${code}）`);
        process.exit(code || 0);
    });

    // アプリが終了するときに開発サーバーも終了
    app.on('quit', () => {
        server.kill();
    });
}

// 開発環境の場合は開発サーバーを起動
if (process.env.NODE_ENV === 'development') {
    startDevServer();
}

export { };