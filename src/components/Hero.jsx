import { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);
    const particlesRef = useRef(null);

    useEffect(() => {
        // Create floating particles
        const container = particlesRef.current;
        if (container) {
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                particle.style.animationDuration = `${5 + Math.random() * 10}s`;
                particle.style.width = `${2 + Math.random() * 4}px`;
                particle.style.height = particle.style.width;
                container.appendChild(particle);
            }
        }
    }, []);

    return (
        <section className="hero" ref={heroRef}>
            {/* Animated Background */}
            <div className="hero-bg">
                <div className="hero-gradient-orb orb-1"></div>
                <div className="hero-gradient-orb orb-2"></div>
                <div className="hero-gradient-orb orb-3"></div>
                <div className="hero-grid"></div>
                <div className="particles" ref={particlesRef}></div>
            </div>

            <div className="hero-container container">
                <div className="hero-content">
                    {/* Presenters - EDC & AR Logos */}
                    <div className="hero-presenters animate-on-scroll visible">
                        <div className="presenter-logos">
                            <img src="/edclogo.svg" alt="EDC IIT Delhi" className="presenter-logo" />
                            <img src="/export AR Logo.svg" alt="Alumni Relations IIT Delhi" className="presenter-logo" />
                        </div>
                        <span className="presenter-text">Presents</span>
                    </div>

                    {/* Title */}
                    <h1 className="hero-title animate-on-scroll visible">
                        <span className="title-line">Confluence</span>
                    </h1>

                    {/* Description */}
                    <h2 className="hero-subtitle animate-on-scroll visible">
                        Where IIT Leaders <span className="title-accent">Converge & Create</span>
                    </h2>

                    {/* CTAs */}
                    <div className="hero-ctas animate-on-scroll visible">
                        <a href="#membership" className="btn btn-primary hero-btn">
                            <span>Join Confluence</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a href="#about" className="btn btn-secondary hero-btn">
                            <span>Learn More</span>
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="scroll-indicator">
                    <div className="scroll-mouse">
                        <div className="scroll-wheel"></div>
                    </div>
                    <span>Scroll to explore</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
