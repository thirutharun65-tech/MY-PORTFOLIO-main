// ============================================
// js/sections/journey.js — BEYOND CODING
// ============================================

(function() {
    function initJourney() {
        var data = window.portfolioData;
        if (!data) return;

        var beyondContainer = document.getElementById('beyondGrid');
        if (beyondContainer && data.beyondCoding) {
            beyondContainer.innerHTML = '';
            data.beyondCoding.forEach(function(item, index) {
                var el = document.createElement('div');
                el.className = 'beyond-item reveal';
                el.style.transitionDelay = (index * 0.1) + 's';

                var iconKey = item.icon || 'book';

                el.innerHTML =
                    '<div class="beyond-icon-wrap">' +
                    '<svg viewBox="0 0 24 24"><use href="#' + iconKey + '"></use></svg>' +
                    '</div>' +
                    '<h3>' + item.title + '</h3>' +
                    '<p>' + (item.description || item.desc || '') + '</p>';
                beyondContainer.appendChild(el);
            });
        }

        setTimeout(function() {
            document.querySelectorAll('.reveal').forEach(function(el) {
                el.classList.add('visible');
            });
        }, 300);
    }

    window.initJourney = initJourney;
})();