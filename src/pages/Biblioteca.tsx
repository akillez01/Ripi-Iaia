import { motion } from 'framer-motion';
import { Pause, Play, SkipBack, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Mock de álbuns e faixas
const albums = [
  {
    id: 'album1',
    title: 'Hinário Lua Branca',
    artist: 'Mestre Irineu',
    cover: `${import.meta.env.BASE_URL}image/mad-rita.jpg`,
    pdfUrl: `${import.meta.env.BASE_URL}pdf/lua-branca.pdf`,
    tracks: [
      {
        id: '1',
        title: 'Lua Branca',
        duration: 183,
        audioUrl: `${import.meta.env.BASE_URL}audio/lua-branca/01.mp3`,
      },
      {
        id: '2',
        title: 'Do banco',
        duration: 200,
        audioUrl: 'https://insarmvkxbspphpmttix.supabase.co/storage/v1/object/public/ripi-storage/lua-branca/01.mp3',
      },
    ],
  },
  {
    id: 'album2',
    title: 'Hinário Madrinha Rita',
    artist: 'Madrinha Rita',
    cover: 'https://images.pexels.com/photos/1694000/pexels-photo-1694000.jpeg?auto=compress&cs=tinysrgb&w=600',
    pdfUrl: 'https://insarmvkxbspphpmttix.supabase.co/storage/v1/object/public/ripi-storage/pdf/mad-rita.pdf',
    tracks: [
      {
        id: '3',
        title: 'Estrela D\'Alva',
        duration: 199,
        audioUrl: '#',
      },
      {
        id: '4',
        title: 'Flor de Jagube',
        duration: 227,
        audioUrl: '#',
      },
    ],
  },
];

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const Biblioteca = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(albums[0]);
  const [currentTrack, setCurrentTrack] = useState(albums[0].tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setCurrentTrack(selectedAlbum.tracks[0]);
    setCurrentTime(0);
    setIsPlaying(false);
  }, [selectedAlbum]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;
  }, [volume, isMuted]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const nextTrack = () => {
    const currentIndex = selectedAlbum.tracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % selectedAlbum.tracks.length;
    setCurrentTrack(selectedAlbum.tracks[nextIndex]);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    const currentIndex = selectedAlbum.tracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? selectedAlbum.tracks.length - 1 : currentIndex - 1;
    setCurrentTrack(selectedAlbum.tracks[prevIndex]);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const isCurrentlyPlaying = (id: string) => {
    return currentTrack.id === id && isPlaying;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-12">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Hinários & Áudios para Estudo
            </h1>
            <p className="text-lg text-primary-100 mb-4">
              Ouça e acompanhe os hinários com áudio e PDF para aprender a cantar.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Player & PDF */}
            <div className="lg:col-span-2 flex flex-col md:flex-row gap-8">
              {/* Player */}
              <div className="flex-1 bg-white rounded-lg shadow-md p-6 mb-8">
                <audio
                  ref={audioRef}
                  src={currentTrack.audioUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleEnded}
                  autoPlay={isPlaying}
                  style={{ display: 'none' }}
                />
                <div className="flex flex-col items-center">
                  <img
                    src={selectedAlbum.cover}
                    alt={selectedAlbum.title}
                    className="w-40 h-40 rounded-lg object-cover mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-1">{currentTrack.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedAlbum.artist}</p>
                  <div className="mb-4 w-full">
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
                  <div className="flex items-center justify-between w-full">
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
                {/* Playlist estilo SoundCloud */}
                <div className="mt-8">
                  <h3 className="font-semibold text-primary-800 mb-2">Faixas do Álbum</h3>
                  <div className="divide-y">
                    {selectedAlbum.tracks.map((track) => (
                      <div
                        key={track.id}
                        className={`flex items-center p-3 hover:bg-primary-50 cursor-pointer ${
                          track.id === currentTrack.id ? 'bg-primary-50' : ''
                        }`}
                        onClick={() => {
                          setCurrentTrack(track);
                          setCurrentTime(0);
                          setIsPlaying(true);
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{track.title}</h4>
                        </div>
                        <span className="text-xs text-gray-500 ml-3">{formatTime(track.duration)}</span>
                        <button
                          className={`ml-4 p-2 rounded-full ${
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
                    ))}
                  </div>
                </div>
              </div>
              {/* PDF Viewer */}
              <div className="flex-1 bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col items-center">
                <h3 className="font-semibold text-primary-800 mb-2">Hinário em PDF</h3>
                <iframe
                  src={selectedAlbum.pdfUrl}
                  title="Hinário PDF"
                  className="w-full h-[600px] rounded border"
                />
                <a
                  href={selectedAlbum.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Baixar PDF
                </a>
              </div>
            </div>
            {/* Sidebar - Álbuns */}
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-primary-50 border-b border-primary-100">
                  <h3 className="font-semibold text-primary-800">Álbuns / Hinários</h3>
                </div>
                <div className="divide-y">
                  {albums.map((album) => (
                    <motion.div
                      key={album.id}
                      whileHover={{ backgroundColor: '#F3F4F6' }}
                      className={`p-4 flex items-center cursor-pointer ${
                        selectedAlbum.id === album.id ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => setSelectedAlbum(album)}
                    >
                      <img
                        src={album.cover}
                        alt={album.title}
                        className="w-12 h-12 rounded mr-3 object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{album.title}</h4>
                        <p className="text-xs text-gray-500">{album.artist}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="mt-8 bg-earth-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Como usar</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Escolha um álbum/hinário, selecione a faixa e acompanhe a letra pelo PDF ao lado. Ideal para estudo e prática do canto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Biblioteca;