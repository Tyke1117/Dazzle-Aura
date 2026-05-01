import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Admin = () => {
  const { user, token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [activeTab, setActiveTab] = useState('appointments');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ name: '', description: '', price: 0, duration: 30, category: 'Hair', image: '' });
  
  // New Portfolio State
  const [newPortfolio, setNewPortfolio] = useState({ imageUrl: '', caption: '', category: 'Bridal' });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const apptRes = await axios.get('http://localhost:5000/api/appointments', config);
        const servRes = await axios.get('http://localhost:5000/api/services');
        const portRes = await axios.get('http://localhost:5000/api/portfolio');
        
        setAppointments(apptRes.data);
        setServices(servRes.data);
        setPortfolio(portRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    if (user && user.isAdmin) {
      fetchAdminData();
    }
  }, [user]);

  // Real-time background polling for appointments
  useEffect(() => {
    let interval;
    if (user && user.isAdmin && activeTab === 'appointments') {
      interval = setInterval(async () => {
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const apptRes = await axios.get('http://localhost:5000/api/appointments', config);
          setAppointments(apptRes.data);
        } catch (err) {
          console.error('Polling error', err);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [user, activeTab]);

  const handleStatusUpdate = async (id, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.put(`http://localhost:5000/api/appointments/${id}/status`, { status }, config);
      setAppointments(appointments.map(app => app._id === id ? res.data : app));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDeleteService = async (id) => {
    if(!window.confirm('Delete this service permanently?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/services/${id}`, config);
      setServices(services.filter(s => s._id !== id));
    } catch (err) {
      alert('Failed to delete service');
    }
  };

  const handlePortfolioImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setNewPortfolio({ ...newPortfolio, imageUrl: reader.result });
  };

  const handleServiceImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setNewService({ ...newService, image: reader.result });
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.post('http://localhost:5000/api/services', newService, config);
      setServices([...services, res.data]);
      setShowAddService(false);
      setNewService({ name: '', description: '', price: 0, duration: 30, category: 'Hair', image: '' });
      alert('Service added successfully');
    } catch (err) {
      alert('Failed to add service');
    }
  };

  const handleAddPortfolio = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.post('http://localhost:5000/api/portfolio', newPortfolio, config);
      setPortfolio([res.data, ...portfolio]);
      setNewPortfolio({ imageUrl: '', caption: '', category: 'Bridal' });
    } catch (err) {
      alert('Failed to add portfolio item');
    }
  };

  const handleDeletePortfolio = async (id) => {
    if(!window.confirm('Delete this image?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/portfolio/${id}`, config);
      setPortfolio(portfolio.filter(item => item._id !== id));
    } catch (err) {
      alert('Failed to delete portfolio item');
    }
  };

  if (!user || !user.isAdmin) {
    return <div className="container" style={{padding: '100px 20px', textAlign: 'center'}}>Access Denied. Admin only.</div>;
  }

  if (loading) return <div className="container" style={{padding:'100px 20px'}}>Loading dashboard...</div>;

  const processedAppointments = appointments
    .filter(app => filterStatus === 'all' || app.status === filterStatus)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 20px' }}>
      <h1 className="section-title" style={{ marginBottom: '30px' }}>Admin Dashboard</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className={activeTab === 'appointments' ? 'btn-primary' : 'btn-outline'} onClick={() => setActiveTab('appointments')}>Appointments</button>
        <button className={activeTab === 'services' ? 'btn-primary' : 'btn-outline'} onClick={() => setActiveTab('services')}>Services</button>
        <button className={activeTab === 'portfolio' ? 'btn-primary' : 'btn-outline'} onClick={() => setActiveTab('portfolio')}>Portfolio (My Work)</button>
      </div>

      {activeTab === 'appointments' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
            <h2 style={{ margin: 0 }}>Manage Appointments</h2>
            <div style={{ display: 'flex', gap: '15px' }}>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: '8px', borderRadius: '5px' }}>
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '8px', borderRadius: '5px' }}>
                <option value="asc">Date: Earliest First</option>
                <option value="desc">Date: Latest First</option>
              </select>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '15px 10px' }}>User Details</th>
                  <th style={{ padding: '15px 10px' }}>Service</th>
                  <th style={{ padding: '15px 10px' }}>Date</th>
                  <th style={{ padding: '15px 10px' }}>Time</th>
                  <th style={{ padding: '15px 10px' }}>Status</th>
                  <th style={{ padding: '15px 10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {processedAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#777' }}>
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  processedAppointments.map(app => (
                    <tr key={app._id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '15px 10px' }}>
                        <div style={{ fontWeight: 'bold' }}>{app.user?.name || 'Unknown'}</div>
                        <div style={{ fontSize: '0.85rem', color: '#555' }}>{app.user?.email || 'N/A'}</div>
                        <div style={{ fontSize: '0.85rem', color: '#555' }}>{app.user?.phone || 'N/A'}</div>
                      </td>
                      <td style={{ padding: '15px 10px' }}>{app.service?.name || 'Unknown'}</td>
                      <td style={{ padding: '15px 10px' }}>{new Date(app.date).toLocaleDateString()}</td>
                      <td style={{ padding: '15px 10px' }}>{app.timeSlot}</td>
                      <td style={{ padding: '15px 10px', fontWeight: 'bold', color: app.status === 'confirmed' ? 'green' : app.status === 'cancelled' ? 'red' : 'orange' }}>{app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : 'Pending'}</td>
                      <td style={{ padding: '15px 10px', display: 'flex', gap: '10px' }}>
                        {app.status === 'pending' && (
                          <>
                            <button onClick={() => handleStatusUpdate(app._id, 'confirmed')} style={{ padding: '8px 15px', background: 'green', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Approve</button>
                            <button onClick={() => handleStatusUpdate(app._id, 'cancelled')} style={{ padding: '8px 15px', background: 'red', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reject</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Manage Services</h2>
            <button className="btn-primary" onClick={() => setShowAddService(!showAddService)} style={{ padding: '10px 20px', fontSize: '0.9rem' }}>{showAddService ? 'Cancel' : '+ Add Service'}</button>
          </div>
          
          {showAddService && (
            <form onSubmit={handleAddService} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <input type="text" placeholder="Service Name" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} required style={{ flex: '1 1 45%', padding: '10px' }} />
              <input type="text" placeholder="Category" value={newService.category} onChange={e => setNewService({...newService, category: e.target.value})} required style={{ flex: '1 1 45%', padding: '10px' }} />
              <input type="number" placeholder="Price ($)" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} required style={{ flex: '1 1 20%', padding: '10px' }} />
              <input type="number" placeholder="Duration (mins)" value={newService.duration} onChange={e => setNewService({...newService, duration: e.target.value})} required style={{ flex: '1 1 20%', padding: '10px' }} />
              <div style={{ flex: '1 1 45%', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontWeight: 'bold' }}>Image:</label>
                <input type="file" accept="image/*" onChange={handleServiceImageUpload} required />
              </div>
              <textarea placeholder="Description" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} required style={{ flex: '1 1 100%', padding: '10px', height: '60px' }}></textarea>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px' }}>Save Service</button>
            </form>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {services.map(service => (
              <div key={service._id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', position: 'relative' }}>
                <button onClick={() => handleDeleteService(service._id)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginRight: '50px' }}>{service.name}</h3>
                <p style={{ color: '#777', fontSize: '0.9rem' }}>${service.price} - {service.duration} mins</p>
                <p style={{ color: '#444', fontSize: '0.9rem', marginTop: '10px' }}>Category: {service.category}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="card">
          <h2 style={{ marginBottom: '20px' }}>Upload to "My Work" Gallery</h2>
          
          <form onSubmit={handleAddPortfolio} style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '2', background: '#f5f5f5', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', display:'flex', alignItems:'center', gap: '10px' }}>
              <label style={{ fontWeight: 'bold' }}>Upload Photo:</label>
              <input type="file" accept="image/*" onChange={handlePortfolioImageUpload} required />
            </div>
            <input type="text" placeholder="Caption (e.g. Stunning Balayage)" value={newPortfolio.caption} onChange={(e) => setNewPortfolio({...newPortfolio, caption: e.target.value})} style={{ flex: '1', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <select value={newPortfolio.category} onChange={(e) => setNewPortfolio({...newPortfolio, category: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="Bridal">Bridal</option>
              <option value="Hair">Hair</option>
              <option value="Makeup">Makeup</option>
              <option value="Nails">Nails</option>
              <option value="Henna">Henna</option>
            </select>
            <button type="submit" className="btn-primary" style={{ padding: '12px 25px', fontSize: '1rem' }}>Add Photo</button>
          </form>

          <h3 style={{ marginBottom: '20px' }}>Gallery Photos ({portfolio.length})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            {portfolio.map(item => (
              <div key={item._id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <img src={item.imageUrl} alt={item.caption} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                <button onClick={() => handleDeletePortfolio(item._id)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: '#fff', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', padding: '10px', color: '#fff', fontSize: '0.8rem' }}>
                  <strong>{item.category}</strong>: {item.caption || 'No caption'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
