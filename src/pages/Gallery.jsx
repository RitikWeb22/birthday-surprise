import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../data/galleryImages';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Sisters' Photo Gallery
          </span>
        </motion.h1>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              variants={item}
              className="group relative overflow-hidden rounded-2xl shadow-xl aspect-square cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {image.alt}
                  </h3>
                  <p className="text-white/80">Click to view</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg"
        >
          <p className="text-xl text-gray-700">
            Thank you for viewing these precious memories! Happy Birthday Anshu 🎉
          </p>
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 p-4 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Gallery;
