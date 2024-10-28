import React from 'react';
import { motion } from 'framer-motion';

function ParticlesBackground() {
  const particles = Array.from({ length: 50 });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.3,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}

export default ParticlesBackground;
