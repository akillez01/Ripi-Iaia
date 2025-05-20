import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Acervo', path: '/acervo' },
  { name: 'Hinarios', path: '/biblioteca' },
  { name: 'Videoaulas', path: '/videoaulas' },
  { name: 'Ao Vivo', path: '/live' },
  { name: 'Rádio', path: '/radio' },
  { name: 'Loja', path: '/loja' },
  { name: 'Contato', path: '/contato' },
];

const adminItems = [
  { name: 'Posts', path: '/admin/posts' },
  { name: 'Vídeos', path: '/admin/videos' },
  { name: 'Hinos', path: '/admin/hymns' },
  { name: 'Livros', path: '/admin/books' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-transparent py-5'
      )}
      style={{ minHeight: 68 }}
    >
      <div className="container-custom flex items-center justify-between min-h-[64px]">
        {/* Logo & Mobile Menu Button */}
        <div className="flex items-center">
          <button
            className="md:hidden mr-4 text-primary-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link
            to="/"
            className="flex items-center"
            onClick={closeMenu}
            style={{ minHeight: 48 }}
          >
            <img
              src={`${import.meta.env.BASE_URL}logo.jpeg`}
              alt="Logo"
              className="h-10 w-10 md:h-12 md:w-12 object-contain"
              style={{
                maxHeight: 48,
                maxWidth: 48,
                objectFit: 'contain',
                display: 'block',
                marginTop: 0,
                marginBottom: 0,
              }}
            />
            <span className="ml-2 text-xl font-display font-semibold text-primary-800">
              Ripi Iaiá
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                pathname === item.path
                  ? 'text-primary-700 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              )}
            >
              {item.name}
            </Link>
          ))}
          {/* Dropdown Admin */}
          <div className="relative group">
            <button
              className="px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-gray-700 hover:text-primary-600 hover:bg-primary-50 flex items-center"
              type="button"
            >
              Painel Admin
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
              {adminItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Login/Account Button */}
        <div>
          <Link
            to="/login"
            className="hidden md:flex items-center px-3 py-2 text-sm font-medium text-primary-700 hover:text-primary-800 hover:bg-primary-50 rounded-md transition-colors duration-200"
          >
            Entrar
          </Link>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            'fixed inset-0 z-50 bg-white md:hidden transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <Link
                to="/"
                className="flex items-center"
                onClick={closeMenu}
                style={{ minHeight: 40 }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}logo.jpeg`}
                  alt="Logo"
                  className="h-10 w-10 object-contain"
                  style={{
                    maxHeight: 40,
                    maxWidth: 40,
                    objectFit: 'contain',
                    display: 'block',
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                />
                <span className="ml-2 text-lg font-semibold">Ripi Iaiá</span>
              </Link>
              <button
                onClick={closeMenu}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-auto py-4">
              <ul className="space-y-1 px-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={cn(
                        'block px-3 py-4 text-base font-medium rounded-md transition-colors duration-200',
                        pathname === item.path
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                      )}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {/* Admin section mobile */}
                <li className="mt-4 font-semibold text-primary-700">Painel Admin</li>
                {adminItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={cn(
                        'block px-3 py-4 text-base font-medium rounded-md transition-colors duration-200',
                        pathname === item.path
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                      )}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t">
              <Link
                to="/login"
                className="block w-full py-3 px-4 text-center font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
                onClick={closeMenu}
              >
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;