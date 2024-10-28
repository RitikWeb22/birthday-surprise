import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMusicalNotes, IoPlay, IoPause, IoClose } from 'react-icons/io5';

const playlist = [
  { 
    id: 1, 
    title: 'Happy Birthday Song', 
    artist: 'Birthday Classics',
    src: '/2.mp3' 
  },
  { 
    id: 2, 
    title: 'Special Song', 
    artist: 'Special for you',
    src: '/3.mp3' 
  },
];

function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(true); // Set initial state to true
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(true); // Set initial state to true
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);

  // Load play state from localStorage
  useEffect(() => {
    const savedPlayState = localStorage.getItem('musicPlayerState');
    if (savedPlayState) {
      const { songId } = JSON.parse(savedPlayState);
      const savedSong = playlist.find(song => song.id === songId);
      if (savedSong) {
        setCurrentSong(savedSong);
      }
    }
    // Always set isPlaying to true on load
    setIsPlaying(true);
  }, []);

  // Save play state to localStorage
  useEffect(() => {
    localStorage.setItem('musicPlayerState', JSON.stringify({
      isPlaying,
      songId: currentSong.id
    }));
  }, [isPlaying, currentSong]);

  useEffect(() => {
    const loadAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.load();
          setIsLoaded(true);
          // Attempt to play immediately after loading
          audioRef.current.play().catch(error => {
            console.log('Autoplay prevented:', error);
            setIsPlaying(false);
          });
        } catch (error) {
          console.error('Error loading audio:', error);
        }
      }
    };

    loadAudio();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateProgress = () => {
      const duration = audio.duration;
      const currentTime = audio.currentTime;
      setProgress((currentTime / duration) * 100);
    };

    const handleEnded = () => {
      // Play next song in playlist
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % playlist.length;
      setCurrentSong(playlist[nextIndex]);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    // Always try to play when component mounts or song changes
    if (isPlaying) {
      audio.play().catch(error => {
        console.log('Autoplay prevented:', error);
        setIsPlaying(false);
      });
    }

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.log('Playback prevented:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = x / width;
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  };

  const handleSongChange = (e) => {
    const song = playlist[e.target.value];
    setCurrentSong(song);
    setIsPlaying(true);
    audioRef.current.src = song.src;
    audioRef.current.play().catch(error => {
      console.log('Playback prevented:', error);
      setIsPlaying(false);
    });
  };

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {isVisible ? (
        <motion.div
          className="bg-white/90 backdrop-blur-lg p-4 rounded-2xl shadow-xl w-72"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="relative">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute -right-2 -top-2 bg-purple-600 text-white p-1 rounded-full hover:bg-purple-700 transition-colors"
            >
              <IoClose size={16} />
            </button>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <IoMusicalNotes className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{currentSong.title}</h3>
                <p className="text-xs text-gray-500">{currentSong.artist}</p>
              </div>
            </div>

            <div 
              className="h-1 bg-gray-200 rounded-full mb-3 cursor-pointer"
              onClick={handleProgressClick}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition-colors"
              >
                {isPlaying ? <IoPause /> : <IoPlay />}
              </button>
              
              <select
                onChange={handleSongChange}
                className="bg-gray-100 px-3 py-2 rounded-xl text-sm"
                value={playlist.findIndex(song => song.id === currentSong.id)}
              >
                {playlist.map((song, index) => (
                  <option key={song.id} value={index}>{song.title}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsVisible(true)}
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        >
          <IoMusicalNotes size={24} />
        </motion.button>
      )}
      <audio ref={audioRef} src={currentSong.src} />
    </motion.div>
  );
}

export default MusicPlayer;
