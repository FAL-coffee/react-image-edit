import React, { useRef } from 'react';

interface ImagePanelProps {
  onAddImage: (file: File) => void;
}

const ImagePanel: React.FC<ImagePanelProps> = ({ onAddImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAddImage(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="panel">
      <h3>画像アップロード</h3>
      <div className="form-group">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <button 
          type="button" 
          className="btn" 
          onClick={handleButtonClick}
        >
          画像を選択
        </button>
        <p className="help-text">
          画像は縦100%で表示されます（アスペクト比は維持されます）
        </p>
      </div>
    </div>
  );
};

export default ImagePanel;