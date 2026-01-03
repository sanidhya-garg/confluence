import './Membership.css';
import { RocketIcon, DiamondIcon } from './Icons';

const Membership = () => {
    const membershipTypes = [
        {
            type: 'entrepreneur',
            icon: <RocketIcon />,
            title: 'Alumni Entrepreneur',
            subtitle: 'For IIT Founders',
            description: 'For IIT founders building ventures across sectors. Get access to curated investors, cross-IIT collaborations, and closed-door engagements.',
            benefits: [
                'Direct access to relevant investors',
                'Meaningful connections with IIT founders',
                'Opportunities for collaboration & talent',
                'Small, honest conversations with leaders',
                'Priority event access'
            ],
            cta: 'Apply as an Entrepreneur',
            featured: false
        },
        {
            type: 'investor',
            icon: <DiamondIcon />,
            title: 'Investor',
            subtitle: 'For VCs & Angels',
            description: 'For VCs, angels, and fund leaders engaging with high-quality IIT-founded ventures. Access vetted founders and high-signal dealflow.',
            benefits: [
                'A vetted pool of IIT-founded ventures',
                'Efficient access to high-signal founders',
                'Sector and stage-relevant interactions',
                'Trusted setting for founder relationships',
                'Private investment discussions'
            ],
            cta: 'Apply as an Investor',
            featured: true
        }
    ];

    return (
        <section className="membership section" id="membership">
            {/* Background Pattern */}
            <div className="membership-bg">
                <div className="membership-pattern"></div>
            </div>

            <div className="container">
                {/* Section Header */}
                <div className="section-header animate-on-scroll">
                    <span className="section-label">Join Us</span>
                    <h2 className="section-title">
                        <span className="gradient-text">Membership</span>
                    </h2>
                    <p className="section-description">
                        Confluence offers two distinct, curated membership pathways designed
                        for leaders who are shaping India's innovation landscape.
                    </p>
                </div>

                {/* Membership Cards */}
                <div className="membership-cards">
                    {membershipTypes.map((membership, index) => (
                        <div
                            key={membership.type}
                            className={`membership-card ${membership.featured ? 'featured' : ''} animate-on-scroll animate-delay-${index + 1}`}
                        >
                            {membership.featured && (
                                <div className="featured-badge">
                                    <span>Most Popular</span>
                                </div>
                            )}

                            <div className="card-header">
                                <div className="card-icon">
                                    {membership.icon}
                                </div>
                                <span className="card-subtitle">{membership.subtitle}</span>
                                <h3 className="card-title">{membership.title}</h3>
                                <p className="card-description">{membership.description}</p>
                            </div>

                            <div className="card-benefits">
                                <span className="benefits-label">What you get:</span>
                                <ul className="benefits-list">
                                    {membership.benefits.map((benefit) => (
                                        <li key={benefit} className="benefit-item">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="card-footer">
                                <button className={`btn ${membership.featured ? 'btn-primary' : 'btn-secondary'} card-cta`}>
                                    {membership.cta}
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Card glow effect */}
                            <div className="card-glow"></div>
                        </div>
                    ))}
                </div>

                {/* Bottom Note */}
                <div className="membership-note animate-on-scroll">
                    <div className="note-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    </div>
                    <p>
                        Membership is by application only. All applications are reviewed by the Alumni Council
                        to ensure quality and fit within the Confluence community.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Membership;
