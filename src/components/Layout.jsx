import { useEffect, useState } from 'react';
import { Icon } from './Icon.jsx';
import { portfolioData } from '../data/portfolioData.js';

export function SocialSidebar({ mode }) {
    const { social } = portfolioData;
    const links = [
        { platform: 'github', url: social.github, label: 'GitHub' },
        { platform: 'linkedin', url: social.linkedin, label: 'LinkedIn' },
        { platform: 'instagram', url: social.instagram, label: 'Instagram' },
        { platform: 'leetcode', url: social.leetcode, label: 'LeetCode' },
        { platform: 'mail', url: 'mailto:' + social.mail, label: 'Email' }
    ].filter((l) => l.url);

    const avatar = mode === 'hacker' ? 'assets/profile/sketch-photo.png' : 'assets/profile/colorful-sketch.png';
    const modeText = mode === 'hacker' ? 'Hacker' : 'Explore';
    const dotColor = mode === 'hacker' ? '#00ff41' : '#32C7FF';

    return (
        <div className="social-sidebar">
            <div className="social-avatar">
                <img src={avatar} alt="Thirumurugan C" />
            </div>
            <div className="social-divider"></div>
            <div className="social-links">
                {links.map((link) => (
                    <a key={link.platform} href={link.url} className="social-link-btn" target={link.platform === 'mail' ? '' : '_blank'} rel="noopener noreferrer" aria-label={link.label} title={link.label}>
                        <Icon name={link.platform} />
                    </a>
                ))}
            </div>
            <div className="social-divider"></div>
            <div className="mode-dot" style={{ background: dotColor }}></div>
            <span className="mode-text">{modeText}</span>
        </div>
    );
}

export function MobileBottomNav({ active }) {
    const items = [
        { id: 'hero', label: 'Home', icon: 'M3 12l9-9 9 9M5 10v8a2 2 0 002 2h10a2 2 0 002-2v-8' },
        { id: 'about', label: 'About', icon: 'M12 7v5l3 3' },
        { id: 'projects', label: 'Projects', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z' },
        { id: 'certificates', label: 'Certs', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5' },
        { id: 'contact', label: 'Contact', icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' }
    ];
    const handleClick = (e, id) => {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
            const pos = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    };
    return (
        <nav className="mobile-bottom-nav">
            {items.map((item) => (
                <a key={item.id} href={`#${item.id}`} data-section={item.id} className={active === item.id ? 'active' : ''} onClick={(e) => handleClick(e, item.id)}>
                    <svg viewBox="0 0 24 24"><path d={item.icon} stroke="currentColor" strokeWidth="1.8" fill="none" /></svg>
                    <span>{item.label}</span>
                </a>
            ))}
        </nav>
    );
}

export function MobileSocialStrip() {
    const { social } = portfolioData;
    const links = [
        { platform: 'github', url: social.github },
        { platform: 'linkedin', url: social.linkedin },
        { platform: 'leetcode', url: social.leetcode },
        { platform: 'mail', url: 'mailto:' + social.mail }
    ].filter((l) => l.url);
    return (
        <div className="mobile-social-strip">
            {links.map((link) => (
                <a key={link.platform} href={link.url} target={link.platform === 'mail' ? '' : '_blank'} rel="noopener noreferrer">
                    <Icon name={link.platform} />
                </a>
            ))}
        </div>
    );
}

export function BackToTop() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const hero = document.getElementById('hero');
                    if (hero) {
                        const heroBottom = hero.offsetTop + hero.offsetHeight;
                        setVisible(window.scrollY > heroBottom);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <button className={`back-to-top ${visible ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
            ↑
        </button>
    );
}
