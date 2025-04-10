# FrameSelector

`FrameSelector`は、画像やコンテンツの周りに表示するフレームを選択するためのコンポーネントです。異なるスタイル、色、角の丸みを持つフレームを選択できます。

## インポート

```jsx
import { FrameSelector } from 'react-image-edit';
```

## 使用例

```jsx
import React, { useState } from 'react';
import { FrameSelector } from 'react-image-edit';

function App() {
  const [selectedFrame, setSelectedFrame] = useState(null);

  const handleFrameSelect = (frame) => {
    setSelectedFrame(frame);
    console.log('選択されたフレーム:', frame);
  };

  return (
    <div>
      <FrameSelector
        onFrameSelect={handleFrameSelect}
        initialFrame={null}
      />
      
      {selectedFrame && (
        <div>
          <p>選択されたフレーム:</p>
          <pre>{JSON.stringify(selectedFrame, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

## Props

| プロパティ | 型 | デフォルト値 | 説明 |
|------------|------|---------|-------------|
| onFrameSelect | (frame: { color: string; style: 'solid' \| 'dashed' \| 'double'; borderRadius?: number } \| null) => void | 必須 | フレームが選択されたときのコールバック |
| initialFrame | { color: string; style: 'solid' \| 'dashed' \| 'double'; borderRadius?: number } \| null | null | 初期選択フレーム |
| className | string | '' | コンポーネントに適用する追加のCSSクラス |

## 詳細

### フレーム選択

`onFrameSelect`コールバックは、ユーザーがフレームを選択したときに呼び出されます。コールバックには、選択されたフレームのデータ（色、スタイル、角の丸み）が渡されます。フレームが選択されていない場合（「なし」が選択された場合）は、`null`が渡されます。

```jsx
const handleFrameSelect = (frame) => {
  if (frame) {
    console.log(`フレーム選択: ${frame.style}, 色: ${frame.color}, 角の丸み: ${frame.borderRadius}px`);
  } else {
    console.log('フレームなし');
  }
};

<FrameSelector
  onFrameSelect={handleFrameSelect}
/>
```

### 初期フレーム

`initialFrame`プロパティを使用して、初期選択フレームを指定できます。これは、既存のフレームを編集する場合に便利です。

```jsx
const initialFrame = {
  color: '#228B22',
  style: 'double',
  borderRadius: 15
};

<FrameSelector
  initialFrame={initialFrame}
  onFrameSelect={handleFrameSelect}
/>
```

### 利用可能なフレーム

コンポーネントには、以下の事前定義されたフレームが含まれています：

1. **クラシック**：実線（solid）、茶色（#8B4513）
2. **モダン**：破線（dashed）、青色（#1E90FF）
3. **ホリデー**：二重線（double）、緑色（#228B22）

また、「なし」オプションを選択して、フレームを削除することもできます。

### 角の丸み

フレームが選択されている場合、ユーザーは角の丸みを調整するためのスライダーを使用できます。角の丸みは0〜50ピクセルの範囲で指定できます。

### フレームプレビュー

フレームが選択されている場合、選択されたフレームのプレビューが表示されます。これにより、ユーザーは角の丸みを調整しながら、フレームの外観を確認できます。

### スタイリング

`className`プロパティを使用して、コンポーネントに追加のCSSクラスを適用できます。

```jsx
<FrameSelector
  onFrameSelect={handleFrameSelect}
  className="my-custom-frame-selector"
/>
```

```css
.my-custom-frame-selector {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
}
```

## 戻り値の形式

`onFrameSelect`コールバックに渡されるフレームオブジェクトの形式は以下の通りです：

```typescript
{
  color: string;       // CSS色文字列（例：'#228B22'）
  style: 'solid' | 'dashed' | 'double';  // フレームのスタイル
  borderRadius?: number;  // 角の丸みのピクセル値（オプション）
}
```

フレームが選択されていない場合は、`null`が渡されます。

## カスタマイズ

このコンポーネントは、事前定義されたフレームオプションを提供していますが、必要に応じて独自のフレームオプションを実装することもできます。その場合は、`onFrameSelect`コールバックを使用して、選択されたフレームのデータを取得し、独自のロジックで処理することができます。