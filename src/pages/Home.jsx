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
      confetti({
        particleCount: 150,
        spread: 180,
        origin: { y: 0.6 },
        colors: ['#C084FC', '#E879F9', '#F472B6']
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 pt-20 pb-10 px-4"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-center mb-8 md:mb-12"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        >
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            {homeContent.title}
          </span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative z-10"
          >
            <div className="bg-white/80 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-xl">
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-700 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {homeContent.message}
              </motion.p>
              <motion.div
                className="w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative h-[300px] sm:h-[400px] md:h-[500px] flex justify-center items-center"
          >
            <div className="relative w-full h-full max-w-[500px]">
              {homeImages && homeImages.map((image, index) => (
                <motion.div
                  key={index}
                  className={`absolute ${
                    index === 0 ? 'top-0 left-0 sm:left-4 z-20' :
                    index === 1 ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30' :
                    'bottom-0 right-0 sm:right-4 z-20'
                  }`}
                  initial={{ 
                    scale: 0.8,
                    rotate: index === 0 ? -20 : index === 2 ? 20 : 0,
                    x: index === 0 ? -50 : index === 2 ? 50 : 0
                  }}
                  animate={{ 
                    scale: 1,
                    rotate: index === 0 ? -8 : index === 2 ? 8 : 0,
                    x: 0
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 0,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ 
                    delay: 0.6 + index * 0.2,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {image && image.src && (
                    <img
                      src={image.src}
                      alt={image.alt || 'Image'}
                      loading="lazy"
                      onError={(e) => {
                        console.error('Image failed to load:', image.src);
                        e.target.src = '/fallback-image.jpg'; // Add a fallback image
                      }}
                      className={`rounded-2xl shadow-2xl ${
                        index === 1 
                          ? 'w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72' 
                          : 'w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56'
                      } object-cover transition-transform duration-300`}
                      style={{
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        border: '4px solid white'
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
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
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-lg sm:text-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
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
