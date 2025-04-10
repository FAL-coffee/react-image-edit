# TextCustomization

`TextCustomization`は、テキストのスタイル（色、サイズ、フォント、太さ）をカスタマイズするためのコンポーネントです。

## インポート

```jsx
import { TextCustomization } from 'react-imageedit';
```

## 使用例

```jsx
import React, { useState } from 'react';
import { TextCustomization } from 'react-imageedit';

function App() {
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(24);
  const [family, setFamily] = useState('Arial');
  const [weight, setWeight] = useState('normal');

  return (
    <div>
      <TextCustomization
        label="タイトル"
        color={color}
        setColor={setColor}
        size={size}
        setSize={setSize}
        family={family}
        setFamily={setFamily}
        weight={weight}
        setWeight={setWeight}
      />
    </div>
  );
}
```

## Props

| プロパティ | 型 | デフォルト値 | 説明 |
|------------|------|---------|-------------|
| label | string | 必須 | カスタマイズ対象のラベル |
| color | string | 必須 | テキストの色 |
| setColor | (color: string) => void | 必須 | 色が変更されたときのコールバック |
| size | number | 必須 | フォントサイズ |
| setSize | (size: number) => void | 必須 | サイズが変更されたときのコールバック |
| family | string | 必須 | フォントファミリー |
| setFamily | (family: string) => void | 必須 | フォントファミリーが変更されたときのコールバック |
| weight | string | 必須 | フォントの太さ |
| setWeight | (weight: string) => void | 必須 | フォントの太さが変更されたときのコールバック |
| className | string | '' | コンポーネントに適用する追加のCSSクラス |

## 詳細

### ラベル

`label`プロパティは、カスタマイズ対象の名前を指定します。このラベルは、コンポーネントのタイトルとして表示されます。

```jsx
<TextCustomization
  label="メインタイトル"
  // その他のプロパティ...
/>
```

### 色

`color`プロパティと`setColor`コールバックは、テキストの色を制御します。色はCSS色文字列（例：'#FF0000'、'rgb(255, 0, 0)'）で指定します。

```jsx
const [color, setColor] = useState('#FF0000');

<TextCustomization
  label="タイトル"
  color={color}
  setColor={setColor}
  // その他のプロパティ...
/>
```

### サイズ

`size`プロパティと`setSize`コールバックは、フォントサイズを制御します。サイズはピクセル単位の数値で指定します。

```jsx
const [size, setSize] = useState(32);

<TextCustomization
  label="タイトル"
  size={size}
  setSize={setSize}
  // その他のプロパティ...
/>
```

### フォントファミリー

`family`プロパティと`setFamily`コールバックは、フォントファミリーを制御します。コンポーネントには、以下のフォントが含まれています：

- 英語フォント：Arial、Verdana、Times New Roman、Courier
- 装飾フォント：Mountains of Christmas、Snowburst One、Festive
- 日本語フォント：Noto Sans JP、Kosugi Maru、M PLUS Rounded 1c、Sawarabi Mincho、Sawarabi Gothic、Zen Maru Gothic、Yuji Syuku、Klee One

```jsx
const [family, setFamily] = useState('Noto Sans JP, sans-serif');

<TextCustomization
  label="タイトル"
  family={family}
  setFamily={setFamily}
  // その他のプロパティ...
/>
```

### フォントの太さ

`weight`プロパティと`setWeight`コールバックは、フォントの太さを制御します。以下の値が使用できます：

- 'normal'：普通
- 'bold'：太字
- 'lighter'：細字

```jsx
const [weight, setWeight] = useState('bold');

<TextCustomization
  label="タイトル"
  weight={weight}
  setWeight={setWeight}
  // その他のプロパティ...
/>
```

### スタイリング

`className`プロパティを使用して、コンポーネントに追加のCSSクラスを適用できます。

```jsx
<TextCustomization
  label="タイトル"
  // その他のプロパティ...
  className="my-custom-text-customization"
/>
```

```css
.my-custom-text-customization {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}