import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import FooterAudioPlayer from './components/FooterAudioPlayer';
import PageLayout from './components/layout/PageLayout';
import { AudioPlayerProvider, useAudioPlayer } from './context/AudioPlayerContext';
import AcervoPage from './pages/AcervoPage';
import AdminPostsPage from './pages/AdminPostsPage';
import Biblioteca from './pages/Biblioteca';
import ContatoPage from './pages/ContatoPage';
import HomePage from './pages/HomePage';
import LivePage from './pages/LivePage';
import LoginPage from './pages/LoginPage';
import LojaPage from './pages/LojaPage';
import RadioPage from './pages/RadioPage';
import VideoAulasPage from './pages/VideoAulasPage';

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
      <Router>
        <Routes>
          <Route path="/admin/posts" element={<AdminPostsPage />} />
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
    </AudioPlayerProvider>
  );
}

export default App;