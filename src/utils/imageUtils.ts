import { TextElement, FrameElement } from '../types';

/**
 * 画像をロードする
 * @param src 画像のURL
 * @returns 画像要素のPromise
 */
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * テキストを描画する
 * @param ctx キャンバスコンテキスト
 * @param textElement テキスト要素
 */
export const drawText = (ctx: CanvasRenderingContext2D, textElement: TextElement): void => {
  ctx.fillStyle = textElement.color;
  ctx.font = `${textElement.weight} ${textElement.fontSize}px ${textElement.fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const maxWidth = 600; // 固定の最大幅を設定
  const text = textElement.text;
  const lines = text.split('\n');

  const lineHeight = textElement.fontSize * 1.2;
  const totalHeight = lines.length * lineHeight;
  let y = textElement.position.y - (totalHeight / 2) + (lineHeight / 2);

  lines.forEach(line => {
    ctx.fillText(line, textElement.position.x, y);
    y += lineHeight;
  });
};

/**
 * フレームのSVG文字列を生成する
 * @param frame フレーム要素
 * @param width キャンバスの幅
 * @param height キャンバスの高さ
 * @returns SVG文字列
 */
export const generateFrameSvg = (
  frame: FrameElement,
  width: number,
  height: number
): string => {
  const borderRadius = frame.borderRadius || 20;
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="none" stroke="${frame.color}" stroke-width="10" rx="${borderRadius}" ry="${borderRadius}" 
        ${frame.style === 'dashed' ? 'stroke-dasharray="20 10"' : ''}
      />
      ${frame.style === 'double' ? `
        <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="none" stroke="${frame.color}" stroke-width="10" rx="${borderRadius - 10}" ry="${borderRadius - 10}" />
      ` : ''}
    </svg>
  `;
};

/**
 * テキストを行に分割する
 * @param text テキスト
 * @param fontSize フォントサイズ
 * @param fontFamily フォントファミリー
 * @param weight フォントの太さ
 * @param maxWidth 最大幅
 * @param ctx キャンバスコンテキスト
 * @returns 行の配列
 */
export const getWrappedLines = (
  text: string,
  fontSize: number,
  fontFamily: string,
  weight: string,
  maxWidth: number,
  ctx: CanvasRenderingContext2D
): string[] => {
  ctx.font = `${weight} ${fontSize}px ${fontFamily}`;
  
  const lines: string[] = [];
  const paragraphs = text.split('\n');
  
  paragraphs.forEach(paragraph => {
    const words = paragraph.split(' ');
    let currentLine = words[0];
    
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    
    lines.push(currentLine);
  });
  
  return lines;
};

/**
 * データURLからBlobを作成する
 * @param dataUrl データURL
 * @returns Blob
 */
export const dataURLtoBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
};