// ============================================
// js/app.js — ENTRY POINT
// ============================================

(function() {
    'use strict';

    var App = {
        initialized: false,

        init: function() {
            var self = this;

            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('🚀 Initializing Hacker Portfolio...');
            }

            try {
                this.waitForDOM(function() {
                    self.initLoadingScreen();
                    self.initSections();

                    if (typeof initModeSwitcher === 'function') {
                        initModeSwitcher();
                    }

                    if (typeof CursorController !== 'undefined') {
                        var savedMode = localStorage.getItem('mode') || 'hacker';
                        CursorController.init(savedMode);
                    }

                    self.initScrollAnimations();
                    self.initPageTransitions();

                    self.initialized = true;
                    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                        console.log('✅ Hacker Portfolio ready');
                    }

                    document.dispatchEvent(new CustomEvent('app:ready'));
                });
            } catch (error) {
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.error('❌ Initialization failed:', error);
                }
                self.handleError(error);
            }
        },

        waitForDOM: function(callback) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', callback);
            } else {
                callback();
            }
        },

        initSections: function() {
            var sections = [
                { name: 'hero', fn: 'initHero' },
                { name: 'projects', fn: 'loadProjects' },
                { name: 'certificates', fn: 'loadCertificates' },
                { name: 'skills', fn: 'loadSkills' },
                { name: 'journey', fn: 'initJourney' },
                { name: 'contact', fn: 'initContact' },
                { name: 'ui', fn: 'initUI' }
            ];

            sections.forEach(function(module) {
                if (typeof window[module.fn] === 'function') {
                    try {
                        window[module.fn]();
                    } catch (e) {
                        console.warn('⚠️ ' + module.name + ' failed:', e);
                    }
                }
            });
        },

        /* ----- LOADING SCREEN ----- */
        initLoadingScreen: function() {
            var screen = document.querySelector('.loading-screen');
            var content = document.getElementById('mainContent');

            if (!screen || !content) return;

            var hasVisited = sessionStorage.getItem('visited') === 'true';

            if (hasVisited) {
                screen.classList.add('hidden');
                content.style.display = 'block';
                return;
            }

            this.initPctCounter();

            setTimeout(function() {
                screen.classList.add('hidden');
                content.style.display = 'block';
                sessionStorage.setItem('visited', 'true');
            }, 2200);
        },

        initPctCounter: function() {
            var el = document.getElementById('loadPct');
            if (!el) return;
            var val = 0;
            var interval = setInterval(function() {
                val += Math.floor(Math.random() * 8) + 2;
                if (val > 99) {
                    val = 100;
                    clearInterval(interval);
                }
                el.textContent = val + '%';
            }, 180);
        },

        /* ----- SCROLL ANIMATIONS ----- */
        initScrollAnimations: function() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.querySelectorAll('.reveal').forEach(function(el) {
                    el.classList.add('visible');
                });
                return;
            }

            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

            document.querySelectorAll('.reveal').forEach(function(el) {
                observer.observe(el);
            });
        },

        /* ----- PAGE TRANSITIONS ----- */
        initPageTransitions: function() {
            document.querySelectorAll('a[href^="#"]').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    var targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    var target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        var offset = 80;
                        var pos = target.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top: pos, behavior: 'smooth' });
                        history.pushState(null, null, targetId);
                    }
                });
            });
        },

        handleError: function(error) {
            var content = document.getElementById('mainContent');
            if (content) content.style.display = 'block';

            var toast = document.createElement('div');
            toast.className = 'toast visible';
            toast.textContent = '⚠️ Something went wrong. Please refresh.';
            toast.style.cssText =
                'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);' +
                'padding:12px 24px;background:#ff4444;color:#fff;border-radius:2px;' +
                'z-index:99999;font-family:var(--font-mono);font-size:14px;' +
                'opacity:0;transition:opacity 0.3s ease;border:1px solid var(--hacker-border);';
            document.body.appendChild(toast);

            setTimeout(function() {
                toast.style.opacity = '1';
            }, 100);
            setTimeout(function() {
                toast.style.opacity = '0';
                setTimeout(function() {
                    toast.remove();
                }, 300);
            }, 4000);
        }
    };

    App.init();
    window.App = App;
})();