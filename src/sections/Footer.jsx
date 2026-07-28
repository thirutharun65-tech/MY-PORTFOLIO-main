import { Icon } from '../components/Icon.jsx';
import { portfolioData } from '../data/portfolioData.js';

export function Footer({ mode }) {
    const { social } = portfolioData;
    const year = new Date().getFullYear();
    const links = [
        { platform: 'github', url: social.github, label: 'GitHub' },
        { platform: 'linkedin', url: social.linkedin, label: 'LinkedIn' },
        { platform: 'instagram', url: social.instagram, label: 'Instagram' },
        { platform: 'leetcode', url: social.leetcode, label: 'LeetCode' },
        { platform: 'mail', url: 'mailto:' + social.mail, label: 'Email' }
    ].filter((l) => l.url);

    const navItems = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
        { id: 'certificates', label: 'Certificates' },
        { id: 'contact', label: 'Contact' }
    ];

    const scrollTo = (e, id) => {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
            const pos = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-shell">
                    <span className="shell-prompt">visitor@portfolio</span>
                    <span className="shell-path">:~$</span>
                    <span className="shell-cmd">cat footer.txt</span>
                </div>
                <div className="footer-body">
                    <div className="footer-brand">
                        <div className="footer-avatar">
                            <img src={mode === 'hacker' ? 'assets/profile/sketch-photo.png' : 'assets/profile/colorful-sketch.png'} alt="Thirumurugan C" />
                        </div>
                        <div className="footer-brand-text">
                            <h3>Thirumurugan <span>C</span></h3>
                            <p>Computer Science Engineering student building software, one commit at a time.</p>
                        </div>
                    </div>
                    <div className="footer-nav">
                        <h4>Navigate</h4>
                        <ul>
                            {navItems.map((item) => (
                                <li key={item.id}><a href={`#${item.id}`} onClick={(e) => scrollTo(e, item.id)}>{item.label}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer-social">
                        <h4>Connect</h4>
                        <div className="footer-social-links">
                            {links.map((link) => (
                                <a key={link.platform} href={link.url} className="social-link" target={link.platform === 'mail' ? '' : '_blank'} rel="noopener noreferrer" aria-label={link.label}>
                                    <Icon name={link.platform} />
                                </a>
                            ))}
                        </div>
                        <div className="footer-mode-row">
                            <span className="mode-dot" style={{ background: mode === 'hacker' ? '#00ff41' : '#32C7FF' }}></span>
                            <span className="footer-mode-label">Mode:</span>
                            <span className="footer-mode">{mode === 'hacker' ? 'Hacker View' : 'Exploration View'}</span>
                        </div>
                    </div>
                </div>
                <div className="footer-quote-line">
                    <span className="quote-ornament">❝</span>
                    <span className="footer-quote-text">Code is read more than it is written.</span>
                    <span className="footer-quote-author">— Guido van Rossum</span>
                </div>
                <div className="footer-bottom">
                    <p className="footer-copy">&copy; {year} Thirumurugan C. All rights reserved.</p>
                    <div className="footer-icons">
                        <svg viewBox="0 0 24 24"><use href="#python" /></svg>
                        <svg viewBox="0 0 24 24"><use href="#java" /></svg>
                        <svg viewBox="0 0 24 24"><use href="#javascript" /></svg>
                        <svg viewBox="0 0 24 24"><use href="#github" /></svg>
                    </div>
                </div>
            </div>
        </footer>
    );
}
