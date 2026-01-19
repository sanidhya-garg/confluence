import './About.css';
import { GlobeIcon, TrustIcon, LightbulbIcon, OpportunityIcon, NetworkIcon, RocketIcon } from './Icons';

const About = () => {
    const features = [
        {
            icon: <GlobeIcon />,
            title: 'Curated Pan-IIT Participation',
            description: 'Founders, investors, and leaders selected across , stages, and sectors in a trusted setting.'
        },
        {
            icon: <TrustIcon />,
            title: 'High-Trust Engagement Format',
            description: 'Private, thoughtfully designed interactions that prioritize depth over scale.'
        },
        {
            icon: <LightbulbIcon />,
            title: 'Knowledge Exchange & Learning',
            description: 'Peer conversations and shared insight across generations of IIT entrepreneurs.'
        },
        {
            icon: <OpportunityIcon />,
            title: 'Clear Opportunity Pathways',
            description: 'Structured access to talent, capital, and collaboration opportunities.'
        },
        {
            icon: <NetworkIcon />,
            title: 'Unified Ecosystem Access',
            description: 'Bridging the gap between disparate IIT alumni networks into one powerful force.'
        },
        {
            icon: <RocketIcon />,
            title: 'Catalyzing Future Unicorns',
            description: 'A launchpad for the next wave of disruptive startups emerging from IITs.'
        }
    ];

    return (
        <section className="about section" id="about">
            <div className="container">
                {/* Section Header */}
                <div className="section-header animate-on-scroll w-full">
                    <span className="section-label">What is Confluence?</span>
                    <h2 className="section-title">
                        A Curated <span className="gradient-text">Alumni Participation</span>
                    </h2>
                    <p className="section-description">
                        Confluence brings together alumni founders, venture partners, and industry leaders
                        in a trusted setting. It is designed to enable meaningful engagement across stages
                        and sectors, strengthening how the IIT entrepreneurial community connects, collaborates, and grows.
                    </p>
                </div>

                {/* How Confluence Works */}
                <div className="how-it-works animate-on-scroll">
                    <span className="how-badge">How Confluence Works</span>
                </div>

                {/* Features Grid */}
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className={`feature-card glass-card animate-on-scroll animate-delay-${(index % 4) + 1}`}
                        >
                            <div className="feature-icon-wrapper">
                                <span className="feature-icon">{feature.icon}</span>
                                <div className="feature-icon-glow"></div>
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Launch Banner */}
                <div className="launch-banner animate-on-scroll">
                    <div className="launch-content">
                        <div className="launch-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            <span>Inaugural Edition</span>
                        </div>
                        <h3 className="launch-title">
                            Launching at <span className="gradient-text">IIT Delhi</span>
                        </h3>
                        <p className="launch-description">
                            The inaugural edition of Confluence will be hosted during BECon2026,
                            alongside the Startup Ecosystem Showcase. Join founders, VCs, alumni,
                            policymakers, and ecosystem leaders at a moment of exceptional momentum
                            for Indian innovation.
                        </p>
                        <div className='know-more-container'>
                            <div className="launch-location">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>Indian Institute of Technology Delhi</span>
                            
                        </div>
                        <a href="https://becon.edciitd.com/" className="know-more-link">
                            Know More
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        </div>
                        
                    </div>
                    <div className="launch-visual">
                        <img src="/becon.svg" alt="BECon IIT Delhi" className="launch-visual-img" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
