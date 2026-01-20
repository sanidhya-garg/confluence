import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getApplications } from '../firebase/firestore';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date-newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);

    // Export modal state
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportStatusFilter, setExportStatusFilter] = useState('all');
    const [exportTypeFilter, setExportTypeFilter] = useState('all');
    const [exportSearchQuery, setExportSearchQuery] = useState('');

    const itemsPerPage = 10;
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

    // Combined filtering and sorting logic
    const getFilteredAndSortedApplications = () => {
        let filtered = applications.filter(app => {
            // Status filter
            if (statusFilter !== 'all' && app.status !== statusFilter) return false;

            // Type filter
            if (typeFilter !== 'all') {
                const appType = app.type === 'entrepreneur' ? 'founder' : 'investor';
                if (appType !== typeFilter) return false;
            }

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchName = app.name?.toLowerCase().includes(query);
                const matchPhone = app.phone?.toLowerCase().includes(query);
                const matchCompany = app.startupName?.toLowerCase().includes(query);
                const matchFirm = app.individualOrFirm?.toLowerCase().includes(query);
                return matchName || matchPhone || matchCompany || matchFirm;
            }

            return true;
        });

        // Sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'date-newest':
                    return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
                case 'date-oldest':
                    return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
                case 'name-asc':
                    return (a.name || '').localeCompare(b.name || '');
                case 'name-desc':
                    return (b.name || '').localeCompare(a.name || '');
                default:
                    return 0;
            }
        });

        return filtered;
    };

    const filteredApplications = getFilteredAndSortedApplications();

    // Pagination calculations
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedApplications = filteredApplications.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter, typeFilter, searchQuery, sortBy]);

    const handleClearFilters = () => {
        setStatusFilter('all');
        setTypeFilter('all');
        setSearchQuery('');
        setSortBy('date-newest');
    };

    const openExportModal = () => {
        // Reset export filters when opening modal
        setExportStatusFilter('all');
        setExportTypeFilter('all');
        setExportSearchQuery('');
        setShowExportModal(true);
    };

    const closeExportModal = () => {
        setShowExportModal(false);
    };

    const performExport = () => {
        // Filter applications based on export modal filters
        let dataToExport = applications.filter(app => {
            // Status filter
            if (exportStatusFilter !== 'all' && app.status !== exportStatusFilter) return false;

            // Type filter
            if (exportTypeFilter !== 'all') {
                const appType = app.type === 'entrepreneur' ? 'founder' : 'investor';
                if (appType !== exportTypeFilter) return false;
            }

            // Search filter
            if (exportSearchQuery) {
                const query = exportSearchQuery.toLowerCase();
                const matchName = app.name?.toLowerCase().includes(query);
                const matchPhone = app.phone?.toLowerCase().includes(query);
                const matchCompany = app.startupName?.toLowerCase().includes(query);
                const matchFirm = app.individualOrFirm?.toLowerCase().includes(query);
                if (!(matchName || matchPhone || matchCompany || matchFirm)) return false;
            }

            return true;
        });

        // Prepare data for export
        const exportData = dataToExport.map(app => ({
            'Date': formatDate(app.createdAt),
            'Name': app.name,
            'Email': app.email,
            'Phone': app.phone || 'N/A',
            'Type': app.type === 'entrepreneur' ? 'Founder' : 'Investor',
            'LinkedIn': app.linkedin || 'N/A',
            // Entrepreneur-specific fields
            'Startup Name': app.type === 'entrepreneur' ? (app.startupName || 'N/A') : '-',
            'Startup Stage': app.type === 'entrepreneur' ? (app.startupStage || 'N/A') : '-',
            'Startup Location': app.type === 'entrepreneur' ? (app.startupLocation || 'N/A') : '-',
            'Raised Funding': app.type === 'entrepreneur' ? (app.raisedFunding || 'N/A') : '-',
            // Investor-specific fields
            'Individual/Firm': app.type === 'investor' ? (app.individualOrFirm || 'N/A') : '-',
            'IIT Alumni': app.type === 'investor' ? (app.isIITAlumnus === 'yes' ? 'Yes' : 'No') : '-',
            'Location': app.type === 'investor' ? (app.location || 'N/A') : '-',
            'Status': app.status
        }));

        // Create workbook and worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Applications');

        // Generate filename with current date and filter info
        const date = new Date().toISOString().split('T')[0];
        let filename = `Confluence_Applications_${date}`;

        if (exportStatusFilter !== 'all') filename += `_${exportStatusFilter}`;
        if (exportTypeFilter !== 'all') filename += `_${exportTypeFilter}`;
        if (exportSearchQuery) filename += '_filtered';

        filename += '.xlsx';

        // Save file
        XLSX.writeFile(wb, filename);

        // Close modal
        closeExportModal();
    };

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
                        <button onClick={openExportModal} className="export-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Export to Excel
                        </button>
                        <button onClick={fetchApplications} className="refresh-btn">
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="filters-section">
                    <div className="filters-row">
                        <div className="search-box">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by name, phone, or company..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="filter-select">
                            <option value="all">All Types</option>
                            <option value="founder">Founders</option>
                            <option value="investor">Investors</option>
                        </select>

                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
                            <option value="date-newest">Newest First</option>
                            <option value="date-oldest">Oldest First</option>
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                        </select>

                        {(searchQuery || typeFilter !== 'all' || statusFilter !== 'all' || sortBy !== 'date-newest') && (
                            <button onClick={handleClearFilters} className="clear-filters-btn">
                                Clear Filters
                            </button>
                        )}
                    </div>

                    <div className="results-info">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredApplications.length)} of {filteredApplications.length} applications
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
                    <>
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
                                    {paginatedApplications.map(app => (
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

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="pagination-btn"
                                >
                                    ← Previous
                                </button>

                                <div className="pagination-pages">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                                        // Show first page, last page, current page and adjacent pages
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 1 && page <= currentPage + 1)
                                        ) {
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        } else if (
                                            page === currentPage - 2 ||
                                            page === currentPage + 2
                                        ) {
                                            return <span key={page} className="pagination-ellipsis">...</span>;
                                        }
                                        return null;
                                    })}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className="pagination-btn"
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Export Modal */}
            {showExportModal && (
                <div className="modal-overlay" onClick={closeExportModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Export to Excel</h3>
                            <button className="modal-close" onClick={closeExportModal}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            <p className="modal-description">Set filters for the data you want to export:</p>

                            <div className="export-filters">
                                <div className="form-group">
                                    <label>Search</label>
                                    <input
                                        type="text"
                                        placeholder="Search by name, phone, or company..."
                                        value={exportSearchQuery}
                                        onChange={(e) => setExportSearchQuery(e.target.value)}
                                        className="export-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Application Type</label>
                                    <select
                                        value={exportTypeFilter}
                                        onChange={(e) => setExportTypeFilter(e.target.value)}
                                        className="export-select"
                                    >
                                        <option value="all">All Types</option>
                                        <option value="founder">Founders Only</option>
                                        <option value="investor">Investors Only</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        value={exportStatusFilter}
                                        onChange={(e) => setExportStatusFilter(e.target.value)}
                                        className="export-select"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending Only</option>
                                        <option value="approved">Approved Only</option>
                                        <option value="rejected">Rejected Only</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button onClick={closeExportModal} className="btn-cancel">
                                Cancel
                            </button>
                            <button onClick={performExport} className="btn-export">
                                Export
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default AdminDashboard;
