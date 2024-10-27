import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Memories from './pages/Memories';
import Gallery from './pages/Gallery';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
        <MusicPlayer />

      </div>
    </Router>
  );
}

export default App;