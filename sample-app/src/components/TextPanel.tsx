import React, { useState } from 'react';

interface TextPanelProps {
  onAddText: (textData: {
    text: string;
    color: string;
    fontSize: number;
    fontFamily: string;
    weight: string;
  }) => void;
}

const TextPanel: React.FC<TextPanelProps> = ({ onAddText }) => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [weight, setWeight] = useState('normal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddText({
        text,
        color,
        fontSize,
        fontFamily,
        weight
      });
      setText('');
    }
  };

  return (
    <div className="panel">
      <h3>テキスト追加</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">テキスト:</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="テキストを入力してください"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="color">色:</label>
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fontSize">フォントサイズ:</label>
          <input
            type="number"
            id="fontSize"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            min="8"
            max="72"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fontFamily">フォント:</label>
          <select
            id="fontFamily"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Palatino">Palatino</option>
            <option value="Garamond">Garamond</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Impact">Impact</option>
            {/* 日本語フォント */}
            <optgroup label="日本語フォント">
              <option value="Yu Gothic, sans-serif">游ゴシック</option>
              <option value="Yu Mincho, serif">游明朝</option>
              <option value="Meiryo, sans-serif">メイリオ</option>
              <option value="MS PGothic, sans-serif">MS Pゴシック</option>
              <option value="MS PMincho, serif">MS P明朝</option>
              <option value="Hiragino Kaku Gothic ProN, sans-serif">ヒラギノ角ゴ</option>
              <option value="Hiragino Mincho ProN, serif">ヒラギノ明朝</option>
              <option value="Noto Sans JP, sans-serif">源ノ角ゴシック</option>
              <option value="Noto Serif JP, serif">源ノ明朝</option>
            </optgroup>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="weight">太さ:</label>
          <select
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="lighter">Lighter</option>
          </select>
        </div>

        <button type="submit" className="btn">テキストを追加</button>
      </form>
    </div>
  );
};

export default TextPanel;