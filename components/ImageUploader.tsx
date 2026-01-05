
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageSelect: (base64: string) => void;
  currentImage: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />
      
      <div 
        onClick={handleClick}
        className={`
          relative group cursor-pointer border-2 border-dashed rounded-2xl overflow-hidden transition-all aspect-square
          flex flex-col items-center justify-center p-4
          ${currentImage 
            ? 'border-violet-500/50' 
            : 'border-slate-700 bg-slate-900/50 hover:border-violet-500/50 hover:bg-slate-800/80'}
        `}
      >
        {currentImage ? (
          <>
            <img 
              src={currentImage} 
              alt="Preview" 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="pixel-font text-[10px] text-white bg-violet-600 px-4 py-2 rounded">CHANGE IMAGE</span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <i className="fas fa-cloud-upload-alt text-2xl text-slate-500 group-hover:text-violet-400"></i>
            </div>
            <p className="pixel-font text-[10px] text-slate-500 mb-2">DRAG OR CLICK</p>
            <p className="text-xs text-slate-600">JPG, PNG, WebP supported</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
