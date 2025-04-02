# 基本的な使い方

このページでは、React Image Editの基本的な使い方の例を紹介します。

## シンプルなエディタ

以下は、最も基本的なエディタの実装例です：

```jsx
import React, { useRef } from 'react';
import { ImageEditorComponent, ImageEditorRef } from 'react-imageedit';

function SimpleEditor() {
  const editorRef = useRef(null);

  const handleExport = () => {
    if (editorRef.current) {
      const dataUrl = editorRef.current.exportToDataURL();
      // データURLを使って画像をダウンロード
      const link = document.createElement('a');
      link.download = 'edited-image.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div>
      <h1>シンプル画像エディタ</h1>
      <div style={{ marginBottom: '20px' }}>
        <ImageEditorComponent
          ref={editorRef}
          width={800}
          height={600}
        />
      </div>
      <button onClick={handleExport}>画像をエクスポート</button>
    </div>
  );
}

export default SimpleEditor;
```

このシンプルなエディタは、800x600ピクセルのキャンバスを提供し、画像をPNG形式でエクスポートする機能を持っています。

## ライブデモ

<div class="editor-demo">
  <iframe src="/react-imageedit/demo/simple-editor.html" width="100%" height="700" frameborder="0"></iframe>
</div>

## コード解説

### コンポーネントのインポート

```jsx
import { ImageEditorComponent, ImageEditorRef } from 'react-imageedit';
```

必要なコンポーネントをインポートします。`ImageEditorComponent`はエディタのメインコンポーネントで、`ImageEditorRef`はTypeScriptの型定義です。

### Refの作成

```jsx
const editorRef = useRef(null);
```

`useRef`フックを使用して、エディタコンポーネントへの参照を作成します。これにより、コンポーネントのメソッドを呼び出すことができます。

### エクスポート関数

```jsx
const handleExport = () => {
  if (editorRef.current) {
    const dataUrl = editorRef.current.exportToDataURL();
    // データURLを使って画像をダウンロード
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = dataUrl;
    link.click();
  }
};
```

この関数は、エディタの内容をPNG形式でエクスポートし、ダウンロードします。`exportToDataURL`メソッドは、キャンバスの内容をデータURLとして返します。

### エディタコンポーネントのレンダリング

```jsx
<ImageEditorComponent
  ref={editorRef}
  width={800}
  height={600}
/>
```

エディタコンポーネントをレンダリングします。`ref`プロパティを使用して、コンポーネントへの参照を設定します。`width`と`height`プロパティは、キャンバスのサイズを指定します。

## 次のステップ

より高度な例については、以下のページを参照してください：

- [テキストエディタ](/examples/text-editor)
- [画像エディタ](/examples/image-editor)
- [フレームエディタ](/examples/frame-editor)
- [完全なエディタ](/examples/full-editor)