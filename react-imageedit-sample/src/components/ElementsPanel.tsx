import { EditorElement } from 'react-imageedit';

interface ElementsPanelProps {
  elements: EditorElement[];
  selectedElement: EditorElement | null;
  onSelectElement: (element: EditorElement) => void;
  onRemoveElement: (id: string) => void;
  onClearAll: () => void;
}

const ElementsPanel: React.FC<ElementsPanelProps> = ({
  elements,
  selectedElement,
  onSelectElement,
  onRemoveElement,
  onClearAll
}) => {
  return (
    <div className="panel">
      <h3>要素管理</h3>
      
      <div className="element-actions">
        <button 
          className="btn btn-danger" 
          onClick={() => selectedElement && onRemoveElement(selectedElement.id)}
          disabled={!selectedElement}
        >
          選択した要素を削除
        </button>
        
        <button 
          className="btn btn-danger" 
          onClick={onClearAll}
        >
          すべての要素をクリア
        </button>
      </div>
      
      <div className="elements-list">
        <h4>要素リスト</h4>
        {elements.length === 0 ? (
          <p>要素がありません</p>
        ) : (
          <ul>
            {elements.map(element => (
              <li 
                key={element.id}
                className={selectedElement?.id === element.id ? 'selected' : ''}
                onClick={() => onSelectElement(element)}
              >
                {element.type}: {element.id}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ElementsPanel;