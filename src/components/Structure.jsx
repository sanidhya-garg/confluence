import './Structure.css';
import { BuildingIcon, RefreshIcon, CrownIcon } from './Icons';

const Structure = () => {
    const pillars = [
        {
            icon: <BuildingIcon />,
            title: 'Annual Gathering',
            subtitle: 'Flagship In-Person Forum',
            description: 'A flagship in-person forum hosted during IIT Delhi\'s E-Summit, bringing together the brightest minds in India\'s startup ecosystem.',
            features: ['Keynote Sessions', 'Panel Discussions', 'Networking Events', 'Startup Showcases']
        },
        {
            icon: <RefreshIcon />,
            title: 'Year-Round Engagements',
            subtitle: 'Continuous Connection',
            description: 'Closed-door roundtables, sector circles, founder huddles, and investor interactions throughout the year.',
            features: ['Monthly Roundtables', 'Sector-Specific Circles', 'Founder Huddles', 'Investor Meetings']
        },
        {
            icon: <CrownIcon />,
            title: 'Alumni Council Leadership',
            subtitle: 'Guiding Vision',
            description: 'Oversight, direction, and continuity shaped by senior IIT alumni who have built and scaled successful ventures.',
            features: ['Strategic Direction', 'Mentorship Access', 'Network Expansion', 'Legacy Building']
        }
    ];

    return (
        <section className="structure section" id="structure">
            {/* Background Elements */}
            <div className="structure-bg">
                <div className="structure-line line-1"></div>
                <div className="structure-line line-2"></div>
                <div className="structure-line line-3"></div>
            </div>

            <div className="container">
                {/* Section Header */}
                <div className="section-header animate-on-scroll">
                    <span className="section-label">Framework</span>
                    <h2 className="section-title">
                        Our <span className="gradient-text">Structure</span>
                    </h2>
                    <p className="section-description">
                        Confluence is built on three foundational pillars that ensure meaningful
                        engagement, lasting connections, and sustainable growth.
                    </p>
                </div>

                {/* Pillars */}
                <div className="pillars-container">
                    {pillars.map((pillar, index) => (
                        <div
                            key={pillar.title}
                            className={`pillar-card animate-on-scroll animate-delay-${index + 1}`}
                        >
                            <div className="pillar-header">
                                <div className="pillar-icon-wrapper">
                                    <span className="pillar-icon">{pillar.icon}</span>
                                </div>
                                <div className="pillar-number">0{index + 1}</div>
                            </div>

                            <div className="pillar-content">
                                <span className="pillar-subtitle">{pillar.subtitle}</span>
                                <h3 className="pillar-title">{pillar.title}</h3>
                                <p className="pillar-description">{pillar.description}</p>

                                <ul className="pillar-features">
                                    {pillar.features.map((feature) => (
                                        <li key={feature} className="pillar-feature">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Decorative corner */}
                            <div className="pillar-corner"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Structure;
