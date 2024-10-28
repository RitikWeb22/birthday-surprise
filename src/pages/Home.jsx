import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { homeContent } from '../data/homeContent';
import { homeImages } from '../data/images';

function Home() {
  const [showSurprise, setShowSurprise] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSurprise(true);
      launchConfetti();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const launchConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#C084FC', '#E879F9', '#F472B6']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#C084FC', '#E879F9', '#F472B6']
      });
    }, 50);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-10 px-4 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section - Shows first on mobile/tablet */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative h-[400px] sm:h-[500px] md:h-[600px] flex justify-center items-center lg:order-2"
          >
            <div className="relative w-full h-full max-w-[600px] flex justify-center items-center">
              {homeImages && homeImages[0] && (
                <motion.div
                  className="absolute transform -translate-y-1/2 z-30"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.4 }
                  }}
                  transition={{ 
                    delay: 0.6,
                    duration: 1,
                    type: "spring",
                    stiffness: 80
                  }}
                >
                  <img
                    src={homeImages[0].src}
                    alt={homeImages[0].alt || 'Memory Image'}
                    loading="lazy"
                    onError={(e) => {
                      console.error('Image failed to load:', homeImages[0].src);
                      e.target.src = '/fallback-image.jpg';
                    }}
                    className="rounded-3xl w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover transition-all duration-300"
                    style={{
                      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                      border: '5px solid rgba(255,255,255,0.9)',
                      filter: 'brightness(1.05)'
                    }}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Content Section - Shows second on mobile/tablet */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative z-10 lg:order-1"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                {homeContent.title}
              </span>
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="prose prose-lg text-gray-600 mb-8 whitespace-pre-line"
            >
              {homeContent.message}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-lg sm:text-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                onClick={launchConfetti}
              >
                Celebrate! 🎉
              </motion.button>
              
            </motion.div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showSurprise && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 10 }}
                transition={{ type: "spring", bounce: 0.35 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Surprise!
                  </h2>
                  <p className="text-xl sm:text-2xl text-gray-700 mb-8">
                    {homeContent.surpriseMessage}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-lg sm:text-xl font-semibold shadow-lg hover:shadow-xl"
                    onClick={() => setShowSurprise(false)}
                  >
                    Thank you! ❤️
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Home;
