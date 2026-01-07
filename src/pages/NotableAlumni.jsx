import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NotableAlumni.css';
import { ArrowRightIcon, LinkedInIcon } from '../components/Icons';

const NotableAlumni = () => {
    const navigate = useNavigate();

    const handleNavigateAndScroll = (sectionId) => {
        navigate('/');
        // Wait for navigation then scroll to section
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    useEffect(() => {
        // Scroll to top on page load
        window.scrollTo(0, 0);

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

        return () => {
            observer.disconnect();
        };
    }, []);

   const notableAlumni =  [
  {
    name: 'Dipinder Sekhon',
    image: '/notablealumni/dipinder_sekhon.jpg',
    title: 'Founder & Co-founder',
    company: 'iKITES & KritiKal Solutions',
    iit: '',
    linkedin: 'https://www.linkedin.com/in/dipinder/?originalSubdomain=in',
    description: ''
  },
  {
    name: 'Tejinderpal Miglani',
    image: '/notablealumni/tejinderpal_miglani.jpg',
    title: 'Investor',
    company: '-',
    iit: '',
    linkedin: 'https://www.linkedin.com/in/tsmiglani/?originalSubdomain=in',
    description: ''
  },
  {
    name: 'Vipul Bansal',
    image: '/notablealumni/vipul_bansal.jpg',
    title: 'Founder & CEO',
    company: 'SunHill - Online Advertising',
    iit: '',
    linkedin: 'https://www.linkedin.com/in/vipulbansal/?originalSubdomain=in',
    description: ''
  },
  {
    name: 'Parul Mittal',
    image: '/notablealumni/Parul_Mittal.jpg',
    title: 'Founder',
    company: 'Rivokids',
    iit: '',
    linkedin: 'https://www.linkedin.com/in/parulalokmittal/?originalSubdomain=in',
    description: ''
  },
  {
    name: 'Sanjay Gupta',
    image: '/notablealumni/Sanjay_Gupta.jpg',
    title: 'Founder & Investor',
    company: 'AINab',
    iit: '',
    linkedin: 'https://www.linkedin.com/in/sanjayg/?originalSubdomain=in',
    description: ''
  },
  {
    name: 'Gaurav Bhalla',
    image: '/notablealumni/gaurav_bhalla.jpg',
    title: 'Founder and Managing Principal',
    company: 'One Seed Capital',
    iit: '',
    linkedin: 'https://www.linkedin.com/in/gaurav-bhalla-oneseedcap/',
    description: ''
  },
  {
    name: 'Deepankur Malhotra',
    image: '/notablealumni/deepankur_malhotra.jpg',
    title: 'Founder & Managing Partner',
    company: 'Kairon Capital',
    iit: '',
    linkedin: 'https://www.linkedin.com/in/deepankur-malhotra/?originalSubdomain=in',
    description: ''
  },
  {
    name: 'Vishal Chadha',
    image: '/notablealumni/vishal_chadha.jpg',
    title: '-',
    company: '-',
    iit: '',
    linkedin: 'https://www.linkedin.com/in/vishalchadha/?originalSubdomain=in',
    description: ''
  },
  {
    name: 'Ankit Garg',
    image: '/notablealumni/Ankit-Garg.jpg',
    title: 'Principal',
    company: 'Info Edge Ventures',
    iit: '',
    linkedin: 'https://www.linkedin.com/in/ankit-garg-73047418/?originalSubdomain=in',
    description: ''
  },
  {
    name: 'Manoj Nayak',
    image: '',
    title: 'Founder & Director',
    company: "Nayak's Tutorials",
    iit: '',
    linkedin: 'https://www.linkedin.com/in/manoj-s-nayak-30a7/?originalSubdomain=in',
    description: ''
  }
]

    return (
        <div className="notable-alumni-page">
            {/* Background Effects */}
            <div className="page-bg">
                <div className="page-gradient-orb orb-1"></div>
                <div className="page-gradient-orb orb-2"></div>
                <div className="page-grid"></div>
            </div>

            {/* Navigation */}
            <nav className="alumni-nav">
                <div className="container">
                    <Link to="/" className="nav-back">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Home</span>
                    </Link>
                    <a href="/" className="nav-logo">
                        <img src="/favicon.svg" alt="Confluence" className="logo-img" />
                        <span className="logo-text">Confluence</span>
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="alumni-hero">
                <div className="container">
                    <div className="hero-content animate-on-scroll visible">
                        <span className="hero-badge">Leadership Network</span>
                        <h1 className="hero-title">
                            Notable <span className="gradient-text">Alumni</span>
                        </h1>
                        <p className="hero-description">
                            Accomplished IIT alumni leaders who have built successful ventures
                            and are part of Confluence driving its vision
                        </p>
                    </div>

                    
                </div>
            </section>

            {/* Alumni Grid */}
            <section className="alumni-grid-section">
                <div className="container">
                    <div className="alumni-grid">
                        {notableAlumni.map((alumni, index) => (
                            <div
                                key={index}
                                className="alumni-card glass-card animate-on-scroll"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="alumni-image-wrapper">
                                    <img src={alumni.image} alt={alumni.name} className="alumni-image" />
                                    <div className="alumni-overlay">
                                        <a href={alumni.linkedin} className="linkedin-link" aria-label="LinkedIn">
                                            <LinkedInIcon />
                                        </a>
                                    </div>
                                </div>
                                <div className="alumni-info">
                                    <h3 className="alumni-name">{alumni.name}</h3>
                                    <span className="alumni-title">{alumni.title}</span>
                                    <span className="alumni-company">{alumni.company}</span>
                                    <div className="alumni-meta">
                                        {/* <span className="alumni-iit">{alumni.iit}</span> */}
                                    </div>
                                    <p className="alumni-description">{alumni.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="alumni-cta-section">
                <div className="container">
                    <div className="cta-card glass-card animate-on-scroll">
                        <div className="cta-content">
                            <h2 className="cta-title">
                                Join the <span className="gradient-text">Confluence</span> Network
                            </h2>
                            <p className="cta-description">
                                Connect with industry leaders, access exclusive opportunities,
                                and be part of India's most influential IIT alumni network.
                            </p>
                            <div className="cta-buttons">
                                <button onClick={() => handleNavigateAndScroll('membership')} className="btn btn-primary">
                                    <span>Apply for Membership</span>
                                    <ArrowRightIcon />
                                </button>
                                <button onClick={() => handleNavigateAndScroll('about')} className="btn btn-secondary">
                                    <span>Learn More</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="alumni-footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <img src="/favicon.svg" alt="Confluence" className="footer-logo" />
                            <span className="footer-text">Confluence</span>
                        </div>
                        <p className="footer-copyright">
                            © 2026 Confluence. A Pan-IIT Initiative by EDC IIT Delhi.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default NotableAlumni;
