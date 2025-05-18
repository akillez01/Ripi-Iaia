import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import HomePage from './pages/HomePage';
import AcervoPage from './pages/AcervoPage';
import RadioPage from './pages/RadioPage';
import LivePage from './pages/LivePage';
import LojaPage from './pages/LojaPage';
import ContatoPage from './pages/ContatoPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

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