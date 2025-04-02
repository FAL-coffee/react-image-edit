import { useState } from 'react';

interface ExportPanelProps {
  onExport: (type: string, quality: number) => string | null;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ onExport }) => {
  const [imageType, setImageType] = useState('image/png');
  const [quality, setQuality] = useState(0.95);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleExport = () => {
    const dataUrl = onExport(imageType, quality);
    if (dataUrl) {
      setPreviewUrl(dataUrl);
      
      // ダウンロードリンクを作成して自動クリック
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `edited-image.${imageType === 'image/png' ? 'png' : 'jpg'}`;
      link.click();
    }
  };

  return (
    <div className="panel">
      <h3>エクスポート</h3>
      
      <div className="form-group">
        <label htmlFor="imageType">画像タイプ:</label>
        <select
          id="imageType"
          value={imageType}
          onChange={(e) => setImageType(e.target.value)}
        >
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPEG</option>
        </select>
      </div>
      
      {imageType === 'image/jpeg' && (
        <div className="form-group">
          <label htmlFor="quality">画質 ({Math.round(quality * 100)}%):</label>
          <input
            type="range"
            id="quality"
            min="0.1"
            max="1"
            step="0.05"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
          />
        </div>
      )}
      
      <button 
        className="btn btn-primary" 
        onClick={handleExport}
      >
        画像をエクスポート
      </button>
      
      {previewUrl && (
        <div className="preview">
          <h4>プレビュー</h4>
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="preview-image" 
          />
        </div>
      )}
    </div>
  );
};

export default ExportPanel;