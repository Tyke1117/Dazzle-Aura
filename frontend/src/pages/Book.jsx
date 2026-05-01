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
    <div className="container animate-fade-in py-section-sm max-w-md">
      <h1 className="section-title">Book an Appointment</h1>
      <div className="card">
        {message && <div className="alert-success">{message}</div>}
        {error && <div className="alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="d-flex flex-col gap-2">
          <div className="form-group mb-1">
            <label className="form-label">Select Service</label>
            <select 
              name="serviceId" 
              value={formData.serviceId} 
              onChange={handleChange} 
              required
              className="form-select"
            >
              <option value="">-- Choose a Service --</option>
              {services.map(s => (
                <option key={s._id} value={s._id}>{s.name} (${s.price}) - {s.duration} mins</option>
              ))}
            </select>
          </div>
          
          <div className="form-group mb-1">
            <label className="form-label">Select Date</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              required
              min={minDate}
              max={maxDate}
              className="form-input"
            />
          </div>

          <div className="form-group mb-2">
            <label className="form-label">Select Time</label>
            <select 
              name="timeSlot" 
              value={formData.timeSlot} 
              onChange={handleChange} 
              required
              className="form-select"
            >
              <option value="">-- Choose a Time --</option>
              {['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary w-full mt-2">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default Book;
