# API リファレンス

React Image Editは、画像編集のための様々なコンポーネントとAPIを提供します。このセクションでは、各コンポーネントとそのAPIについて詳しく説明します。

## コンポーネント

React Image Editは、以下の主要なコンポーネントを提供します：

- [ImageEditorComponent](/api/image-editor-component): 画像エディタのメインコンポーネント
- [TextInput](/api/text-input): テキスト入力コンポーネント
- [TextCustomization](/api/text-customization): テキストカスタマイズコンポーネント
- [ImageUpload](/api/image-upload): 画像アップロードコンポーネント
- [FrameSelector](/api/frame-selector): フレーム選択コンポーネント

## 型定義

React Image Editは、TypeScriptの型定義を提供しています。主な型定義は以下の通りです：

### EditorElement

エディタ内の要素を表す型です。

```typescript
interface EditorElement {
  id: string;
  type: 'text' | 'image' | 'frame';
  data: TextElement | ImageElement | FrameElement;
}
```

### TextElement

テキスト要素を表す型です。

```typescript
interface TextElement {
  text: string;
  color: string;
  fontSize: number;
  fontFamily: string;
  position: { x: number; y: number };
  weight: string;
}
```

### ImageElement

画像要素を表す型です。

```typescript
interface ImageElement {
  src: string;
  opacity: number;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}
```

### FrameElement

フレーム要素を表す型です。

```typescript
interface FrameElement {
  color: string;
  style: 'solid' | 'dashed' | 'double';
  borderRadius?: number;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}
```

### ImageEditorRef

画像エディタのRefインターフェースです。

```typescript
interface ImageEditorRef {
  addText: (textElement: Omit<TextElement, 'id'>) => string | null;
  addImage: (src: string, options: Omit<ImageElement, 'src'>) => Promise<string | null>;
  addFrame: (frameElement: FrameElement) => string | null;
  removeElement: (id: string) => boolean;
  removeAllElements: () => void;
  updateElement: (id: string, data: Partial<TextElement | ImageElement | FrameElement>) => boolean;
  updateElementPosition: (id: string, position: { x: number; y: number }) => boolean;
  exportToDataURL: (type?: string, quality?: number) => string | null;
  getElements: () => EditorElement[];
  getCanvas: () => HTMLCanvasElement | null;
}
```

## ユーティリティ関数

React Image Editは、以下のユーティリティ関数を提供します：

### loadImage

画像をロードする関数です。

```typescript
function loadImage(src: string): Promise<HTMLImageElement>;
```

### drawText

テキストを描画する関数です。

```typescript
function drawText(ctx: CanvasRenderingContext2D, textElement: TextElement): void;
```

### generateFrameSvg

フレームのSVG文字列を生成する関数です。

```typescript
function generateFrameSvg(
  frame: FrameElement,
  width: number,
  height: number
): string;
```

### dataURLtoBlob

データURLからBlobを作成する関数です。

```typescript
function dataURLtoBlob(dataUrl: string): Blob;
```

## 次のステップ

各コンポーネントの詳細なAPIリファレンスを確認するには、以下のリンクをクリックしてください：

- [ImageEditorComponent](/api/image-editor-component)
- [TextInput](/api/text-input)
- [TextCustomization](/api/text-customization)
- [ImageUpload](/api/image-upload)
- [FrameSelector](/api/frame-selector)