import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onClick: () => void;
  text: string;
  onInteraction?: () => void;
}

export const RunawayButton: React.FC<Props> = ({ onClick, text, onInteraction }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const moveButton = () => {
    if (!buttonRef.current) return;

    // Get the current visual position and dimensions of the button
    const rect = buttonRef.current.getBoundingClientRect();
    const buttonWidth = rect.width;
    const buttonHeight = rect.height;

    // Viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Safety padding to keep it away from edges
    const padding = 20;

    // Calculate the maximum allowed positions (top-left coordinates)
    const maxLeft = viewportWidth - buttonWidth - padding;
    const maxTop = viewportHeight - buttonHeight - padding;

    // Generate a random target position within the safe area
    const targetX = Math.max(padding, Math.random() * maxLeft);
    const targetY = Math.max(padding, Math.random() * maxTop);

    // Calculate the delta needed from the *current layout position* to the *target position*
    // The visual position (rect.left) includes the current transform (position.x).
    // Layout position = rect.left - position.x
    const layoutLeft = rect.left - position.x;
    const layoutTop = rect.top - position.y;

    // New transform value = Target Visual Position - Layout Position
    const newX = targetX - layoutLeft;
    const newY = targetY - layoutTop;
    
    setPosition({ x: newX, y: newY });
    
    if (onInteraction) {
      onInteraction();
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={moveButton}
      onTouchStart={moveButton} // For mobile users who try to tap
      onClick={moveButton} // Just in case they manage to click it
      className="px-6 py-2 bg-rose-950/40 backdrop-blur-md text-rose-200 border border-rose-500/30 rounded-full font-serif-display text-sm tracking-widest uppercase hover:bg-rose-900/60 hover:border-rose-400 transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)] z-50 whitespace-nowrap"
      style={{ position: 'relative' }} 
    >
      {text}
    </motion.button>
  );
};