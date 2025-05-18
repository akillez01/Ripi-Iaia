import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Acervo', path: '/acervo' },
  { name: 'Rádio', path: '/radio' },
  { name: 'Ao Vivo', path: '/live' },
  { name: 'Loja', path: '/loja' },
  { name: 'Contato', path: '/contato' },
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
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container-custom flex items-center justify-between">
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
          >
            <div className="relative">
              <Star className="text-primary-600 h-8 w-8" />
              <Star className="absolute top-0 left-0 text-secondary-500 h-8 w-8 rotate-30 opacity-70" />
            </div>
            <span className="ml-2 text-xl font-display font-semibold text-primary-800">
              Ripi ia iá
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
              >
                <Star className="text-primary-600 h-6 w-6" />
                <span className="ml-2 text-lg font-semibold">Ripi ia iá</span>
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