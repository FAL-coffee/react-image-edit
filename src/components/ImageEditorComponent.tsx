import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ImageEditor } from '../ImageEditor';
import { TextElement, ImageElement, FrameElement, EditorElement } from '../types';

export interface ImageEditorComponentProps {
  /**
   * キャンバスの幅
   */
  width?: number;
  
  /**
   * キャンバスの高さ
   */
  height?: number;
  
  /**
   * 初期要素
   */
  initialElements?: EditorElement[];
  
  /**
   * 要素が変更されたときのコールバック
   */
  onElementsChange?: (elements: EditorElement[]) => void;
  
  /**
   * 追加のCSSクラス
   */
  className?: string;
}

/**
 * 画像エディタコンポーネント
 */
export const ImageEditorComponent: React.FC<ImageEditorComponentProps> = ({
  width = 800,
  height = 600,
  initialElements = [],
  onElementsChange,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [editor, setEditor] = useState<ImageEditor | null>(null);
  const [elements, setElements] = useState<EditorElement[]>(initialElements);
  const [selectedElement, setSelectedElement] = useState<EditorElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

  // エディタの初期化
  useEffect(() => {
    if (canvasRef.current) {
      const newEditor = new ImageEditor(canvasRef.current);
      setEditor(newEditor);
      
      // 初期要素の追加
      initialElements.forEach(element => {
        if (element.type === 'text') {
          newEditor.addText(element.data as TextElement);
        } else if (element.type === 'image') {
          const imageElement = element.data as ImageElement;
          newEditor.addImage(imageElement.src, {
            opacity: imageElement.opacity,
            position: imageElement.position,
            size: imageElement.size,
          });
        } else if (element.type === 'frame') {
          newEditor.addFrame(element.data as FrameElement);
        }
      });
    }
    
    return () => {
      // クリーンアップ
    };
  }, [canvasRef]);

  // 要素が変更されたときの処理
  useEffect(() => {
    if (onElementsChange) {
      onElementsChange(elements);
    }
  }, [elements, onElementsChange]);

  // マウスイベントハンドラー
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!editor || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // キャンバスの実際のサイズとスタイルサイズの比率を計算
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // スケールを適用した座標
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;
    
    // テキスト要素を検索
    for (const element of elements) {
      if (element.type === 'text') {
        const textElement = element.data as TextElement;
        const textPos = textElement.position;
        
        // テキスト要素の範囲内かどうかを確認
        const textWidth = textElement.text.length * (textElement.fontSize * 0.6);
        const textHeight = textElement.fontSize;
        
        if (
          canvasX >= textPos.x - textWidth / 2 &&
          canvasX <= textPos.x + textWidth / 2 &&
          canvasY >= textPos.y - textHeight / 2 &&
          canvasY <= textPos.y + textHeight / 2
        ) {
          setSelectedElement(element);
          setIsDragging(true);
          setDragStartPos({ x: canvasX, y: canvasY });
          break;
        }
      }
    }
  }, [editor, elements, canvasRef]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !editor || !selectedElement || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // キャンバスの実際のサイズとスタイルサイズの比率を計算
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // スケールを適用した座標
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;
    
    // 移動量を計算
    const deltaX = canvasX - dragStartPos.x;
    const deltaY = canvasY - dragStartPos.y;
    
    if (selectedElement.type === 'text') {
      const textElement = selectedElement.data as TextElement;
      const newPosition = {
        x: textElement.position.x + deltaX,
        y: textElement.position.y + deltaY
      };
      
      // 要素の位置を更新
      editor.updateElementPosition(selectedElement.id, newPosition);
      
      // ドラッグ開始位置を更新
      setDragStartPos({ x: canvasX, y: canvasY });
    }
  }, [isDragging, editor, selectedElement, dragStartPos, canvasRef]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // マウスイベントリスナーを設定
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);
    }
    
    return () => {
      if (canvas) {
        canvas.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseleave', handleMouseUp);
      }
    };
  }, [handleMouseUp, canvasRef]);

  return (
    <div className={`image-editor-container ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="image-editor-canvas"
        style={{ border: '1px solid #ccc', maxWidth: '100%', height: 'auto' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

// 公開するAPI
export interface ImageEditorRef {
  addText: (textElement: Omit<TextElement, 'id'>) => string | null;
  addImage: (src: string, options?: Omit<ImageElement, 'src'>) => Promise<string | null>;
  addFrame: (frameElement: FrameElement) => string | null;
  removeElement: (id: string) => boolean;
  removeAllElements: () => void;
  updateElement: (id: string, data: Partial<TextElement | ImageElement | FrameElement>) => boolean;
  updateElementPosition: (id: string, position: { x: number; y: number }) => boolean;
  exportToDataURL: (type?: string, quality?: number) => string | null;
  getElements: () => EditorElement[];
  getCanvas: () => HTMLCanvasElement | null;
}

/**
 * 画像エディタコンポーネントをRefで操作するためのラッパー
 */
export const ImageEditorWithRef = React.forwardRef<ImageEditorRef, ImageEditorComponentProps>(
  (props, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [editor, setEditor] = useState<ImageEditor | null>(null);
    const [elements, setElements] = useState<EditorElement[]>(props.initialElements || []);
    const [selectedElement, setSelectedElement] = useState<EditorElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

    // エディタの初期化
    useEffect(() => {
      if (canvasRef.current) {
        const newEditor = new ImageEditor(canvasRef.current);
        setEditor(newEditor);
        
        // 初期要素の追加
        if (props.initialElements) {
          props.initialElements.forEach(element => {
            if (element.type === 'text') {
              newEditor.addText(element.data as TextElement);
            } else if (element.type === 'image') {
              const imageElement = element.data as ImageElement;
              newEditor.addImage(imageElement.src, {
                opacity: imageElement.opacity,
                position: imageElement.position,
                size: imageElement.size,
              });
            } else if (element.type === 'frame') {
              newEditor.addFrame(element.data as FrameElement);
            }
          });
        }
      }
      
      return () => {
        // クリーンアップ
      };
    }, [canvasRef, props.initialElements]);

    // 要素が変更されたときの処理
    useEffect(() => {
      if (props.onElementsChange) {
        props.onElementsChange(elements);
      }
    }, [elements, props.onElementsChange]);

    // マウスイベントハンドラー
    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!editor || !canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // キャンバスの実際のサイズとスタイルサイズの比率を計算
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      // スケールを適用した座標
      const canvasX = x * scaleX;
      const canvasY = y * scaleY;
      
      // テキスト要素を検索
      for (const element of elements) {
        if (element.type === 'text') {
          const textElement = element.data as TextElement;
          const textPos = textElement.position;
          
          // テキスト要素の範囲内かどうかを確認
          const textWidth = textElement.text.length * (textElement.fontSize * 0.6);
          const textHeight = textElement.fontSize;
          
          if (
            canvasX >= textPos.x - textWidth / 2 &&
            canvasX <= textPos.x + textWidth / 2 &&
            canvasY >= textPos.y - textHeight / 2 &&
            canvasY <= textPos.y + textHeight / 2
          ) {
            setSelectedElement(element);
            setIsDragging(true);
            setDragStartPos({ x: canvasX, y: canvasY });
            break;
          }
        }
      }
    }, [editor, elements, canvasRef]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDragging || !editor || !selectedElement || !canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // キャンバスの実際のサイズとスタイルサイズの比率を計算
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      // スケールを適用した座標
      const canvasX = x * scaleX;
      const canvasY = y * scaleY;
      
      // 移動量を計算
      const deltaX = canvasX - dragStartPos.x;
      const deltaY = canvasY - dragStartPos.y;
      
      if (selectedElement.type === 'text') {
        const textElement = selectedElement.data as TextElement;
        const newPosition = {
          x: textElement.position.x + deltaX,
          y: textElement.position.y + deltaY
        };
        
        // 要素の位置を更新
        editor.updateElementPosition(selectedElement.id, newPosition);
        
        // ドラッグ開始位置を更新
        setDragStartPos({ x: canvasX, y: canvasY });
      }
    }, [isDragging, editor, selectedElement, dragStartPos, canvasRef]);

    const handleMouseUp = useCallback(() => {
      setIsDragging(false);
    }, []);

    // マウスイベントリスナーを設定
    useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseUp);
      }
      
      return () => {
        if (canvas) {
          canvas.removeEventListener('mouseup', handleMouseUp);
          document.removeEventListener('mouseup', handleMouseUp);
          document.removeEventListener('mouseleave', handleMouseUp);
        }
      };
    }, [handleMouseUp, canvasRef]);

    // Refを通じて公開するメソッド
    React.useImperativeHandle(ref, () => ({
      addText: (textElement: Omit<TextElement, 'id'>): string | null => {
        if (!editor) return null;
        
        const id = editor.addText(textElement);
        setElements(editor.getElements());
        return id;
      },
      
      addImage: async (src: string, options?: Omit<ImageElement, 'src'>): Promise<string | null> => {
        if (!editor) return null;
        
        const id = await editor.addImage(src, options);
        setElements(editor.getElements());
        return id;
      },
      
      addFrame: (frameElement: FrameElement): string | null => {
        if (!editor) return null;
        
        const id = editor.addFrame(frameElement);
        setElements(editor.getElements());
        return id;
      },
      
      removeElement: (id: string): boolean => {
        if (!editor) return false;
        
        const result = editor.removeElement(id);
        if (result) {
          setElements(editor.getElements());
        }
        return result;
      },
      
      removeAllElements: () => {
        if (!editor) return;
        
        editor.removeAllElements();
        setElements([]);
      },
      
      updateElement: (id: string, data: Partial<TextElement | ImageElement | FrameElement>): boolean => {
        if (!editor) return false;
        
        const result = editor.updateElement(id, data);
        if (result) {
          setElements(editor.getElements());
        }
        return result;
      },
      
      updateElementPosition: (id: string, position: { x: number; y: number }): boolean => {
        if (!editor) return false;
        
        const result = editor.updateElementPosition(id, position);
        if (result) {
          setElements(editor.getElements());
        }
        return result;
      },
      
      exportToDataURL: (type: string = 'image/png', quality: number = 0.95): string | null => {
        if (!editor) return null;
        
        return editor.exportToDataURL(type, quality);
      },
      
      getElements: (): EditorElement[] => {
        return [...elements];
      },
      
      getCanvas: (): HTMLCanvasElement | null => {
        if (!editor) return null;
        return editor.getCanvas();
      },
    }));

    return (
      <div className={`image-editor-container ${props.className || ''}`}>
        <canvas
          ref={canvasRef}
          width={props.width || 800}
          height={props.height || 600}
          className="image-editor-canvas"
          style={{ border: '1px solid #ccc', maxWidth: '100%', height: 'auto' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        />
      </div>
    );
  }
);

ImageEditorWithRef.displayName = 'ImageEditorWithRef';

export default ImageEditorComponent;