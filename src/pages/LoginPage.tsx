import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, Star } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const mockUser = {
  email: 'usuario@exemplo.com',
  password: '123456'
};

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleView = () => {
    setIsLogin(!isLogin);
    setError('');
    setForm({ name: '', email: '', password: '', confirmPassword: '' });
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      // Simulação de login
      if (form.email === mockUser.email && form.password === mockUser.password) {
        // Redireciona para a home ou dashboard
        navigate('/');
      } else {
        setError('E-mail ou senha inválidos.');
      }
    } else {
      // Simulação de cadastro
      if (!form.name.trim()) return setError('Nome é obrigatório.');
      if (!/\S+@\S+\.\S+/.test(form.email)) return setError('E-mail inválido.');
      if (form.password.length < 6) return setError('A senha deve ter pelo menos 6 caracteres.');
      if (form.password !== form.confirmPassword) return setError('As senhas não coincidem.');
      // Cadastro simulado bem-sucedido
      setIsLogin(true);
      setError('Cadastro realizado! Faça login.');
      setForm({ name: '', email: '', password: '', confirmPassword: '' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center">
              <div className="relative">
                <Star className="text-primary-600 h-10 w-10" />
                <Star className="absolute top-0 left-0 text-secondary-500 h-10 w-10 rotate-30 opacity-70" />
              </div>
              <span className="ml-2 text-2xl font-display font-semibold text-primary-800">
                Ripi ia iá
              </span>
            </Link>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-md rounded-lg p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                {isLogin ? 'Entrar na sua conta' : 'Criar uma nova conta'}
              </h2>

              {error && (
                <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome completo
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Digite seu nome completo"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Digite seu e-mail"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={form.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Digite sua senha"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      aria-label="Mostrar ou ocultar senha"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar senha
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Confirme sua senha"
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-600">
                        Lembrar-me
                      </label>
                    </div>

                    <div className="text-sm">
                      <button
                        type="button"
                        onClick={() => alert('Funcionalidade ainda não implementada.')}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Esqueceu a senha?
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {isLogin ? 'Entrar' : 'Criar conta'}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Ou</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    {isLogin ? 'Entrar com Google' : 'Cadastrar com Google'}
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">
                  {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                </span>
                <button
                  type="button"
                  onClick={toggleView}
                  className="ml-1 text-primary-600 hover:text-primary-700 font-medium"
                >
                  {isLogin ? 'Criar uma conta' : 'Entrar'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              ← Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;