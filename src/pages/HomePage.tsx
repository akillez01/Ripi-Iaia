import { motion } from 'framer-motion';
import { Book, Play, Radio, ShoppingBag, Star } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const banners = [
  {
    id: 1,
    title: "Novos Hinários Disponíveis",
    description: "Acesse nossa coleção atualizada de hinários com partituras e áudios.",
    image: `${import.meta.env.BASE_URL}image/mad-rita.jpg`,
    link: "/acervo/hinarios"
  },
  {
    id: 2,
    title: "Transmissão ao Vivo",
    description: "Acompanhe nossos encontros espirituais com transmissão em tempo real.",
    image: `${import.meta.env.BASE_URL}image/pad.jpeg`,
    link: "/live"
  },
  {
    id: 3,
    title: "Nova Coleção na Loja",
    description: "Conheça os novos itens disponíveis em nossa loja virtual.",
    image: `${import.meta.env.BASE_URL}image/pad2.jpeg`,
    link: "/loja"
  }
];

const features = [
  {
    icon: <Book className="h-10 w-10 text-primary-600" />,
    title: "Acervo Completo",
    description: "Hinários, partituras e materiais organizados e fáceis de acessar.",
    link: "/acervo"
  },
  {
    icon: <Radio className="h-10 w-10 text-primary-600" />,
    title: "Rádio Ripi ia iá",
    description: "Ouça nossa programação com hinários e cantos da doutrina.",
    link: "/radio"
  },
  {
    icon: <Play className="h-10 w-10 text-primary-600" />,
    title: "Transmissões ao Vivo",
    description: "Acompanhe eventos e encontros em tempo real.",
    link: "/live"
  },
  {
    icon: <ShoppingBag className="h-10 w-10 text-primary-600" />,
    title: "Loja Virtual",
    description: "Adquira produtos relacionados à doutrina com facilidade.",
    link: "/loja"
  }
];

const HomePage = () => {
  const [currentBanner, setCurrentBanner] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[80vh] min-h-[500px] bg-primary-900 overflow-hidden pt-20 z-0">
        {/* pt-20 adiciona espaço para o navbar fixo, z-0 garante que fique atrás do navbar */}
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ zIndex: 0 }}
          >
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <img
              src={banner.image}
              alt={banner.title}
              className="absolute inset-0 h-full w-full object-cover z-0"
              draggable={false}
            />
            <div className="relative z-20 h-full flex items-center">
              <div className="container-custom">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-2xl"
                >
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                    {banner.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 mb-8">
                    {banner.description}
                  </p>
                  <Link
                    to={banner.link}
                    className="btn btn-primary px-6 py-3 text-base"
                  >
                    Saiba mais
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}

        {/* Banner Navigation */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center">
          <div className="flex space-x-2">
            {banners.map((banner, index) => (
              <button
                key={banner.id}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentBanner ? 'bg-white' : 'bg-white/40'
                }`}
                aria-label={`Ver banner ${banner.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-earth-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Star className="text-primary-600 h-12 w-12 animate-star" />
                <Star className="absolute top-0 left-0 text-secondary-500 h-12 w-12 rotate-30 opacity-70 animate-star" />
              </div>
            </div>
            <h2 className="section-title mb-6">Bem-vindo ao Ripi ia iá</h2>
            <p className="text-lg text-gray-700 mb-8">
              Um portal dedicado à musicalidade e mídias da doutrina do Santo Daime, 
              proporcionando acesso a hinários, áudios, vídeos e todo conteúdo 
              relacionado à nossa sagrada tradição.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/acervo" className="btn btn-primary">
                Explorar Acervo
              </Link>
              <Link to="/sobre" className="btn btn-outline">
                Sobre o Projeto
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">O que oferecemos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 bg-primary-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link 
                  to={feature.link} 
                  className="mt-auto text-primary-600 font-medium hover:text-primary-700"
                >
                  Acessar →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Additions */}
      <section className="section bg-earth-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0">Adições Recentes</h2>
            <Link 
              to="/acervo" 
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              Ver tudo →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <img 
                    src={`https://images.pexels.com/photos/33597${item}/pexels-photo-33597${item}.jpeg?auto=compress&cs=tinysrgb&w=600`} 
                    alt="Media item" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full mb-3">
                    {item === 1 ? 'Hinário' : item === 2 ? 'Áudio' : 'Vídeo'}
                  </span>
                  <h3 className="text-lg font-semibold mb-2">
                    {item === 1 ? 'O Cruzeiro' : item === 2 ? 'Hinos do Mestre Irineu' : 'Ensaio da Banda'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris 
                    feugiat nibh in metus tempor semper.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Adicionado: {new Date().toLocaleDateString('pt-BR')}
                    </span>
                    <Link 
                      to={`/acervo/item-${item}`} 
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Acessar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Junte-se à nossa comunidade
          </h2>
          <p className="text-primary-100 max-w-xl mx-auto mb-8">
            Faça parte de nossa rede e tenha acesso a conteúdos exclusivos, 
            transmissões ao vivo e muito mais.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/login" 
              className="btn bg-white text-primary-700 hover:bg-primary-50"
            >
              Criar Conta
            </Link>
            <Link 
              to="/contato" 
              className="btn border border-white text-white hover:bg-primary-600"
            >
              Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;