export interface TextElement {
  text: string;
  color: string;
  fontSize: number;
  fontFamily: string;
  position: { x: number; y: number };
  weight: string;
}

export interface ImageElement {
  src: string;
  opacity: number;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}

export interface FrameElement {
  color: string;
  style: 'solid' | 'dashed' | 'double';
  borderRadius?: number;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}

export interface EditorElement {
  id: string;
  type: 'text' | 'image' | 'frame';
  data: TextElement | ImageElement | FrameElement;
}