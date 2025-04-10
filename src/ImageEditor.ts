import { TextElement, ImageElement, FrameElement, EditorElement } from './types';
import { loadImage, drawText, generateFrameSvg } from './utils/imageUtils';

/**
 * 画像エディタクラス
 */
export class ImageEditor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private elements: EditorElement[] = [];
  private nextId = 1;
  private imageCache: Map<string, HTMLImageElement> = new Map();

  /**
   * コンストラクタ
   * @param canvas キャンバス要素
   */
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }
    this.ctx = ctx;
    this.redraw();
  }

  /**
   * テキストを追加する
   * @param textElement テキスト要素
   * @returns 要素ID
   */
  addText(textElement: Omit<TextElement, 'id'>): string {
    const id = `text-${this.nextId++}`;
    this.elements.push({
      id,
      type: 'text',
      data: textElement as TextElement
    });
    this.redraw();
    return id;
  }

  /**
   * 画像を追加する
   * @param src 画像のURL
   * @param options オプション
   * @returns 要素ID
   */
  async addImage(src: string, options?: Omit<ImageElement, 'src'>): Promise<string> {
    const id = `image-${this.nextId++}`;
    
    // 画像をロードして、アスペクト比を計算
    let img: HTMLImageElement;
    if (this.imageCache.has(src)) {
      img = this.imageCache.get(src)!;
    } else {
      img = await loadImage(src);
      this.imageCache.set(src, img);
    }
    
    // デフォルトでは、画像の縦サイズをキャンバスの高さに合わせる
    const aspectRatio = img.width / img.height;
    const height = this.canvas.height;
    const width = height * aspectRatio;
    
    // 位置とサイズを設定
    const position = options?.position || { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    const size = options?.size || { width, height };
    
    this.elements.push({
      id,
      type: 'image',
      data: {
        src,
        opacity: options?.opacity || 1,
        position,
        size
      } as ImageElement
    });
    
    this.redraw();
    return id;
  }

  /**
   * フレームを追加する
   * @param frameElement フレーム要素
   * @returns 要素ID
   */
  addFrame(frameElement: FrameElement): string {
    const id = `frame-${this.nextId++}`;
    this.elements.push({
      id,
      type: 'frame',
      data: frameElement
    });
    this.redraw();
    return id;
  }

  /**
   * 要素を削除する
   * @param id 要素ID
   * @returns 成功したかどうか
   */
  removeElement(id: string): boolean {
    const index = this.elements.findIndex(element => element.id === id);
    if (index === -1) {
      return false;
    }
    this.elements.splice(index, 1);
    this.redraw();
    return true;
  }

  /**
   * すべての要素を削除する
   */
  removeAllElements(): void {
    this.elements = [];
    this.redraw();
  }

  /**
   * 要素を更新する
   * @param id 要素ID
   * @param data 新しいデータ
   * @returns 成功したかどうか
   */
  updateElement(id: string, data: Partial<TextElement | ImageElement | FrameElement>): boolean {
    const element = this.elements.find(element => element.id === id);
    if (!element) {
      return false;
    }
    
    // フレーム要素の場合、キャッシュをクリア
    if (element.type === 'frame') {
      const frameElement = element.data as FrameElement;
      const oldCacheKey = `frame-${frameElement.color}-${frameElement.style}-${frameElement.borderRadius}-${this.canvas.width}-${this.canvas.height}`;
      this.imageCache.delete(oldCacheKey);
    }
    
    element.data = { ...element.data, ...data };
    this.redraw();
    return true;
  }

  /**
   * 要素の位置を更新する
   * @param id 要素ID
   * @param position 新しい位置
   * @returns 成功したかどうか
   */
  updateElementPosition(id: string, position: { x: number; y: number }): boolean {
    const element = this.elements.find(element => element.id === id);
    if (!element) {
      return false;
    }
    (element.data as any).position = position;
    this.redraw();
    return true;
  }

  /**
   * キャンバスを再描画する
   */
  async redraw(): Promise<void> {
    // 背景をクリア
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 要素を描画（画像、フレーム、テキストの順に描画）
    // 1. まず、画像要素を描画
    await this.drawElementsByType('image');
    
    // 2. 次に、フレーム要素を描画
    await this.drawElementsByType('frame');
    
    // 3. 最後に、テキスト要素を描画
    await this.drawElementsByType('text');
  }

  /**
   * 指定されたタイプの要素を描画する
   * @param type 要素のタイプ
   */
  private async drawElementsByType(type: 'text' | 'image' | 'frame'): Promise<void> {
    const elements = this.elements.filter(element => element.type === type);
    
    for (const element of elements) {
      try {
        if (element.type === 'image') {
          const imageElement = element.data as ImageElement;
          let img: HTMLImageElement;
          
          // 画像キャッシュを使用
          if (this.imageCache.has(imageElement.src)) {
            img = this.imageCache.get(imageElement.src)!;
          } else {
            img = await loadImage(imageElement.src);
            this.imageCache.set(imageElement.src, img);
          }
          
          this.ctx.save();
          this.ctx.globalAlpha = imageElement.opacity;
          
          const position = imageElement.position || { x: this.canvas.width / 2, y: this.canvas.height / 2 };
          const size = imageElement.size || { width: this.canvas.width, height: this.canvas.height };
          
          this.ctx.drawImage(
            img,
            position.x - size.width / 2,
            position.y - size.height / 2,
            size.width,
            size.height
          );
          
          this.ctx.restore();
        } else if (element.type === 'text') {
          const textElement = element.data as TextElement;
          drawText(this.ctx, textElement);
        } else if (element.type === 'frame') {
          const frameElement = element.data as FrameElement;
          const svgString = generateFrameSvg(
            frameElement,
            this.canvas.width,
            this.canvas.height
          );
          
          const cacheKey = `frame-${frameElement.color}-${frameElement.style}-${frameElement.borderRadius}-${this.canvas.width}-${this.canvas.height}`;
          
          let frameImg: HTMLImageElement;
          if (this.imageCache.has(cacheKey)) {
            frameImg = this.imageCache.get(cacheKey)!;
          } else {
            frameImg = await loadImage(`data:image/svg+xml,${encodeURIComponent(svgString)}`);
            this.imageCache.set(cacheKey, frameImg);
          }
          
          this.ctx.drawImage(frameImg, 0, 0, this.canvas.width, this.canvas.height);
        }
      } catch (error) {
        console.error(`Error drawing element ${element.id}:`, error);
      }
    }
  }

  /**
   * キャンバスをデータURLとしてエクスポートする
   * @param type 画像タイプ
   * @param quality 画質
   * @returns データURL
   */
  exportToDataURL(type: string = 'image/png', quality: number = 0.95): string {
    return this.canvas.toDataURL(type, quality);
  }

  /**
   * 要素の配列を取得する
   * @returns 要素の配列
   */
  getElements(): EditorElement[] {
    return [...this.elements];
  }

  /**
   * キャンバス要素を取得する
   * @returns キャンバス要素
   */
  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}