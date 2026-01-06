import './Council.css';
import { ArrowRightIcon } from './Icons';

const Council = () => {
    const notableAlumni = [
        {
            name: 'Vikram Gupta',
            image: '/council/vikram_gupta.jpg',
        },
        {
            name: 'Alok Mittal',
            image: '/council/alok_mittal.png',
        },
        {
            name: 'Pankaj Vermani',
            image: '/council/pankaj_vermani.png',
        },
        {
            name: 'Gaurav Bhatnagar',
            image: '/council/gaurav_bhatnagar.jpg',
        },
        {
            name: 'Gaurav Agarwal',
            image: '/council/gaurav_agarwal.png',
        },
    ];

    return (
        <section className="council section" id="council">
            <div className="container">
                {/* Section Header - Centered like before */}
                <div className="section-header animate-on-scroll">
                    <span className="section-label">Leadership</span>
                    <h2 className="section-title">
                        Notable <span className="gradient-text">Alumni</span>
                    </h2>
                    <p className="section-description">
                        Accomplished IIT alumni leaders who have built successful ventures
                        and are shaping India's innovation landscape.
                    </p>
                </div>

                {/* Alumni Strip */}
                <div className="alumni-strip">
                    {notableAlumni.map((alumni, index) => (
                        <div
                            key={index}
                            className="alumni-card animate-on-scroll"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="alumni-photo">
                                <img src={alumni.image} alt={alumni.name} />
                            </div>
                            <div className='alumni-box'>
                                <span className="alumni-name">{alumni.name}</span>
                                <span className='alumni-title'>CEO of edcIITD</span>
                            <span className='alumni-description'>CEO of edcIITD</span>
                            </div>
                        </div>
                    ))}

                    {/* See All Card */}
                    <a href="#" className="see-all-card animate-on-scroll">
                        <div className="see-all-icon">
                            <ArrowRightIcon />
                        </div>
                        <span className="see-all-text">See All</span>
                        <span className="see-all-subtext">Notable Alumni</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Council;
