import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar container">
      <div className="navbar-logo">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          DazzleAura
        </Link>
      </div>
      
      <button className="mobile-menu-btn" onClick={toggleMenu}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
        <li><Link to="/my-work" onClick={closeMenu}>My Work</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
        {user && user.isAdmin && (
          <li><Link to="/admin" onClick={closeMenu} style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>Admin Area</Link></li>
        )}
        {user ? (
          <li><Link to="/profile" className="btn-outline" onClick={closeMenu}>My Profile</Link></li>
        ) : (
          <li><Link to="/login" className="btn-outline" onClick={closeMenu}>Login</Link></li>
        )}
        <li><Link to="/book" className="btn-primary" onClick={closeMenu}>Book Now</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
