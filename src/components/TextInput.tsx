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
    <div className={`form-group ${className}`}>
      <label htmlFor={`input-${label}`}>
        {label}
      </label>
      {rows > 1 ? (
        <textarea
          id={`input-${label}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || `ここに${label}を入力してください...`}
          rows={rows}
        />
      ) : (
        <input
          type="text"
          id={`input-${label}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || `ここに${label}を入力してください...`}
        />
      )}
    </div>
  );
};

export default TextInput;