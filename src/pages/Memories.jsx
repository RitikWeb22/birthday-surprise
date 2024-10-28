import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memories } from '../data/memories';
import { memoryImages } from '../data/images';
import { IoChevronBack, IoChevronForward, IoCalendar, IoHeart, IoExpand, IoClose } from 'react-icons/io5';

function Memories() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showFullImage, setShowFullImage] = useState(false);

  const currentMemory = memories[currentPage];
  const currentImage = memoryImages[currentPage];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    if (
      (currentPage === 0 && newDirection === -1) ||
      (currentPage === memories.length - 1 && newDirection === 1)
    )
      return;

    setDirection(newDirection);
    setCurrentPage(currentPage + newDirection);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 px-4 md:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative min-h-[600px] md:h-[80vh] w-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full h-full"
            >
              <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-2 gap-6 p-4 md:p-6">
                {/* Image Section - Now visible on all screens */}
                <motion.div 
                  className="relative h-[300px] md:h-[400px] lg:h-full w-full rounded-3xl md:rounded-2xl group cursor-pointer"
                  onClick={() => setShowFullImage(true)}
                >
                  <motion.img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <IoExpand className="text-3xl mb-2" />
                      <p className="text-sm">Click to expand</p>
                    </div>
                  </div>
                </motion.div>

                {/* Content Section */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-purple-100 p-3 rounded-2xl">
                      <IoCalendar className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-gray-600 font-medium">Date</h3>
                      <p className="text-gray-900">{currentMemory.date}</p>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {currentMemory.title}
                  </h2>

                  <div className="prose prose-sm md:prose-base lg:prose-lg text-gray-600 mb-6 overflow-y-auto max-h-[200px] md:max-h-none">
                    {currentMemory.description}
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="flex items-center space-x-3 mb-6">
                      <IoHeart className="text-pink-500 text-xl md:text-2xl flex-shrink-0" />
                      <p className="text-lg md:text-xl italic text-purple-600">
                        {currentMemory.message}
                      </p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => paginate(-1)}
                        disabled={currentPage === 0}
                        className="p-3 md:p-4 rounded-2xl bg-purple-100 text-purple-600 disabled:opacity-50"
                      >
                        <IoChevronBack className="text-xl md:text-2xl" />
                      </motion.button>

                      <div className="flex space-x-2">
                        {memories.map((_, index) => (
                          <motion.button
                            key={index}
                            onClick={() => {
                              setDirection(index > currentPage ? 1 : -1);
                              setCurrentPage(index);
                            }}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                              currentPage === index 
                                ? 'bg-purple-600' 
                                : 'bg-purple-200'
                            }`}
                            whileHover={{ scale: 1.2 }}
                          />
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => paginate(1)}
                        disabled={currentPage === memories.length - 1}
                        className="p-3 md:p-4 rounded-2xl bg-purple-100 text-purple-600 disabled:opacity-50"
                      >
                        <IoChevronForward className="text-xl md:text-2xl" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {showFullImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 flex items-center justify-center"
            onClick={() => setShowFullImage(false)}
          >
            <motion.button
              className="absolute top-4 right-4 text-white bg-white/10 p-2 rounded-full"
              onClick={() => setShowFullImage(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoClose size={24} />
            </motion.button>
            <motion.img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Memories;
