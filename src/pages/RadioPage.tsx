import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX, SkipForward, SkipBack } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data
const mockTracks = [
  {
    id: '1',
    title: 'Lua Branca',
    artist: 'Mestre Irineu',
    duration: 183,
    imageUrl: 'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=600',
    audioUrl: '#'
  },
  {
    id: '2',
    title: 'Sol, Lua, Estrela',
    artist: 'Padrinho Sebastião',
    duration: 241,
    imageUrl: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=600',
    audioUrl: '#'
  },
  {
    id: '3',
    title: 'Estrela D\'Alva',
    artist: 'Madrinha Rita',
    duration: 199,
    imageUrl: 'https://images.pexels.com/photos/1694000/pexels-photo-1694000.jpeg?auto=compress&cs=tinysrgb&w=600',
    audioUrl: '#'
  },
  {
    id: '4',
    title: 'Flor de Jagube',
    artist: 'Padrinho Alfredo',
    duration: 227,
    imageUrl: 'https://images.pexels.com/photos/1671324/pexels-photo-1671324.jpeg?auto=compress&cs=tinysrgb&w=600',
    audioUrl: '#'
  },
  {
    id: '5',
    title: 'Flor das Águas',
    artist: 'Mestre Irineu',
    duration: 210,
    imageUrl: 'https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=600',
    audioUrl: '#'
  }
];

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const scheduleItems = [
  { time: '07:00', title: 'Hinário O Cruzeiro', description: 'Hinário completo do Mestre Irineu' },
  { time: '09:30', title: 'Músicas de Cura', description: 'Seleção de hinários de cura' },
  { time: '12:00', title: 'Hinários das Crianças', description: 'Seleção especial para as crianças' },
  { time: '14:30', title: 'O Justiceiro', description: 'Hinário do Padrinho Sebastião' },
  { time: '17:00', title: 'Nova Era', description: 'Hinário do Padrinho Alfredo' },
  { time: '19:30', title: 'Transmissão ao Vivo', description: 'Trabalho de concentração' },
  { time: '22:00', title: 'Hinos da Rainha', description: 'Seleção de hinos à Rainha da Floresta' }
];

const RadioPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(mockTracks[0]);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0);

  // Simulate playing the radio
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.duration) {
            // Move to next track
            const currentIndex = mockTracks.findIndex(track => track.id === currentTrack.id);
            const nextIndex = (currentIndex + 1) % mockTracks.length;
            setCurrentTrack(mockTracks[nextIndex]);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentTrack]);

  // Simulate changing schedule
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScheduleIndex((prev) => (prev + 1) % scheduleItems.length);
    }, 30000); // Change every 30 seconds for demo purposes
    
    return () => clearInterval(timer);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const nextTrack = () => {
    const currentIndex = mockTracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % mockTracks.length;
    setCurrentTrack(mockTracks[nextIndex]);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    const currentIndex = mockTracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? mockTracks.length - 1 : currentIndex - 1;
    setCurrentTrack(mockTracks[prevIndex]);
    setCurrentTime(0);
  };

  const isCurrentlyPlaying = (id: string) => {
    return currentTrack.id === id && isPlaying;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Rádio Ripi ia iá
            </h1>
            <p className="text-lg text-primary-100 mb-8">
              Ouça nossa programação de hinários e cantos da doutrina do Santo Daime
              24 horas por dia, 7 dias por semana.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Player & Current Track */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-48 h-48 mb-6 md:mb-0 md:mr-6 rounded-lg overflow-hidden">
                    <img 
                      src={currentTrack.imageUrl} 
                      alt={currentTrack.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-4">
                      <h2 className="text-2xl font-semibold mb-1">{currentTrack.title}</h2>
                      <p className="text-gray-600">{currentTrack.artist}</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(currentTrack.duration)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={currentTrack.duration}
                        value={currentTime}
                        onChange={handleProgressChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={prevTrack}
                          className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
                          aria-label="Anterior"
                        >
                          <SkipBack className="w-6 h-6" />
                        </button>
                        
                        <button 
                          onClick={handlePlayPause}
                          className="p-4 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                          aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                        >
                          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </button>
                        
                        <button 
                          onClick={nextTrack}
                          className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
                          aria-label="Próximo"
                        >
                          <SkipForward className="w-6 h-6" />
                        </button>
                      </div>
                      
                      <div className="flex items-center">
                        <button 
                          onClick={toggleMute}
                          className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
                          aria-label={isMuted ? "Ativar som" : "Silenciar"}
                        >
                          {isMuted || volume === 0 ? (
                            <VolumeX className="w-5 h-5" />
                          ) : volume < 0.5 ? (
                            <Volume1 className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>
                        
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Playlist */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-primary-50 border-b border-primary-100">
                  <h3 className="font-semibold text-primary-800">Playlist Atual</h3>
                </div>
                
                <div className="divide-y">
                  {mockTracks.map((track) => (
                    <div 
                      key={track.id}
                      className={`p-4 flex items-center hover:bg-gray-50 transition-colors ${
                        track.id === currentTrack.id ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="w-12 h-12 mr-4 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={track.imageUrl} 
                          alt={track.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{track.title}</h4>
                        <p className="text-sm text-gray-500 truncate">{track.artist}</p>
                      </div>
                      
                      <div className="flex items-center ml-4">
                        <span className="text-sm text-gray-500 mr-4">
                          {formatTime(track.duration)}
                        </span>
                        
                        <button 
                          onClick={() => {
                            setCurrentTrack(track);
                            setCurrentTime(0);
                            setIsPlaying(true);
                          }}
                          className={`p-2 rounded-full ${
                            isCurrentlyPlaying(track.id)
                              ? 'bg-primary-100 text-primary-700'
                              : 'text-gray-500 hover:text-primary-600'
                          }`}
                          aria-label={isCurrentlyPlaying(track.id) ? "Pausar" : "Reproduzir"}
                        >
                          {isCurrentlyPlaying(track.id) ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar - Schedule & Info */}
            <div>
              {/* Currently On Air */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                key={currentScheduleIndex}
                className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-lg shadow-md p-6 mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">No Ar Agora</h3>
                  <span className="text-sm bg-white/20 px-2 py-1 rounded">Ao Vivo</span>
                </div>
                
                <h2 className="text-xl font-semibold mb-2">
                  {scheduleItems[currentScheduleIndex].title}
                </h2>
                <p className="text-primary-100 mb-4">
                  {scheduleItems[currentScheduleIndex].description}
                </p>
                
                <div className="text-sm text-primary-100">
                  Início: {scheduleItems[currentScheduleIndex].time}
                </div>
              </motion.div>
              
              {/* Today's Schedule */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-primary-50 border-b border-primary-100">
                  <h3 className="font-semibold text-primary-800">Programação do Dia</h3>
                </div>
                
                <div className="divide-y">
                  {scheduleItems.map((item, index) => (
                    <div 
                      key={index}
                      className={`p-4 ${
                        index === currentScheduleIndex ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <span className="text-sm text-gray-500">{item.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="mt-8 bg-earth-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Sobre a Rádio</h3>
                <p className="text-sm text-gray-700 mb-4">
                  A Rádio Ripi ia iá é um projeto dedicado à difusão da musicalidade 
                  da doutrina do Santo Daime, transmitindo hinários e conteúdos 
                  relacionados 24 horas por dia.
                </p>
                <a 
                  href="#" 
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Saiba mais sobre o projeto →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RadioPage;