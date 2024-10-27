import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memories } from '../data/memories';
import { memoryImages } from '../data/images';

function Memories() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const currentMemory = memories[currentPage];
  const currentImage = memoryImages[currentPage];

  useEffect(() => {
    localStorage.setItem('currentMemoryPage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    const savedPage = localStorage.getItem('currentMemoryPage');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    }
  }, []);

  const flipPage = (newDirection) => {
    setDirection(newDirection);
    setCurrentPage((prevPage) => {
      const newPage = prevPage + newDirection;
      return Math.max(0, Math.min(newPage, memories.length - 1));
    });
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPage < memories.length - 1) {
        flipPage(1);
      } else if (diff < 0 && currentPage > 0) {
        flipPage(-1);
      }
    }
    setTouchStart(null);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16 md:pt-24 pb-12 px-4"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 md:mb-16"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">
            Our Cherished Memories
          </span>
        </motion.h1>

        <div 
          className="relative h-[550px] sm:h-[650px] md:h-[750px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              className="absolute w-full h-full"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden h-full border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  <div className="relative h-72 sm:h-80 md:h-full">
                    <motion.img
                      src={currentImage.src}
                      alt={currentImage.alt}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ scale: 1.2, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <motion.div
                      className="absolute bottom-6 left-6 right-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-shadow-lg">
                        {currentMemory.title}
                      </h2>
                      <p className="text-white/90 text-lg">{currentMemory.date}</p>
                    </motion.div>
                  </div>

                  <div className="p-8 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-white/5 to-transparent">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="space-y-8"
                    >
                      <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed">
                        {currentMemory.description}
                      </p>
                      <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
                      <p className="text-2xl sm:text-3xl italic text-violet-300">
                        {currentMemory.message}
                      </p>
                    </motion.div>

                    <div className="flex justify-between items-center mt-8 sm:mt-10">
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => flipPage(-1)}
                        disabled={currentPage === 0}
                        className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 border border-white/20"
                      >
                        Previous
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => flipPage(1)}
                        disabled={currentPage >= memories.length - 1}
                        className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 border border-white/20"
                      >
                        Next
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default Memories;
