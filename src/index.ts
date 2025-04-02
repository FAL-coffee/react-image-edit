// クラスのエクスポート
export { ImageEditor } from './ImageEditor';

// 型定義のエクスポート
export type {
  TextElement,
  ImageElement,
  FrameElement,
  EditorElement
} from './types';

// コンポーネントのエクスポート
export { default as TextInput } from './components/TextInput';
export type { TextInputProps } from './components/TextInput';

export { default as TextCustomization } from './components/TextCustomization';
export type { TextCustomizationProps } from './components/TextCustomization';

export { default as ImageUpload } from './components/ImageUpload';
export type { ImageUploadProps } from './components/ImageUpload';

export { default as FrameSelector } from './components/FrameSelector';
export type { FrameSelectorProps } from './components/FrameSelector';

export { default as ImageEditorComponent } from './components/ImageEditorComponent';
export { ImageEditorWithRef } from './components/ImageEditorComponent';
export type {
  ImageEditorComponentProps,
  ImageEditorRef
} from './components/ImageEditorComponent';

export { default as DraggableText } from './components/DraggableText';
export type { DraggableTextProps } from './components/DraggableText';

// ユーティリティ関数のエクスポート
export {
  loadImage,
  drawText,
  generateFrameSvg,
  getWrappedLines,
  dataURLtoBlob
} from './utils/imageUtils';