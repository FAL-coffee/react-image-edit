import React, { useState } from 'react';

interface FramePanelProps {
  onAddFrame: (frameData: {
    color: string;
    style: 'solid' | 'dashed' | 'double';
    borderRadius: number;
  }) => void;
}

const FramePanel: React.FC<FramePanelProps> = ({ onAddFrame }) => {
  const [color, setColor] = useState('#000000');
  const [style, setStyle] = useState<'solid' | 'dashed' | 'double'>('solid');
  const [borderRadius, setBorderRadius] = useState(20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFrame({
      color,
      style,
      borderRadius
    });
  };

  return (
    <div className="panel">
      <h3>フレーム追加</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="frameColor">色:</label>
          <input
            type="color"
            id="frameColor"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="frameStyle">スタイル:</label>
          <select
            id="frameStyle"
            value={style}
            onChange={(e) => setStyle(e.target.value as 'solid' | 'dashed' | 'double')}
          >
            <option value="solid">実線</option>
            <option value="dashed">破線</option>
            <option value="double">二重線</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="borderRadius">角の丸み:</label>
          <input
            type="range"
            id="borderRadius"
            min="0"
            max="100"
            value={borderRadius}
            onChange={(e) => setBorderRadius(parseInt(e.target.value))}
          />
          <span>{borderRadius}px</span>
        </div>

        <button type="submit" className="btn">フレームを追加</button>
      </form>
    </div>
  );
};

export default FramePanel;