# React Image Edit

React Image Editは、画像編集と生成のためのReactコンポーネントライブラリです。テキスト追加、画像アップロード、フレーム追加などの機能を提供します。

![React Image Edit](https://github.com/FAL-coffee/react-imageedit/raw/main/docs/public/screenshot.png)

## 機能

- 画像のアップロードと不透明度調整（縦100%表示対応）
- テキストの追加とカスタマイズ（フォント、サイズ、色、太さ）
- 豊富な日本語フォントサポート
- フレームの追加（スタイル、色、角丸）
- ドラッグ＆ドロップによる要素の配置
- 画像としてエクスポート（PNG/JPEG）
- 完全にカスタマイズ可能なUI

## インストール

```bash
npm install react-imageedit
# または
yarn add react-imageedit
```

## 使い方

### 基本的な使い方

```jsx
import React, { useRef } from 'react';
import { ImageEditorComponent, ImageEditorRef } from 'react-imageedit';

const App = () => {
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
};

export default App;
```

### テキストの追加

```jsx
import React, { useRef } from 'react';
import { ImageEditorComponent, ImageEditorRef, TextInput, TextCustomization } from 'react-imageedit';

const TextEditor = () => {
  const editorRef = useRef(null);
  const [text, setText] = React.useState('サンプルテキスト');
  const [color, setColor] = React.useState('#000000');
  const [fontSize, setFontSize] = React.useState(30);
  const [fontFamily, setFontFamily] = React.useState('Arial');
  const [weight, setWeight] = React.useState('normal');

  const handleAddText = () => {
    if (editorRef.current) {
      editorRef.current.addText({
        text,
        color,
        fontSize,
        fontFamily,
        weight,
        position: { x: 400, y: 300 }
      });
    }
  };

  return (
    <div>
      <ImageEditorComponent
        ref={editorRef}
        width={800}
        height={600}
      />
      <div>
        <TextInput
          label="テキスト"
          value={text}
          onChange={setText}
        />
        <TextCustomization
          label="テキスト"
          color={color}
          setColor={setColor}
          size={fontSize}
          setSize={setFontSize}
          family={fontFamily}
          setFamily={setFontFamily}
          weight={weight}
          setWeight={setWeight}
        />
        <button onClick={handleAddText}>テキストを追加</button>
      </div>
    </div>
  );
};
```

### 画像のアップロード

```jsx
import React, { useRef } from 'react';
import { ImageEditorComponent, ImageEditorRef, ImageUpload } from 'react-imageedit';

const ImageEditor = () => {
  const editorRef = useRef(null);
  const [opacity, setOpacity] = React.useState(100);

  const handleImageUpload = (imageDataUrl) => {
    if (editorRef.current) {
      editorRef.current.addImage(imageDataUrl, {
        opacity: opacity / 100,
        // 位置とサイズは自動的に計算されます（縦100%表示）
      });
    }
  };

  return (
    <div>
      <ImageEditorComponent
        ref={editorRef}
        width={800}
        height={600}
      />
      <div>
        <ImageUpload
          onImageUpload={handleImageUpload}
          onOpacityChange={setOpacity}
          opacity={opacity}
        />
      </div>
    </div>
  );
};
```

### フレームの追加

```jsx
import React, { useRef } from 'react';
import { ImageEditorComponent, ImageEditorRef, FrameSelector } from 'react-imageedit';

const FrameEditor = () => {
  const editorRef = useRef(null);

  const handleFrameSelect = (frame) => {
    if (editorRef.current && frame) {
      editorRef.current.addFrame(frame);
    }
  };

  return (
    <div>
      <ImageEditorComponent
        ref={editorRef}
        width={800}
        height={600}
      />
      <div>
        <FrameSelector
          onFrameSelect={handleFrameSelect}
        />
      </div>
    </div>
  );
};
```

### テキストのドラッグ機能

テキスト要素はキャンバス上でドラッグして移動できます。

```jsx
// テキスト要素を追加した後、キャンバス上でドラッグして位置を調整できます
// 内部的にマウスイベントを処理しているため、特別な設定は必要ありません
```

## サンプルアプリケーション

リポジトリには、React Image Editの機能を紹介するサンプルアプリケーションが含まれています。

### サンプルの実行方法

```bash
# リポジトリをクローン
git clone https://github.com/FAL-coffee/react-imageedit.git
cd react-imageedit

# 依存関係をインストール
npm install

# ライブラリをビルド
npm run build

# サンプルアプリを起動
cd react-imageedit-sample
npm install
npm run dev
```

サンプルアプリは `http://localhost:5173` で実行されます。

## API

### ImageEditorComponent

画像エディタのメインコンポーネント。

#### Props

| プロパティ | 型 | デフォルト値 | 説明 |
|------------|------|---------|-------------|
| width | number | 800 | キャンバスの幅 |
| height | number | 600 | キャンバスの高さ |
| initialElements | EditorElement[] | [] | 初期要素 |
| onElementsChange | (elements: EditorElement[]) => void | undefined | 要素が変更されたときのコールバック |
| className | string | '' | 追加のCSSクラス |

#### Ref Methods

| メソッド | 説明 |
|---------|-------------|
| addText(textElement: TextElement) | テキストを追加する |
| addImage(src: string, options: ImageElement) | 画像を追加する |
| addFrame(frameElement: FrameElement) | フレームを追加する |
| removeElement(id: string) | 要素を削除する |
| removeAllElements() | すべての要素を削除する |
| updateElement(id: string, data: Partial<TextElement \| ImageElement \| FrameElement>) | 要素を更新する |
| updateElementPosition(id: string, position: { x: number; y: number }) | 要素の位置を更新する |
| exportToDataURL(type?: string, quality?: number) | キャンバスをデータURLとしてエクスポートする |
| getElements() | 要素の配列を取得する |
| getCanvas() | キャンバス要素を取得する |

### TextInput

テキスト入力コンポーネント。

#### Props

| プロパティ | 型 | デフォルト値 | 説明 |
|------------|------|---------|-------------|
| label | string | - | 入力フィールドのラベル |
| value | string | - | 入力値 |
| onChange | (value: string) => void | - | 値が変更されたときのコールバック |
| placeholder | string | `ここに${label}を入力してください...` | プレースホルダーテキスト |
| rows | number | 3 | テキストエリアの行数 |
| className | string | '' | 追加のCSSクラス |

### TextCustomization

テキストカスタマイズコンポーネント。

#### Props

| プロパティ | 型 | デフォルト値 | 説明 |
|------------|------|---------|-------------|
| label | string | - | カスタマイズ対象のラベル |
| color | string | - | テキストの色 |
| setColor | (color: string) => void | - | 色が変更されたときのコールバック |
| size | number | - | フォントサイズ |
| setSize | (size: number) => void | - | サイズが変更されたときのコールバック |
| family | string | - | フォントファミリー |
| setFamily | (family: string) => void | - | フォントファミリーが変更されたときのコールバック |
| weight | string | - | フォントの太さ |
| setWeight | (weight: string) => void | - | フォントの太さが変更されたときのコールバック |
| className | string | '' | 追加のCSSクラス |

### ImageUpload

画像アップロードコンポーネント。

#### Props

| プロパティ | 型 | デフォルト値 | 説明 |
|------------|------|---------|-------------|
| onImageUpload | (imageDataUrl: string) => void | - | 画像がアップロードされたときのコールバック |
| onOpacityChange | (opacity: number) => void | - | 不透明度が変更されたときのコールバック |
| opacity | number | - | 現在の不透明度 |
| maxFileSize | number | 5 * 1024 * 1024 | 最大ファイルサイズ（バイト単位） |
| className | string | '' | 追加のCSSクラス |

### FrameSelector

フレーム選択コンポーネント。

#### Props

| プロパティ | 型 | デフォルト値 | 説明 |
|------------|------|---------|-------------|
| onFrameSelect | (frame: FrameElement \| null) => void | - | フレームが選択されたときのコールバック |
| initialFrame | FrameElement \| null | null | 初期選択フレーム |
| className | string | '' | 追加のCSSクラス |

## サポートしているフォント

### 英語フォント
- Arial
- Verdana
- Helvetica
- Times New Roman
- Courier New
- Georgia
- Palatino
- Garamond
- Comic Sans MS
- Impact

### 日本語フォント
- 游ゴシック (Yu Gothic)
- 游明朝 (Yu Mincho)
- メイリオ (Meiryo)
- MS Pゴシック (MS PGothic)
- MS P明朝 (MS PMincho)
- ヒラギノ角ゴ (Hiragino Kaku Gothic)
- ヒラギノ明朝 (Hiragino Mincho)
- 源ノ角ゴシック (Noto Sans JP)
- 源ノ明朝 (Noto Serif JP)

## 開発

### 開発環境のセットアップ

```bash
# リポジトリをクローン
git clone https://github.com/FAL-coffee/react-imageedit.git
cd react-imageedit

# 依存関係をインストール
npm install

# 開発モードで実行
npm run dev
```

### ビルド

```bash
npm run build
```

### テスト

```bash
npm test
```

## トラブルシューティング

### 画像がアップロードできない

- サポートされている画像形式（JPEG、PNG、GIF、SVG）を使用しているか確認してください
- ファイルサイズが最大サイズ（デフォルト: 5MB）を超えていないか確認してください

### テキストが表示されない

- フォントが正しく指定されているか確認してください
- テキストの色がキャンバスの背景色と同じでないか確認してください

### フレームの色が変わらない

- 最新バージョンを使用しているか確認してください（v0.2.0以降で修正）
- キャッシュをクリアしてみてください

## コントリビューション

コントリビューションを歓迎します！以下の手順に従ってください：

1. リポジトリをフォークする
2. 機能ブランチを作成する (`git checkout -b feature/amazing-feature`)
3. 変更をコミットする (`git commit -m 'Add some amazing feature'`)
4. ブランチをプッシュする (`git push origin feature/amazing-feature`)
5. プルリクエストを作成する

## ドキュメント

詳細なドキュメントは [VitePress ドキュメント](https://fal-coffee.github.io/react-imageedit/) で確認できます。

## ライセンス

MIT

## 作者

[FAL-coffee](https://github.com/FAL-coffee)