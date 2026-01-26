import { Link } from "react-router-dom";
import "./Council.css";
import { ArrowRightIcon } from "./Icons";
import { LinkedInIcon } from '../components/Icons';

const Council = () => {
  const notableAlumni = [
    {
      name: "Vikram Gupta",
      image: "/council/vikram_gupta.jpg",
      discription:"Managing Partner of IvyCap Ventures",
      linkedin:"",
    },
    {
      name: "Alok Mittal",
      image: "/council/alok_mittal.png",
      discription:"Founder of Indifi Technologies",
      linkedin:"https://www.linkedin.com/in/alok-mittal-590a/?originalSubdomain=in",
    },
    {
      name: "Pankaj Vermani",
      image: "/council/pankaj_vermani.jpeg",
      discription:"Founder of Clovia",
      linkedin:"https://www.linkedin.com/in/pankajvermani?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    {
      name: "Vivke Shrivastava",
      image: "/council/vivek_shrivastava.jpeg",
      discription:"Founder of HCAH",
      linkedin:"https://www.linkedin.com/in/pankajvermani?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    {
      name: "Nitin Jain",
      image: "/council/nitin_jain.jpeg",
      discription:"Founder of OfBusiness",
      linkedin:"https://www.linkedin.com/in/nitin-jain-17b82310?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    {
      name: "Smarthveer Sidana",
      image: "/council/smarthveer_sidana.jpeg",
      discription:"Founder of Hirequotient",
      linkedin:"https://www.linkedin.com/in/smarthveer-sidana-07267111a/",
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
                <div className="alumni-overlay">
                  <a
                    href={alumni.linkedin}
                    className="linkedin-link"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                </div>
              </div>
              <div className="alumni-box">
                <span className="alumni-name">{alumni.name}</span>
                <span className="alumni-title">{alumni.discription}</span>
                {/* <span className='alumni-description'>CEO of edcIITD</span> */}
                
              </div>
            </div>
          ))}

          {/* See All Card */}
          <Link to="/notable-alumni" className="see-all-card animate-on-scroll">
            <div className="see-all-icon">
              <ArrowRightIcon />
            </div>
            <span className="see-all-text">See All</span>
            <span className="see-all-subtext">Notable Alumni</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Council;
