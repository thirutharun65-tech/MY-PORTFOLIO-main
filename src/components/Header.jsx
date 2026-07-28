import { useState } from 'react';
import { Icon } from './Icon.jsx';
import { useScrolled, useScrollSpy } from '../hooks/useAnimations.js';

const NAV_ITEMS = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'certificates', label: 'Certs' },
    { id: 'contact', label: 'Contact' }
];

export function Header({ mode, onToggleMode }) {
    const scrolled = useScrolled(50);
    const active = useScrollSpy(NAV_ITEMS.map((n) => n.id));
    const [navOpen, setNavOpen] = useState(false);

    const handleNavClick = (e, id) => {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
            const offset = 80;
            const pos = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
            history.pushState(null, null, '#' + id);
        }
        setNavOpen(false);
    };

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
            <div className="header-container">
                <a href="#hero" className="header-logo" onClick={(e) => handleNavClick(e, 'hero')}>
                    <span className="logo-mark">$</span>
                    <span className="logo-text">Thirumurugan <span>C</span></span>
                </a>
                <nav className={`header-nav ${navOpen ? 'open' : ''}`} id="headerNav">
                    <ul>
                        {NAV_ITEMS.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={`nav-link ${active === item.id ? 'active' : ''}`}
                                    data-section={item.id}
                                    onClick={(e) => handleNavClick(e, item.id)}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="header-actions">
                    <button className="mode-toggle" id="modeToggle" onClick={onToggleMode} aria-label="Toggle mode">
                        <span className="mode-track">
                            <span className="mode-handle" style={{ transform: mode === 'hacker' ? 'translateX(0)' : 'translateX(24px)' }}>
                                {mode === 'hacker' ? '$' : '✦'}
                            </span>
                        </span>
                        <span className="mode-label">{mode === 'hacker' ? 'Hacker' : 'Curious'}</span>
                    </button>
                    <button className={`header-toggle ${navOpen ? 'open' : ''}`} id="headerToggle" aria-label="Toggle navigation" onClick={() => setNavOpen(!navOpen)}>
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </div>
        </header>
    );
}
