
import React from 'react';

interface ResultDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageUrl, isLoading }) => {
  return (
    <div className="w-full max-w-md mx-auto relative group">
      {/* Decorative RPG Frame */}
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      
      <div className={`
        relative aspect-square rounded-2xl overflow-hidden border-4 border-slate-700 bg-slate-900/80 flex items-center justify-center
        ${imageUrl ? 'border-violet-500 shadow-[0_0_50px_rgba(139,92,246,0.4)]' : ''}
      `}>
        {isLoading ? (
          <div className="text-center z-30">
            <div className="inline-block w-14 h-14 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="pixel-font text-[10px] text-violet-400 animate-pulse tracking-widest">BUILDING SPRITE...</p>
          </div>
        ) : imageUrl ? (
          <>
            <img 
              src={imageUrl} 
              alt="Pixel Art Result" 
              className="w-full h-full object-contain relative z-10 p-4"
              // Fix: msInterpolationMode is non-standard and causes TS errors.
              // imageRendering: 'pixelated' is the standard CSS property for nearest-neighbor scaling.
              style={{ 
                imageRendering: 'pixelated',
              }}
            />
            
            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.1] z-0" 
                 style={{ 
                   backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                   backgroundSize: '20px 20px'
                 }}>
            </div>

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.1]"
                 style={{
                   background: 'repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 2px)',
                 }}>
            </div>
            
            <div className="absolute top-4 left-4 flex flex-col gap-1 z-30">
               <div className="bg-violet-600/80 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] pixel-font text-white border border-white/20">
                 LVL. 99
               </div>
               <div className="bg-slate-800/80 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] pixel-font text-green-400 border border-white/10">
                 HP: MAX
               </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-30">
               <div className="flex gap-1">
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                 <span className="text-[8px] pixel-font text-slate-400">READY</span>
               </div>
               <a 
                href={imageUrl} 
                download="rpg-character-sprite.png"
                className="bg-green-500 hover:bg-green-400 text-white w-12 h-12 flex items-center justify-center rounded-xl shadow-lg active:scale-95 transition-all border-b-4 border-green-700 hover:border-b-2 hover:translate-y-0.5"
              >
                <i className="fas fa-save text-lg"></i>
              </a>
            </div>
          </>
        ) : (
          <div className="text-center opacity-30 px-8">
            <i className="fas fa-user-ninja text-5xl mb-4 text-slate-600"></i>
            <p className="pixel-font text-[10px] text-slate-600 leading-loose">SUMMON YOUR HERO</p>
          </div>
        )}
      </div>
      
      {imageUrl && !isLoading && (
        <div className="absolute -top-4 -right-4 bg-yellow-500 text-[10px] pixel-font px-4 py-2 text-black rounded-lg shadow-xl transform rotate-12 border-2 border-white animate-bounce z-40">
          LEGENDARY!
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
