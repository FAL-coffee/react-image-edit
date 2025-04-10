# 基本的な使い方

このページでは、React Image Editの基本的な使い方を説明します。

## コンポーネントのインポート

まず、必要なコンポーネントをインポートします：

```jsx
import { ImageEditorComponent, ImageEditorRef } from 'react-image-edit';
```

## 基本的な実装

以下は、最も基本的な実装例です：

```jsx
import React, { useRef } from 'react';
import { ImageEditorComponent, ImageEditorRef } from 'react-image-edit';

function App() {
  const editorRef = useRef(null);

  return (
    <div>
      <h1>画像エディタ</h1>
      <ImageEditorComponent
        ref={editorRef}
        width={800}
        height={600}
      />
    </div>
  );
}

export default App;
```

この例では、800x600ピクセルのキャンバスを持つ画像エディタを作成しています。

## Refを使用した操作

`useRef`フックを使用して、エディタコンポーネントへの参照を作成します。これにより、コンポーネントのメソッドを呼び出すことができます：

```jsx
import React, { useRef } from 'react';
import { ImageEditorComponent, ImageEditorRef } from 'react-image-edit';

function App() {
  const editorRef = useRef(null);

  const handleAddText = () => {
    if (editorRef.current) {
      editorRef.current.addText({
        text: 'こんにちは、世界！',
        color: '#000000',
        fontSize: 30,
        fontFamily: 'Arial',
        weight: 'normal',
        position: { x: 400, y: 300 }
      });
    }
  };

  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.removeAllElements();
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
      <div>
        <button onClick={handleAddText}>テキストを追加</button>
        <button onClick={handleClear}>クリア</button>
      </div>
    </div>
  );
}

export default App;
```

## 要素の変更を監視する

`onElementsChange`プロパティを使用して、エディタ内の要素が変更されたときに通知を受け取ることができます：

```jsx
import React, { useRef, useState } from 'react';
import { ImageEditorComponent, ImageEditorRef, EditorElement } from 'react-image-edit';

function App() {
  const editorRef = useRef(null);
  const [elements, setElements] = useState([]);

  const handleElementsChange = (newElements) => {
    setElements(newElements);
    console.log('要素が変更されました:', newElements);
  };

  return (
    <div>
      <h1>画像エディタ</h1>
      <ImageEditorComponent
        ref={editorRef}
        width={800}
        height={600}
        onElementsChange={handleElementsChange}
      />
      <div>
        <p>要素数: {elements.length}</p>
      </div>
    </div>
  );
}

export default App;
```

## 画像のエクスポート

エディタで作成した画像をエクスポートするには、`exportToDataURL`メソッドを使用します：

```jsx
import React, { useRef } from 'react';
import { ImageEditorComponent, ImageEditorRef } from 'react-image-edit';

function App() {
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
      <h1>画像エディタ</h1>
      <ImageEditorComponent
        ref={editorRef}
        width={800}
        height={600}
      />
      <div>
        <button onClick={handleExport}>エクスポート</button>
      </div>
    </div>
  );
}

export default App;
```

## 初期要素の設定

`initialElements`プロパティを使用して、エディタの初期要素を設定できます：

```jsx
import React, { useRef } from 'react';
import { ImageEditorComponent, ImageEditorRef, EditorElement } from 'react-image-edit';

function App() {
  const editorRef = useRef(null);
  
  const initialElements = [
    {
      id: 'text-1',
      type: 'text',
      data: {
        text: 'こんにちは、世界！',
        color: '#000000',
        fontSize: 30,
        fontFamily: 'Arial',
        weight: 'normal',
        position: { x: 400, y: 300 }
      }
    }
  ];

  return (
    <div>
      <h1>画像エディタ</h1>
      <ImageEditorComponent
        ref={editorRef}
        width={800}
        height={600}
        initialElements={initialElements}
      />
    </div>
  );
}

export default App;
```

## スタイルのカスタマイズ

`className`プロパティを使用して、エディタのスタイルをカスタマイズできます：

```jsx
import React, { useRef } from 'react';
import { ImageEditorComponent, ImageEditorRef } from 'react-image-edit';
import './editor-styles.css'; // カスタムCSSファイル

function App() {
  const editorRef = useRef(null);

  return (
    <div>
      <h1>画像エディタ</h1>
      <ImageEditorComponent
        ref={editorRef}
        width={800}
        height={600}
        className="my-custom-editor"
      />
    </div>
  );
}

export default App;
```

`editor-styles.css`ファイルの例：

```css
.my-custom-editor {
  border: 2px solid #4CAF50;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.my-custom-editor .image-editor-canvas {
  background-color: #f5f5f5;
}
```

## 次のステップ

基本的な使い方を理解したら、以下のガイドで特定の機能について詳しく学びましょう：

- [テキスト追加](/guide/text)
- [画像アップロード](/guide/image)
- [フレーム追加](/guide/frame)
- [ドラッグ機能](/guide/drag)
- [エクスポート](/guide/export)