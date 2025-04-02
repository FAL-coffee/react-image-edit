---
layout: home

hero:
  name: "React Image Edit"
  text: "画像編集と生成のためのReactコンポーネントライブラリ"
  tagline: テキスト追加、画像アップロード、フレーム追加などの機能を提供
  image:
    src: /screenshot.png
    alt: React Image Edit
  actions:
    - theme: brand
      text: はじめる
      link: /guide/
    - theme: alt
      text: APIリファレンス
      link: /api/
    - theme: alt
      text: GitHub
      link: https://github.com/FAL-coffee/react-imageedit

features:
  - icon: 🖼️
    title: 画像アップロード
    details: 画像をアップロードして編集できます。縦100%表示に対応し、アスペクト比を維持します。
  - icon: 🔤
    title: テキスト追加
    details: カスタマイズ可能なテキストを追加できます。フォント、サイズ、色、太さを調整できます。
  - icon: 🇯🇵
    title: 日本語フォントサポート
    details: 游ゴシック、游明朝、メイリオなど、多数の日本語フォントをサポートしています。
  - icon: 🖼️
    title: フレーム追加
    details: 様々なスタイル、色、角丸のフレームを追加できます。
  - icon: 🖱️
    title: ドラッグ機能
    details: テキスト要素をドラッグして自由に配置できます。
  - icon: 💾
    title: エクスポート
    details: 編集した画像をPNGまたはJPEG形式でエクスポートできます。
---

## シンプルな使い方

```jsx
import React, { useRef } from 'react';
import { ImageEditorComponent } from 'react-imageedit';

function App() {
  const editorRef = useRef(null);

  const handleExport = () => {
    if (editorRef.current) {
      const dataUrl = editorRef.current.exportToDataURL();
      // dataUrlを使って画像をダウンロードするなどの処理
      const link = document.createElement('a');
      link.download = 'edited-image.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div>
      <h1>画像エディタ</h1>
      <ImageEditorComponent
        ref={editorRef}
        width={800}
        height={600}
      />
      <button onClick={handleExport}>エクスポート</button>
    </div>
  );
}
```

## インストール

```bash
npm install react-imageedit
# または
yarn add react-imageedit
```

## 特徴

- **軽量**: 依存関係が少なく、バンドルサイズが小さい
- **カスタマイズ可能**: 完全にカスタマイズ可能なUIコンポーネント
- **TypeScript対応**: 型定義が組み込まれている
- **モダン**: 最新のReact機能（Hooks、Ref）を活用
- **日本語サポート**: 日本語フォントと日本語UIをサポート