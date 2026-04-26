import { useState, useEffect } from 'react';
import axios from 'axios';
import { Scissors } from 'lucide-react'; 

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/services');
        setServices(res.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 20px' }}>
      <h1 className="section-title">Our Services</h1>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading services...</p>
      ) : (
        <div className="services-grid">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service._id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                {service.image ? (
                  <img src={service.image} alt={service.name} style={{ width: '100%', height: '220px', objectFit: 'cover', borderBottom: '1px solid #eee' }} />
                ) : (
                  <div className="card-image-placeholder" style={{ margin: '20px auto' }}><Scissors /></div>
                )}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ marginTop: 0 }}>{service.name}</h3>
                  <p>{service.description}</p>
                  <div style={{ marginTop: '15px', color: '#777' }}>Duration: {service.duration} mins</div>
                  <span className="price">${service.price}</span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No services available right now.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Services;
