import { useState } from 'react';
import { Icon } from '../components/Icon.jsx';
import { portfolioData } from '../data/portfolioData.js';

export function Beyond() {
    const items = portfolioData.beyondCoding;
    return (
        <section id="beyond">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">beyond_code</span>
                    <h2 className="section-title">Beyond <span className="highlight">Coding</span></h2>
                    <p className="section-desc">What I do when I'm not at the keyboard.</p>
                </div>
                <div className="beyond-grid">
                    {items.map((item, i) => (
                        <div className="beyond-item reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                            <div className="beyond-icon-wrap">
                                <Icon name={item.icon || 'book'} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Contact() {
    const { social } = portfolioData;
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = {};
        if (!form.name.trim()) errs.name = 'Please enter your name';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim() || !emailRegex.test(form.email.trim())) errs.email = 'Please enter a valid email address';
        if (!form.message.trim()) errs.message = 'Please enter a message';
        setErrors(errs);
        if (Object.keys(errs).length) return;

        setSending(true);
        setStatus('');
        try {
            const res = await fetch('https://formsubmit.co/ajax/thirutharun65@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    subject: form.subject.trim() || 'No subject',
                    message: form.message.trim()
                })
            });
            if (res.ok) {
                setStatus('✅ Message sent — I\'ll get back to you soon!');
                setForm({ name: '', email: '', subject: '', message: '' });
            } else {
                throw new Error('Server error');
            }
        } catch {
            setStatus('📧 Opening your email client...');
            const mailto = `mailto:thirutharun65@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${encodeURIComponent('Name: ' + form.name + '\nEmail: ' + form.email + '\n\n' + form.message)}`;
            window.open(mailto, '_blank');
        }
        setSending(false);
    };

    const infoCards = [
        { icon: 'mail', label: 'Email', value: social.mail, href: 'mailto:' + social.mail },
        { icon: 'github', label: 'GitHub', value: 'thirutharun65-tech', href: social.github },
        { icon: 'linkedin', label: 'LinkedIn', value: 'Thirumurugan C', href: social.linkedin },
        { icon: 'leetcode', label: 'LeetCode', value: 'thirutharun', href: social.leetcode }
    ];

    return (
        <section id="contact">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">contact.connect()</span>
                    <h2 className="section-title">Get In <span className="highlight">Touch</span></h2>
                    <p className="section-desc">Have a question or want to work together? Let's talk.</p>
                </div>
                <div className="contact-grid">
                    <div className="contact-info">
                        {infoCards.map((card) => (
                            <div className="contact-info-card" key={card.label}>
                                <div className="info-icon-wrap">
                                    <Icon name={card.icon} />
                                </div>
                                <div className="info-details">
                                    <h3>{card.label}</h3>
                                    <p><a href={card.href} target={card.icon === 'mail' ? '' : '_blank'} rel="noopener noreferrer">{card.value}</a></p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="contact-form-container">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="formName">Name</label>
                                    <input id="formName" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                                    <span className="form-error">{errors.name || ''}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="formEmail">Email</label>
                                    <input id="formEmail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                                    <span className="form-error">{errors.email || ''}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formSubject">Subject</label>
                                <input id="formSubject" type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="What's this about?" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="formMessage">Message</label>
                                <textarea id="formMessage" rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message..."></textarea>
                                <span className="form-error">{errors.message || ''}</span>
                            </div>
                            <button className="btn-primary btn-glow" type="submit" disabled={sending}>
                                {sending ? 'Sending...' : 'Send Message'}
                            </button>
                            {status && <div className="form-status">{status}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
