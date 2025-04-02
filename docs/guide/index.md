# 紹介

React Image Editは、画像編集と生成のためのReactコンポーネントライブラリです。テキスト追加、画像アップロード、フレーム追加などの機能を提供します。

## 主な機能

### 画像アップロード

画像をアップロードして編集できます。画像は縦100%表示に対応し、アスペクト比を維持します。

```jsx
import { ImageEditorComponent, ImageUpload } from 'react-imageedit';

// 画像アップロードの例
const handleImageUpload = (imageDataUrl) => {
  editorRef.current.addImage(imageDataUrl, {
    opacity: 1
    // 位置とサイズは自動的に計算されます
  });
};

<ImageUpload onImageUpload={handleImageUpload} />
```

### テキスト追加

カスタマイズ可能なテキストを追加できます。フォント、サイズ、色、太さを調整できます。

```jsx
import { ImageEditorComponent } from 'react-imageedit';

// テキスト追加の例
editorRef.current.addText({
  text: 'こんにちは、世界！',
  color: '#FF0000',
  fontSize: 30,
  fontFamily: 'Yu Gothic, sans-serif',
  weight: 'bold',
  position: { x: 400, y: 300 }
});
```

### フレーム追加

様々なスタイル、色、角丸のフレームを追加できます。

```jsx
import { ImageEditorComponent } from 'react-imageedit';

// フレーム追加の例
editorRef.current.addFrame({
  color: '#0000FF',
  style: 'dashed',
  borderRadius: 20
});
```

### ドラッグ機能

テキスト要素をドラッグして自由に配置できます。

```jsx
// テキスト要素を追加した後、キャンバス上でドラッグして位置を調整できます
// 内部的にマウスイベントを処理しているため、特別な設定は必要ありません
```

### エクスポート

編集した画像をPNGまたはJPEG形式でエクスポートできます。

```jsx
import { ImageEditorComponent } from 'react-imageedit';

// PNG形式でエクスポート
const pngDataUrl = editorRef.current.exportToDataURL('image/png');

// JPEG形式でエクスポート（品質: 0.9）
const jpegDataUrl = editorRef.current.exportToDataURL('image/jpeg', 0.9);
```

## なぜReact Image Editを使うのか？

- **シンプル**: 使いやすいAPIと直感的なコンポーネント
- **軽量**: 依存関係が少なく、バンドルサイズが小さい
- **カスタマイズ可能**: 完全にカスタマイズ可能なUIコンポーネント
- **TypeScript対応**: 型定義が組み込まれている
- **モダン**: 最新のReact機能（Hooks、Ref）を活用
- **日本語サポート**: 日本語フォントと日本語UIをサポート

## 次のステップ

- [インストール](/guide/installation)方法を確認する
- [基本的な使い方](/guide/usage)を学ぶ
- [APIリファレンス](/api/)を参照する
- [サンプル](/examples/)を試す