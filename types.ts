
export type PixelBitDepth = '8-bit' | '16-bit' | '32-bit' | '64-bit';
export type PixelArtStyle = 'chibi' | 'neutral';

export interface TransformationResult {
  imageUrl: string;
  depth: PixelBitDepth;
  timestamp: number;
}

export interface AppState {
  originalImage: string | null;
  transformedImage: string | null;
  isGenerating: boolean;
  selectedDepth: PixelBitDepth;
  selectedStyle: PixelArtStyle;
  error: string | null;
}
