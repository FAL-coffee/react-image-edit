import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { TextElement } from '../types';

export interface DraggableTextProps {
  /**
   * 要素のID
   */
  id: string;
  
  /**
   * テキスト要素
   */
  textElement: TextElement;
  
  /**
   * スケール係数
   */
  scale?: number;
  
  /**
   * ドラッグ終了時のコールバック
   */
  onDragEnd?: (id: string, position: { x: number; y: number }) => void;
  
  /**
   * 追加のCSSクラス
   */
  className?: string;
}

/**
 * ドラッグ可能なテキストコンポーネント
 */
export const DraggableText: React.FC<DraggableTextProps> = ({
  id,
  textElement,
  scale = 1,
  onDragEnd,
  className = '',
}) => {
  const { text, color, fontSize, fontFamily, position, weight } = textElement;
  
  // DndKitのuseDraggableフックを使用
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  
  // テキストを行に分割
  const lines = text.split('\n');
  
  // 行の高さを計算
  const lineHeight = fontSize * 1.2;
  const totalHeight = lines.length * lineHeight;
  
  // スタイルを設定
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    fontWeight: weight,
  } : {
    fontWeight: weight,
  };
  
  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        position: 'absolute',
        top: position.y * scale,
        left: position.x * scale,
        cursor: 'move',
        userSelect: 'none',
        color: color,
        fontSize: `${fontSize * scale}px`,
        fontFamily: fontFamily,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translate(-50%, -50%) ${style?.transform || ''}`,
        pointerEvents: 'auto',
        whiteSpace: 'pre',
      }}
      className={className}
      {...listeners}
      {...attributes}
    >
      {lines.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};

export default DraggableText;