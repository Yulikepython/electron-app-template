# Electron TypeScript アプリケーションテンプレート

![Electron + TypeScript](https://img.shields.io/badge/Electron-TypeScript-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

このプロジェクトは、TypeScript を使用した Electron デスクトップアプリケーション開発のための高度に構成されたテンプレートです。セキュリティを重視した設計で、クロスプラットフォーム（Windows、macOS、Linux）対応のアプリケーション開発をすぐに始められます。

## 🌟 特徴

- **TypeScript** による型安全な開発環境
- **electron-vite** を使った高速な開発体験
- **セキュリティ対策済み**（コンテキスト分離、CSP、サンドボックスモードなど）
- **開発・本番環境**の設定が分離されクリーン
- **クロスプラットフォーム対応**（Windows、macOS、Linux）
- **モダンな構成** - プロジェクト構造が整理され、保守性が高い

## 📋 必要条件

- Node.js 18.x 以上
- npm 9.x 以上
- Git

## 🚀 セットアップ手順

### 1. テンプレートのクローン

```bash
git clone https://github.com/Yulikepython/electron-app-template.git
cd electron-app-template
```

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. 開発モードでの実行

```bash
npm run dev
```

### 4. アプリケーションのビルド（配布用）

```bash
# すべてのプラットフォーム用
npm run package

# Linux専用
npm run package:linux

# Windows専用
npm run package:win

# macOS専用
npm run package:mac
```

## 📁 プロジェクト構造

```
my-electron-app/
├── src/                  # ソースコードのルートディレクトリ
│   ├── main/             # メインプロセス関連のコード
│   │   └── index.ts      # メインプロセスのエントリーポイント
│   ├── preload/          # プリロードスクリプト
│   │   └── index.ts      # コンテキスト分離のためのプリロード
│   ├── renderer/         # レンダラープロセス（UI）関連のコード
│   │   ├── index.html    # メインのHTMLファイル
│   │   ├── index.ts      # レンダラープロセスのTypeScriptコード
│   │   └── assets/       # CSS、画像などの静的アセット
│   └── index.html        # エントリーポイントHTML（開発環境用）
├── electron.vite.config.js # electron-viteの設定ファイル
├── tsconfig.json         # TypeScriptの設定
├── package.json          # プロジェクト設定・依存関係
└── vite.config.ts        # Viteの設定
```

## 🔧 カスタマイズガイド

### アプリケーション情報の変更

まず `package.json` ファイルを編集して、アプリケーション名やバージョンなどを変更します。

```json
{
  "name": "your-app-name",
  "version": "1.0.0",
  "description": "Your application description",
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com"
  }
}
```

### UI の変更

レンダラープロセスのファイルを編集します：

1. **HTML 変更**: `src/renderer/index.html` を編集して UI の構造を変更
2. **スタイル変更**: `src/renderer/assets/styles.css` を編集してデザインを変更
3. **UI 機能追加**: `src/renderer/index.ts` を編集して機能を追加

### IPC による通信の追加

1. **プリロードスクリプトを拡張**: `src/preload/index.ts` で新しい API チャネルを定義

```typescript
// 例：新しいAPIの追加
contextBridge.exposeInMainWorld("electronAPI", {
  // 既存のAPI...

  // 新しいAPI
  saveData: (data) => ipcRenderer.invoke("app:saveData", data),
  loadData: () => ipcRenderer.invoke("app:loadData"),
});
```

2. **メインプロセスで対応するハンドラーを追加**: `src/main/index.ts` に処理を追加

```typescript
// 例：新しいIPC通信ハンドラー
ipcMain.handle("app:saveData", (event, data) => {
  // 送信元の検証
  if (!validateSender(event.senderFrame.url)) {
    return { error: "Unauthorized" };
  }

  // データ保存処理
  try {
    // ファイル保存などの処理
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
});
```

### ネイティブ機能の追加

デスクトップ機能（通知、メニュー、トレイなど）を追加する場合：

1. `src/main/index.ts` にコードを追加します
2. 必要に応じて機能別にファイルを分割（例: `src/main/menu.ts`, `src/main/tray.ts`）

```typescript
// 例：システムトレイの追加
import { Tray, Menu } from "electron";

let tray: Tray | null = null;

function createTray() {
  tray = new Tray(path.join(__dirname, "../assets/tray-icon.png"));
  const contextMenu = Menu.buildFromTemplate([
    { label: "アプリを表示", click: showApp },
    { label: "終了", click: () => app.quit() },
  ]);

  tray.setToolTip("あなたのアプリケーション");
  tray.setContextMenu(contextMenu);
}
```

## ⚠️ 注意事項とベストプラクティス

### 1. セキュリティについて

このテンプレートはセキュリティを重視して設計されています。以下の設定は**変更しないでください**：

- `contextIsolation: true` - レンダラープロセスとメインプロセスのコンテキスト分離を保証
- `nodeIntegration: false` - レンダラープロセスから Node.js API への直接アクセスを防ぐ
- `sandbox: true` - レンダラープロセスをサンドボックス化
- Content Security Policy (CSP) - HTML ファイルのセキュリティ強化

### 2. プロジェクト構造の維持

- **適切なフォルダ分割を維持**: メインプロセス、プリロードスクリプト、レンダラープロセスのコードはそれぞれ専用のフォルダに配置してください
- **型定義を活用**: TypeScript の強みを生かし、適切なインターフェイスや型を定義してください

### 3. IPC 通信のセキュリティ

- **常にチャネル名をホワイトリスト化**: 許可されたチャネル名のみを使用するよう制限
- **送信元の検証**: メインプロセスで通信元の URL を検証

### 4. ファイルアクセスとデータ保存

ユーザーデータを保存する場合、適切なディレクトリを使用します：

```typescript
// 例：アプリデータの保存先取得
const userDataPath = app.getPath("userData");
```

## 🛠️ 高度なカスタマイズ

### ビルド設定の変更

`electron.vite.config.js` を編集してビルド設定をカスタマイズできます。

### パッケージング設定の変更

`package.json` の `build` セクションで electron-builder の設定を調整します。

```json
"build": {
  "appId": "com.yourcompany.yourappname",
  "productName": "Your App Name",
  "mac": {
    "category": "public.app-category.utilities"
  },
  "win": {
    "target": ["nsis", "portable"]
  },
  "linux": {
    "target": ["deb", "AppImage"]
  }
}
```

## 📚 トラブルシューティング

### 開発時の問題

- **ホットリロードが機能しない**: `npm run dev` で実行時にホットリロードが効かない場合、一旦プロセスを終了し、再度実行してみてください。
- **モジュールが見つからない**: `npm install` を再実行して依存関係を更新してください。
- **ビルドエラー**: `node_modules` フォルダを削除して `npm install` を再実行してください。

### パッケージング時の問題

- **アイコンエラー**: 適切なフォーマットのアイコンファイルを用意しているか確認してください（Windows: .ico, macOS: .icns, Linux: .png）。
- **ビルドが失敗する**: ビルドツールが正しくインストールされているか確認してください（Windows: windows-build-tools, Linux: build-essential）。

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は `LICENSE` ファイルを参照してください。

## 🤝 貢献

バグ報告や機能リクエスト、プルリクエストは大歓迎です。このテンプレートをより良くしていくために、ぜひ貢献をお願いします。

## 📚 参考リンク

- [Electron ドキュメント](https://www.electronjs.org/docs)
- [TypeScript ドキュメント](https://www.typescriptlang.org/docs/)
- [electron-vite ドキュメント](https://electron-vite.github.io/)
- [electron-builder ドキュメント](https://www.electron.build/)

---

このテンプレートを使って、素晴らしいデスクトップアプリケーションを開発してください！何か質問や提案があれば、GitHub の Issue を通じてお気軽にお問い合わせください。
