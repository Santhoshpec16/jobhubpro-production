import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BecomeATrainer from './pages/BecomeATrainer';
import IntervistaAI from './pages/IntervistaAI';
import HireTrainers from './pages/HireTrainers';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/become-a-trainer" element={<BecomeATrainer />} />
            <Route path="/intervista-ai" element={<IntervistaAI />} />
            <Route path="/hire-trainers" element={<HireTrainers />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
