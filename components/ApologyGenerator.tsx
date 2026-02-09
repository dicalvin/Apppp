
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Camera } from 'lucide-react';

interface ApologyGeneratorProps {
  onNext: () => void;
  onUpdateForgiveness: (val: number) => void;
}

export const ApologyGenerator: React.FC<ApologyGeneratorProps> = ({ onNext, onUpdateForgiveness }) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setSliderValue(val);
    onUpdateForgiveness(val);
    
    if (val === 100) {
      alert("Whoa! 100%?! Sherry, please take a screenshot of this meter and send it to Calvin right now! 📸💖");
    }
  };

  const handleNext = () => {
    alert("Don't forget to screenshot this meter to show Calvin how you're feeling! 📸");
    onNext();
  };

  const getMoodEmoji = () => {
    if (sliderValue < 20) return "😤";
    if (sliderValue < 40) return "😒";
    if (sliderValue < 60) return "😐";
    if (sliderValue < 80) return "🙂";
    return "🥰";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl z-10 border-2 border-pink-200"
    >
      <div className="flex items-center justify-center gap-2 mb-8">
        <Heart className="text-pink-500" fill="#ec4899" />
        <h2 className="text-2xl font-bold text-pink-700">The Forgiveness Meter</h2>
      </div>

      <div className="bg-pink-50 rounded-2xl p-8 mb-8 flex flex-col items-center justify-center border border-pink-100 shadow-inner">
        <motion.div 
          animate={{ scale: 1 + (sliderValue / 200) }}
          className="text-6xl mb-4"
        >
          {getMoodEmoji()}
        </motion.div>
        <p className="text-pink-900 font-semibold text-xl">
          {sliderValue}% Forgiven
        </p>
        <p className="text-pink-400 text-sm mt-2 text-center italic">
          "Slide to tell Calvin exactly how much he's in trouble"
        </p>
      </div>

      <div className="mb-10 px-2">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderValue} 
          onChange={handleSlider}
          className="w-full h-4 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
        <div className="flex justify-between mt-4 text-sm font-bold text-pink-400">
          <span>Still Salty 🧂</span>
          <span>Pure Love ✨</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleNext}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          Submit My Mood <Camera size={20} />
        </button>
        <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
          Screenshot required for proof of mercy
        </p>
      </div>
    </motion.div>
  );
};
