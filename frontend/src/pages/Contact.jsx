import { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('Failed to send message. Please try again later.');
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="container animate-fade-in py-section-sm">
      <h1 className="section-title">Contact Us</h1>
      
      <div className="d-flex flex-wrap gap-4">
        <div className="card" style={{ flex: '1 1 300px' }}>
          <h2 className="mb-2">Get in Touch</h2>
          <p className="text-light-grey mb-4" style={{ lineHeight: '1.8' }}>
            Have questions about our services or want to inquire about a custom bridal package?
            Send us a message and our team will get back to you shortly.
          </p>
          <div className="mb-2">
            <strong>Email:</strong> hello@dazzleaura.com
          </div>
          <div>
            <strong>Phone:</strong> +1 (555) 123-4567
          </div>
        </div>

        <div className="card" style={{ flex: '2 1 400px' }}>
          {status && (
            <div className={status.includes('success') ? 'alert-success' : 'alert-error'}>
              {status}
            </div>
          )}
          <form onSubmit={handleSubmit} className="d-flex flex-col gap-2">
            <div className="form-group mb-1">
              <label className="form-label">Name</label>
              <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group mb-1">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Message</label>
              <textarea name="message" className="form-textarea" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
