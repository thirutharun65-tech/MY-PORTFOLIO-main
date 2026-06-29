// ============================================
// js/mode-switcher.js — MODE CONTROLLER
// ============================================

(function() {
    'use strict';

    var currentMode = 'hacker';
    var isTransitioning = false;

    function initModeSwitcher() {
        var toggle = document.getElementById('modeToggle');
        if (!toggle) return;

        var saved = localStorage.getItem('mode') || 'hacker';
        setMode(saved, false);

        toggle.addEventListener('click', function() {
            if (isTransitioning) return;
            var next = currentMode === 'hacker' ? 'curious' : 'hacker';
            setMode(next, true);
        });

        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Mobile header toggle
        var headerToggle = document.getElementById('headerToggle');
        var headerNav = document.getElementById('headerNav');
        if (headerToggle && headerNav) {
            headerToggle.addEventListener('click', function() {
                this.classList.toggle('open');
                headerNav.classList.toggle('open');
            });
        }
    }

    function setMode(mode, animate) {
        if (mode === currentMode && animate) return;

        isTransitioning = true;
        currentMode = mode;

        document.documentElement.setAttribute('data-mode', mode);

        updateToggleUI(mode);
        updateHeroImage(mode);
        updateFooterMode(mode);

        // Update cursor
        if (typeof CursorController !== 'undefined' && CursorController.isEnabled) {
            CursorController.init(mode);
        }

        // Dispatch mode change event
        document.dispatchEvent(new CustomEvent('mode:changed', {
            detail: { mode: mode }
        }));

        localStorage.setItem('mode', mode);

        setTimeout(function() {
            isTransitioning = false;
        }, 400);
    }

    function updateToggleUI(mode) {
        var handle = document.querySelector('.mode-handle');
        var icon = document.querySelector('.mode-icon');
        var label = document.querySelector('.mode-label');

        if (handle) {
            handle.style.transform = mode === 'hacker' ? 'translateX(0)' : 'translateX(24px)';
        }
        if (icon) {
            icon.textContent = mode === 'hacker' ? '$' : '✦';
        }
        if (label) {
            label.textContent = mode === 'hacker' ? 'Hacker' : 'Curious';
        }
    }

    function updateHeroImage(mode) {
        var img = document.getElementById('heroPortrait');
        var sidebarImg = document.getElementById('sidebarAvatar');
        if (img) {
            img.src = mode === 'hacker'
                ? 'assets/profile/sketch-photo.png'
                : 'assets/profile/colorful-sketch.png';
        }
        if (sidebarImg) {
            sidebarImg.src = mode === 'hacker'
                ? 'assets/profile/sketch-photo.png'
                : 'assets/profile/colorful-sketch.png';
        }
    }

    function updateFooterMode(mode) {
        var el = document.getElementById('footerMode');
        if (!el) return;
        el.textContent = mode === 'hacker' ? 'Hacker View' : 'Exploration View';
    }

    window.initModeSwitcher = initModeSwitcher;
})();