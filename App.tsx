import React, { useState } from 'react';
import { SparkleBackground } from './components/SparkleBackground';
import { RunawayButton } from './components/InteractiveButton';
import { generateLovePoem } from './services/geminiService';
import { AppState } from './types';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, Gift, Gem } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.INVITATION);
  const [poem, setPoem] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [yesScale, setYesScale] = useState(1);

  const handleNoInteraction = () => {
    setYesScale((prev) => Math.min(prev + 0.15, 3)); // Grow gradually up to 3x size
  };

  const handleAccept = async () => {
    // Trigger Gold and Red confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#E11D48', '#FFFFFF']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#E11D48', '#FFFFFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setState(AppState.ACCEPTED);
    setIsLoading(true);

    try {
      const generatedPoem = await generateLovePoem("Mary Beth");
      setPoem(generatedPoem);
    } catch (e) {
      setPoem("Roses are red, violets are blue, I'm so lucky to have a diamond like you!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <SparkleBackground />
      
      {/* Immersive Layout Container */}
      <div className="z-10 w-full max-w-4xl flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {state === AppState.INVITATION && (
            <motion.div
              key="invitation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center space-y-8 md:space-y-12 py-10"
            >
              
              {/* Floating Header Element */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-10 bg-rose-500/20 blur-[60px] rounded-full pointer-events-none"></div>
                
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex flex-col items-center"
                >
                   <span className="font-serif-display text-amber-200 tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    For the most beautiful girl
                   </span>
                   <Gem className="w-16 h-16 md:w-20 md:h-20 text-amber-300 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" strokeWidth={1} />
                </motion.div>
              </motion.div>

              {/* Massive Editorial Typography */}
              <div className="relative z-10">
                <motion.h1 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.3 }}
                  className="font-serif-display text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-white to-rose-100 leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] pb-4"
                >
                  Mary Beth
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 1 }}
                  className="text-rose-100 text-xl md:text-2xl font-light font-serif-display italic mt-4 drop-shadow-md"
                >
                  You sparkle brighter than any <span className="text-amber-300 font-bold not-italic drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">diamond</span>.
                </motion.p>
              </div>

              {/* The Big Question */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="w-full max-w-2xl"
              >
                <h2 className="font-handwriting text-5xl md:text-7xl text-rose-300 mb-16 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] transform -rotate-2">
                  Will you be my Valentine? 
                </h2>

                <div className="flex flex-col items-center justify-center gap-10 min-h-[200px] relative w-full">
                  {/* The YES Button - Massive & Central */}
                  <motion.button
                    animate={{ scale: yesScale }}
                    whileHover={{ scale: yesScale * 1.05, boxShadow: "0 0 50px rgba(251, 191, 36, 0.5)" }}
                    whileTap={{ scale: yesScale * 0.98 }}
                    onClick={handleAccept}
                    className="group relative px-16 py-6 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-700 text-rose-950 rounded-full shadow-2xl z-20 overflow-hidden ring-4 ring-rose-900/50"
                  >
                    <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors"></div>
                    <span className="relative flex items-center gap-4 font-serif-display text-2xl md:text-3xl tracking-wide uppercase font-bold">
                      <Stars className="w-6 h-6 md:w-8 md:h-8 text-rose-900" />
                       Yes, I Will
                      <Stars className="w-6 h-6 md:w-8 md:h-8 text-rose-900" />
                    </span>
                  </motion.button>

                  {/* The No Button - Floating in space */}
                  <div className="relative w-full h-12 flex items-center justify-center pointer-events-none">
                    <div className="pointer-events-auto">
                      <RunawayButton 
                        text="No thanks" 
                        onClick={() => {}} 
                        onInteraction={handleNoInteraction}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {state === AppState.ACCEPTED && (
            <motion.div
              key="accepted"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
              className="flex flex-col items-center justify-center text-center space-y-8 py-10"
            >
              {/* No Box Container - Floating text like first page */}
              
              <motion.div 
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
                className="mb-4 inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-amber-100 to-amber-300 rounded-full shadow-[0_0_40px_rgba(251,191,36,0.4)] ring-4 ring-amber-100/50"
              >
                <Gift className="w-12 h-12 md:w-16 md:h-16 text-rose-900" strokeWidth={1.5} />
              </motion.div>

              <div className="relative z-10 w-full px-4">
                <motion.h2 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="font-serif-display text-5xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-rose-200 mb-6 drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]"
                >
                  She Said Yes!
                </motion.h2>
                
                <div className="relative max-w-3xl mx-auto p-2 md:p-4">
                   {/* Subtle glow behind the poem instead of a box */}
                   <div className="absolute inset-0 bg-rose-950/30 blur-3xl rounded-full"></div>
                   
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.5 }}
                     className="relative z-10"
                   >
                     <h3 className="text-xs uppercase tracking-[0.4em] text-amber-300 font-bold mb-6 font-serif-display">
                       A Poem for You
                     </h3>
                   
                     {isLoading ? (
                       <div className="flex flex-col items-center justify-center py-6 space-y-4">
                         <div className="w-12 h-12 border-4 border-rose-900/50 border-t-amber-400 rounded-full animate-spin"></div>
                         <p className="text-sm text-amber-200/80 animate-pulse font-serif-display italic">Consulting Cupid...</p>
                       </div>
                     ) : (
                       <motion.p 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="font-handwriting text-xl sm:text-2xl md:text-4xl text-white leading-relaxed whitespace-pre-line drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] px-4"
                       >
                         {poem}
                       </motion.p>
                     )}
                   </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="w-full text-center py-6 text-rose-200/30 text-[10px] uppercase tracking-[0.3em] font-serif-display z-10">
        Designed exclusively for Mary Beth
      </footer>
    </div>
  );
};

export default App;