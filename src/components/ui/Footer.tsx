import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-800 text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ...outros blocos... */}
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
            <h4 className="text-md font-semibold mt-6 mb-2 text-primary-200">Painel Admin</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/admin/posts" className="text-primary-100 hover:text-white transition-colors text-sm">
                  Posts
                </Link>
              </li>
              <li>
                <Link to="/admin/videos" className="text-primary-100 hover:text-white transition-colors text-sm">
                  Vídeos
                </Link>
              </li>
              <li>
                <Link to="/admin/hymns" className="text-primary-100 hover:text-white transition-colors text-sm">
                  Hinos
                </Link>
              </li>
              <li>
                <Link to="/admin/books" className="text-primary-100 hover:text-white transition-colors text-sm">
                  Livros
                </Link>
              </li>
            </ul>
          </div>
          {/* ...restante do código do Footer... */}
        </div>
        {/* ...bottom section... */}
      </div>
    </footer>
  );
};

export default Footer;