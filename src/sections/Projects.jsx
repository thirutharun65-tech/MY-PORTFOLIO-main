import { useState, useRef } from 'react';
import { portfolioData } from '../data/portfolioData.js';

export function Projects() {
    const [current, setCurrent] = useState(0);
    const [modalIndex, setModalIndex] = useState(null);
    const projects = portfolioData.projects;
    const total = projects.length;
    const carouselRef = useRef(null);

    const goTo = (index) => {
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        setCurrent(index);
        const carousel = carouselRef.current;
        if (carousel) {
            const cardWidth = carousel.clientWidth;
            carousel.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
        }
    };

    return (
        <section id="projects">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">projects.execute()</span>
                    <h2 className="section-title">Featured <span className="highlight">Projects</span></h2>
                    <p className="section-desc">A selection of things I've built while learning and solving problems.</p>
                </div>

                <div className="projects-carousel-wrap">
                    <div className="projects-carousel" ref={carouselRef} style={{ overflow: 'hidden' }}>
                        <div className="carousel-track">
                            {projects.map((project, index) => (
                                <div className="project-card" key={project.id} data-index={index} onClick={(e) => {
                                    if (e.target.closest('a') || e.target.closest('button')) return;
                                    setModalIndex(index);
                                }}>
                                    <div className="project-image">
                                        <img src={project.previewImage} alt={project.title} loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
                                        <div className="project-image-overlay" onClick={() => setModalIndex(index)} style={{ cursor: 'pointer' }}>
                                            <span className="view-label">View Project</span>
                                        </div>
                                        {project.featured && <span className="project-featured-badge">Featured</span>}
                                    </div>
                                    <div className="project-info">
                                        <h3>{project.title}</h3>
                                        <p className="project-desc">{project.solution}</p>
                                        <div className="project-tags">
                                            {project.techStack.map((t) => <span key={t}>{t}</span>)}
                                        </div>
                                        <div className="project-actions">
                                            <a href={project.githubUrl} className="btn-primary" target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
                                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                                                GitHub
                                            </a>
                                            {project.liveUrl && (
                                                <a href={project.liveUrl} className="btn-primary" target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                                                    Live Demo
                                                </a>
                                            )}
                                            <button className="btn-secondary" onClick={(e) => { e.stopPropagation(); setModalIndex(index); }}>
                                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3a5 5 0 100 10A5 5 0 008 3zM1 8a7 7 0 1114 0A7 7 0 011 8zm7-3a1 1 0 011 1v2h2a1 1 0 110 2H9v2a1 1 0 11-2 0v-2H5a1 1 0 110-2h2V6a1 1 0 011-1z"/></svg>
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="carousel-controls">
                    <button className="carousel-btn" onClick={() => goTo(current - 1)} aria-label="Previous">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <div className="carousel-dots">
                        {projects.map((_, i) => (
                            <button key={i} className={`carousel-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} />
                        ))}
                    </div>
                    <button className="carousel-btn" onClick={() => goTo(current + 1)} aria-label="Next">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>
            </div>

            {modalIndex !== null && (
                <ProjectModal project={projects[modalIndex]} onClose={() => setModalIndex(null)} />
            )}
        </section>
    );
}

function ProjectModal({ project, onClose }) {
    return (
        <div className="modal active" id="projectModal">
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content modal-project-content">
                <button className="modal-close" onClick={onClose}>✕</button>
                <div className="modal-project-body">
                    <div className="modal-project-hero">
                        <img src={project.previewImage} alt={project.title} onError={(e) => { e.target.style.display = 'none'; }} />
                        <div className="modal-project-hero-overlay">
                            <h2>{project.title}</h2>
                            <div className="modal-project-hero-tags">
                                {project.techStack.map((t) => <span key={t}>{t}</span>)}
                            </div>
                        </div>
                    </div>
                    <div className="modal-project-details">
                        {project.problem && (
                            <div className="modal-project-section">
                                <div className="modal-project-section-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                                </div>
                                <div className="modal-project-section-content">
                                    <h3>Problem</h3>
                                    <p>{project.problem}</p>
                                </div>
                            </div>
                        )}
                        {project.challenge && (
                            <div className="modal-project-section">
                                <div className="modal-project-section-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                                </div>
                                <div className="modal-project-section-content">
                                    <h3>Challenge</h3>
                                    <p>{project.challenge}</p>
                                </div>
                            </div>
                        )}
                        {project.solution && (
                            <div className="modal-project-section">
                                <div className="modal-project-section-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                                </div>
                                <div className="modal-project-section-content">
                                    <h3>Solution</h3>
                                    <p>{project.solution}</p>
                                </div>
                            </div>
                        )}
                        {project.features && project.features.length > 0 && (
                            <div className="modal-project-section">
                                <div className="modal-project-section-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                                </div>
                                <div className="modal-project-section-content">
                                    <h3>Features</h3>
                                    <div className="modal-project-features">
                                        {project.features.map((f) => <span key={f}>{f}</span>)}
                                    </div>
                                </div>
                            </div>
                        )}
                        {project.lessonsLearned && (
                            <div className="modal-project-section">
                                <div className="modal-project-section-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                                </div>
                                <div className="modal-project-section-content">
                                    <h3>Lessons Learned</h3>
                                    <p>{project.lessonsLearned}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-project-footer">
                        <div className="modal-project-actions">
                            <a href={project.githubUrl} className="btn-primary" target="_blank" rel="noopener">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                                View on GitHub
                            </a>
                            {project.liveUrl && (
                                <a href={project.liveUrl} className="btn-secondary" target="_blank" rel="noopener">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
