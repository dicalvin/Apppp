
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MessageCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { StoryBoard } from './components/StoryBoard';
import { ApologyGenerator } from './components/ApologyGenerator';
import { FinalVerdict } from './components/FinalVerdict';
import { SnapchatScreen } from './components/SnapchatScreen';

enum AppState {
  WELCOME = 'WELCOME',
  STORY = 'STORY',
  GENERATOR = 'GENERATOR',
  VERDICT = 'VERDICT',
  SNAPCHAT = 'SNAPCHAT'
}

const App: React.FC = () => {
  const [step, setStep] = useState<AppState>(AppState.WELCOME);
  const [forgivenessLevel, setForgivenessLevel] = useState(0);

  const nextStep = () => {
    switch (step) {
      case AppState.WELCOME: setStep(AppState.STORY); break;
      case AppState.STORY: setStep(AppState.GENERATOR); break;
      case AppState.GENERATOR: setStep(AppState.VERDICT); break;
      case AppState.VERDICT: setStep(AppState.SNAPCHAT); break;
      default: break;
    }
  };

  const reset = () => {
    setStep(AppState.WELCOME);
    setForgivenessLevel(0);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Background Bubbles/Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200/50"
            initial={{ y: '110vh', x: `${Math.random() * 100}vw` }}
            animate={{ 
              y: '-10vh',
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
          >
            <Heart size={20 + Math.random() * 40} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === AppState.WELCOME && (
          <WelcomeScreen key="welcome" onNext={nextStep} />
        )}
        {step === AppState.STORY && (
          <StoryBoard key="story" onNext={nextStep} />
        )}
        {step === AppState.GENERATOR && (
          <ApologyGenerator 
            key="generator" 
            onNext={nextStep} 
            onUpdateForgiveness={setForgivenessLevel}
          />
        )}
        {step === AppState.VERDICT && (
          <FinalVerdict 
            key="verdict" 
            forgivenessLevel={forgivenessLevel}
            onNext={nextStep}
          />
        )}
        {step === AppState.SNAPCHAT && (
          <SnapchatScreen key="snapchat" onReset={reset} />
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 flex gap-2">
        {Object.values(AppState).map((s, idx) => (
          <div 
            key={s} 
            className={`h-2 rounded-full transition-all duration-500 ${step === s ? 'w-8 bg-pink-500' : 'w-2 bg-pink-200'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
