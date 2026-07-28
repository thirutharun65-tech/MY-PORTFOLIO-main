import { useState } from 'react';
import { portfolioData } from '../data/portfolioData.js';

export function Certificates() {
    const [modalCert, setModalCert] = useState(null);
    const certs = portfolioData.certificates;
    const scrollAmount = 300;

    const scroll = (dir) => {
        const container = document.getElementById('certsContainer');
        if (container) container.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
    };

    return (
        <section id="certificates">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">certs.verify()</span>
                    <h2 className="section-title">Certificates <span className="highlight">&amp; Awards</span></h2>
                    <p className="section-desc">Credentials earned along the way.</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                    <button className="carousel-btn cert-arrow-prev" onClick={() => scroll(-1)} aria-label="Previous">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button className="carousel-btn cert-arrow-next" onClick={() => scroll(1)} aria-label="Next">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>

                <div className="cert-stack" id="certsContainer">
                    {certs.map((cert, i) => (
                        <div className="cert-card" key={i} style={{ '--i': i }} onClick={() => setModalCert(cert)}>
                            <img src={cert.image} alt={cert.title} loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
                            <div className="info">
                                <h4>{cert.title}</h4>
                                <p>{cert.issuer}</p>
                                <span className="cat">{cert.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalCert && <CertModal cert={modalCert} onClose={() => setModalCert(null)} />}
        </section>
    );
}

function CertModal({ cert, onClose }) {
    return (
        <div className="modal active" id="certModal">
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>✕</button>
                <div className="cert-modal-body">
                    <img src={cert.image} alt={cert.title} onError={(e) => { e.target.style.display = 'none'; }} />
                    <div className="modal-info">
                        <span className="badge" style={{ display: 'inline-block', padding: '3px 14px', background: 'rgba(0,255,65,0.06)', border: '1px solid var(--hacker-border)', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--hacker-text-muted)', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.1em', width: 'fit-content' }}>
                            {cert.category}
                        </span>
                        <h2>{cert.title}</h2>
                        <p>{cert.issuer}</p>
                        {cert.description && <p className="cert-desc">{cert.description}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
