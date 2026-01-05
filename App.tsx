
import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ControlPanel from './components/ControlPanel';
import ResultDisplay from './components/ResultDisplay';
import { AppState, PixelBitDepth, PixelArtStyle } from './types';
import { transformToPixelArt } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    originalImage: null,
    transformedImage: null,
    isGenerating: false,
    selectedDepth: '16-bit',
    selectedStyle: 'chibi',
    error: null,
  });

  const handleImageSelect = (base64: string) => {
    setState(prev => ({ 
      ...prev, 
      originalImage: base64, 
      transformedImage: null,
      error: null 
    }));
  };

  const handleDepthChange = (depth: PixelBitDepth) => {
    setState(prev => ({ ...prev, selectedDepth: depth }));
  };

  const handleStyleChange = (style: PixelArtStyle) => {
    setState(prev => ({ ...prev, selectedStyle: style }));
  };

  const handleGenerate = async () => {
    if (!state.originalImage) return;

    setState(prev => ({ ...prev, isGenerating: true, error: null }));

    try {
      const result = await transformToPixelArt(
        state.originalImage, 
        state.selectedDepth, 
        state.selectedStyle
      );
      setState(prev => ({
        ...prev,
        transformedImage: result,
        isGenerating: false
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: err.message || "Something went wrong. Please try again."
      }));
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      <Header />
      
      <main className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start mt-8">
          {/* Left Column: Input */}
          <section className="space-y-8 flex flex-col items-center">
            <div className="w-full text-center lg:text-left">
              <h2 className="pixel-font text-lg text-slate-200 mb-2">1. UPLOAD IMAGE</h2>
              <p className="text-sm text-slate-500">Pick a photo to transform into retro glory</p>
            </div>
            <ImageUploader 
              onImageSelect={handleImageSelect} 
              currentImage={state.originalImage} 
            />
          </section>

          {/* Right Column: Output */}
          <section className="space-y-8 flex flex-col items-center">
            <div className="w-full text-center lg:text-left">
              <h2 className="pixel-font text-lg text-slate-200 mb-2">2. OUTPUT PREVIEW</h2>
              <p className="text-sm text-slate-500">The AI is crunching those bits for you</p>
            </div>
            <ResultDisplay 
              imageUrl={state.transformedImage} 
              isLoading={state.isGenerating} 
            />
          </section>
        </div>

        {/* Action Center */}
        <div className="mt-16 flex flex-col items-center gap-6">
          {state.error && (
            <div className="bg-red-900/20 border border-red-500/50 text-red-200 px-6 py-3 rounded-xl flex items-center gap-3 animate-bounce">
              <i className="fas fa-exclamation-triangle"></i>
              <span className="text-xs font-bold tracking-tight uppercase">{state.error}</span>
            </div>
          )}
          
          <ControlPanel 
            selectedDepth={state.selectedDepth}
            onDepthChange={handleDepthChange}
            selectedStyle={state.selectedStyle}
            onStyleChange={handleStyleChange}
            onGenerate={handleGenerate}
            isGenerating={state.isGenerating}
            disabled={!state.originalImage}
          />
        </div>

        {/* Style Guide / Reference */}
        <div className="mt-20 max-w-3xl mx-auto text-center border-t border-slate-800 pt-12 opacity-40">
           <h3 className="pixel-font text-[10px] mb-6 text-slate-400">REFERENCE MODES</h3>
           <div className="flex flex-wrap justify-center gap-12 text-slate-500">
              <div className="flex flex-col items-center gap-2">
                <i className="fas fa-user-ninja text-3xl"></i>
                <span className="text-[8px] pixel-font">STYLED</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <i className="fas fa-arrows-to-circle text-3xl"></i>
                <span className="text-[8px] pixel-font">VS</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <i className="fas fa-image text-3xl"></i>
                <span className="text-[8px] pixel-font">NEUTRAL</span>
              </div>
           </div>
        </div>
      </main>

      {/* Footer / Credits */}
      <footer className="mt-20 py-10 border-t border-slate-800 text-center">
        <p className="text-[10px] pixel-font text-slate-600">
          TRANSFORM YOUR REALITY INTO PIXELS &bull; 2025
        </p>
      </footer>
    </div>
  );
};

export default App;
