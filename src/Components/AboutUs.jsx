import NavBar from './NavBar'
import Footer from './Footer'
import './AboutUs.css'
const apiUrl = import.meta.env.VITE_API_URL;


function AboutUs() {
  return (
    <div className='abt'>
      <NavBar />
    <div className='about'>
      <div className='about-container'>
        <div className='section'>
          <h1 className='about-title'>About <span className='nunesauto-title-span'>NunesAuto</span></h1>
        <p className='about-text about-intro-text'>
          At <span className="nunesauto-text">NunesAuto</span>, we make car parts more affordable and accessible. Our mission is to help you save money while keeping your vehicle running smoothly. We sell quality second-hand and new car parts at lower prices and deliver them right to your door.
        </p>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-number">3700+</div>
            <div className="stat-label">Orders in the Past 2 Years</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1500+</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">8+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10000+</div>
            <div className="stat-label">Parts Sold</div>
          </div>
        </div>
        
        <h2 className='about-subtitle'>Our Values</h2>
        <ul className='about-list'>
          <li>
            <strong>Affordable Prices:</strong> We make car parts budget-friendly without compromising on quality.
          </li>
          <li>
            <strong>Quality Parts:</strong> Every part we sell is carefully inspected to ensure reliability and performance.
          </li>
          <li>
            <strong>Fast Delivery:</strong> Get the parts you need delivered quickly and conveniently to your doorstep.
          </li>
        </ul>

        <h2 className='about-subtitle'>Why Choose Us?</h2>
        <p className='about-text'>
          <span className="nunesauto-text">NunesAuto</span> is here to make car maintenance easier, cheaper, and stress-free. Whether you’re a car enthusiast or just need a replacement part, we’ve got you covered.
        </p>
      </div>
    </div>
    <Footer />
    </div>
  )
}

export default AboutUs