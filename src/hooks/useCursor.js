import { useEffect, useRef } from 'react';

export function useCursor(mode) {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const isTouch = ('ontouchstart' in window) ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia('(pointer: coarse)').matches;
        if (isTouch) return;

        const dot = document.createElement('div');
        dot.className = 'cursor-dot visible';
        const ring = document.createElement('div');
        ring.className = 'cursor-ring visible';
        document.body.appendChild(dot);
        document.body.appendChild(ring);
        dotRef.current = dot;
        ringRef.current = ring;

        let x = 0, y = 0, cx = 0, cy = 0;
        let raf;

        function onMove(e) { x = e.clientX; y = e.clientY; }
        function onLeave() { dot.style.opacity = '0'; ring.style.opacity = '0'; }
        function onEnter() { dot.style.opacity = '1'; ring.style.opacity = '1'; }

        const hoverSelector = 'a, button, .mode-toggle, .project-card, .cert-card, .skill-group, .social-link-btn, .beyond-item, .footer-social-links a, .nav-link, .modal-close';

        function onOver(e) {
            if (e.target.closest(hoverSelector)) { dot.classList.add('hover'); ring.classList.add('hover'); }
        }
        function onOut(e) {
            if (e.target.closest(hoverSelector)) { dot.classList.remove('hover'); ring.classList.remove('hover'); }
        }

        function animate() {
            const lerp = mode === 'curious' ? 0.1 : 0.12;
            cx += (x - cx) * lerp;
            cy += (y - cy) * lerp;
            let tx = cx, ty = cy;
            if (mode === 'curious') {
                tx += Math.sin(Date.now() / 2000 + cx / 100) * 1.5;
                ty += Math.cos(Date.now() / 2500 + cy / 100) * 1.5;
            }
            dot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
            ring.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
            raf = requestAnimationFrame(animate);
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);
        document.addEventListener('mouseover', onOver);
        document.addEventListener('mouseout', onOut);
        raf = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(raf);
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseout', onOut);
            dot.remove();
            ring.remove();
        };
    }, [mode]);
}
