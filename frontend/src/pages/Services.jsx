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
    <div className="container animate-fade-in py-section-sm">
      <h1 className="section-title">Our Services</h1>
      {loading ? (
        <p className="text-center">Loading services...</p>
      ) : (
        <div className="services-grid">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service._id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {service.image ? (
                  <img src={service.image} alt={service.name} className="w-full" style={{ height: '220px', objectFit: 'cover', borderBottom: '1px solid var(--border-color)' }} />
                ) : (
                  <div className="d-flex justify-center align-center" style={{ height: '220px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)' }}>
                    <Scissors size={48} color="var(--secondary-color)" />
                  </div>
                )}
                <div style={{ padding: '30px' }}>
                  <h3 className="mb-2">{service.name}</h3>
                  <p className="text-light-grey mb-2">{service.description}</p>
                  <div className="mb-2 font-italic" style={{ color: 'var(--text-light)' }}>Duration: {service.duration} mins</div>
                  <span className="price" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>${service.price}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center" style={{ gridColumn: '1 / -1' }}>No services available right now.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Services;
