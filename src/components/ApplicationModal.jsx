import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationModal.css';
import { signInWithGoogle, signUpWithEmail } from '../firebase/auth';
import { submitApplication } from '../firebase/firestore';

const ApplicationModal = ({ isOpen, onClose, applicationType }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Form, 2: Auth, 3: Success
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Entrepreneur (Startup) form fields
    const [startupForm, setStartupForm] = useState({
        // Personal Info
        name: '',
        phone: '',
        email: '',
        linkedin: '',
        college: '',
        graduationYear: '',
        location: '',
        bio: '',
        // Startup Info
        startupName: '',
        startupStage: '',
        raisedFunding: '',
        startupLocation: '',
        websiteLink: '',
        foundingYear: '',
        teamSize: '',
        // Expectations
        whatDoYouExpect: '',
        whatCanYouOffer: ''
    });

    // Investor (VC) form fields
    const [investorForm, setInvestorForm] = useState({
        name: '',
        phone: '',
        email: '',
        linkedin: '',
        isIITAlumnus: '',
        location: '',
        willingToTravelNCR: '',
        individualOrFirm: '',
        startupInterests: '',
        willingToMentor: ''
    });

    const [authData, setAuthData] = useState({
        email: '',
        password: ''
    });

    const handleStartupChange = (e) => {
        setStartupForm({ ...startupForm, [e.target.name]: e.target.value });
    };

    const handleInvestorChange = (e) => {
        setInvestorForm({ ...investorForm, [e.target.name]: e.target.value });
    };

    const handleAuthInputChange = (e) => {
        setAuthData({ ...authData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const form = applicationType === 'entrepreneur' ? startupForm : investorForm;

        // Basic validation
        if (!form.name || !form.email || !form.linkedin) {
            setError('Please fill in all required fields');
            return;
        }
        setError('');
        setStep(2);
    };

    const getFormData = () => {
        return applicationType === 'entrepreneur' ? startupForm : investorForm;
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');

        const { user, error } = await signInWithGoogle();
        if (error) {
            setError(error);
            setLoading(false);
            return;
        }

        // Submit application
        const { error: submitError } = await submitApplication({
            ...getFormData(),
            type: applicationType
        }, user.uid);

        if (submitError) {
            setError(submitError);
            setLoading(false);
            return;
        }

        setLoading(false);
        setStep(3);
    };

    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { user, error } = await signUpWithEmail(authData.email, authData.password);
        if (error) {
            setError(error);
            setLoading(false);
            return;
        }

        // Submit application
        const { error: submitError } = await submitApplication({
            ...getFormData(),
            type: applicationType
        }, user.uid);

        if (submitError) {
            setError(submitError);
            setLoading(false);
            return;
        }

        setLoading(false);
        setStep(3);
    };

    const handleClose = () => {
        setStep(1);
        setError('');
        setStartupForm({
            name: '', phone: '', email: '', linkedin: '', college: '', graduationYear: '',
            location: '', bio: '', startupName: '', startupStage: '', raisedFunding: '',
            startupLocation: '', websiteLink: '', foundingYear: '', teamSize: '',
            whatDoYouExpect: '', whatCanYouOffer: ''
        });
        setInvestorForm({
            name: '', phone: '', email: '', linkedin: '', isIITAlumnus: '', location: '',
            willingToTravelNCR: '', individualOrFirm: '', startupInterests: '', willingToMentor: ''
        });
        setAuthData({ email: '', password: '' });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content modal-large" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={handleClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                <div className="modal-header">
                    <span className="modal-label">
                        {applicationType === 'entrepreneur' ? 'For IIT Founders' : 'For VCs & Angels'}
                    </span>
                    <h2 className="modal-title">
                        Apply as {applicationType === 'entrepreneur' ? 'Alumni Entrepreneur' : 'Investor'}
                    </h2>
                </div>

                {error && <div className="modal-error">{error}</div>}

                {/* Step 1: Application Form */}
                {step === 1 && applicationType === 'entrepreneur' && (
                    <form className="application-form" onSubmit={handleFormSubmit}>
                        <h3 className="form-section-title">Personal Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="name" value={startupForm.name} onChange={handleStartupChange} placeholder="Your full name" required />
                            </div>
                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input type="tel" name="phone" value={startupForm.phone} onChange={handleStartupChange} placeholder="+91 98765 43210" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Email *</label>
                                <input type="email" name="email" value={startupForm.email} onChange={handleStartupChange} placeholder="your@email.com" required />
                            </div>
                            <div className="form-group">
                                <label>LinkedIn Profile *</label>
                                <input type="url" name="linkedin" value={startupForm.linkedin} onChange={handleStartupChange} placeholder="https://linkedin.com/in/..." required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>College (IIT)</label>
                                <input type="text" name="college" value={startupForm.college} onChange={handleStartupChange} placeholder="IIT Delhi" />
                            </div>
                            <div className="form-group">
                                <label>Graduation Year</label>
                                <input type="text" name="graduationYear" value={startupForm.graduationYear} onChange={handleStartupChange} placeholder="2018" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Location</label>
                                <input type="text" name="location" value={startupForm.location} onChange={handleStartupChange} placeholder="City, Country" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea name="bio" value={startupForm.bio} onChange={handleStartupChange} placeholder="Tell us about yourself..." rows={3} />
                        </div>

                        <h3 className="form-section-title">Startup Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Startup Name *</label>
                                <input type="text" name="startupName" value={startupForm.startupName} onChange={handleStartupChange} placeholder="Your startup name" required />
                            </div>
                            <div className="form-group">
                                <label>Startup Stage</label>
                                <select name="startupStage" value={startupForm.startupStage} onChange={handleStartupChange}>
                                    <option value="">Select stage</option>
                                    <option value="idea">Idea Stage</option>
                                    <option value="mvp">MVP</option>
                                    <option value="early">Early Stage</option>
                                    <option value="growth">Growth Stage</option>
                                    <option value="scaleup">Scale-up</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Raised Funding?</label>
                                <select name="raisedFunding" value={startupForm.raisedFunding} onChange={handleStartupChange}>
                                    <option value="">Select</option>
                                    <option value="no">No</option>
                                    <option value="angel">Angel/Seed</option>
                                    <option value="seriesA">Series A</option>
                                    <option value="seriesB+">Series B+</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Startup Location</label>
                                <input type="text" name="startupLocation" value={startupForm.startupLocation} onChange={handleStartupChange} placeholder="City" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Website</label>
                                <input type="url" name="websiteLink" value={startupForm.websiteLink} onChange={handleStartupChange} placeholder="https://yourstartup.com" />
                            </div>
                            <div className="form-group">
                                <label>Founding Year</label>
                                <input type="text" name="foundingYear" value={startupForm.foundingYear} onChange={handleStartupChange} placeholder="2022" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Team Size</label>
                                <input type="text" name="teamSize" value={startupForm.teamSize} onChange={handleStartupChange} placeholder="10" />
                            </div>
                        </div>

                        <h3 className="form-section-title">Expectations</h3>
                        <div className="form-group">
                            <label>What do you expect from Confluence?</label>
                            <textarea name="whatDoYouExpect" value={startupForm.whatDoYouExpect} onChange={handleStartupChange} placeholder="Investor connections, mentorship, partnerships..." rows={3} />
                        </div>
                        <div className="form-group">
                            <label>What can you offer to the community?</label>
                            <textarea name="whatCanYouOffer" value={startupForm.whatCanYouOffer} onChange={handleStartupChange} placeholder="Expertise, resources, network..." rows={3} />
                        </div>

                        <button type="submit" className="btn btn-primary form-submit">
                            Continue
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </form>
                )}

                {step === 1 && applicationType === 'investor' && (
                    <form className="application-form" onSubmit={handleFormSubmit}>
                        <h3 className="form-section-title">Personal Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="name" value={investorForm.name} onChange={handleInvestorChange} placeholder="Your full name" required />
                            </div>
                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input type="tel" name="phone" value={investorForm.phone} onChange={handleInvestorChange} placeholder="+91 98765 43210" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Email *</label>
                                <input type="email" name="email" value={investorForm.email} onChange={handleInvestorChange} placeholder="your@email.com" required />
                            </div>
                            <div className="form-group">
                                <label>LinkedIn Profile *</label>
                                <input type="url" name="linkedin" value={investorForm.linkedin} onChange={handleInvestorChange} placeholder="https://linkedin.com/in/..." required />
                            </div>
                        </div>

                        <h3 className="form-section-title">Investment Details</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Are you an IIT Alumnus?</label>
                                <select name="isIITAlumnus" value={investorForm.isIITAlumnus} onChange={handleInvestorChange}>
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input type="text" name="location" value={investorForm.location} onChange={handleInvestorChange} placeholder="City, Country" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Willing to travel to NCR?</label>
                                <select name="willingToTravelNCR" value={investorForm.willingToTravelNCR} onChange={handleInvestorChange}>
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="maybe">Maybe</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Individual or Firm?</label>
                                <select name="individualOrFirm" value={investorForm.individualOrFirm} onChange={handleInvestorChange}>
                                    <option value="">Select</option>
                                    <option value="individual">Individual (Angel)</option>
                                    <option value="firm">VC Firm</option>
                                    <option value="family-office">Family Office</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>What type of startups interest you?</label>
                            <textarea name="startupInterests" value={investorForm.startupInterests} onChange={handleInvestorChange} placeholder="Sectors, stages, check sizes..." rows={3} />
                        </div>
                        <div className="form-group">
                            <label>Would you be willing to mentor founders?</label>
                            <select name="willingToMentor" value={investorForm.willingToMentor} onChange={handleInvestorChange}>
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                                <option value="occasionally">Occasionally</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary form-submit">
                            Continue
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </form>
                )}

                {/* Step 2: Authentication */}
                {step === 2 && (
                    <div className="auth-step">
                        <p className="auth-intro">Create an account to complete your application</p>

                        <button
                            className="btn btn-google"
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

                        <div className="auth-divider">
                            <span>or</span>
                        </div>

                        <form className="email-auth-form" onSubmit={handleEmailSignUp}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={authData.email}
                                    onChange={handleAuthInputChange}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Create Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={authData.password}
                                    onChange={handleAuthInputChange}
                                    placeholder="Min 6 characters"
                                    minLength={6}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-secondary" disabled={loading}>
                                {loading ? 'Creating account...' : 'Sign up with Email'}
                            </button>
                        </form>

                        <button className="back-btn" onClick={() => setStep(1)}>
                            ← Back to form
                        </button>
                    </div>
                )}

                {/* Step 3: Success */}
                {step === 3 && (
                    <div className="success-step">
                        <div className="success-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <h3>Application Submitted!</h3>
                        <p>Thank you for applying. Our team will review your application and get back to you soon.</p>
                        <button className="btn btn-primary" onClick={() => { handleClose(); navigate('/dashboard'); }}>
                            Go to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationModal;
