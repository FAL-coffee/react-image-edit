import React from 'react';

export interface TextCustomizationProps {
  /**
   * カスタマイズ対象のラベル
   */
  label: string;
  
  /**
   * テキストの色
   */
  color: string;
  
  /**
   * 色が変更されたときのコールバック
   */
  setColor: (color: string) => void;
  
  /**
   * フォントサイズ
   */
  size: number;
  
  /**
   * サイズが変更されたときのコールバック
   */
  setSize: (size: number) => void;
  
  /**
   * フォントファミリー
   */
  family: string;
  
  /**
   * フォントファミリーが変更されたときのコールバック
   */
  setFamily: (family: string) => void;
  
  /**
   * フォントの太さ
   */
  weight: string;
  
  /**
   * フォントの太さが変更されたときのコールバック
   */
  setWeight: (weight: string) => void;
  
  /**
   * 追加のCSSクラス
   */
  className?: string;
}

/**
 * テキストカスタマイズコンポーネント
 */
export const TextCustomization: React.FC<TextCustomizationProps> = ({
  label,
  color,
  setColor,
  size,
  setSize,
  family,
  setFamily,
  weight,
  setWeight,
  className = '',
}) => {
  // 利用可能なフォントのリスト
  const fonts = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier', label: 'Courier' },
    { value: "'Mountains of Christmas', cursive", label: 'Mountains of Christmas' },
    { value: "'Snowburst One', cursive", label: 'Snowburst One' },
    { value: "'Festive', cursive", label: 'Festive' },
    { value: "'Noto Sans JP', sans-serif", label: 'Noto Sans JP' },
    { value: "'Kosugi Maru', sans-serif", label: 'Kosugi Maru' },
    { value: "'M PLUS Rounded 1c', sans-serif", label: 'M PLUS Rounded 1c' },
    { value: "'Sawarabi Mincho', serif", label: 'Sawarabi Mincho' },
    { value: "'Sawarabi Gothic', sans-serif", label: 'Sawarabi Gothic' },
    { value: "'Zen Maru Gothic', sans-serif", label: 'Zen Maru Gothic' },
    { value: "'Yuji Syuku', serif", label: 'Yuji Syuku' },
    { value: "'Klee One', cursive", label: 'Klee One' },
  ];

  // フォントの太さのリスト
  const weights = [
    { value: 'normal', label: '普通' },
    { value: 'bold', label: '太字' },
    { value: 'lighter', label: '細字' },
  ];

  return (
    <div className={`space-y-4 mb-4 ${className}`}>
      <h3 className="font-semibold">{label}のスタイル</h3>
      
      <div>
        <label htmlFor={`${label}-color`} className="block text-sm font-medium mb-2">
          文字色
        </label>
        <input
          id={`${label}-color`}
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 p-1 border border-gray-300 rounded-md"
        />
      </div>
      
      <div>
        <label htmlFor={`${label}-size`} className="block text-sm font-medium mb-2">
          文字サイズ
        </label>
        <input
          id={`${label}-size`}
          type="number"
          min="8"
          max="152"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor={`${label}-family`} className="block text-sm font-medium mb-2">
          フォント
        </label>
        <select
          id={`${label}-family`}
          value={family}
          onChange={(e) => setFamily(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {fonts.map((font) => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor={`${label}-weight`} className="block text-sm font-medium mb-2">
          文字の太さ
        </label>
        <select
          id={`${label}-weight`}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {weights.map((w) => (
            <option key={w.value} value={w.value}>
              {w.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TextCustomization;