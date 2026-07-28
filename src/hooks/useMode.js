import { useState, useEffect, useCallback } from 'react';

export function useMode() {
    const [mode, setMode] = useState(() => {
        if (typeof window === 'undefined') return 'hacker';
        return localStorage.getItem('mode') || 'hacker';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-mode', mode);
        localStorage.setItem('mode', mode);
        document.dispatchEvent(new CustomEvent('mode:changed', { detail: { mode } }));
    }, [mode]);

    const toggle = useCallback(() => {
        setMode((prev) => (prev === 'hacker' ? 'curious' : 'hacker'));
    }, []);

    return { mode, toggle, setMode };
}
