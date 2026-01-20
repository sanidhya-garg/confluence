import './Footer.css';
import { TwitterIcon, InstagramIcon, HeartIcon, LinkedInIcon } from './Icons';

const Footer = () => {
    return (
        <footer className="footer section">
            <div className="container">
                <div className="footer-content">
                    {/* Brand Column */}
                    <div className="footer-brand">
                        <img src="/favicon.svg" alt="Confluence Logo" className="logo-img" />
                        <p className="footer-description">
                            A IITD initiative strengthening collaboration among entrepreneurs, investors, and senior CXOs across the IIT ecosystem.
                        </p>
                    </div>

                    {/* Navigation & Social */}
                    <div className="footer-nav-social">
                        <div className="footer-links">
                            <a href="#about">About</a>
                            <a href="#structure">Structure</a>
                            <a href="#council">Notable Alumni</a>
                            <a href="#membership">Membership</a>
                        </div>

                        <div className="footer-contact-group">
                            <span className="contact-label">Connect</span>
                            <div className="contact-items">
                                <a href="tel:+916301664351" className="contact-pill">
                                    <span className="contact-name">Aghamarsh</span>
                                    <span className="contact-sep">—</span>
                                    <span className="contact-number">6301664351</span>
                                </a>
                                <a href="tel:+919462100725" className="contact-pill">
                                    <span className="contact-name">Akshat</span>
                                    <span className="contact-sep">—</span>
                                    <span className="contact-number">94621 00725</span>
                                </a>
                            </div>
                        </div>

                        <div className="footer-actions">
                            <div className="social-icons">
                                <a href="#" className="social-link" aria-label="Twitter"><TwitterIcon /></a>
                                <a href="#" className="social-link" aria-label="LinkedIn"><LinkedInIcon /></a>
                                <a href="#" className="social-link" aria-label="Instagram"><InstagramIcon /></a>
                            </div>

                            <div className="footer-organised">
                                <span className="org-label">Organised by</span>
                                <div className="org-logos">
                                    <img src="/edclogo.svg" alt="EDC IIT Delhi" className="org-logo" />
                                    <img src="/export AR Logo.svg" alt="Alumni Relations" className="org-logo"
                                    id='ARlogo' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-love">
                        <span>Made with <span className="love-icon"><HeartIcon /></span> by <strong>eDC Tech Team</strong></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
