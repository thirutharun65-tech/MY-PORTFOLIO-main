import { useState, useEffect, useRef } from 'react';

export function useTypewriter(words, opts = {}) {
    const { typeSpeed = 60, deleteSpeed = 30, pause = 2000 } = opts;
    const [text, setText] = useState('');
    const idxRef = useRef(0);
    const charRef = useRef(0);
    const deletingRef = useRef(false);

    useEffect(() => {
        let timeout;
        function tick() {
            const current = words[idxRef.current];
            if (!deletingRef.current) {
                charRef.current++;
                setText(current.substring(0, charRef.current));
                if (charRef.current === current.length) {
                    deletingRef.current = true;
                    timeout = setTimeout(tick, pause);
                    return;
                }
                timeout = setTimeout(tick, typeSpeed + Math.random() * 40);
            } else {
                charRef.current--;
                setText(current.substring(0, charRef.current));
                if (charRef.current < 0) {
                    deletingRef.current = false;
                    charRef.current = 0;
                    idxRef.current = (idxRef.current + 1) % words.length;
                    timeout = setTimeout(tick, 300);
                    return;
                }
                timeout = setTimeout(tick, deleteSpeed + Math.random() * 25);
            }
        }
        timeout = setTimeout(tick, 500);
        return () => clearTimeout(timeout);
    }, [words, typeSpeed, deleteSpeed, pause]);

    return text;
}

export function useCountUp(target, opts = {}) {
    const { duration = 800 } = opts;
    const [value, setValue] = useState(0);
    const ref = useRef(null);
    const startedRef = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || startedRef.current) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !startedRef.current) {
                    startedRef.current = true;
                    const startTime = performance.now();
                    function update(now) {
                        const progress = Math.min((now - startTime) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setValue(Math.floor(eased * target));
                        if (progress < 1) requestAnimationFrame(update);
                        else setValue(target);
                    }
                    requestAnimationFrame(update);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        observer.observe(el);
        return () => observer.disconnect();
    }, [target, duration]);

    return { value, ref };
}

export function useReveal() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    });
}

export function useScrollSpy(sectionIds) {
    const [active, setActive] = useState(sectionIds[0]);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [sectionIds]);
    return active;
}

export function useScrolled(threshold = 50) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);
    return scrolled;
}
