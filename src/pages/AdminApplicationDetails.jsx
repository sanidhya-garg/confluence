import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getApplicationById, updateApplicationStatus } from '../firebase/firestore';
import './AdminApplicationDetails.css';

const AdminApplicationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const isAdmin = sessionStorage.getItem('isAdmin');
            if (!isAdmin) {
                navigate('/admin');
            }
        };

        const fetchApplication = async () => {
            setLoading(true);
            const { application: app, error: appError } = await getApplicationById(id);
            if (appError) {
                setError(appError);
            } else {
                setApplication(app);
            }
            setLoading(false);
        };

        checkAuth();
        if (id) fetchApplication();
    }, [id, navigate]);

    const handleAction = async (status) => {
        if (!window.confirm(`Are you sure you want to ${status} this application?`)) return;

        setProcessing(true);
        const { error: updateError } = await updateApplicationStatus(id, status);

        if (updateError) {
            alert('Failed to update status: ' + updateError);
            setProcessing(false);
        } else {
            // Update local state
            setApplication(prev => ({ ...prev, status }));
            setProcessing(false);
            // Optional: navigate back to dashboard
            // navigate('/admin/dashboard'); 
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        try {
            return new Date(timestamp.seconds * 1000).toLocaleString();
        } catch (e) {
            return 'Invalid Date';
        }
    };

    if (loading) return (
        <div className="admin-details-page">
            <Navbar />
            <div className="loading-state">Loading details...</div>
            <Footer />
        </div>
    );

    if (error || !application) return (
        <div className="admin-details-page">
            <Navbar />
            <div className="error-state">
                <h3>Error</h3>
                <p>{error || 'Application not found'}</p>
                <Link to="/admin/dashboard" className="back-btn">Back to Dashboard</Link>
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="admin-details-page">
            <Navbar />
            <div className="details-container">
                <div className="details-header">
                    <Link to="/admin/dashboard" className="back-btn">
                        ← Back to Dashboard
                    </Link>
                    <div className="header-content">
                        <div>
                            <h2>{application.name}</h2>
                            <p className="subtitle">{application.type === 'entrepreneur' ? 'Founder Application' : 'Investor Application'}</p>
                        </div>
                        <span className={`status-badge ${application.status}`}>
                            {application.status}
                        </span>
                    </div>
                </div>

                <div className="details-card">
                    <h3 className="section-title">Contact Information</h3>
                    <div className="info-grid">
                        <div className="info-group">
                            <label>Email</label>
                            <p>{application.email}</p>
                        </div>
                        <div className="info-group">
                            <label>Phone</label>
                            <p>{application.phone}</p>
                        </div>
                        <div className="info-group">
                            <label>Location</label>
                            <p>{application.location || 'N/A'}</p>
                        </div>
                        <div className="info-group">
                            <label>LinkedIn</label>
                            <p><a href={application.linkedin} target="_blank" rel="noopener noreferrer">View Profile</a></p>
                        </div>
                        <div className="info-group">
                            <label>Submitted On</label>
                            <p>{formatDate(application.createdAt)}</p>
                        </div>
                    </div>
                </div>

                {application.type === 'entrepreneur' ? (
                    <>
                        <div className="details-card">
                            <h3 className="section-title">Startup Details</h3>
                            <div className="info-grid">
                                <div className="info-group">
                                    <label>Startup Name</label>
                                    <p>{application.startupName}</p>
                                </div>
                                <div className="info-group">
                                    <label>Stage</label>
                                    <p>{application.startupStage}</p>
                                </div>
                                <div className="info-group">
                                    <label>Funding Raised</label>
                                    <p>{application.raisedFunding}</p>
                                </div>
                                <div className="info-group">
                                    <label>Team Size</label>
                                    <p>{application.teamSize}</p>
                                </div>
                                <div className="info-group">
                                    <label>Incorporation Year</label>
                                    <p>{application.foundingYear}</p>
                                </div>
                                <div className="info-group">
                                    <label>Website</label>
                                    <p>{application.websiteLink ? <a href={application.websiteLink} target="_blank" rel="noopener noreferrer">{application.websiteLink}</a> : 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="details-card">
                            <h3 className="section-title">Deep Dive</h3>
                            <div className="info-grid">
                                <div className="info-group full-width">
                                    <label>Founder Bio</label>
                                    <p>{application.bio}</p>
                                </div>
                                <div className="info-group full-width">
                                    <label>What they expect</label>
                                    <p>{application.whatDoYouExpect}</p>
                                </div>
                                <div className="info-group full-width">
                                    <label>What they offer</label>
                                    <p>{application.whatCanYouOffer}</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="details-card">
                        <h3 className="section-title">Investor Profile</h3>
                        <div className="info-grid">
                            <div className="info-group">
                                <label>Investor Type</label>
                                <p>{application.individualOrFirm}</p>
                            </div>
                            <div className="info-group">
                                <label>IIT Alumnus</label>
                                <p>{application.isIITAlumnus}</p>
                            </div>
                            <div className="info-group">
                                <label>Willing to Travel NCR</label>
                                <p>{application.willingToTravelNCR}</p>
                            </div>
                            <div className="info-group">
                                <label>Willing to Mentor</label>
                                <p>{application.willingToMentor}</p>
                            </div>
                            <div className="info-group full-width">
                                <label>Startup Interests</label>
                                <p>{application.startupInterests}</p>
                            </div>
                        </div>
                    </div>
                )}

                {application.status === 'pending' && (
                    <div className="action-bar">
                        <p>Evaluate this application</p>
                        <div className="action-buttons">
                            <button
                                className="action-btn reject"
                                onClick={() => handleAction('rejected')}
                                disabled={processing}
                            >
                                Reject
                            </button>
                            <button
                                className="action-btn approve"
                                onClick={() => handleAction('approved')}
                                disabled={processing}
                            >
                                Approve Application
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AdminApplicationDetails;
