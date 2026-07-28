import { useState } from 'react';
import { useTypewriter, useCountUp } from '../hooks/useAnimations.js';
import { Icon } from '../components/Icon.jsx';
import { portfolioData } from '../data/portfolioData.js';

export function Hero({ mode }) {
    const role = useTypewriter([
        'Computer Science Engineering Student',
        'Web Developer',
        'Programmer',
        'Problem Solver'
    ]);
    const { social } = portfolioData;
    const portrait = mode === 'hacker' ? '/assets/profile/sketch-photo.png' : '/assets/profile/colorful-sketch.png';

    const socialLinks = [
        { platform: 'github', url: social.github, label: 'GitHub' },
        { platform: 'linkedin', url: social.linkedin, label: 'LinkedIn' },
        { platform: 'leetcode', url: social.leetcode, label: 'LeetCode' },
        { platform: 'mail', url: 'mailto:' + social.mail, label: 'Email' }
    ].filter((l) => l.url);

    const scrollTo = (id) => {
        const target = document.getElementById(id);
        if (target) {
            const pos = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    };

    return (
        <section className="hero" id="hero">
            <div className="hero-container">
                <div className="hero-inner">
                    <div className="hero-text">
                        <div className="hero-prompt">
                            <span className="cursor-blink">█</span> whoami
                        </div>
                        <div className="hero-name">
                            <span className="name-first">Thirumurugan</span>
                            <span className="name-last">C</span>
                        </div>
                        <div className="hero-typewriter">{role}</div>
                        <p className="hero-tagline">
                            Building clean, functional software and learning something new every day. Currently exploring web development, DSA, and AI.
                        </p>
                        <div className="hero-actions">
                            <button className="btn-primary btn-glow" onClick={() => scrollTo('projects')}>View Projects</button>
                            <button className="btn-secondary" onClick={() => scrollTo('contact')}>Get in Touch</button>
                        </div>
                        <div className="hero-social">
                            {socialLinks.map((link) => (
                                <a key={link.platform} href={link.url} className="hero-social-link" target={link.platform === 'mail' ? '' : '_blank'} rel="noopener noreferrer">
                                    <Icon name={link.platform} /> {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="hero-image-frame">
                            <div className="hero-glow"></div>
                            <img src={portrait} alt="Thirumurugan C" className="hero-portrait-img" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Stats() {
    const stats = [
        { count: 6, label: 'Projects' },
        { count: 10, label: 'Certificates' },
        { count: 6, label: 'Skills' },
        { count: 3, label: 'Beyond Coding' }
    ];
    return (
        <div className="stats-bar">
            <div className="container">
                <div className="stats-grid">
                    {stats.map((s, i) => (
                        <StatItem key={i} {...s} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatItem({ count, label }) {
    const { value, ref } = useCountUp(count);
    return (
        <div className="stats-item" ref={ref}>
            <span className="stats-number">{value}+</span>
            <span className="stats-label">{label}</span>
        </div>
    );
}

export function About() {
    return (
        <section id="about">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">about_me</span>
                    <h2 className="section-title">Who <span className="highlight">I Am</span></h2>
                    <p className="section-desc">A glimpse into my journey, interests, and what drives me.</p>
                </div>
                <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'var(--space-12)', alignItems: 'center' }}>
                    <div className="about-image-frame" style={{ width: '280px', height: '350px', margin: '0 auto', overflow: 'hidden', border: '1px solid var(--hacker-green)', borderRadius: '2px' }}>
                        <img src="/assets/profile/about.png" alt="Thirumurugan C" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.3)' }} />
                    </div>
                    <div className="about-content">
                        <p className="about-desc" style={{ fontSize: 'var(--text-base)', color: 'var(--hacker-text-secondary)', lineHeight: '1.8', fontFamily: 'var(--font-body)' }}>
                            I'm Thirumurugan C, a Computer Science Engineering student passionate about building software that solves real problems. I work primarily with Python and Java, and I enjoy creating clean, responsive web experiences with HTML, CSS, and JavaScript.
                        </p>
                        <p className="about-desc" style={{ fontSize: 'var(--text-base)', color: 'var(--hacker-text-secondary)', lineHeight: '1.8', fontFamily: 'var(--font-body)', marginTop: 'var(--space-4)' }}>
                            Beyond coursework, I'm sharpening my data structures and algorithms skills, exploring Django for backend development, and learning how to apply AI tools to build better products faster. I believe in shipping, learning from each project, and improving one commit at a time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
