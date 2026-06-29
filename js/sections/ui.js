// ============================================
// js/sections/ui.js — UI COMPONENTS
// ============================================

(function() {
    function initUI() {
        injectSvgSprite();
        initNavbar();
        initFooter();
        initSocialSidebar();
        initContactSocial();
        initBackToTop();
        initFooterIcons();
    }

    function injectSvgSprite() {
        if (document.getElementById('ui-svg-sprite')) return;

        var svgSymbols = [
            { id: 'compass', path: 'M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.88-.01-1.73-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.64-1.35-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .26.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z' },
            { id: 'typewriter', path: 'M4 6h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm0 0l8 5 8-5M8 14h8' },
            { id: 'book', path: 'M4 6h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm4 0v12M16 6v12' },
            { id: 'github', path: 'M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.88-.01-1.73-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.64-1.35-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .26.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z' },
            { id: 'linkedin', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 100 4 2 2 0 000-4z' },
            { id: 'instagram', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 9.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z' },
            { id: 'leetcode', path: 'M16.102 16.892c-.165 0-.33-.042-.473-.126l-5.491-3.382c-.217-.133-.356-.367-.356-.618v-2.576c0-.251.139-.485.356-.618l5.491-3.382c.142-.084.307-.126.473-.126.163 0 .327.041.471.125.287.169.461.478.461.81v1.434c0 .251-.138.485-.356.618l-3.178 1.956c-.217.134-.356.367-.356.62s.139.485.356.62l3.178 1.958c.218.133.356.366.356.618v1.434c0 .332-.174.641-.461.81-.144.084-.308.126-.471.126zm5.345-4.892c0 .551-.195 1.092-.578 1.525l-5.686 6.469c-.699.795-1.717 1.276-2.829 1.276h-3.843c-.44 0-.797-.357-.797-.798 0-.44.357-.798.797-.798h3.843c.592 0 1.148-.301 1.488-.805l5.686-6.469c.195-.221.299-.503.299-.799 0-.296-.104-.578-.299-.8l-5.686-6.468c-.34-.504-.896-.806-1.488-.806h-3.843c-.44 0-.797-.358-.797-.799 0-.44.357-.798.797-.798h3.843c1.112 0 2.13.481 2.829 1.276l5.686 6.469c.382.433.578.974.578 1.524z' },
            { id: 'mail', path: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2l8 5 8-5M4 6v12l8-5 8 5V6' },
            { id: 'python', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z' },
            { id: 'java', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2zm0 8h-2v2h2z' },
            { id: 'javascript', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z' }
        ];

        var svgContent = '<svg xmlns="http://www.w3.org/2000/svg">';
        svgSymbols.forEach(function(sym) {
            svgContent += '<symbol id="' + sym.id + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">';
            svgContent += '<path d="' + sym.path + '"/>';
            svgContent += '</symbol>';
        });
        svgContent += '</svg>';

        var div = document.createElement('div');
        div.id = 'ui-svg-sprite';
        div.style.display = 'none';
        div.innerHTML = svgContent;
        document.body.prepend(div);
    }

    /* ----- NAVBAR ----- */
    function initNavbar() {
        var header = document.getElementById('header');
        var links = document.querySelectorAll('.nav-link, .mobile-bottom-nav a');
        var sections = document.querySelectorAll('section[id]');

        if (header) {
            window.addEventListener('scroll', function() {
                header.classList.toggle('scrolled', window.scrollY > 50);
            }, { passive: true });
        }

        if (sections.length && links.length) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var id = entry.target.id;
                        links.forEach(function(link) {
                            var section = link.getAttribute('data-section');
                            link.classList.toggle('active', section === id);
                        });
                    }
                });
            }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

            sections.forEach(function(section) {
                observer.observe(section);
            });
        }

        var headerToggle = document.getElementById('headerToggle');
        var headerNav = document.getElementById('headerNav');
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    if (headerNav) headerNav.classList.remove('open');
                    if (headerToggle) headerToggle.classList.remove('open');
                }
            });
        });
    }

    /* ----- FOOTER ----- */
    function initFooter() {
        var container = document.getElementById('footerSocial');
        if (!container) return;

        var data = window.portfolioData;
        if (!data || !data.social) return;

        var socialLinks = [
            { platform: 'github', url: data.social.github, label: 'GitHub' },
            { platform: 'linkedin', url: data.social.linkedin, label: 'LinkedIn' },
            { platform: 'instagram', url: data.social.instagram, label: 'Instagram' },
            { platform: 'leetcode', url: data.social.leetcode, label: 'LeetCode' },
            { platform: 'mail', url: 'mailto:' + data.social.mail, label: 'Email' }
        ];

        container.innerHTML = '';
        socialLinks.forEach(function(link) {
            if (!link.url) return;
            var a = document.createElement('a');
            a.href = link.url;
            a.className = 'social-link';
            a.target = link.platform === 'mail' ? '' : '_blank';
            a.rel = 'noopener noreferrer';
            a.setAttribute('aria-label', link.label);
            a.innerHTML = '<svg viewBox="0 0 24 24"><use href="#' + link.platform + '"></use></svg>';
            container.appendChild(a);
        });

        var yearEl = document.getElementById('footerYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    /* ----- FOOTER ICONS (Programming Logos) ----- */
    function initFooterIcons() {
        var container = document.querySelector('.footer-icons');
        if (!container) return;

        var icons = ['python', 'java', 'javascript', 'github', 'database'];
        container.innerHTML = '';
        icons.forEach(function(icon) {
            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.innerHTML = '<use href="#' + icon + '"></use>';
            container.appendChild(svg);
        });
    }

    /* ----- SOCIAL SIDEBAR ----- */
    function initSocialSidebar() {
        var container = document.getElementById('socialLinks');
        if (!container) return;

        var data = window.portfolioData;
        if (!data || !data.social) return;

        var socialLinks = [
            { platform: 'github', url: data.social.github, label: 'GitHub' },
            { platform: 'linkedin', url: data.social.linkedin, label: 'LinkedIn' },
            { platform: 'instagram', url: data.social.instagram, label: 'Instagram' },
            { platform: 'leetcode', url: data.social.leetcode, label: 'LeetCode' },
            { platform: 'mail', url: 'mailto:' + data.social.mail, label: 'Email' }
        ];

        container.innerHTML = '';
        socialLinks.forEach(function(link) {
            if (!link.url) return;
            var a = document.createElement('a');
            a.href = link.url;
            a.className = 'social-link-btn';
            a.target = link.platform === 'mail' ? '' : '_blank';
            a.rel = 'noopener noreferrer';
            a.setAttribute('aria-label', link.label);
            a.title = link.label;
            a.innerHTML = '<svg viewBox="0 0 24 24"><use href="#' + link.platform + '"></use></svg>';
            container.appendChild(a);
        });

        function updateSidebarMode(mode) {
            var avatar = document.getElementById('sidebarAvatar');
            var modeText = document.getElementById('socialModeText');
            var modeDot = document.querySelector('.mode-dot');

            if (avatar) {
                avatar.src = mode === 'hacker'
                    ? 'assets/profile/sketch-photo.png'
                    : 'assets/profile/colorful-sketch.png';
                avatar.alt = mode === 'hacker' ? 'Thirumurugan C - Hacker Mode' : 'Thirumurugan C - Exploration Mode';
            }
            if (modeText) {
                modeText.textContent = mode === 'hacker' ? 'Hacker' : 'Explore';
            }
            if (modeDot) {
                modeDot.style.background = mode === 'hacker' ? '#00ff41' : '#32C7FF';
            }
        }

        document.addEventListener('mode:changed', function(e) {
            updateSidebarMode(e.detail.mode);
        });

        var savedMode = localStorage.getItem('mode') || 'hacker';
        updateSidebarMode(savedMode);
    }

    /* ----- BACK TO TOP ----- */
    function initBackToTop() {
        var btn = document.getElementById('backToTop');
        if (!btn) return;

        var ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    var hero = document.getElementById('hero');
                    if (hero) {
                        var heroBottom = hero.offsetTop + hero.offsetHeight;
                        btn.classList.toggle('visible', window.scrollY > heroBottom);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ----- CONTACT SOCIAL ----- */
    function initContactSocial() {
        var container = document.getElementById('contactSocialLinks');
        if (!container) return;

        var data = window.portfolioData;
        if (!data || !data.social) return;

        var links = [
            { platform: 'github', url: data.social.github, label: 'GitHub' },
            { platform: 'linkedin', url: data.social.linkedin, label: 'LinkedIn' },
            { platform: 'instagram', url: data.social.instagram, label: 'Instagram' },
            { platform: 'leetcode', url: data.social.leetcode, label: 'LeetCode' },
            { platform: 'mail', url: 'mailto:' + data.social.mail, label: 'Email' }
        ];

        container.innerHTML = '';
        links.forEach(function(link) {
            if (!link.url) return;
            var a = document.createElement('a');
            a.href = link.url;
            a.target = link.platform === 'mail' ? '' : '_blank';
            a.rel = 'noopener noreferrer';
            a.setAttribute('aria-label', link.label);
            a.innerHTML = '<svg viewBox="0 0 24 24"><use href="#' + link.platform + '"></use></svg>' + link.label.toLowerCase();
            container.appendChild(a);
        });
    }

    window.initUI = initUI;
    window.initNavbar = initNavbar;
    window.initFooter = initFooter;
    window.initSocialSidebar = initSocialSidebar;
    window.initContactSocial = initContactSocial;
    window.initBackToTop = initBackToTop;
})();