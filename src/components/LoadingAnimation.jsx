import React from 'react';
import { motion } from 'framer-motion';

function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center z-50">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {['H', 'B', 'D'].map((letter, i) => (
          <motion.span
            key={i}
            className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export default LoadingAnimation;
