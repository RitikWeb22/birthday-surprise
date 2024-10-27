import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = ['Home', 'Memories', 'Gallery'];

  return (
    <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-lg">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">SB</span>
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sister's Birthday
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`);
              return (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="relative group"
                >
                  <span className={`text-lg font-medium ${isActive ? 'text-purple-600' : 'text-gray-600'}`}>
                    {item}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                </Link>
              );
            })}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                className="w-full h-0.5 bg-purple-600 transform origin-left"
              />
              <motion.span
                animate={{ opacity: isOpen ? 0 : 1 }}
                className="w-full h-0.5 bg-purple-600"
              />
              <motion.span
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                className="w-full h-0.5 bg-purple-600 transform origin-left"
              />
            </div>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ x: 10 }}
                  className="py-2"
                >
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="block text-gray-600 hover:text-purple-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Header;
