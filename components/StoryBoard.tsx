
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Frown, Clock, AlertCircle, ArrowRight } from 'lucide-react';

interface StoryBoardProps {
  onNext: () => void;
}

const slides = [
  {
    icon: <Clock className="text-pink-400" size={40} />,
    title: "Friday happened...",
    text: "Everything was set, the vibes were there, but somehow things took a weird turn."
  },
  {
    icon: <Frown className="text-pink-400" size={40} />,
    title: "My Bad!",
    text: "I might have messed up the timing, the plan, or just the general energy. I admit it!"
  },
  {
    icon: <AlertCircle className="text-pink-400" size={40} />,
    title: "The Result",
    text: "It wasn't the perfect Friday it should have been with someone as amazing as you."
  }
];

export const StoryBoard: React.FC<StoryBoardProps> = ({ onNext }) => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      onNext();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl z-10 border border-pink-100 min-h-[400px] flex flex-col justify-between"
    >
      <div className="relative h-64">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center text-center py-4"
          >
            <div className="mb-6">{slides[current].icon}</div>
            <h2 className="text-2xl font-bold text-pink-600 mb-4">{slides[current].title}</h2>
            <p className="text-gray-600 leading-relaxed">{slides[current].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 mt-4"
      >
        {current === slides.length - 1 ? "Get to the point..." : "Next Page"} <ArrowRight size={20} />
      </button>
    </motion.div>
  );
};
