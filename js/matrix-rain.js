// ============================================
// js/matrix-rain.js — MATRIX RAIN BACKGROUND
// ============================================

(function() {
    'use strict';

    var canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var W, H;
    var fontSize = 14;
    var drops = [];
    var animId;

    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*()_+{}|:<>?~アイウエオカキクケコサシスセソタチツテトナニヌネノ';

    function getColor() {
        var mode = document.documentElement.getAttribute('data-mode') || 'hacker';
        return mode === 'curious' ? '#ff0000' : '#00ff41';
    }

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        var columns = Math.floor(W / fontSize);
        drops = [];
        for (var i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -H / fontSize);
        }
    }

    function draw() {
        // Fade trail
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, W, H);

        var color = getColor();
        ctx.font = fontSize + 'px monospace';

        for (var i = 0; i < drops.length; i++) {
            var char = chars[Math.floor(Math.random() * chars.length)];
            var x = i * fontSize;
            var y = drops[i] * fontSize;

            // Bright head
            if (drops[i] > 0) {
                ctx.globalAlpha = 0.9;
                ctx.fillStyle = drops[i] % 2 === 0 ? '#ffffff' : color;
                ctx.fillText(char, x, y);
            }

            // Body with varying opacity
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

    // React to mode switches instantly
    var observer = new MutationObserver(function() {
        // Color is read dynamically in draw(), no action needed
    });
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-mode']
    });

    window.addEventListener('resize', resize);
    resize();
    draw();

    window.matrixRainCleanup = function() {
        if (animId) cancelAnimationFrame(animId);
        observer.disconnect();
    };
})();
