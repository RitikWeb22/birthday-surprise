import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Virtuoso } from 'react-virtuoso';
import { galleryImages } from '../data/galleryImages';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const GridItem = ({ index }) => {
    const image = galleryImages[index];
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="aspect-square p-2"
      >
        <div 
          className="group relative h-full cursor-pointer rounded-2xl overflow-hidden glass"
          onClick={() => setSelectedImage(image)}
        >
          <img
            src={image.src}
            alt={image.alt || 'Gallery image'}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <h3 className="text-white text-lg font-semibold">{image.title || 'Untitled'}</h3>
                <p className="text-white/80 text-sm">{image.caption || 'Click to expand'}</p>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-xs">
                  {image.date || 'No date'}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Our Photo Gallery
          </span>
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <GridItem key={image.id || index} index={index} />
          ))}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="h-full flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-4xl w-full"
                >
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt || 'Expanded view'}
                    className="w-full h-auto rounded-lg shadow-2xl"
                    loading="eager"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h2 className="text-white text-2xl font-bold mb-2">{selectedImage.title || 'Untitled'}</h2>
                    <p className="text-white/90 mb-2">{selectedImage.caption}</p>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                        {selectedImage.date || 'No date'}
                      </span>
                      {selectedImage.location && (
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                          📍 {selectedImage.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute -top-4 -right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(null);
                    }}
                  >
                    ✕
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Gallery;
