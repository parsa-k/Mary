import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gem, Heart, Stars } from 'lucide-react';

const FloatingElement: React.FC<{ delay: number; type: 'gem' | 'rose' | 'white-rose' | 'heart' | 'star' }> = ({ delay, type }) => {
  const randomTop = Math.random() * 100;
  const randomLeft = Math.random() * 100;
  
  // Emojis need to be slightly larger to match the visual weight of the icons
  const isEmoji = type === 'rose' || type === 'white-rose';
  const size = isEmoji ? Math.random() * 15 + 25 : Math.random() * 20 + 15; 
  
  const duration = Math.random() * 20 + 10;

  const getIcon = () => {
    switch (type) {
      case 'gem': return <Gem size={size} className="text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" strokeWidth={1.5} />;
      // Red Rose - Using Emoji for maximum recognizability as requested
      case 'rose': return (
        <div style={{ fontSize: `${size}px`, lineHeight: 1 }} className="filter drop-shadow-lg cursor-default select-none">
          🌹
        </div>
      );
      // White Rose - Using Emoji with grayscale and brightness filter to turn the red rose white/silver
      case 'white-rose': return (
        <div style={{ fontSize: `${size}px`, lineHeight: 1, filter: 'grayscale(100%) brightness(250%) contrast(0.8)' }} className="drop-shadow-lg cursor-default select-none">
          🌹
        </div>
      );
      case 'heart': return <Heart size={size} className="text-pink-500 fill-pink-500/30" />;
      case 'star': return <Stars size={size} className="text-white opacity-80" />;
    }
  };

  return (
    <motion.div
      initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
      animate={{ 
        y: [0, -100, 0], 
        x: [0, 50, -50, 0],
        opacity: [0, 0.8, 0],
        // Swaying motion (like a falling leaf/flower) instead of full spin, 
        // which helps keep the emoji recognizable as a rose
        rotate: [0, 25, -25, 0] 
      }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        delay: delay,
        ease: "linear"
      }}
      style={{
        position: 'absolute',
        top: `${randomTop}%`,
        left: `${randomLeft}%`,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {getIcon()}
    </motion.div>
  );
};

export const SparkleBackground: React.FC = () => {
  const [elements, setElements] = useState<{ id: number; type: 'gem' | 'rose' | 'white-rose' | 'heart' | 'star' }[]>([]);

  useEffect(() => {
    // Balanced mix with high density of roses as requested
    const types: ('gem' | 'rose' | 'white-rose' | 'heart' | 'star')[] = [
      'gem', 
      'rose', 'rose', 'rose', 'rose', // Plenty of Red roses
      'white-rose', 'white-rose', 'white-rose', // Plenty of White roses
      'heart', 'heart',
      'star'
    ]; 
    
    // Create a very busy background
    const newElements = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)]
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900 via-red-950 to-black">
      {/* Decorative overlaid gradients for depth */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
      
      {elements.map((el) => (
        <FloatingElement key={el.id} delay={Math.random() * 20} type={el.type} />
      ))}
    </div>
  );
};