
import React from 'react';
import { PixelBitDepth, PixelArtStyle } from '../types';

interface ControlPanelProps {
  selectedDepth: PixelBitDepth;
  onDepthChange: (depth: PixelBitDepth) => void;
  selectedStyle: PixelArtStyle;
  onStyleChange: (style: PixelArtStyle) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedDepth,
  onDepthChange,
  selectedStyle,
  onStyleChange,
  onGenerate,
  isGenerating,
  disabled
}) => {
  const depths: PixelBitDepth[] = ['8-bit', '16-bit', '32-bit', '64-bit'];

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-2xl">
      <div className="flex flex-col gap-8">
        {/* Style Selection */}
        <div>
          <label className="pixel-font text-[10px] text-slate-400 mb-4 block">SELECT TRANSFORMATION MODE</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onStyleChange('chibi')}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
                ${selectedStyle === 'chibi' 
                  ? 'border-violet-500 bg-violet-500/20 text-violet-100' 
                  : 'border-slate-700 bg-slate-900/40 text-slate-500'}
              `}
            >
              <i className="fas fa-user-ninja text-xl"></i>
              <span className="pixel-font text-[9px]">CHIBI RPG</span>
            </button>
            <button
              onClick={() => onStyleChange('neutral')}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
                ${selectedStyle === 'neutral' 
                  ? 'border-green-500 bg-green-500/20 text-green-100' 
                  : 'border-slate-700 bg-slate-900/40 text-slate-500'}
              `}
            >
              <i className="fas fa-image text-xl"></i>
              <span className="pixel-font text-[9px]">NEUTRAL</span>
            </button>
          </div>
        </div>

        {/* Bit Depth */}
        <div>
          <label className="pixel-font text-[10px] text-slate-400 mb-4 block">RESOLUTION / BITS</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {depths.map((depth) => (
              <button
                key={depth}
                onClick={() => onDepthChange(depth)}
                className={`
                  py-3 px-4 rounded-xl border-2 pixel-font text-[8px] transition-all
                  ${selectedDepth === depth 
                    ? 'border-violet-500 bg-violet-500/20 text-violet-100 shadow-[0_0_15px_rgba(139,92,246,0.3)]' 
                    : 'border-slate-700 bg-slate-900/40 text-slate-500 hover:border-slate-600'}
                `}
              >
                {depth}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onGenerate}
          disabled={disabled || isGenerating}
          className={`
            w-full py-5 rounded-xl pixel-font text-xs flex items-center justify-center gap-3 transition-all
            ${isGenerating 
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
              : 'bg-violet-600 hover:bg-violet-500 text-white shadow-[0_4px_0_#4c1d95] active:translate-y-1 active:shadow-none'}
          `}
        >
          {isGenerating ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              PROCESSING...
            </>
          ) : (
            <>
              <i className="fas fa-wand-magic-sparkles"></i>
              START TRANSFORMATION
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
