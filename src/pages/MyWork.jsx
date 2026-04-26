import { useState, useEffect } from 'react';
import axios from 'axios';

const MyWork = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/portfolio');
                setPortfolio(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchPortfolio();
    }, []);

    if (loading) return <div className="container" style={{padding:'100px 20px', textAlign:'center'}}>Loading the gallery...</div>;

    return (
        <div className="animate-fade-in" style={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh', padding: '100px 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h1 style={{ fontSize: '4rem', color: '#fff', fontStyle: 'italic', marginBottom: '20px', fontFamily: 'var(--font-heading)' }}>Our Masterpieces</h1>
                    <p style={{ color: '#aaa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>A curated collection of our finest transformations, bridal artistry, and luxury styling.</p>
                </div>
                
                {portfolio.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#777', padding: '50px 0' }}>The gallery is currently being curated. Check back soon.</div>
                ) : (
                    <div className="portfolio-grid">
                        {portfolio.map(item => (
                            <div key={item._id} className="portfolio-item animate-fade-in">
                                <img src={item.imageUrl} alt={item.caption || 'Salon Work'} loading="lazy" />
                                <div className="portfolio-overlay">
                                    {item.caption && <h4>{item.caption}</h4>}
                                    <p>{item.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyWork;
