import React, { useState } from 'react';
import { Calendar, Clock, User, Play, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data
const upcomingLives = [
  {
    id: '1',
    title: 'Hinário da Rainha - Trabalho de Concentração',
    description: 'Transmissão ao vivo do trabalho de concentração com o Hinário da Rainha da igreja Céu do Mar.',
    date: '2025-06-15T19:00:00',
    duration: '3 horas',
    conductor: 'Padrinho Paulo Roberto',
    thumbnailUrl: 'https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&w=600',
    isLive: false
  },
  {
    id: '2',
    title: 'Hinário O Cruzeiro - Aniversário do Mestre',
    description: 'Celebração do aniversário do Mestre Irineu com o hinário O Cruzeiro completo.',
    date: '2025-07-15T19:00:00',
    duration: '5 horas',
    conductor: 'Padrinho Alfredo',
    thumbnailUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600',
    isLive: false
  },
  {
    id: '3',
    title: 'Ensaio dos Hinos Novos',
    description: 'Ensaio aberto dos novos hinos recebidos pela irmandade.',
    date: '2025-05-20T16:00:00',
    duration: '2 horas',
    conductor: 'Madrinha Julia',
    thumbnailUrl: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=600',
    isLive: true
  }
];

// Function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const LivePage = () => {
  const [selectedLive, setSelectedLive] = useState(upcomingLives.find(live => live.isLive) || upcomingLives[0]);
  
  // Find the live broadcast if there is one
  const currentLive = upcomingLives.find(live => live.isLive);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Transmissões ao Vivo
            </h1>
            <p className="text-lg text-primary-100 mb-8">
              Acompanhe trabalhos, ensaios e eventos especiais com transmissão em tempo real.
            </p>
            
            {currentLive ? (
              <div className="inline-flex items-center bg-red-600 px-4 py-2 rounded-full text-white">
                <span className="h-3 w-3 bg-white rounded-full mr-2 animate-pulse"></span>
                <span className="font-medium">Transmissão em andamento</span>
              </div>
            ) : (
              <div className="inline-flex items-center bg-primary-700 px-4 py-2 rounded-full text-primary-100">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Confira a programação abaixo</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video/Live Area */}
            <div className="lg:col-span-2">
              {/* Featured Live Stream */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="aspect-w-16 aspect-h-9">
                  <div className="w-full h-0 pb-[56.25%] relative bg-black">
                    <img 
                      src={selectedLive.thumbnailUrl} 
                      alt={selectedLive.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    
                    {selectedLive.isLive ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/70 p-6 rounded-lg text-center">
                          <div className="flex justify-center mb-4">
                            <div className="h-4 w-4 bg-red-600 rounded-full animate-pulse"></div>
                          </div>
                          <h3 className="text-white text-lg font-semibold mb-2">Transmissão ao Vivo</h3>
                          <p className="text-gray-300 text-sm mb-4">
                            {selectedLive.title}
                          </p>
                          <button className="btn bg-red-600 hover:bg-red-700 text-white">
                            <Play className="h-4 w-4 mr-2" />
                            Assistir agora
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/70 p-6 rounded-lg text-center">
                          <div className="flex justify-center mb-4">
                            <Calendar className="h-12 w-12 text-gray-300" />
                          </div>
                          <h3 className="text-white text-lg font-semibold mb-2">Transmissão Agendada</h3>
                          <p className="text-gray-300 text-sm mb-4">
                            Esta transmissão começará em {formatDate(selectedLive.date)}
                          </p>
                          <button className="btn bg-primary-600 hover:bg-primary-700 text-white">
                            Lembrar-me
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">{selectedLive.title}</h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(selectedLive.date)}
                        </span>
                        <span className="inline-flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {selectedLive.duration}
                        </span>
                        <span className="inline-flex items-center text-sm text-gray-600">
                          <User className="h-4 w-4 mr-1" />
                          {selectedLive.conductor}
                        </span>
                      </div>
                    </div>
                    
                    {selectedLive.isLive && (
                      <span className="inline-flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        <span className="h-2 w-2 bg-red-600 rounded-full mr-1 animate-pulse"></span>
                        Ao Vivo
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    {selectedLive.description}
                  </p>
                  
                  <div className="flex space-x-4">
                    {selectedLive.isLive ? (
                      <button className="btn btn-primary">
                        <Play className="h-4 w-4 mr-2" />
                        Assistir agora
                      </button>
                    ) : (
                      <button className="btn btn-primary">
                        Lembrar-me
                      </button>
                    )}
                    <button className="btn btn-outline">
                      Compartilhar
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Notes & Instructions */}
              <div className="bg-earth-50 rounded-lg p-6 mb-8">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-primary-700 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Notas sobre as transmissões</h3>
                    <p className="text-gray-700 text-sm">
                      Nossas transmissões ao vivo são realizadas com todo respeito e reverência 
                      aos rituais sagrados. Pedimos que os espectadores mantenham uma postura 
                      respeitosa durante as transmissões, honrando os ensinamentos da doutrina.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Chat would go here for live events */}
              {selectedLive.isLive && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 bg-primary-50 border-b border-primary-100">
                    <h3 className="font-semibold text-primary-800">Chat da Transmissão</h3>
                  </div>
                  
                  <div className="h-64 p-4 overflow-y-auto">
                    <p className="text-center text-gray-500 italic">
                      O chat estará disponível durante a transmissão ao vivo.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar - Upcoming Lives */}
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-primary-50 border-b border-primary-100">
                  <h3 className="font-semibold text-primary-800">Próximas Transmissões</h3>
                </div>
                
                <div className="divide-y">
                  {upcomingLives.map((live) => (
                    <motion.div 
                      key={live.id}
                      whileHover={{ backgroundColor: '#F3F4F6' }}
                      className={`p-4 cursor-pointer ${
                        selectedLive.id === live.id ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => setSelectedLive(live)}
                    >
                      <div className="flex">
                        <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0 relative">
                          <img 
                            src={live.thumbnailUrl} 
                            alt={live.title} 
                            className="w-full h-full object-cover"
                          />
                          {live.isLive && (
                            <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-xs font-medium text-center py-0.5">
                              AO VIVO
                            </div>
                          )}
                        </div>
                        
                        <div className="ml-3 flex-1">
                          <h4 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">
                            {live.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{new Date(live.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Calendar */}
              <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-primary-50 border-b border-primary-100">
                  <h3 className="font-semibold text-primary-800">Calendário de Eventos</h3>
                </div>
                
                <div className="p-4">
                  <p className="text-center text-gray-500 italic mb-4">
                    Aqui será exibido um calendário mensal com as datas das transmissões programadas.
                  </p>
                  
                  <a 
                    href="#" 
                    className="block text-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Ver calendário completo
                  </a>
                </div>
              </div>
              
              {/* Subscribe to alerts */}
              <div className="mt-8 bg-primary-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Receba Notificações</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Cadastre-se para receber alertas sobre novas transmissões ao vivo.
                </p>
                
                <form className="mb-2">
                  <div className="mb-3">
                    <input 
                      type="email" 
                      placeholder="Seu e-mail"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full btn btn-primary"
                  >
                    Inscrever-se
                  </button>
                </form>
                
                <p className="text-xs text-gray-500 text-center">
                  Você pode cancelar sua inscrição a qualquer momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LivePage;