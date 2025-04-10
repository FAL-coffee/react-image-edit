# インストール

React Image Editは、npmまたはyarnを使用してインストールできます。

## 前提条件

React Image Editを使用するには、以下が必要です：

- Node.js 14.0.0以上
- React 16.8.0以上、17.x、18.x、または19.x（Hooks対応）

## npmを使用したインストール

```bash
npm install react-imageedit
```

## yarnを使用したインストール

```bash
yarn add react-imageedit
```

## CDNを使用したインストール

CDNを使用して直接スクリプトを読み込むこともできます：

```html
<script src="https://unpkg.com/react-imageedit/dist/index.js"></script>
```

ただし、CDNを使用する場合は、Reactも同様に読み込む必要があります：

```html
<script src="https://unpkg.com/react@19/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/react-imageedit/dist/index.js"></script>
```

または、React 17や18を使用することもできます：

```html
<script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/react-imageedit/dist/index.js"></script>
```

## TypeScriptの型定義

React Image Editには、TypeScriptの型定義が組み込まれています。追加のインストールは必要ありません。

```typescript
import { ImageEditorComponent, ImageEditorRef } from 'react-imageedit';
```

## ピアの依存関係

React Image Editは、以下のピアの依存関係を持っています：

- react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
- react-dom: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0

これらは、プロジェクトにすでにインストールされている必要があります。

## 次のステップ

インストールが完了したら、[基本的な使い方](/guide/usage)を確認して、React Image Editの使い方を学びましょう。