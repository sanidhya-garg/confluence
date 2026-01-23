import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import {
    signInWithGoogle,
    signInWithGoogleRedirect,
    checkRedirectResult,
    signInWithEmail,
    onAuthChange
} from '../firebase/auth';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Handle Redirect Result (for mobile flow)
    useEffect(() => {
        const checkRedirect = async () => {
            const { user, error } = await checkRedirectResult();
            if (user) {
                navigate('/dashboard', { replace: true });
            }
            if (error) {
                setError(error);
            }
        };
        checkRedirect();
    }, [navigate]);

    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (user) {
                navigate('/dashboard', { replace: true });
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        // Try popup first (works on most modern mobile browsers too)
        // Fall back to redirect if popup fails
        try {
            const { user, error } = await signInWithGoogle();
            
            if (error) {
                // If popup blocked/failed on mobile, try redirect
                if (isMobile && (error.includes('popup') || error.includes('blocked') || error.includes('closed'))) {
                    const { error: redirectError } = await signInWithGoogleRedirect();
                    if (redirectError) {
                        setError(redirectError);
                        setLoading(false);
                    }
                    return;
                }
                setError(error);
                setLoading(false);
                return;
            }

            if (user) {
                navigate('/dashboard', { replace: true });
            }
        } catch (e) {
            // Try redirect as fallback
            if (isMobile) {
                const { error: redirectError } = await signInWithGoogleRedirect();
                if (redirectError) {
                    setError(redirectError);
                    setLoading(false);
                }
            } else {
                setError(e.message || 'Sign in failed');
                setLoading(false);
            }
        }
    };

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await signInWithEmail(formData.email, formData.password);
        if (error) {
            setError(error);
            setLoading(false);
            return;
        }

        navigate('/dashboard');
    };

    return (
        <div className="login-page">
            {/* Background */}
            <div className="login-bg">
                <div className="bg-gradient"></div>
                <div className="bg-grid"></div>
            </div>

            <div className="login-container">
                {/* Logo */}
                <Link to="/" className="login-logo">
                    <img src="/favicon.svg" alt="Confluence" />
                    <span>Confluence</span>
                </Link>

                {/* Login Card */}
                <div className="login-card">
                    <div className="login-header">
                        <h1>Welcome Back</h1>
                        <p>Sign in to access your dashboard</p>
                    </div>

                    {error && <div className="login-error">{error}</div>}

                    {/* Google Sign In */}
                    <button
                        className="btn-google"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        {loading ? 'Signing in...' : 'Continue with Google'}
                    </button>

                    <div className="login-divider">
                        <span>or sign in with email</span>
                    </div>

                    {/* Email Sign In Form */}
                    <form className="login-form" onSubmit={handleEmailSignIn}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Don't have an account? <Link to="/#membership">Apply for membership</Link></p>
                    </div>
                </div>

                {/* Back to Home */}
                <Link to="/" className="back-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Login;
