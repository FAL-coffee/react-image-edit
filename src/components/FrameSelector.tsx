import React, { useState } from 'react';

export interface FrameSelectorProps {
  /**
   * フレームが選択されたときのコールバック
   */
  onFrameSelect: (frame: { color: string; style: 'solid' | 'dashed' | 'double'; borderRadius?: number } | null) => void;
  
  /**
   * 初期選択フレーム
   */
  initialFrame?: { color: string; style: 'solid' | 'dashed' | 'double'; borderRadius?: number } | null;
  
  /**
   * 追加のCSSクラス
   */
  className?: string;
}

interface FrameOption {
  name: string;
  style: 'solid' | 'dashed' | 'double';
  color: string;
}

/**
 * フレームプレビューコンポーネント
 */
const FramePreview: React.FC<{
  color: string;
  style: 'solid' | 'dashed' | 'double';
  borderRadius?: number;
}> = ({ color, style, borderRadius = 10 }) => (
  <svg 
    width={200}
    height={150}
    viewBox="0 0 200 150"
    preserveAspectRatio="none"
  >
    <rect
      x={5}
      y={5}
      width={190}
      height={140}
      fill="none"
      stroke={color}
      strokeWidth={5}
      rx={borderRadius}
      ry={borderRadius}
      strokeDasharray={style === 'dashed' ? '10 5' : undefined}
    />
    {style === 'double' && (
      <rect
        x={15}
        y={15}
        width={170}
        height={120}
        fill="none"
        stroke={color}
        strokeWidth={5}
        rx={borderRadius - 5}
        ry={borderRadius - 5}
      />
    )}
  </svg>
);

/**
 * フレーム選択コンポーネント
 */
export const FrameSelector: React.FC<FrameSelectorProps> = ({
  onFrameSelect,
  initialFrame = null,
  className = '',
}) => {
  // 利用可能なフレームのリスト
  const frames: FrameOption[] = [
    { name: 'クラシック', style: 'solid', color: '#8B4513' },
    { name: 'モダン', style: 'dashed', color: '#1E90FF' },
    { name: 'ホリデー', style: 'double', color: '#228B22' },
  ];

  // 初期選択フレームの名前を取得
  const getInitialFrameName = (): string | null => {
    if (!initialFrame) return null;
    
    const frame = frames.find(
      f => f.style === initialFrame.style && f.color === initialFrame.color
    );
    
    return frame ? frame.name : null;
  };

  const [selectedFrame, setSelectedFrame] = useState<string | null>(getInitialFrameName());
  const [borderRadius, setBorderRadius] = useState<number>(initialFrame?.borderRadius || 10);

  /**
   * フレームが選択されたときの処理
   */
  const handleFrameSelect = (frameName: string | null) => {
    setSelectedFrame(frameName);
    
    if (frameName === null) {
      onFrameSelect(null);
      return;
    }
    
    const frame = frames.find(f => f.name === frameName);
    if (frame) {
      onFrameSelect({
        color: frame.color,
        style: frame.style,
        borderRadius,
      });
    }
  };

  /**
   * 角丸の値が変更されたときの処理
   */
  const handleRadiusChange = (radius: number) => {
    setBorderRadius(radius);
    
    if (selectedFrame) {
      const frame = frames.find(f => f.name === selectedFrame);
      if (frame) {
        onFrameSelect({
          color: frame.color,
          style: frame.style,
          borderRadius: radius,
        });
      }
    }
  };

  return (
    <div className={`mb-4 space-y-4 ${className}`}>
      <h3 className="font-semibold">フレームを選択</h3>
      
      <div className="flex flex-wrap gap-2">
        {frames.map((frame) => (
          <button
            key={frame.name}
            onClick={() => handleFrameSelect(frame.name)}
            className={`px-4 py-2 rounded-md ${
              selectedFrame === frame.name
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {frame.name}
          </button>
        ))}
        
        <button
          onClick={() => handleFrameSelect(null)}
          className={`px-4 py-2 rounded-md ${
            selectedFrame === null
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          なし
        </button>
      </div>
      
      {selectedFrame && (
        <>
          <div>
            <label htmlFor="frame-radius" className="block text-sm font-medium mb-2">
              角丸: {borderRadius}px
            </label>
            <input
              type="range"
              id="frame-radius"
              min="0"
              max="50"
              value={borderRadius}
              onChange={(e) => handleRadiusChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="mt-2">
            {selectedFrame && (
              <FramePreview
                color={frames.find(f => f.name === selectedFrame)?.color || '#000000'}
                style={(frames.find(f => f.name === selectedFrame)?.style || 'solid')}
                borderRadius={borderRadius}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FrameSelector;