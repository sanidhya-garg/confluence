import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { signInAnonymous } from '../firebase/auth';
import './AdminLogin.css';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Hardcoded credentials as requested
        if (credentials.username === 'admin' && credentials.password === 'confluence2024') {
            // Sign in anonymously to satisfy Firestore rules
            // We await this to ensure we are "authenticated" before moving to dashboard
            const { error: authError } = await signInAnonymous();

            if (authError) {
                console.error("Anonymous auth failed:", authError);
                setError('Database connection failed. Please check console.');
                return;
            }

            // Set simple session flag
            sessionStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="admin-login-page">
            <Navbar />
            <div className="admin-login-container">
                <div className="admin-login-card">
                    <h2>Admin Portal</h2>
                    <p>Please login to manage applications</p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminLogin;
