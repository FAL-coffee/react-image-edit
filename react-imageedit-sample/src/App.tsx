import { useState, useRef } from 'react';
import { ImageEditorWithRef, ImageEditorRef, EditorElement } from 'react-imageedit';
import TextPanel from './components/TextPanel';
import ImagePanel from './components/ImagePanel';
import FramePanel from './components/FramePanel';
import ElementsPanel from './components/ElementsPanel';
import ExportPanel from './components/ExportPanel';
import './App.css';

function App() {
  const editorRef = useRef<ImageEditorRef>(null);
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<EditorElement | null>(null);

  // テキスト追加のハンドラー
  const handleAddText = (textData: {
    text: string;
    color: string;
    fontSize: number;
    fontFamily: string;
    weight: string;
  }) => {
    if (editorRef.current) {
      const id = editorRef.current.addText({
        text: textData.text,
        color: textData.color,
        fontSize: textData.fontSize,
        fontFamily: textData.fontFamily,
        position: { x: 400, y: 300 },
        weight: textData.weight
      });
      
      if (id) {
        const newElements = editorRef.current.getElements();
        const newElement = newElements.find(el => el.id === id);
        if (newElement) {
          setSelectedElement(newElement);
        }
      }
    }
  };

  // 画像追加のハンドラー
  const handleAddImage = async (file: File) => {
    if (!editorRef.current) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (typeof e.target?.result === 'string') {
        const id = await editorRef.current?.addImage(e.target.result, {
          opacity: 1
        });
        
        if (id && editorRef.current) {
          const newElements = editorRef.current.getElements();
          const newElement = newElements.find(el => el.id === id);
          if (newElement) {
            setSelectedElement(newElement);
          }
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // フレーム追加のハンドラー
  const handleAddFrame = (frameData: {
    color: string;
    style: 'solid' | 'dashed' | 'double';
    borderRadius: number;
  }) => {
    if (editorRef.current) {
      const id = editorRef.current.addFrame(frameData);
      
      if (id && editorRef.current) {
        const newElements = editorRef.current.getElements();
        const newElement = newElements.find(el => el.id === id);
        if (newElement) {
          setSelectedElement(newElement);
        }
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
            <TextPanel onAddText={handleAddText} />
            <ImagePanel onAddImage={handleAddImage} />
            <FramePanel onAddFrame={handleAddFrame} />
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
        <p>React Image Editor Sample - Built with react-imageedit</p>
      </footer>
    </div>
  );
}

export default App;
