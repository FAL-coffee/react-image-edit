import { useState, useRef, useEffect } from 'react';
import {
  ImageEditorWithRef,
  ImageEditorRef,
  EditorElement,
  ImageUpload,
  TextInput,
  TextCustomization,
  FrameSelector
} from '~/src/index';
import ElementsPanel from './components/ElementsPanel';
import ExportPanel from './components/ExportPanel';
import './App.css';

function App() {
  const editorRef = useRef<ImageEditorRef>(null);
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<EditorElement | null>(null);
  const [imageOpacity, setImageOpacity] = useState<number>(100);
  
  // テキスト入力用の状態
  const [inputText, setInputText] = useState<string>('');
  const [textColor, setTextColor] = useState<string>('#000000');
  const [fontSize, setFontSize] = useState<number>(24);
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [fontWeight, setFontWeight] = useState<string>('normal');

  // 選択された要素が変更されたときに不透明度を更新
  useEffect(() => {
    if (selectedElement && selectedElement.type === 'image' && 'opacity' in selectedElement.data) {
      // 0-1から0-100に変換
      const opacity = selectedElement.data.opacity * 100;
      setImageOpacity(opacity);
    }
  }, [selectedElement]);

  // テキスト追加のハンドラー
  const handleAddText = () => {
    if (!inputText.trim() || !editorRef.current) return;
    
    const id = editorRef.current.addText({
      text: inputText,
      color: textColor,
      fontSize: fontSize,
      fontFamily: fontFamily,
      position: { x: 400, y: 300 },
      weight: fontWeight
    });
    
    if (id) {
      const newElements = editorRef.current.getElements();
      const newElement = newElements.find(el => el.id === id);
      if (newElement) {
        setSelectedElement(newElement);
      }
      // テキスト入力をリセット
      setInputText('');
    }
  };

  // 画像追加のハンドラー
  const handleAddImage = async (fileUrl: string) => {
    if (!editorRef.current) return;
    
    // 現在の不透明度を適用（0-100から0-1に変換）
    const opacity = imageOpacity / 100;
    
    const id = await editorRef.current?.addImage(fileUrl, {
      opacity
    });
    
    if (id && editorRef.current) {
      const newElements = editorRef.current.getElements();
      const newElement = newElements.find(el => el.id === id);
      if (newElement) {
        setSelectedElement(newElement);
      }
    }
  };

  // フレーム選択のハンドラー
  const handleFrameSelect = (frameData: {
    color: string;
    style: 'solid' | 'dashed' | 'double';
    borderRadius?: number;
  } | null) => {
    if (!frameData || !editorRef.current) return;
    
    const id = editorRef.current.addFrame({
      color: frameData.color,
      style: frameData.style,
      borderRadius: frameData.borderRadius || 10
    });
    
    if (id && editorRef.current) {
      const newElements = editorRef.current.getElements();
      const newElement = newElements.find(el => el.id === id);
      if (newElement) {
        setSelectedElement(newElement);
      }
    }
  };

  // 要素削除のハンドラー
  const handleRemoveElement = (id: string) => {
    if (editorRef.current) {
      editorRef.current.removeElement(id);
      setSelectedElement(null);
    }
  };

  // すべての要素を削除するハンドラー
  const handleClearAll = () => {
    if (editorRef.current) {
      editorRef.current.removeAllElements();
      setSelectedElement(null);
    }
  };

  // エクスポートのハンドラー
  const handleExport = (type: string, quality: number): string | null => {
    if (editorRef.current) {
      return editorRef.current.exportToDataURL(type, quality);
    }
    return null;
  };

  // 要素が変更されたときのハンドラー
  const handleElementsChange = (newElements: EditorElement[]) => {
    setElements(newElements);
  };

  // 画像の不透明度が変更されたときのハンドラー
  const handleOpacityChange = (opacity: number) => {
    setImageOpacity(opacity);
    
    if (editorRef.current) {
      // 選択された要素が画像の場合、その要素の不透明度を更新
      if (selectedElement && selectedElement.type === 'image') {
        editorRef.current.updateElement(selectedElement.id, {
          opacity: opacity / 100
        });
      } else {
        // 選択された要素がない場合や画像でない場合は、すべての画像要素の不透明度を更新
        const allElements = editorRef.current.getElements();
        const imageElements = allElements.filter(el => el.type === 'image');
        
        // 画像要素があれば、最後に追加された画像の不透明度を更新
        if (imageElements.length > 0) {
          const lastImage = imageElements[imageElements.length - 1];
          editorRef.current.updateElement(lastImage.id, {
            opacity: opacity / 100
          });
        }
      }
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>React Image Editor</h1>
      </header>
      
      <main>
        <div className="editor-container">
          <div className="editor-panel">
            <ImageEditorWithRef
              ref={editorRef}
              width={800}
              height={600}
              onElementsChange={handleElementsChange}
            />
          </div>
          
          <div className="controls-panel">
            <div className="panel">
              <h3>テキスト追加</h3>
              <TextInput
                label="テキスト"
                value={inputText}
                onChange={setInputText}
                placeholder="テキストを入力してください"
                rows={1}
              />
              <TextCustomization
                label="テキスト"
                color={textColor}
                setColor={setTextColor}
                size={fontSize}
                setSize={setFontSize}
                family={fontFamily}
                setFamily={setFontFamily}
                weight={fontWeight}
                setWeight={setFontWeight}
              />
              <button onClick={handleAddText} className="btn">テキストを追加</button>
            </div>
            <ImageUpload
              onImageUpload={handleAddImage}
              onOpacityChange={handleOpacityChange}
              opacity={imageOpacity}
            />
            <div className="panel">
              <h3>フレーム追加</h3>
              <FrameSelector
                onFrameSelect={handleFrameSelect}
                initialFrame={null}
              />
            </div>
            <ElementsPanel
              elements={elements}
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
              onRemoveElement={handleRemoveElement}
              onClearAll={handleClearAll}
            />
            <ExportPanel onExport={handleExport} />
          </div>
        </div>
      </main>
      
      <footer>
        <p>React Image Editor Sample - Built with react-image-edit</p>
      </footer>
    </div>
  );
}

export default App;
