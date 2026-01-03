import './Council.css';
import { LinkedInIcon } from './Icons';

const Council = () => {
    const councilMembers = [
        {
            name: 'Vikram Gupta',
            role: 'Managing Partner, Ivycap Ventures',
            linkedin: 'https://www.linkedin.com/in/vikramgupta2',
            initials: 'VG'
        },
        {
            name: 'Priyank Garg',
            role: 'Ex MD, Indian Angel Network',
            linkedin: 'https://www.linkedin.com/in/priyankgarg',
            initials: 'PG'
        },
        {
            name: 'Pawan Raj Kumar',
            role: 'Founder, Zeca Capital',
            linkedin: 'https://www.linkedin.com/in/pawanrajkumar',
            initials: 'PR'
        },
        {
            name: 'Alok Mittal',
            role: 'Co-Founder & CEO, Indifi',
            image: '/council/alok_mittal.png',
            linkedin: 'https://www.linkedin.com/in/alok-mittal-590a/',
            initials: 'AM'
        },
        {
            name: 'Pankaj Vermani',
            role: 'Founder & CEO, Clovia',
            image: '/council/pankaj_vermani.png',
            linkedin: 'https://www.linkedin.com/in/pankajvermani/',
            initials: 'PV'
        },
        {
            name: 'Gaurav Bhatnagar',
            role: 'Founder, TBO.com',
            image: '/council/gaurav_bhatnagar.jpg',
            linkedin: 'https://www.linkedin.com/in/gauravbhatnagar/',
            initials: 'GB'
        },
        {
            name: 'Gaurav Agarwal',
            role: 'Co-Founder, Tata 1mg',
            image: '/council/gaurav_agarwal.png',
            linkedin: 'https://www.linkedin.com/in/gaurav-agarwal-112a0310/',
            initials: 'GA'
        },
        {
            name: 'Hitesh Oberoi',
            role: 'MD & CEO, Info Edge',
            linkedin: 'https://www.linkedin.com/in/hitesh-oberoi-490260/',
            initials: 'HO'
        },
        {
            name: 'Dipinder Sekhon',
            role: 'CEO, Kritikal Solutions',
            linkedin: 'https://www.linkedin.com/in/dipinder/',
            initials: 'DS'
        },
        {
            name: 'Vivek Srivastava',
            role: 'Founder & CEO, HCAH',
            linkedin: 'https://www.linkedin.com/in/vsmuv/',
            initials: 'VS'
        },
        {
            name: 'Shivani Singh Kapoor',
            role: 'Co-Founder, ThinkStartup',
            linkedin: 'https://www.linkedin.com/in/shivani/',
            initials: 'SS'
        },
        {
            name: 'Dr. Apurva Chamaria',
            role: 'Global Head of Startup Partnerships @ Google',
            linkedin: 'https://www.linkedin.com/in/apurvachamaria',
            initials: 'AC'
        }
    ];

    return (
        <section className="council section" id="council">
            <div className="container">
                {/* Section Header */}
                <div className="section-header animate-on-scroll">
                    <span className="section-label">Leadership</span>
                    <h2 className="section-title">
                        The Alumni <span className="gradient-text">Council</span>
                    </h2>
                    <p className="section-description">
                        Guidance from accomplished IIT alumni leaders who have built successful
                        ventures and are shaping India's innovation landscape.
                    </p>
                </div>

                {/* Council Grid */}
                <div className="council-grid">
                    {councilMembers.map((member, index) => (
                        <div
                            key={index}
                            className={`council-member animate-on-scroll animate-delay-${(index % 4) + 1}`}
                        >
                            <div className="member-avatar">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="member-img" />
                                ) : (
                                    <span className="avatar-initials">{member.initials}</span>
                                )}
                                <div className="avatar-ring"></div>
                                {member.linkedin && (
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="member-linkedin">
                                        <LinkedInIcon />
                                    </a>
                                )}
                            </div>
                            <div className="member-info">
                                <h4 className="member-name">{member.name}</h4>
                                <span className="member-role">{member.role}</span>
                            </div>
                            <div className="member-glow"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Council;
