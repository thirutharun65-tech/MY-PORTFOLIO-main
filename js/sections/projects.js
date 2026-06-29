(function() {
    'use strict';

    var currentSlide = 0;
    var totalSlides = 0;

    // ===== PROJECT MODAL =====
    window.openProjectModal = function(index) {
        var data = window.portfolioData;
        if (!data || !data.projects || !data.projects[index]) return;

        var project = data.projects[index];
        var modal = document.getElementById('projectModal');
        if (!modal) return;

        document.querySelectorAll('.modal.active').forEach(function(m) {
            if (m.id !== 'projectModal') m.classList.remove('active');
        });
        document.body.style.overflow = 'hidden';

        var img = document.getElementById('modalImg');
        var fallback = document.getElementById('modalHeroFallback');
        if (img) {
            img.style.display = '';
            img.src = project.previewImage || '';
            img.alt = project.title;
            img.onerror = function() {
                img.style.display = 'none';
                if (fallback) { fallback.textContent = (project.title||'?').charAt(0); fallback.style.display = 'flex'; }
            };
            img.onload = function() { img.style.display = ''; if (fallback) fallback.style.display = 'none'; };
        }
        if (fallback) fallback.style.display = 'none';

        var el = document.getElementById('modalTitle'); if (el) el.textContent = project.title;
        el = document.getElementById('modalHeroTech');
        if (el) el.innerHTML = (project.techStack||[]).map(function(t){return '<span>'+t+'</span>';}).join('');
        el = document.getElementById('modalProblem'); if (el) el.textContent = project.problem||'';
        el = document.getElementById('modalChallenge'); if (el) el.textContent = project.challenge||'';
        el = document.getElementById('modalSolution'); if (el) el.textContent = project.solution||'';

        var fc = document.getElementById('modalFeatures');
        var fs = document.getElementById('modalFeaturesSection');
        if (fc && fs) {
            if (project.features && project.features.length) {
                fc.innerHTML = project.features.map(function(f){return '<span>'+f+'</span>';}).join('');
                fs.style.display = '';
            } else { fs.style.display = 'none'; }
        }

        var ls = document.getElementById('modalLessonsSection');
        var le = document.getElementById('modalLessons');
        if (ls && le) {
            if (project.lessonsLearned) { le.textContent = project.lessonsLearned; ls.style.display = ''; }
            else { ls.style.display = 'none'; }
        }

        el = document.getElementById('modalGithub'); if (el) el.href = project.githubUrl||'#';
        var lb = document.getElementById('modalLive');
        if (lb) {
            if (project.liveUrl) { lb.href = project.liveUrl; lb.style.display = 'inline-flex'; }
            else { lb.style.display = 'none'; }
        }

        modal.classList.add('active');
        setTimeout(function() {
            var d = modal.querySelector('.modal-project-details');
            if (d) d.scrollTop = 0;
        }, 50);
    };

    window.closeAllModals = function() {
        document.querySelectorAll('.modal.active').forEach(function(m) { m.classList.remove('active'); });
        document.body.style.overflow = '';
    };

    document.addEventListener('click', function(e) {
        var overlay = e.target.closest('.modal-overlay');
        var closeBtn = e.target.closest('.modal-close');
        if (overlay || closeBtn) {
            var modal = (overlay||closeBtn).closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                if (!document.querySelector('.modal.active')) document.body.style.overflow = '';
            }
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') window.closeAllModals();
    });

    // ===== CAROUSEL =====
    function loadProjects() {
        var track = document.getElementById('carouselTrack');
        if (!track || track.children.length > 0) return;

        var data = window.portfolioData;
        if (!data || !data.projects || !data.projects.length) return;

        var projects = data.projects;
        totalSlides = projects.length;
        currentSlide = 0;

        projects.forEach(function(project, index) {
            var el = document.createElement('div');
            el.className = 'project-card';
            el.setAttribute('data-index', index);

            var tags = (project.techStack||[]).map(function(t){return '<span>'+t+'</span>';}).join('');
            var badge = project.featured ? '<span class="project-featured-badge">Featured</span>' : '';
            var liveHtml = project.liveUrl
                ? '<a href="'+project.liveUrl+'" class="btn-primary" target="_blank" rel="noopener" onclick="event.stopPropagation();"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>Live Demo</a>'
                : '';

            el.innerHTML =
                '<div class="project-image">'+
                '<img src="'+(project.previewImage||'')+'" alt="'+project.title+'" loading="lazy" onerror="this.style.display=\'none\'" />'+
                '<div class="project-image-overlay" onclick="event.stopPropagation();window.openProjectModal('+index+');" style="cursor:pointer;">'+
                '<span class="view-label">View Project</span></div>'+
                badge+
                '</div>'+
                '<div class="project-info">'+
                '<h3>'+project.title+'</h3>'+
                '<p class="project-desc">'+(project.solution||'')+'</p>'+
                '<div class="project-tags">'+tags+'</div>'+
                '<div class="project-actions">'+
                '<a href="'+(project.githubUrl||'#')+'" class="btn-primary" target="_blank" rel="noopener" onclick="event.stopPropagation();">'+
                '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>GitHub</a>'+
                liveHtml+
                '<button class="btn-secondary project-details-btn" onclick="event.stopPropagation();window.openProjectModal('+index+');">'+
                '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3a5 5 0 100 10A5 5 0 008 3zM1 8a7 7 0 1114 0A7 7 0 011 8zm7-3a1 1 0 011 1v2h2a1 1 0 110 2H9v2a1 1 0 11-2 0v-2H5a1 1 0 110-2h2V6a1 1 0 011-1z"/></svg>Details</button>'+
                '</div></div>';

            el.addEventListener('click', function(e) {
                if (e.target.closest('a') || e.target.closest('button')) return;
                window.openProjectModal(parseInt(this.getAttribute('data-index')));
            });

            track.appendChild(el);
        });

        buildDots(totalSlides);
        goToSlide(0);
        attachCarouselListeners();
    }

    function buildDots(total) {
        var dotsContainer = document.getElementById('carouselDots');
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (var i = 0; i < total; i++) {
            var dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to slide ' + (i+1));
            dot.addEventListener('click', (function(idx){ return function(){ goToSlide(idx); }; })(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        if (totalSlides === 0) return;
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentSlide = index;

        // Use scrollLeft on the carousel container — pixel-perfect, no math errors
        var carousel = document.getElementById('projectsContainer');
        if (carousel) {
            var cardWidth = carousel.clientWidth;
            carousel.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
        }

        document.querySelectorAll('.carousel-dot').forEach(function(dot, i) {
            dot.classList.toggle('active', i === index);
        });
    }

    function attachCarouselListeners() {
        var prevBtn = document.querySelector('.carousel-prev');
        var nextBtn = document.querySelector('.carousel-next');

        if (prevBtn) {
            var np = prevBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(np, prevBtn);
            np.addEventListener('click', function() { goToSlide(currentSlide - 1); });
        }
        if (nextBtn) {
            var nn = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(nn, nextBtn);
            nn.addEventListener('click', function() { goToSlide(currentSlide + 1); });
        }
    }

    window.loadProjects = loadProjects;
    window.goToSlide = goToSlide;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function(){ setTimeout(loadProjects, 200); });
    } else {
        setTimeout(loadProjects, 200);
    }
})();
