(function() {
    'use strict';

    var SCROLL_AMOUNT = 300; // px per arrow click

    function loadCertificates() {
        var container = document.getElementById('certsContainer');
        if (!container || container.children.length > 0) return;

        var data = window.portfolioData;
        if (!data || !data.certificates) return;

        data.certificates.forEach(function(cert, index) {
            var el = document.createElement('div');
            el.className = 'cert-card';
            el.style.setProperty('--i', index);

            el.innerHTML =
                '<img src="' + (cert.image||'') + '" alt="' + cert.title + '" loading="lazy" onerror="this.style.display=\'none\'" />' +
                '<div class="info">' +
                '<h4>' + cert.title + '</h4>' +
                '<p>' + cert.issuer + '</p>' +
                '<span class="cat">' + cert.category + '</span>' +
                '</div>';

            el.addEventListener('click', function(e) {
                e.stopPropagation();
                openCertModal(cert);
            });

            container.appendChild(el);
        });

        attachCertArrows();
    }

    function attachCertArrows() {
        var container = document.getElementById('certsContainer');
        var prevBtn = document.querySelector('.cert-arrow-prev');
        var nextBtn = document.querySelector('.cert-arrow-next');

        if (prevBtn && container) {
            prevBtn.addEventListener('click', function() {
                container.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
            });
        }
        if (nextBtn && container) {
            nextBtn.addEventListener('click', function() {
                container.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
            });
        }
    }

    function openCertModal(cert) {
        var modal = document.getElementById('certModal');
        if (!modal) return;

        // Close other modals without killing overflow
        var projectModal = document.getElementById('projectModal');
        var resumeModal = document.getElementById('resumeModal');
        if (projectModal) projectModal.classList.remove('active');
        if (resumeModal) resumeModal.classList.remove('active');

        document.body.style.overflow = 'hidden';

        var imgEl = document.getElementById('certModalImg');
        if (imgEl) {
            imgEl.src = cert.image || '';
            imgEl.alt = cert.title || '';
            imgEl.style.display = '';
            imgEl.onerror = function() { this.style.display = 'none'; };
        }

        var el = document.getElementById('certModalTitle'); if (el) el.textContent = cert.title || '';
        el = document.getElementById('certModalIssuer'); if (el) el.textContent = 'Issuer: ' + (cert.issuer||'');
        el = document.getElementById('certModalCat'); if (el) el.textContent = 'Category: ' + (cert.category||'');

        var achieveEl = document.getElementById('certModalAchieve');
        if (achieveEl) {
            if (cert.achievement) { achieveEl.textContent = 'Achievement: ' + cert.achievement; achieveEl.style.display = 'block'; }
            else { achieveEl.style.display = 'none'; }
        }

        var descEl = document.getElementById('certModalDesc');
        if (descEl) {
            if (cert.description) { descEl.textContent = cert.description; descEl.style.display = 'block'; }
            else { descEl.style.display = 'none'; }
        }

        modal.classList.add('active');
    }

    function closeCertModal() {
        var modal = document.getElementById('certModal');
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    window.loadCertificates = loadCertificates;
    window.closeCertModal = closeCertModal;
    window.openCertModal = openCertModal;
})();
