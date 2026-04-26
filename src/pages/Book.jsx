import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Book = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ serviceId: '', date: '', timeSlot: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const { user, loadingAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const nextYear = new Date(today);
  nextYear.setFullYear(today.getFullYear() + 1);
  const maxDate = nextYear.toISOString().split('T')[0];

  useEffect(() => {
    if (!loadingAuth && !user) {
      navigate('/login');
    }
  }, [user, loadingAuth, navigate]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/services');
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axios.post('http://localhost:5000/api/appointments', formData);
      setMessage('Appointment booked successfully! We will see you soon.');
      setFormData({ serviceId: '', date: '', timeSlot: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loadingAuth || !user) return <p style={{textAlign:'center', marginTop:'50px'}}>Checking authentication...</p>;

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 20px', maxWidth: '600px' }}>
      <h1 className="section-title">Book an Appointment</h1>
      <div className="card">
        {message && <div style={{ padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '8px', marginBottom: '20px' }}>{message}</div>}
        {error && <div style={{ padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Select Service</label>
            <select 
              name="serviceId" 
              value={formData.serviceId} 
              onChange={handleChange} 
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
            >
              <option value="">-- Choose a Service --</option>
              {services.map(s => (
                <option key={s._id} value={s._id}>{s.name} (${s.price}) - {s.duration} mins</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Select Date</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              required
              min={minDate}
              max={maxDate}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Select Time</label>
            <select 
              name="timeSlot" 
              value={formData.timeSlot} 
              onChange={handleChange} 
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
            >
              <option value="">-- Choose a Time --</option>
              {['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default Book;
