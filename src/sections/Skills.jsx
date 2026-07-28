import { portfolioData } from '../data/portfolioData.js';

const deviconMap = {
    'Java': 'java', 'Python': 'python',
    'HTML': 'html5', 'CSS': 'css3', 'JavaScript': 'javascript',
    'Git': 'git', 'GitHub': 'github', 'VS Code': 'vscode',
    'Responsive Web Design': 'responsive', 'Figma': 'figma', 'Wix': 'wix',
    'Django': 'django', 'Pandas': 'pandas',
    'DSA': 'algorithm', 'C Programming': 'c', 'C#': 'csharp'
};

function getInitials(name) {
    return name.split(' ').map((w) => w[0]).join('').substring(0, 2).toUpperCase();
}

export function Skills() {
    const skills = portfolioData.skills;
    return (
        <section id="skills">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">skills.list()</span>
                    <h2 className="section-title">Tech <span className="highlight">Stack</span></h2>
                    <p className="section-desc">Tools and technologies I work with.</p>
                </div>
                <div className="skills-grid">
                    {skills.map((skill, i) => (
                        <div className="skill-group reveal" key={skill.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                            <h4>{skill.title}</h4>
                            <div className="items">
                                {skill.items.map((name) => {
                                    const iconKey = deviconMap[name];
                                    return (
                                        <div className="skill-tile" key={name}>
                                            {iconKey ? (
                                                <>
                                                    <img
                                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconKey}/${iconKey}-original.svg`}
                                                        alt={name}
                                                        loading="lazy"
                                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                                                    />
                                                    <span className="skill-tile-letter" style={{ display: 'none' }}>{getInitials(name)}</span>
                                                </>
                                            ) : (
                                                <span className="skill-tile-letter">{getInitials(name)}</span>
                                            )}
                                            <span className="skill-tile-name">{name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
