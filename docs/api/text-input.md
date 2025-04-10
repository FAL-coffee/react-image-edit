# TextInput

`TextInput`は、テキスト入力のためのシンプルなコンポーネントです。単一行または複数行のテキスト入力を提供します。

## インポート

```jsx
import { TextInput } from 'react-imageedit';
```

## 使用例

```jsx
import React, { useState } from 'react';
import { TextInput } from 'react-imageedit';

function App() {
  const [text, setText] = useState('');

  return (
    <div>
      <TextInput
        label="メッセージ"
        value={text}
        onChange={setText}
        placeholder="ここにメッセージを入力してください"
        rows={4}
      />
    </div>
  );
}
```

## Props

| プロパティ | 型 | デフォルト値 | 説明 |
|------------|------|---------|-------------|
| label | string | 必須 | 入力フィールドのラベル |
| value | string | 必須 | 入力値 |
| onChange | (value: string) => void | 必須 | 値が変更されたときのコールバック |
| placeholder | string | `ここに${label}を入力してください...` | プレースホルダーテキスト |
| rows | number | 3 | テキストエリアの行数 |
| className | string | '' | コンポーネントに適用する追加のCSSクラス |

## 詳細

### ラベル

`label`プロパティは、入力フィールドの上に表示されるラベルテキストを指定します。このラベルは、入力フィールドの目的を明確にするために使用されます。

```jsx
<TextInput
  label="タイトル"
  value={title}
  onChange={setTitle}
/>
```

### 値と変更ハンドラ

`value`プロパティは、入力フィールドの現在の値を指定します。`onChange`コールバックは、ユーザーが入力フィールドの値を変更したときに呼び出されます。

```jsx
const [message, setMessage] = useState('');

<TextInput
  label="メッセージ"
  value={message}
  onChange={setMessage}
/>
```

### プレースホルダー

`placeholder`プロパティは、入力フィールドが空のときに表示されるテキストを指定します。指定しない場合は、`ここに${label}を入力してください...`というデフォルトのプレースホルダーが使用されます。

```jsx
<TextInput
  label="メッセージ"
  value={message}
  onChange={setMessage}
  placeholder="お祝いのメッセージを入力してください"
/>
```

### 行数

`rows`プロパティは、テキストエリアの行数を指定します。デフォルトは3行です。

```jsx
<TextInput
  label="詳細説明"
  value={description}
  onChange={setDescription}
  rows={6}
/>
```

### スタイリング

`className`プロパティを使用して、コンポーネントに追加のCSSクラスを適用できます。

```jsx
<TextInput
  label="メッセージ"
  value={message}
  onChange={setMessage}
  className="my-custom-input"
/>
```

```css
.my-custom-input {
  margin-bottom: 20px;
  border: 2px solid #4CAF50;
}