import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';
import { onAuthChange, signOut } from '../firebase/auth';
import { getUserApplication } from '../firebase/firestore';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [application, setApplication] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthChange(async (currentUser) => {
            if (!currentUser) {
                navigate('/');
                return;
            }
            setUser(currentUser);

            // Fetch user's application
            const { application } = await getUserApplication(currentUser.uid);
            setApplication(application);

            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const getStatusInfo = (status) => {
        const statusMap = {
            pending: { label: 'Pending Review', class: 'status-pending' },
            approved: { label: 'Approved', class: 'status-approved' },
            rejected: { label: 'Not Approved', class: 'status-rejected' }
        };
        return statusMap[status] || statusMap.pending;
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            {/* Animated Background */}
            <div className="dashboard-bg">
                <div className="bg-gradient"></div>
                <div className="bg-grid"></div>
            </div>

            {/* Header */}
            <header className="dashboard-header">
                <div className="dashboard-container">
                    <Link to="/" className="dashboard-logo">
                        <img src="/favicon.svg" alt="Confluence" />
                        <span>Confluence</span>
                    </Link>
                    <div className="header-user">
                        <div className="user-avatar">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName} />
                            ) : (
                                <span>{user?.email?.[0]?.toUpperCase() || 'U'}</span>
                            )}
                        </div>
                        <div className="user-info">
                            <span className="user-name">{user?.displayName || 'Member'}</span>
                            <span className="user-email">{user?.email}</span>
                        </div>
                        <button className="logout-btn" onClick={handleSignOut}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-main">
                <div className="dashboard-container">
                    {/* Welcome Section */}
                    <div className="welcome-section">
                        <h1>Welcome back{user?.displayName ? `, ${user.displayName.split(' ')[0]}` : ''}!</h1>
                        <p>Track your application status and stay connected with the Confluence community.</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon stat-icon-purple">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                </svg>
                            </div>
                            <div className="stat-content">
                                <span className="stat-value">{application ? '1' : '0'}</span>
                                <span className="stat-label">Application</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon stat-icon-blue">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <div className="stat-content">
                                <span className="stat-value">{application ? getStatusInfo(application.status).label : 'N/A'}</span>
                                <span className="stat-label">Status</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon stat-icon-green">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <div className="stat-content">
                                <span className="stat-value">{application ? formatDate(application.createdAt) : 'N/A'}</span>
                                <span className="stat-label">Applied On</span>
                            </div>
                        </div>
                    </div>

                    {/* Application Card */}
                    {application ? (
                        <div className="section-card">
                            <div className="section-header">
                                <h2>Your Application</h2>
                                <div className={`status-badge ${getStatusInfo(application.status).class}`}>
                                    <span className="status-dot"></span>
                                    {getStatusInfo(application.status).label}
                                </div>
                            </div>

                            <div className="application-content">
                                <div className="app-type-badge">
                                    {application.type === 'entrepreneur' ? 'Alumni Entrepreneur' : 'Investor'}
                                </div>

                                <div className="app-info-grid">
                                    <div className="info-item">
                                        <span className="info-label">Full Name</span>
                                        <span className="info-value">{application.name}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Email</span>
                                        <span className="info-value">{application.email}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Phone</span>
                                        <span className="info-value">{application.phone || 'Not provided'}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">LinkedIn</span>
                                        <a href={application.linkedin} target="_blank" rel="noopener noreferrer" className="info-value info-link">
                                            View Profile
                                        </a>
                                    </div>
                                    {application.type === 'entrepreneur' && (
                                        <>
                                            <div className="info-item">
                                                <span className="info-label">Startup</span>
                                                <span className="info-value">{application.startupName || 'Not provided'}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Stage</span>
                                                <span className="info-value">{application.startupStage || 'Not provided'}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Location</span>
                                                <span className="info-value">{application.startupLocation || 'Not provided'}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Funding</span>
                                                <span className="info-value">{application.raisedFunding || 'Not provided'}</span>
                                            </div>
                                        </>
                                    )}
                                    {application.type === 'investor' && (
                                        <>
                                            <div className="info-item">
                                                <span className="info-label">Type</span>
                                                <span className="info-value">{application.individualOrFirm || 'Not provided'}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">IIT Alumni</span>
                                                <span className="info-value">{application.isIITAlumnus === 'yes' ? 'Yes' : 'No'}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Location</span>
                                                <span className="info-value">{application.location || 'Not provided'}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="section-card empty-state">
                            <div className="empty-icon">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="12" y1="18" x2="12" y2="12" />
                                    <line x1="9" y1="15" x2="15" y2="15" />
                                </svg>
                            </div>
                            <h3>No Application Yet</h3>
                            <p>Join the Confluence community by submitting your application.</p>
                            <Link to="/#membership" className="btn btn-primary">
                                Apply Now
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
