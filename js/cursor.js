// ============================================
// js/cursor.js — DUAL CURSOR SYSTEM
// ============================================

(function() {
    'use strict';

    /* ===== HACKER CURSOR ===== */
    var hackerState = {
        dot: null, ring: null,
        x: 0, y: 0, cx: 0, cy: 0,
        active: false, raf: null
    };

    function initHackerCursor() {
        hackerCleanup();
        hackerCreateElements();
        hackerBindEvents();
        hackerStartAnimation();
        hackerState.active = true;
        return { cleanup: hackerCleanup };
    }

    function hackerCreateElements() {
        hackerState.dot = document.createElement('div');
        hackerState.dot.className = 'cursor-dot visible';
        hackerState.ring = document.createElement('div');
        hackerState.ring.className = 'cursor-ring visible';
        document.body.appendChild(hackerState.dot);
        document.body.appendChild(hackerState.ring);
    }

    function hackerBindEvents() {
        document.addEventListener('mousemove', hackerOnMove);
        document.addEventListener('mouseleave', hackerOnLeave);
        document.addEventListener('mouseenter', hackerOnEnter);
    }

    function hackerOnMove(e) {
        hackerState.x = e.clientX;
        hackerState.y = e.clientY;
    }

    function hackerOnLeave() {
        if (hackerState.dot) hackerState.dot.style.opacity = '0';
        if (hackerState.ring) hackerState.ring.style.opacity = '0';
    }

    function hackerOnEnter() {
        if (hackerState.dot) hackerState.dot.style.opacity = '1';
        if (hackerState.ring) hackerState.ring.style.opacity = '1';
    }

    function hackerStartAnimation() {
        function animate() {
            if (!hackerState.active) return;
            hackerState.cx += (hackerState.x - hackerState.cx) * 0.12;
            hackerState.cy += (hackerState.y - hackerState.cy) * 0.12;
            if (hackerState.dot) {
                hackerState.dot.style.transform = 'translate3d(' + hackerState.cx + 'px, ' + hackerState.cy + 'px, 0) translate(-50%, -50%)';
            }
            if (hackerState.ring) {
                hackerState.ring.style.transform = 'translate3d(' + hackerState.cx + 'px, ' + hackerState.cy + 'px, 0) translate(-50%, -50%)';
            }
            hackerState.raf = requestAnimationFrame(animate);
        }
        hackerState.raf = requestAnimationFrame(animate);
    }

    function hackerCleanup() {
        hackerState.active = false;
        if (hackerState.raf) {
            cancelAnimationFrame(hackerState.raf);
            hackerState.raf = null;
        }
        document.removeEventListener('mousemove', hackerOnMove);
        document.removeEventListener('mouseleave', hackerOnLeave);
        document.removeEventListener('mouseenter', hackerOnEnter);
        if (hackerState.dot) {
            hackerState.dot.remove();
            hackerState.dot = null;
        }
        if (hackerState.ring) {
            hackerState.ring.remove();
            hackerState.ring = null;
        }
    }

    /* ===== CURIOUS CURSOR ===== */
    var curiousState = {
        dot: null, ring: null,
        x: 0, y: 0, cx: 0, cy: 0,
        active: false, raf: null
    };

    function initCuriousCursor() {
        curiousCleanup();
        curiousCreateElements();
        curiousBindEvents();
        curiousStartAnimation();
        curiousState.active = true;
        return { cleanup: curiousCleanup };
    }

    function curiousCreateElements() {
        curiousState.dot = document.createElement('div');
        curiousState.dot.className = 'cursor-dot visible';
        curiousState.ring = document.createElement('div');
        curiousState.ring.className = 'cursor-ring visible';
        document.body.appendChild(curiousState.dot);
        document.body.appendChild(curiousState.ring);
    }

    function curiousBindEvents() {
        document.addEventListener('mousemove', curiousOnMove);
        document.addEventListener('mouseleave', curiousOnLeave);
        document.addEventListener('mouseenter', curiousOnEnter);
    }

    function curiousOnMove(e) {
        curiousState.x = e.clientX;
        curiousState.y = e.clientY;
    }

    function curiousOnLeave() {
        if (curiousState.dot) curiousState.dot.style.opacity = '0';
        if (curiousState.ring) curiousState.ring.style.opacity = '0';
    }

    function curiousOnEnter() {
        if (curiousState.dot) curiousState.dot.style.opacity = '1';
        if (curiousState.ring) curiousState.ring.style.opacity = '1';
    }

    function curiousStartAnimation() {
        function animate() {
            if (!curiousState.active) return;
            curiousState.cx += (curiousState.x - curiousState.cx) * 0.1;
            curiousState.cy += (curiousState.y - curiousState.cy) * 0.1;
            var wobbleX = Math.sin(Date.now() / 2000 + curiousState.cx / 100) * 1.5;
            var wobbleY = Math.cos(Date.now() / 2500 + curiousState.cy / 100) * 1.5;
            if (curiousState.dot) {
                curiousState.dot.style.transform = 'translate3d(' + curiousState.cx + 'px, ' + curiousState.cy + 'px, 0) translate(-50%, -50%)';
            }
            if (curiousState.ring) {
                curiousState.ring.style.transform = 'translate3d(' + (curiousState.cx + wobbleX) + 'px, ' + (curiousState.cy + wobbleY) + 'px, 0) translate(-50%, -50%)';
            }
            curiousState.raf = requestAnimationFrame(animate);
        }
        curiousState.raf = requestAnimationFrame(animate);
    }

    function curiousCleanup() {
        curiousState.active = false;
        if (curiousState.raf) {
            cancelAnimationFrame(curiousState.raf);
            curiousState.raf = null;
        }
        document.removeEventListener('mousemove', curiousOnMove);
        document.removeEventListener('mouseleave', curiousOnLeave);
        document.removeEventListener('mouseenter', curiousOnEnter);
        if (curiousState.dot) {
            curiousState.dot.remove();
            curiousState.dot = null;
        }
        if (curiousState.ring) {
            curiousState.ring.remove();
            curiousState.ring = null;
        }
    }

    /* ===== CURSOR CONTROLLER ===== */
    var CursorController = {
        currentMode: 'hacker',
        activeInstance: null,
        isEnabled: false,

        init: function(mode) {
            if (this.isTouchDevice()) {
                this.disable();
                return;
            }
            this.currentMode = mode || this.currentMode;
            this.destroy();

            if (this.currentMode === 'hacker') {
                this.activeInstance = initHackerCursor();
            } else {
                this.activeInstance = initCuriousCursor();
            }

            this.isEnabled = true;
            this.setupHoverListeners();
            return this.activeInstance;
        },

        destroy: function() {
            if (this.activeInstance && typeof this.activeInstance.cleanup === 'function') {
                this.activeInstance.cleanup();
            }
            if (this._onMouseOver) {
                document.removeEventListener('mouseover', this._onMouseOver);
                document.removeEventListener('mouseout', this._onMouseOut);
                this._onMouseOver = null;
                this._onMouseOut = null;
            }
            document.querySelectorAll('.cursor-dot, .cursor-ring').forEach(function(el) {
                el.remove();
            });
            this.activeInstance = null;
            this.isEnabled = false;
        },

        isTouchDevice: function() {
            return ('ontouchstart' in window) ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(pointer: coarse)').matches;
        },

        disable: function() {
            document.querySelectorAll('.cursor-dot, .cursor-ring').forEach(function(el) {
                el.style.display = 'none';
            });
            this.isEnabled = false;
        },

        setupHoverListeners: function() {
            if (this._onMouseOver) {
                document.removeEventListener('mouseover', this._onMouseOver);
                document.removeEventListener('mouseout', this._onMouseOut);
            }

            var hoverSelector =
                'a, button, .mode-toggle, .project-card, .cert-card, ' +
                '.skill-group, .social-link-btn, .beyond-item, ' +
                '.footer-social-links a, .nav-link, .modal-close';

            var self = this;

            this._onMouseOver = function(e) {
                var target = e.target.closest(hoverSelector);
                if (target) self.setHover(true);
            };

            this._onMouseOut = function(e) {
                var target = e.target.closest(hoverSelector);
                if (target) {
                    var related = e.relatedTarget;
                    if (!related || !target.contains(related)) self.setHover(false);
                }
            };

            document.addEventListener('mouseover', this._onMouseOver);
            document.addEventListener('mouseout', this._onMouseOut);
        },

        setHover: function(active) {
            var dot = document.querySelector('.cursor-dot');
            var ring = document.querySelector('.cursor-ring');
            if (!dot || !ring) return;
            dot.classList.toggle('hover', active);
            ring.classList.toggle('hover', active);
        }
    };

    window.CursorController = CursorController;
})();