
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 text-center">
      <div className="inline-block relative">
        <h1 className="pixel-font text-3xl md:text-5xl text-violet-400 mb-2 glow tracking-tighter">
          PIXELIFY AI
        </h1>
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
      </div>
      <p className="mt-4 text-slate-400 font-medium tracking-wide flex items-center justify-center gap-2">
        <i className="fas fa-microchip text-green-400"></i>
        BORN FROM NEON. POWERED BY GEMINI.
      </p>
    </header>
  );
};

export default Header;
