import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Structure from './components/Structure';
import Council from './components/Council';
import Membership from './components/Membership';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotableAlumni from './pages/NotableAlumni';
import './App.css';

// Home Page Component
function HomePage() {
  useEffect(() => {
    // Scroll animation observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.animate-on-scroll');
    animatableElements.forEach(el => observer.observe(el));

    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Structure />
        <Council />
        <Membership />
      </main>
      <Footer />
    </div>
  );
}

// Main App with Router
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notable-alumni" element={<NotableAlumni />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
