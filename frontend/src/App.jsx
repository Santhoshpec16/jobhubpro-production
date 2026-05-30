import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BecomeATrainer from './pages/BecomeATrainer';
import IntervistaAI from './pages/IntervistaAI';
import HireTrainers from './pages/HireTrainers';
import TTTCertification from './pages/TTTCertification';
import RecruitTalent from './pages/RecruitTalent';
import Terms from './pages/Terms';
import './App.css';

// Helper component to handle smooth scrolling to elements identified by hash links (e.g. /#ld-partnership)
function ScrollToHashElement() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Wait briefly for DOM rendering to complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Scroll to top of the page if no hash is present on route change
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToHashElement />
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/become-a-trainer" element={<BecomeATrainer />} />
            <Route path="/intervista-ai" element={<IntervistaAI />} />
            <Route path="/hire-trainers" element={<HireTrainers />} />
            <Route path="/ttt-certification" element={<TTTCertification />} />
            <Route path="/recruit-talent" element={<RecruitTalent />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
