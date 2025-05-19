import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import AcervoPage from './pages/AcervoPage';
import Biblioteca from './pages/Biblioteca';
import ContatoPage from './pages/ContatoPage';
import HomePage from './pages/HomePage';
import LivePage from './pages/LivePage';
import LoginPage from './pages/LoginPage';
import LojaPage from './pages/LojaPage';
import NotFoundPage from './pages/NotFoundPage';
import RadioPage from './pages/RadioPage';
import VideoAulasPage from './pages/VideoAulasPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/" 
          element={
            <PageLayout>
              <HomePage />
            </PageLayout>
          } 
        />
        <Route 
          path="/acervo/*" 
          element={
            <PageLayout>
              <AcervoPage />
            </PageLayout>
          } 
        />
        <Route 
          path="/radio" 
          element={
            <PageLayout>
              <RadioPage />
            </PageLayout>
          } 
        />
        <Route 
          path="/live" 
          element={
            <PageLayout>
              <LivePage />
            </PageLayout>
          } 
        />
        <Route 
          path="/videoaulas" 
          element={
            <PageLayout>
              <VideoAulasPage />
            </PageLayout>
          } 
        />
        <Route 
          path="/Biblioteca" 
          element={
            <PageLayout>
              <Biblioteca/>
            </PageLayout>
          } 
        />
        <Route 
          path="/loja" 
          element={
            <PageLayout>
              <LojaPage />
            </PageLayout>
          } 
        />
        <Route 
          path="/contato" 
          element={
            <PageLayout>
              <ContatoPage />
            </PageLayout>
          } 
        />
        <Route 
          path="*" 
          element={
            <PageLayout>
              <NotFoundPage />
            </PageLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;