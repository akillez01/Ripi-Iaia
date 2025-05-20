import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import FooterAudioPlayer from './components/FooterAudioPlayer';
import PageLayout from './components/layout/PageLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { AudioPlayerProvider, useAudioPlayer } from './context/AudioPlayerContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { supabase } from './lib/supabase';
import AcervoPage from './pages/AcervoPage';
import AdminBooksPage from './pages/AdminBooksPage';
import AdminHymnsPage from './pages/AdminHymnsPage';
import AdminPanelPage from './pages/AdminPostsPage';
import AdminVideosPage from './pages/AdminVideosPage';
import Biblioteca from './pages/Biblioteca';
import ContatoPage from './pages/ContatoPage';
import HomePage from './pages/HomePage';
import LivePage from './pages/LivePage';
import LoginPage from './pages/LoginPage';
import LojaPage from './pages/LojaPage';
import RadioPage from './pages/RadioPage';
import VideoAulasPage from './pages/VideoAulasPage';

// Componente para tratar login social do Supabase
function AuthHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, loading } = useAuth();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && !isAuthenticated) {
        login(user.email);
        // Só redireciona se estiver na tela de login
        if (location.pathname === '/login') {
          navigate('/admin/posts');
        }
      }
    };
    checkUser();
  }, [login, navigate, isAuthenticated, location.pathname]);

  return null;
}

function GlobalFooterPlayer() {
  const { footerPlayer, setFooterPlayer } = useAudioPlayer();
  if (!footerPlayer) return null;
  return (
    <FooterAudioPlayer
      audioUrl={footerPlayer.audioUrl}
      title={footerPlayer.title}
      artist={footerPlayer.artist}
      onClose={() => setFooterPlayer(null)}
    />
  );
}

function App() {
  return (
    <AudioPlayerProvider>
      <AuthProvider>
        <Router>
          <AuthHandler />
          <Routes>
            <Route
              path="/admin/posts"
              element={
                <ProtectedRoute>
                  <AdminPanelPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/videos"
              element={
                <ProtectedRoute>
                  <AdminVideosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hymns"
              element={
                <ProtectedRoute>
                  <AdminHymnsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/books"
              element={
                <ProtectedRoute>
                  <AdminBooksPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
            <Route path="/acervo/*" element={<PageLayout><AcervoPage /></PageLayout>} />
            <Route path="/radio" element={<PageLayout><RadioPage /></PageLayout>} />
            <Route path="/live" element={<PageLayout><LivePage /></PageLayout>} />
            <Route path="/videoaulas" element={<PageLayout><VideoAulasPage /></PageLayout>} />
            <Route path="/biblioteca" element={<PageLayout><Biblioteca /></PageLayout>} />
            <Route path="/loja" element={<PageLayout><LojaPage /></PageLayout>} />
            <Route path="/contato" element={<PageLayout><ContatoPage /></PageLayout>} />
            <Route path="*" element={<PageLayout><HomePage /></PageLayout>} />
          </Routes>
          <GlobalFooterPlayer />
        </Router>
      </AuthProvider>
    </AudioPlayerProvider>
  );
}

export default App;