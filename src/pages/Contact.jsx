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
    <div className="container animate-fade-in" style={{ padding: '60px 20px' }}>
      <h1 className="section-title">Contact Us</h1>
      
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: '1', minWidth: '300px' }}>
          <h2>Get in Touch</h2>
          <p style={{ marginTop: '20px', color: 'var(--text-light)' }}>
            Have questions about our services or want to inquire about a custom bridal package?
            Send us a message and our team will get back to you shortly.
          </p>
        </div>

        <div className="card" style={{ flex: '2', minWidth: '300px' }}>
          {status && <p style={{ marginBottom: '20px', fontWeight: 'bold', color: status.includes('success') ? 'green' : 'var(--text-dark)' }}>{status}</p>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100px', marginTop: '10px' }}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
