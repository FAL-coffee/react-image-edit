import React from 'react';

export interface TextInputProps {
  /**
   * 入力フィールドのラベル
   */
  label: string;
  
  /**
   * 入力値
   */
  value: string;
  
  /**
   * 値が変更されたときのコールバック
   */
  onChange: (value: string) => void;
  
  /**
   * プレースホルダーテキスト
   */
  placeholder?: string;
  
  /**
   * テキストエリアの行数
   */
  rows?: number;
  
  /**
   * 追加のCSSクラス
   */
  className?: string;
}

/**
 * テキスト入力コンポーネント
 */
export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={`input-${label}`} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <textarea
        id={`input-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || `ここに${label}を入力してください...`}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows={rows}
      />
    </div>
  );
};

export default TextInput;