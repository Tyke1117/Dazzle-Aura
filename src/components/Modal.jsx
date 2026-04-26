import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div className="card modal-content animate-fade-in" style={{
        backgroundColor: 'var(--white)', padding: '30px',
        borderRadius: 'var(--radius)', minWidth: '350px', maxWidth: '500px',
        position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px',
          background: 'transparent', border: 'none', fontSize: '1.2rem',
          cursor: 'pointer', color: 'var(--text-light)'
        }}>✕</button>
        <h2 style={{ marginBottom: '20px', color: 'var(--secondary-color)' }}>{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
