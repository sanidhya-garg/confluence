import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getApplications } from '../firebase/firestore';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const isAdmin = sessionStorage.getItem('isAdmin');
            if (!isAdmin) {
                navigate('/admin');
            }
        };

        checkAuth();
        fetchApplications();
    }, [navigate]);

    const fetchApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            const { applications: apps, error: fetchError } = await getApplications();
            if (fetchError) {
                console.error('Error fetching applications:', fetchError);
                setError(fetchError);
            } else {
                setApplications(apps || []);
            }
        } catch (err) {
            console.error("Unexpected error in fetchApplications:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredApplications = applications.filter(app => {
        if (filter === 'all') return true;
        return app.status === filter;
    });

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        try {
            return new Date(timestamp.seconds * 1000).toLocaleDateString();
        } catch (e) {
            return 'Invalid Date';
        }
    };

    return (
        <div className="admin-dashboard-page">
            <Navbar />
            <div className="admin-container">
                <div className="dashboard-header">
                    <h2>Application Dashboard</h2>
                    <div className="dashboard-actions">
                        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
                            <option value="all">All Applications</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <button onClick={fetchApplications} className="refresh-btn">
                            Refresh
                        </button>
                    </div>
                </div>

                {(loading || !applications) ? (
                    <div className="loading-state">Loading applications...</div>
                ) : error ? (
                    <div className="error-state">
                        <h3>Error Fetching Data</h3>
                        <p>{error}</p>
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <div className="empty-state">No applications found.</div>
                ) : (
                    <div className="applications-table-container">
                        <table className="applications-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Candidate</th>
                                    <th>Type</th>
                                    <th>Context</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApplications.map(app => (
                                    <tr key={app.id}>
                                        <td>{formatDate(app.createdAt)}</td>
                                        <td>
                                            <div style={{ fontWeight: '500' }}>{app.name}</div>
                                            <div className="secondary-text">{app.phone}</div>
                                        </td>
                                        <td>
                                            <span className="type-badge">
                                                {app.type === 'entrepreneur' ? 'Founder' : 'Investor'}
                                            </span>
                                        </td>
                                        <td>
                                            {app.type === 'entrepreneur' ? (
                                                <>
                                                    <div style={{ fontWeight: '500' }}>{app.startupName}</div>
                                                    <div className="secondary-text">{app.startupStage}</div>
                                                </>
                                            ) : (
                                                <div className="secondary-text">
                                                    {app.individualOrFirm} ({app.isIITAlumnus === 'yes' ? 'Alum' : 'Non-Alum'})
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`status-badge ${app.status}`}>{app.status}</span>
                                        </td>
                                        <td>
                                            <Link to={`/admin/application/${app.id}`} className="view-btn">
                                                View Details →
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
