import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Facebook, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <Star className="text-primary-200 h-6 w-6" />
              <span className="ml-2 text-xl font-display font-semibold text-white">
                Ripi ia iá
              </span>
            </Link>
            <p className="text-primary-100 text-sm">
              Portal dedicado à musicalidade e mídias da doutrina do Santo Daime,
              facilitando o acesso a hinários, partituras e conteúdos relacionados.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary-200 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary-200 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary-200 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/acervo" className="text-primary-100 hover:text-white transition-colors text-sm">
                  Acervo
                </Link>
              </li>
              <li>
                <Link to="/radio" className="text-primary-100 hover:text-white transition-colors text-sm">
                  Rádio
                </Link>
              </li>
              <li>
                <Link to="/live" className="text-primary-100 hover:text-white transition-colors text-sm">
                  Transmissões ao Vivo
                </Link>
              </li>
              <li>
                <Link to="/loja" className="text-primary-100 hover:text-white transition-colors text-sm">
                  Loja
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-primary-100 hover:text-white transition-colors text-sm">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Acervo */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Acervo</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/acervo/hinarios" className="text-primary-100 hover:text-white transition-colors text-sm">
                  Hinários
                </Link>
              </li>
              <li>
                <Link to="/acervo/partituras" className="text-primary-100 hover:text-white transition-colors text-sm">
                  Partituras
                </Link>
              </li>
              <li>
                <Link to="/acervo/audios" className="text-primary-100 hover:text-white transition-colors text-sm">
                  Áudios
                </Link>
              </li>
              <li>
                <Link to="/acervo/videos" className="text-primary-100 hover:text-white transition-colors text-sm">
                  Vídeos
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contato</h3>
            <div className="space-y-4">
              <p className="flex items-start text-sm">
                <Mail className="mr-2 h-5 w-5 text-primary-200 shrink-0" />
                <span className="text-primary-100">contato@ripiaia.com.br</span>
              </p>
              <div>
                <Link 
                  to="/contato" 
                  className="inline-block bg-primary-700 hover:bg-primary-600 px-4 py-2 rounded-md text-white text-sm font-medium transition-colors"
                >
                  Enviar Mensagem
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-primary-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-300 text-sm">
              &copy; {currentYear} Ripi ia iá. Todos os direitos reservados.
            </p>
            
            <div className="mt-4 md:mt-0 space-x-4 text-sm">
              <Link to="/termos" className="text-primary-300 hover:text-white transition-colors">
                Termos de Uso
              </Link>
              <Link to="/privacidade" className="text-primary-300 hover:text-white transition-colors">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;