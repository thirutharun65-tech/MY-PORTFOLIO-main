// ============================================
// js/sections/hero.js — HERO SECTION
// ============================================

(function() {
    function initHero() {
        initTypewriter();
        initCounters();
    }

    /* ----- TYPEWRITER ----- */
    function initTypewriter() {
        var el = document.getElementById('heroTypewriter');
        if (!el) return;

        var roles = [
            'Computer Science Engineering Student',
            'Web Developer',
            'Programmer',
            'Problem Solver'
        ];

        var roleIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var timeout;

        function type() {
            var currentRole = roles[roleIndex];
            if (!isDeleting) {
                el.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentRole.length) {
                    timeout = setTimeout(function() {
                        isDeleting = true;
                        type();
                    }, 2000);
                    return;
                }
                timeout = setTimeout(type, 50 + Math.random() * 50);
            } else {
                el.textContent = currentRole.substring(0, charIndex);
                charIndex--;
                if (charIndex < 0) {
                    isDeleting = false;
                    charIndex = 0;
                    roleIndex = (roleIndex + 1) % roles.length;
                    timeout = setTimeout(type, 300);
                    return;
                }
                timeout = setTimeout(type, 25 + Math.random() * 25);
            }
        }
        type();
    }

    /* ----- COUNTERS ----- */
    function initCounters() {
        var stats = document.querySelectorAll('.stats-number[data-count]');
        if (!stats.length) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    stats.forEach(function(stat, index) {
                        setTimeout(function() {
                            animateCounter(stat);
                        }, index * 150);
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        var target = document.querySelector('.stats-bar') || document.querySelector('.hero');
        if (target) observer.observe(target);
    }

    function animateCounter(element) {
        var target = parseInt(element.dataset.count);
        if (!target || target === 0) return;

        var current = 0;
        var duration = 800;
        var startTime = performance.now();

        function update(currentTime) {
            var elapsed = currentTime - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            current = eased * target;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
                element.classList.add('counting');
            }
        }
        requestAnimationFrame(update);
    }

    window.initHero = initHero;
})();