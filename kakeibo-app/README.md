# 家計簿アプリ

React + Vite で構築された日本語家計簿アプリ（ユーロ建て）。

## 機能

- 収入・支出・振替の記帳
- カテゴリー別予算管理（50/30/20 ルール）
- 資産（銀行口座）管理 + 並び替え
- サブスクリプション管理（カテゴリー紐付け）
- カレンダー表示（支出/収入切替）
- 貯金履歴の折れ線グラフ
- 月の開始日設定（給料日起点に対応）
- 初期残高一括設定
- データのエクスポート/インポート（JSON）
- localStorage 自動保存

## ローカル開発

```bash
npm install
npm run dev
```

→ http://localhost:5173 にアクセス

## ビルド

```bash
npm run build
```

→ `dist/` フォルダに静的ファイルが生成されます

## Netlify デプロイ手順

### 方法1: GitHubから自動デプロイ（推奨）

1. このフォルダを GitHub リポジトリにプッシュ
2. [Netlify](https://app.netlify.com/) にログイン
3. 「Add new site」→「Import an existing project」
4. GitHub を選択してリポジトリを連携
5. ビルド設定は `netlify.toml` から自動読み込み
6. 「Deploy」ボタンを押す

### 方法2: ドラッグ&ドロップ（手動）

1. ローカルで `npm install && npm run build` を実行
2. 生成された `dist/` フォルダを [Netlify Drop](https://app.netlify.com/drop) にドラッグ&ドロップ

### 方法3: Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## データのバックアップ

- データはブラウザの localStorage に自動保存されます
- アプリ内の設定タブ「バックアップ・復元」から JSON ファイルとして書き出し・読み込みが可能
- アプリのアップデート後も、JSON ファイルからデータを引き継げます
