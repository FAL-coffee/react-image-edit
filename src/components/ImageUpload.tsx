import React, { useState } from 'react';

export interface ImageUploadProps {
  /**
   * 画像がアップロードされたときのコールバック
   */
  onImageUpload: (imageDataUrl: string) => void;
  
  /**
   * 不透明度が変更されたときのコールバック
   */
  onOpacityChange: (opacity: number) => void;
  
  /**
   * 現在の不透明度
   */
  opacity: number;
  
  /**
   * 最大ファイルサイズ（バイト単位）
   */
  maxFileSize?: number;
  
  /**
   * 追加のCSSクラス
   */
  className?: string;
}

/**
 * 画像アップロードコンポーネント
 */
export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  onOpacityChange,
  opacity,
  maxFileSize = 5 * 1024 * 1024, // デフォルトは5MB
  className = '',
}) => {
  const [error, setError] = useState<string | null>(null);

  /**
   * 画像ファイルが選択されたときの処理
   */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // ファイルサイズのチェック
      if (file.size > maxFileSize) {
        setError(`ファイルサイズは${Math.floor(maxFileSize / 1024 / 1024)}MB以下にしてください。`);
        return;
      }

      // FileReaderを使用してファイルを読み込む
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          onImageUpload(event.target.result);
          setError(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`panel ${className}`}>
      <h3>画像アップロード</h3>
      <div className="form-group">
        <label htmlFor="image-upload">
          画像
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        <button
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          画像をアップロード
        </button>
        {error && <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '5px' }}>{error}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="image-opacity">
          透明度: {100 - opacity}%
        </label>
        <input
          type="range"
          id="image-opacity"
          min="0"
          max="100"
          step="1"
          value={100 - opacity}
          onChange={(e) => onOpacityChange(100 - Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default ImageUpload;