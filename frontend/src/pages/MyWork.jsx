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

    if (loading) return <div className="container py-section text-center">Loading the gallery...</div>;

    return (
        <div className="animate-fade-in bg-dark py-section">
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="text-white font-italic mb-2" style={{ fontSize: '4rem', fontFamily: 'var(--font-heading)' }}>Our Masterpieces</h1>
                    <p className="text-light-grey max-w-md mx-auto" style={{ fontSize: '1.2rem' }}>A curated collection of our finest transformations, bridal artistry, and luxury styling.</p>
                </div>
                
                {portfolio.length === 0 ? (
                    <div className="text-center text-light-grey py-section-sm">The gallery is currently being curated. Check back soon.</div>
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
