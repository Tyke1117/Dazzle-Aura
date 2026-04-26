import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar container">
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          DazzleAura
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/my-work">My Work</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {user && user.isAdmin && (
          <li><Link to="/admin" style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>Admin Area</Link></li>
        )}
        {user ? (
          <li><Link to="/profile" className="btn-outline">My Profile</Link></li>
        ) : (
          <li><Link to="/login" className="btn-outline">Login</Link></li>
        )}
        <li><Link to="/book" className="btn-primary">Book Now</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
