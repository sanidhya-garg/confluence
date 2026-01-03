import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Structure from './components/Structure';
import Council from './components/Council';
import Membership from './components/Membership';
import Footer from './components/Footer';
import './App.css';

function App() {
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

export default App;
