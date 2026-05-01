import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Parallax Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content animate-fade-in animate-delay-1">
          <h1 className="hero-title">Elegance Redefined.</h1>
          <p className="hero-subtitle">Experience the pinnacle of luxury beauty at DazzleAura. Custom bridal henna, precision styling, and premium facials tailored exclusively for you.</p>
          <div className="d-flex justify-center gap-2">
            <Link to="/book" className="btn-primary bg-white text-dark" style={{ backgroundColor: '#fff', color: '#111', borderColor: '#fff' }}>Reserve Experience</Link>
            <Link to="/services" className="btn-outline text-white" style={{ borderColor: '#fff', color: '#fff' }}>View Collection</Link>
          </div>
        </div>
      </section>

      {/* Editorial Welcome Text */}
      <section className="container py-section text-center max-w-lg">
        <h2 className="mb-3 font-italic text-secondary" style={{ fontSize: '3.5rem', color: 'var(--secondary-color)' }}>The DazzleAura Philosophy</h2>
        <p className="text-light-grey" style={{ fontSize: '1.25rem', lineHeight: '2' }}>
          We believe that true beauty stems from confidence. Our master artisans are dedicated to curating an environment of pure luxury, combining cutting-edge styling techniques with premium products to deliver transformative results. Step inside, and let us reveal the masterpiece within.
        </p>
      </section>

      {/* Edge-to-Edge Imagery Grid */}
      <section className="services-overview">
        <div className="overview-grid">
           <Link to="/services" className="overview-card">
             <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Master Styling" className="overview-img" />
             <div className="overview-content">
               <h3>Master Styling</h3>
               <p>Bespoke cuts and dimensional balayage.</p>
               <span style={{ marginTop: '10px', display: 'inline-block', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', borderBottom: '1px solid #fff' }}>Explore</span>
             </div>
           </Link>
           
           <Link to="/services" className="overview-card">
             <img src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Luxury Bridal" className="overview-img" />
             <div className="overview-content">
               <h3>Bridal Artistry</h3>
               <p>Flawless HD makeup and intricate henna.</p>
               <span style={{ marginTop: '10px', display: 'inline-block', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', borderBottom: '1px solid #fff' }}>Explore</span>
             </div>
           </Link>
           
           <Link to="/services" className="overview-card">
             <img src="https://images.unsplash.com/photo-1552693673-1bf958298935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Premium Skincare" className="overview-img" />
             <div className="overview-content">
               <h3>Premium Skincare</h3>
               <p>Relaxing facials and advanced treatments.</p>
               <span style={{ marginTop: '10px', display: 'inline-block', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', borderBottom: '1px solid #fff' }}>Explore</span>
             </div>
           </Link>
        </div>
      </section>
      
      {/* Massive CTA Section */}
      <section className="cta-section bg-primary text-center py-section">
        <h2 className="mb-3">Ready for your transformation?</h2>
        <p className="mb-4 max-w-md mx-auto" style={{ fontSize: '1.2rem' }}>
          Secure your appointment with our elite team today.
        </p>
        <Link to="/book" className="btn-primary">Book Appointment</Link>
      </section>
      
      <section className="bg-dark text-center py-section">
        <div className="container max-w-lg">
          <h2 className="font-light mb-2 text-white" style={{ fontSize: '2.5rem' }}>Uncompromising Quality</h2>
          <p className="font-italic text-light-grey mb-4" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            "DazzleAura transformed my entire bridal experience. The attention to detail, the luxurious ambiance, and the sheer talent of our team makes it worth every penny."
            <br/><br/>— Seraphina V., Bride
          </p>
          <Link to="/contact" className="btn-outline text-white" style={{ borderColor: '#fff' }}>Contact Concierge</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
