import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { onAuthChange, signOut } from '../firebase/auth';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Listen for auth state changes
        const unsubscribe = onAuthChange((currentUser) => {
            setUser(currentUser);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            unsubscribe();
        };
    }, []);

    const handleSignOut = async () => {
        await signOut();
    };

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Structure', href: '#structure' },
        { name: 'Notable Alumni', href: '#council' },
        { name: 'Membership', href: '#membership' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <a href="#" className="navbar-logo">
                    <img src="/favicon.svg" alt="Confluence" className="logo-img" />
                    <span className="logo-text">Confluence</span>
                </a>

                <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="nav-link"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="navbar-actions">
                    {user ? (
                        <div className="user-profile-section">
                            <Link to="/dashboard" className="user-info-group">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
                                ) : (
                                    <div className="user-avatar-placeholder">
                                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                )}
                                <div className="user-text-info">
                                    <span className="user-name">{user.displayName || 'User'}</span>
                                    <span className="user-email">{user.email}</span>
                                </div>
                            </Link>
                            <button className="logout-icon-btn" onClick={handleSignOut} title="Logout">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost nav-login">
                                Login
                            </Link>
                            <a href="#membership" className="btn btn-primary nav-cta">
                                Apply Now
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </>
                    )}
                </div>

                <button
                    className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-content">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="mobile-nav-link"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    {user ? (
                        <>
                            <Link to="/dashboard" className="btn btn-primary mobile-cta" onClick={() => setMobileMenuOpen(false)}>
                                Dashboard
                            </Link>
                            <button className="btn btn-ghost mobile-logout" onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost mobile-login" onClick={() => setMobileMenuOpen(false)}>
                                Login
                            </Link>
                            <a href="#membership" className="btn btn-primary mobile-cta" onClick={() => setMobileMenuOpen(false)}>
                                Apply Now
                            </a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
