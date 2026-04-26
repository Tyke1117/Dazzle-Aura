import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token, logout, loadingAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingAuth && !user) {
      navigate('/login');
    }
  }, [user, loadingAuth, navigate]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/appointments/myappointments');
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchAppointments();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to completely delete your account and all associated data? This cannot be undone.')) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete('http://localhost:5000/api/auth/profile', config);
        logout();
        navigate('/');
      } catch (err) {
        alert('Failed to delete account. Please try again.');
        console.error(err);
      }
    }
  };

  if (loadingAuth || !user) return <p style={{textAlign:'center', marginTop:'50px'}}>Loading profile...</p>;

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 className="section-title" style={{ margin: 0 }}>My Dashboard</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={handleDeleteAccount} className="btn-outline" style={{ color: 'red', borderColor: 'red' }}>Delete Account</button>
          <button onClick={handleLogout} className="btn-outline">Logout</button>
        </div>
      </div>
      
      <div className="card" style={{ marginBottom: '40px' }}>
        <h2>Welcome, {user.name}!</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        {user.isAdmin && <p style={{ color: 'var(--primary-dark)', fontWeight: 'bold', marginTop: '10px'}}>Admin Account</p>}
      </div>

      <h2>My Appointments</h2>
      {loading ? <p>Loading appointments...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          {appointments.length > 0 ? (
            appointments.map(app => (
              <div key={app._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 10px 0' }}>{app.service?.name}</h3>
                  <p><strong>Date:</strong> {new Date(app.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {app.timeSlot}</p>
                  <p><strong>Price:</strong> ${app.service?.price}</p>
                </div>
                <div>
                  <span style={{ 
                    padding: '8px 16px', 
                    borderRadius: '20px', 
                    fontWeight: 'bold',
                    backgroundColor: app.status === 'confirmed' ? '#d4edda' : app.status === 'cancelled' ? '#f8d7da' : '#fff3cd',
                    color: app.status === 'confirmed' ? '#155724' : app.status === 'cancelled' ? '#721c24' : '#856404'
                  }}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>You have no appointments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
