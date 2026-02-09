
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Stars, RotateCcw } from 'lucide-react';

interface FinalVerdictProps {
  forgivenessLevel: number;
  onReset: () => void;
}

export const FinalVerdict: React.FC<FinalVerdictProps> = ({ forgivenessLevel, onReset }) => {
  const [verdict, setVerdict] = useState<'NONE' | 'FORGIVEN' | 'TALK'>('NONE');
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);

  const moveNo = () => {
    if (noCount >= 3) return; // Stop moving so she can click the "Talk it out" option
    const x = (Math.random() - 0.5) * 250;
    const y = (Math.random() - 0.5) * 200;
    setNoPosition({ x, y });
    setNoCount(prev => prev + 1);
  };

  const handleNoClick = () => {
    if (noCount >= 3) {
      setVerdict('TALK');
    } else {
      moveNo();
    }
  };

  if (verdict === 'FORGIVEN') {
    return (
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl text-center z-10 border-4 border-pink-400"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="mb-6 inline-block"
        >
          <Stars className="text-yellow-400" size={64} fill="#fbbf24" />
        </motion.div>
        <h2 className="text-4xl font-extrabold text-pink-600 mb-4">MERCY!</h2>
        <p className="text-gray-600 text-lg mb-8">
          Thank you Sherry! You are the most patient person in the world. Calvin is officially out of the doghouse! 🏠🐕
        </p>
        <button
          onClick={onReset}
          className="px-8 py-3 bg-pink-100 text-pink-600 rounded-xl font-bold hover:bg-pink-200 transition-colors flex items-center gap-2 mx-auto"
        >
          <RotateCcw size={18} /> Replay
        </button>
      </motion.div>
    );
  }

  if (verdict === 'TALK') {
    return (
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl text-center z-10 border-4 border-blue-300"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6 inline-block"
        >
          <MessageCircle className="text-blue-500" size={64} fill="#3b82f6" />
        </motion.div>
        <h2 className="text-4xl font-extrabold text-blue-600 mb-4">LET'S TALK</h2>
        <p className="text-gray-600 text-lg mb-8">
          Sherry has spoken! We need to talk it out properly. Calvin is ready to listen, explain, and make it better. 🗣️💖
        </p>
        <button
          onClick={onReset}
          className="px-8 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-colors flex items-center gap-2 mx-auto"
        >
          <RotateCcw size={18} /> Start Over
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl text-center z-10 border border-pink-100 relative overflow-hidden"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">The Final Word</h2>
      <p className="text-pink-500 font-medium mb-8">Sherry, what's it going to be?</p>
      
      <div className="flex flex-col gap-6 items-center min-h-[250px] justify-center">
        <button
          onClick={() => setVerdict('FORGIVEN')}
          className="w-56 bg-green-500 hover:bg-green-600 text-white font-bold py-5 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 z-20 flex items-center justify-center gap-2"
        >
          FORGIVE CALVIN 💖
        </button>

        <motion.button
          animate={{ x: noPosition.x, y: noPosition.y }}
          onMouseEnter={moveNo}
          onClick={handleNoClick}
          className={`w-56 font-bold py-4 rounded-2xl shadow-md transition-colors z-20 ${
            noCount >= 3 
            ? "bg-blue-500 hover:bg-blue-600 text-white" 
            : "bg-gray-200 text-gray-500"
          }`}
        >
          {noCount < 3 ? "NO 😤" : "Fine, let's talk... 💬"}
        </motion.button>
        
        <p className="text-gray-400 text-xs italic max-w-[200px]">
          {noCount === 0 && "Warning: The 'No' button is very stubborn."}
          {noCount > 0 && noCount < 3 && "Keep trying, or be nice!"}
          {noCount >= 3 && "Okay, okay! Compromise reached!"}
        </p>
      </div>

      <div className="absolute -bottom-10 -left-10 opacity-5">
        <Heart size={200} fill="#f472b6" />
      </div>
    </motion.div>
  );
};
