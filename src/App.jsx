import { useRef, useState, useEffect } from 'react';
import { useMode } from './hooks/useMode.js';
import { useMatrixRain } from './hooks/useMatrixRain.js';
import { useCursor } from './hooks/useCursor.js';
import { useReveal, useScrollSpy } from './hooks/useAnimations.js';
import { SvgSprite } from './components/Icon.jsx';
import { Header } from './components/Header.jsx';
import { SocialSidebar, MobileBottomNav, MobileSocialStrip, BackToTop } from './components/Layout.jsx';
import { Hero, Stats, About } from './sections/Hero.jsx';
import { Projects } from './sections/Projects.jsx';
import { Skills } from './sections/Skills.jsx';
import { Certificates } from './sections/Certificates.jsx';
import { Beyond, Contact } from './sections/Contact.jsx';
import { Footer } from './sections/Footer.jsx';

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'certificates', 'contact'];

export default function App() {
    const { mode, toggle } = useMode();
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const active = useScrollSpy(SECTION_IDS);

    useMatrixRain(canvasRef, mode);
    useCursor(mode);
    useReveal();

    useEffect(() => {
        const visited = sessionStorage.getItem('visited') === 'true';
        if (visited) {
            setLoading(false);
            return;
        }
        const t = setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('visited', 'true');
        }, 2200);
        return () => clearTimeout(t);
    }, []);

    return (
        <>
            <canvas id="matrixCanvas" ref={canvasRef}></canvas>
            <div className="glitch-line"></div>
            <SvgSprite />

            {loading && <LoadingScreen />}

            <Header mode={mode} onToggleMode={toggle} />
            <SocialSidebar mode={mode} />

            <main id="mainContent" style={{ display: loading ? 'none' : 'block' }}>
                <Hero mode={mode} />
                <Stats />
                <About />
                <Projects />
                <Skills />
                <Certificates />
                <Beyond />
                <Contact />
                <Footer mode={mode} />
            </main>

            <MobileSocialStrip />
            <MobileBottomNav active={active} />
            <BackToTop />
        </>
    );
}

function LoadingScreen() {
    const [pct, setPct] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setPct((v) => {
                const next = v + Math.floor(Math.random() * 8) + 2;
                return next > 99 ? 100 : next;
            });
        }, 180);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="loading-screen">
            <div className="loading-inner">
                <div className="load-logo">$</div>
                <div className="loading-bar"><div className="loading-progress"></div></div>
                <div className="load-pct">{pct}%</div>
            </div>
        </div>
    );
}
