# ImageEditorComponent

`ImageEditorComponent`は、React Image Editの中核となるコンポーネントです。このコンポーネントは、画像編集のためのキャンバスを提供し、テキスト、画像、フレームなどの要素を追加・編集するためのAPIを提供します。

## インポート

```jsx
import { ImageEditorComponent, ImageEditorRef } from 'react-imageedit';
```

## 使用例

```jsx
import React, { useRef } from 'react';
import { ImageEditorComponent, ImageEditorRef } from 'react-imageedit';

function App() {
  const editorRef = useRef(null);

  return (
    <div>
      <ImageEditorComponent
        ref={editorRef}
        width={800}
        height={600}
        initialElements={[]}
        onElementsChange={(elements) => console.log(elements)}
        className="my-editor"
      />
    </div>
  );
}
```

## Props

| プロパティ | 型 | デフォルト値 | 説明 |
|------------|------|---------|-------------|
| width | number | 800 | キャンバスの幅（ピクセル単位） |
| height | number | 600 | キャンバスの高さ（ピクセル単位） |
| initialElements | EditorElement[] | [] | エディタの初期要素 |
| onElementsChange | (elements: EditorElement[]) => void | undefined | 要素が変更されたときのコールバック関数 |
| className | string | '' | コンポーネントに適用する追加のCSSクラス |

## Ref Methods

`ImageEditorComponent`は、`useRef`フックを使用してアクセスできるメソッドを提供します。

### addText

テキスト要素を追加します。

```typescript
addText(textElement: Omit<TextElement, 'id'>): string | null;
```

#### パラメータ

- `textElement`: テキスト要素のデータ（`id`を除く）
  - `text`: テキストの内容
  - `color`: テキストの色（CSS色文字列）
  - `fontSize`: フォントサイズ（ピクセル単位）
  - `fontFamily`: フォントファミリー
  - `position`: テキストの位置（`{ x: number, y: number }`）
  - `weight`: フォントの太さ（'normal', 'bold', 'lighter'など）

#### 戻り値

追加されたテキスト要素のID、または失敗した場合は`null`

#### 使用例

```jsx
const id = editorRef.current.addText({
  text: 'こんにちは、世界！',
  color: '#FF0000',
  fontSize: 30,
  fontFamily: 'Arial',
  position: { x: 400, y: 300 },
  weight: 'bold'
});
```

### addImage

画像要素を追加します。

```typescript
addImage(src: string, options: Omit<ImageElement, 'src'>): Promise<string | null>;
```

#### パラメータ

- `src`: 画像のURL（データURL、ファイルURL、またはリモートURL）
- `options`: 画像オプション（`src`を除く）
  - `opacity`: 不透明度（0.0〜1.0）
  - `position`: 画像の位置（`{ x: number, y: number }`）（オプション）
  - `size`: 画像のサイズ（`{ width: number, height: number }`）（オプション）

#### 戻り値

追加された画像要素のIDを解決するPromise、または失敗した場合は`null`

#### 使用例

```jsx
const id = await editorRef.current.addImage('https://example.com/image.jpg', {
  opacity: 0.8,
  // 位置とサイズは自動的に計算されます（縦100%表示）
});
```

### addFrame

フレーム要素を追加します。

```typescript
addFrame(frameElement: FrameElement): string | null;
```

#### パラメータ

- `frameElement`: フレーム要素のデータ
  - `color`: フレームの色（CSS色文字列）
  - `style`: フレームのスタイル（'solid', 'dashed', 'double'）
  - `borderRadius`: 角の丸みの半径（ピクセル単位）（オプション）

#### 戻り値

追加されたフレーム要素のID、または失敗した場合は`null`

#### 使用例

```jsx
const id = editorRef.current.addFrame({
  color: '#0000FF',
  style: 'dashed',
  borderRadius: 20
});
```

### removeElement

指定されたIDの要素を削除します。

```typescript
removeElement(id: string): boolean;
```

#### パラメータ

- `id`: 削除する要素のID

#### 戻り値

削除が成功した場合は`true`、失敗した場合は`false`

#### 使用例

```jsx
const success = editorRef.current.removeElement('text-1');
```

### removeAllElements

すべての要素を削除します。

```typescript
removeAllElements(): void;
```

#### 使用例

```jsx
editorRef.current.removeAllElements();
```

### updateElement

指定されたIDの要素を更新します。

```typescript
updateElement(id: string, data: Partial<TextElement | ImageElement | FrameElement>): boolean;
```

#### パラメータ

- `id`: 更新する要素のID
- `data`: 更新するデータ（部分的なオブジェクト）

#### 戻り値

更新が成功した場合は`true`、失敗した場合は`false`

#### 使用例

```jsx
const success = editorRef.current.updateElement('text-1', {
  color: '#00FF00',
  fontSize: 40
});
```

### updateElementPosition

指定されたIDの要素の位置を更新します。

```typescript
updateElementPosition(id: string, position: { x: number; y: number }): boolean;
```

#### パラメータ

- `id`: 更新する要素のID
- `position`: 新しい位置（`{ x: number, y: number }`）

#### 戻り値

更新が成功した場合は`true`、失敗した場合は`false`

#### 使用例

```jsx
const success = editorRef.current.updateElementPosition('text-1', { x: 200, y: 150 });
```

### exportToDataURL

キャンバスをデータURLとしてエクスポートします。

```typescript
exportToDataURL(type?: string, quality?: number): string | null;
```

#### パラメータ

- `type`: 画像の種類（'image/png', 'image/jpeg'など）（オプション、デフォルトは'image/png'）
- `quality`: 画像の品質（0.0〜1.0）（オプション、デフォルトは0.95）

#### 戻り値

データURL、または失敗した場合は`null`

#### 使用例

```jsx
// PNG形式でエクスポート
const pngDataUrl = editorRef.current.exportToDataURL();

// JPEG形式でエクスポート（品質: 0.9）
const jpegDataUrl = editorRef.current.exportToDataURL('image/jpeg', 0.9);
```

### getElements

エディタ内のすべての要素を取得します。

```typescript
getElements(): EditorElement[];
```

#### 戻り値

エディタ内のすべての要素の配列

#### 使用例

```jsx
const elements = editorRef.current.getElements();
console.log(elements);
```

### getCanvas

キャンバス要素を取得します。

```typescript
getCanvas(): HTMLCanvasElement | null;
```

#### 戻り値

キャンバス要素、または失敗した場合は`null`

#### 使用例

```jsx
const canvas = editorRef.current.getCanvas();
if (canvas) {
  // キャンバスを直接操作
  const ctx = canvas.getContext('2d');
  // ...
}
```

## スタイリング

`ImageEditorComponent`は、以下のCSSクラスを提供します：

- `.image-editor-container`: エディタのコンテナ要素
- `.image-editor-canvas`: キャンバス要素

これらのクラスを使用して、エディタのスタイルをカスタマイズできます：

```css
.image-editor-container {
  border: 2px solid #4CAF50;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-editor-canvas {
  background-color: #f5f5f5;
}
```

また、`className`プロパティを使用して、追加のCSSクラスを適用することもできます：

```jsx
<ImageEditorComponent
  className="my-custom-editor"
  // ...
/>
```

```css
.my-custom-editor {
  margin: 20px;
  padding: 10px;
}