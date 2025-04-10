# ImageUpload

`ImageUpload`は、画像をアップロードし、その不透明度を調整するためのコンポーネントです。

## インポート

```jsx
import { ImageUpload } from 'react-image-edit';
```

## 使用例

```jsx
import React, { useState } from 'react';
import { ImageUpload } from 'react-image-edit';

function App() {
  const [opacity, setOpacity] = useState(100);
  
  const handleImageUpload = (imageDataUrl) => {
    console.log('画像がアップロードされました:', imageDataUrl);
    // 画像データURLを使用して何かを行う
  };

  return (
    <div>
      <ImageUpload
        onImageUpload={handleImageUpload}
        onOpacityChange={setOpacity}
        opacity={opacity}
        maxFileSize={2 * 1024 * 1024} // 2MB
      />
    </div>
  );
}
```

## Props

| プロパティ | 型 | デフォルト値 | 説明 |
|------------|------|---------|-------------|
| onImageUpload | (imageDataUrl: string) => void | 必須 | 画像がアップロードされたときのコールバック |
| onOpacityChange | (opacity: number) => void | 必須 | 不透明度が変更されたときのコールバック |
| opacity | number | 必須 | 現在の不透明度（0〜100） |
| maxFileSize | number | 5 * 1024 * 1024 (5MB) | 最大ファイルサイズ（バイト単位） |
| className | string | '' | コンポーネントに適用する追加のCSSクラス |

## 詳細

### 画像アップロード

`onImageUpload`コールバックは、ユーザーが画像をアップロードしたときに呼び出されます。コールバックには、アップロードされた画像のデータURL（Base64エンコードされた文字列）が渡されます。

```jsx
const handleImageUpload = (imageDataUrl) => {
  // 画像データURLを使用して何かを行う
  setBackgroundImage(imageDataUrl);
};

<ImageUpload
  onImageUpload={handleImageUpload}
  // その他のプロパティ...
/>
```

### 不透明度の制御

`opacity`プロパティと`onOpacityChange`コールバックは、画像の不透明度を制御します。不透明度は0〜100の範囲の数値で指定します（0は完全に透明、100は完全に不透明）。

```jsx
const [opacity, setOpacity] = useState(80);

<ImageUpload
  opacity={opacity}
  onOpacityChange={setOpacity}
  // その他のプロパティ...
/>
```

### ファイルサイズの制限

`maxFileSize`プロパティは、アップロードできる画像の最大サイズをバイト単位で指定します。デフォルトは5MBです。ユーザーがこのサイズを超える画像をアップロードしようとすると、エラーメッセージが表示されます。

```jsx
<ImageUpload
  maxFileSize={2 * 1024 * 1024} // 2MB
  // その他のプロパティ...
/>
```

### エラー処理

コンポーネントは、ファイルサイズの制限を超えた場合など、エラーが発生した場合にエラーメッセージを表示します。エラーメッセージは、ユーザーが新しい画像を正常にアップロードすると自動的に消えます。

### スタイリング

`className`プロパティを使用して、コンポーネントに追加のCSSクラスを適用できます。

```jsx
<ImageUpload
  // その他のプロパティ...
  className="my-custom-image-upload"
/>
```

```css
.my-custom-image-upload {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
}
```

## 注意事項

- サポートされている画像形式は、ブラウザがサポートする形式（通常はJPEG、PNG、GIF、SVGなど）です。
- アップロードされた画像は、データURLとしてメモリに保持されます。大きな画像や多数の画像を扱う場合は、メモリ使用量に注意してください。
- 画像のプレビューは提供されていないため、必要に応じて別途実装する必要があります。