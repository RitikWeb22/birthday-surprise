import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import MusicPlayer from './components/MusicPlayer';
import CustomCursor from './components/CustomCursor';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Memories = lazy(() => import('./pages/Memories'));
const Gallery = lazy(() => import('./pages/Gallery'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200">
        <CustomCursor />
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Suspense>
        <MusicPlayer />
      </div>
    </Router>
  );
}

export default App;
