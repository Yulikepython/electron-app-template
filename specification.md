# Electron アプリケーション開発ガイド（ローカルビルド向け）

以下のドキュメントは、リポジトリにあるコードを各環境（Windows, Ubuntu, macOS）で取得し、ローカルでビルド＆実行するまでの手順と、プロジェクト構成のルールをまとめたものです。後から見返してスムーズに開発・検証できるようにご活用ください。

---

## 1. プロジェクト構成ルール

```
my-electron-app/           # プロジェクトルート
├ README.md                # プロジェクト概要・このドキュメントへのリンク
├ LICENSE                  # ライセンス（必要に応じて）
├ .gitignore               # Git除外設定（node_modules, dist など）
├ package.json             # 依存・ビルド設定
├ main.js                  # Electron メインプロセスエントリポイント
├ src/                     # フロントエンドリソース
│   ├ index.html           # HTML テンプレート
│   ├ renderer.js          # レンダラープロセス用スクリプト
│   └ assets/              # 画像・CSS・その他静的ファイル
└ dist/                    # （生成）ビルド成果物出力先
```

- **ファイル命名**: `kebab-case`（例: `main.js`, `renderer.js`）
- **ディレクトリ構成**: 機能別に分け、src 内にまとめる
- **設定管理**: `package.json > build` セクションにビルド設定を記載
- **スクリプト**: `scripts` に `start`（開発）、`build`（配布用ビルド）を定義

---

## 2. 共通前提（全 OS）

1. **Node.js & npm**
   - 推奨: LTS（v18.x 以上）
   - インストール確認:
     ```bash
     node -v  # -> v18.x.x
     npm -v   # -> 9.x.x
     ```
2. **Git**
   - リポジトリ取得に使用
3. **リポジトリ構成**
   - `main.js`, `src/`, `package.json` が揃っていること

---

## 3. 初回セットアップ手順

以下は全 OS 共通です。

1. **リポジトリをクローン**

   ```bash
   git clone https://github.com/あなたのリポジトリ/my-electron-app.git
   cd my-electron-app
   ```

2. **依存パッケージをインストール**
   ```bash
   npm install
   ```

---

## 4. 開発用サーバ起動（動作確認）

- **コマンド**:
  ```bash
  npm run start
  ```
- ブラウザではなく、Electron ウィンドウが立ち上がる。
- UI の動作やボタン等の動作確認を行う。

---

## 5. 配布用ビルド

ローカル環境ごとにビルド可能です。クロスビルドは不要なので、各マシン上で実行します。

### 5.1 Windows ビルド

```bash
npm run build
```

- 出力: `dist/` 内に `MyElectronApp Setup x.y.z.exe` が生成される

### 5.2 Ubuntu（.deb）ビルド

```bash
npm run build
```

- 出力: `dist/` 内に `MyElectronApp-x.y.z.deb` が生成される

### 5.3 macOS ビルド

```bash
npm run build
```

- 出力: `dist/` 内に `.dmg` または `.zip` が生成される（設定に応じて）

---

## 6. ビルド成果物の検証

各 OS の標準的な方法でインストール・起動し、動作を確認します。

- **Windows**: `.exe` をダブルクリックしてインストール後、スタートメニューから起動
- **Ubuntu**:
  ```bash
  sudo dpkg -i dist/MyElectronApp-x.y.z.deb
  my-electron-app  # またはGUIのアプリ一覧から起動
  ```
- **macOS**: 生成された `.dmg` をマウントし、Applications へドラッグ＆インストール後起動

---

## 7. トラブルシューティング

- **依存エラー**: Node.js のバージョンを確認し、再インストール
- **ビルド失敗**: `electron-builder` のログを確認し、必要な OS 用ツール（e.g. `dpkg`, `wine` など）の有無をチェック
- **権限エラー**: ファイル実行権限を付与 (`chmod +x <ファイル>`) など

---

## 8. 参考リンク

- [Electron ドキュメント](https://www.electronjs.org/docs)
- [electron-builder リファレンス](https://www.electron.build/)

---

以上がリモートリポジトリからのローカルビルド手順とコード構成ルールです。開発中や構成変更後に、随時このドキュメントをアップデートしてください。