import { useEffect, useRef } from 'react';

export function useMatrixRain(canvasRef, mode) {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let W, H;
        const fontSize = 14;
        let drops = [];
        let animId;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*()_+{}|:<>?~アイウエオカキクケコサシスセソタチツテトナニヌネノ';

        function resize() {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            const columns = Math.floor(W / fontSize);
            drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.floor(Math.random() * -H / fontSize);
            }
        }

        function getColor() {
            return mode === 'curious' ? '#ff0000' : '#00ff41';
        }

        function draw() {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, W, H);
            const color = getColor();
            ctx.font = fontSize + 'px monospace';
            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                if (drops[i] > 0) {
                    ctx.globalAlpha = 0.9;
                    ctx.fillStyle = drops[i] % 2 === 0 ? '#ffffff' : color;
                    ctx.fillText(char, x, y);
                }
                ctx.globalAlpha = 0.12 + Math.random() * 0.28;
                ctx.fillStyle = color;
                ctx.fillText(char, x, y - fontSize);
                if (y > H && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            ctx.globalAlpha = 1;
            animId = requestAnimationFrame(draw);
        }

        resize();
        draw();
        window.addEventListener('resize', resize);
        return () => {
            if (animId) cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, [canvasRef, mode]);
}
