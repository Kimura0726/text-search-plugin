# Figma Text Search Plugin

Figma ファイル内の任意のテキストを含むページを検索して一覧化するプラグインです。

## 機能

- ✅ 全ページを対象としたテキスト検索
- ✅ 検索結果の一覧表示（ページ名、ノード名、テキスト内容、座標）
- ✅ 検索結果をクリックして該当ノードに移動
- ✅ テキストのハイライト表示
- ✅ リアルタイム検索（Enter キーでも実行可能）

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. TypeScript のコンパイル

```bash
# 一回だけビルド
npm run build

# 開発時（ファイル監視）
npm run watch
```

### 3. Figma にプラグインを追加

1. Figma を開く
2. メニューから `Plugins` → `Development` → `Import plugin from manifest...` を選択
3. `manifest.json` ファイルを選択
4. プラグインが追加されます

## ファイル構成

```
├── manifest.json       # プラグインの設定ファイル
├── code.ts            # メインのプラグインロジック
├── ui.html            # ユーザーインターフェース
├── tsconfig.json      # TypeScript設定
├── package.json       # npm設定
└── README.md          # このファイル
```

## 使用方法

1. Figma でプラグインを起動
2. 検索したいテキストを入力
3. 「検索」ボタンをクリックまたは Enter キーを押す
4. 検索結果一覧が表示される
5. 結果をクリックして該当ノードに移動

## 技術仕様

- **言語**: TypeScript
- **ビルドツール**: TypeScript Compiler（Webpack は使用しない）
- **対象**: Figma の全ページ内のテキストノード
- **検索方式**: 大文字小文字を区別しない部分一致検索

## 開発

### ファイル監視モードでの開発

```bash
npm run watch
```

このコマンドで TypeScript ファイルの変更を監視し、自動的にコンパイルします。

### デバッグ

Figma のプラグイン開発者コンソールを使用してデバッグできます：

1. プラグイン起動後、`Plugins` → `Development` → `Open Console`
2. `console.log()` の出力やエラーが確認できます

## カスタマイズ

### 検索対象の拡張

`code.ts` の `traverseNode` 関数を修正することで、テキスト以外のノードタイプも検索対象に含めることができます。

### UI のカスタマイズ

`ui.html` の CSS 部分を修正することで、見た目をカスタマイズできます。

## ライセンス

MIT License
