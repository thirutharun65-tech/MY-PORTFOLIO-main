// ============================================
// js/sections/skills.js — SKILLS SECTION
// ============================================

(function() {
    // Map skill names to Devicon icons
    var deviconMap = {
        // Languages
        'Java': 'java',
        'Python': 'python',
        
        // Front End
        'HTML': 'html5',
        'CSS': 'css3',
        'JavaScript': 'javascript',
        
        // Tools
        'Git': 'git',
        'GitHub': 'github',
        'VS Code': 'vscode',
        
        // Design
        'Responsive Web Design': 'responsive',  // fallback
        'Figma': 'figma',
        'Wix': 'wix',
        
        // Backend
        'Django': 'django',
        'Pandas': 'pandas',
        
        // Currently Learning
        'DSA': 'algorithm',  // fallback
        'C Programming': 'c',
        'C#': 'csharp'
    };

    function getInitials(name) {
        return name.split(' ').map(function(w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
    }

    function loadSkills() {
        var container = document.getElementById('skillsContainer');
        if (!container) return;

        var data = window.portfolioData;
        if (!data || !data.skills) return;

        container.innerHTML = '';
        data.skills.forEach(function(skill, index) {
            var el = document.createElement('div');
            el.className = 'skill-group reveal';
            el.style.transitionDelay = (index * 0.1) + 's';

            var itemsHtml = '';
            skill.items.forEach(function(name) {
                var iconKey = deviconMap[name];
                if (iconKey) {
                    itemsHtml +=
                        '<div class="skill-tile">' +
                        '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/' + iconKey + '/' + iconKey + '-original.svg" alt="' + name + '" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
                        '<span class="skill-tile-letter" style="display:none">' + getInitials(name) + '</span>' +
                        '<span class="skill-tile-name">' + name + '</span>' +
                        '</div>';
                } else {
                    itemsHtml +=
                        '<div class="skill-tile">' +
                        '<span class="skill-tile-letter">' + getInitials(name) + '</span>' +
                        '<span class="skill-tile-name">' + name + '</span>' +
                        '</div>';
                }
            });

            el.innerHTML =
                '<h4>' + skill.title + '</h4>' +
                '<div class="items">' + itemsHtml + '</div>';
            container.appendChild(el);
        });

        setTimeout(function() {
            container.querySelectorAll('.skill-group').forEach(function(el) {
                el.classList.add('visible');
            });
        }, 200);
    }

    window.loadSkills = loadSkills;
})();