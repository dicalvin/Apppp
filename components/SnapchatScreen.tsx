
import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Ghost, Heart, Camera } from 'lucide-react';

interface SnapchatScreenProps {
  onReset: () => void;
}

export const SnapchatScreen: React.FC<SnapchatScreenProps> = ({ onReset }) => {
  const handleScreenshotReminder = () => {
    alert("Don't forget to screenshot your meter and this message to send to Calvin! 📸💖");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl p-10 shadow-2xl text-center z-10 border-2 border-pink-200 relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 opacity-10 rotate-12">
        <Ghost size={120} className="text-pink-400" />
      </div>
      
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          y: [0, -5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8 inline-block p-5 bg-pink-100 rounded-3xl"
      >
        <Ghost className="text-pink-500" size={64} fill="#ec4899" />
      </motion.div>

      <h2 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
        You still have to add him on Snapchat though 🥲
      </h2>
      
      <p className="text-gray-500 mb-8 italic">
        "Consider this the terms and conditions of our new beginning..."
      </p>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleScreenshotReminder}
          className="w-full bg-pink-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-pink-600 transition-all flex items-center justify-center gap-2"
        >
          <Camera size={20} /> Screenshot & Send
        </button>

        <button
          onClick={onReset}
          className="w-full bg-white py-4 rounded-2xl text-gray-400 font-medium border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} /> Start Over
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ delay: i * 0.1, duration: 2, repeat: Infinity }}
          >
            <Heart size={12} className="text-pink-300" fill="#fbcfe8" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
