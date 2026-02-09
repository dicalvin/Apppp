
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl text-center z-10 border border-pink-100"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="inline-block p-4 bg-pink-100 rounded-full mb-6"
      >
        <Heart className="text-pink-500" size={48} fill="#ec4899" />
      </motion.div>
      
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        Hey Sherry! 👋
      </h1>
      
      <p className="text-gray-600 mb-8 leading-relaxed">
        This is a special message for <span className="font-semibold text-pink-500">Sheldine Namanya Beyunga</span>. 
        <br/><br/>
        Calvin Diego Rwothomio has something he needs to say... and it's mostly about how Friday went down.
      </p>

      <button
        onClick={onNext}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
      >
        Open the Apology 💌
      </button>
    </motion.div>
  );
};
