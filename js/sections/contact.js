// ============================================
// js/sections/contact.js — CONTACT SECTION
// ============================================

(function() {
    function initContact() {
        var form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', handleSubmit);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        var form = e.target;
        var submitBtn = document.getElementById('formSubmit');
        var statusEl = document.getElementById('formStatus');

        var name = document.getElementById('formName');
        var email = document.getElementById('formEmail');
        var subject = document.getElementById('formSubject');
        var message = document.getElementById('formMessage');

        var isValid = true;

        document.querySelectorAll('.form-error').forEach(function(el) {
            el.textContent = '';
        });

        if (!name.value.trim()) {
            document.getElementById('nameError').textContent = 'Please enter your name';
            isValid = false;
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }

        if (!message.value.trim()) {
            document.getElementById('messageError').textContent = 'Please enter a message';
            isValid = false;
        }

        if (!isValid) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        statusEl.textContent = '';

        try {
            var response = await fetch('https://formsubmit.co/ajax/thirutharun65@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.value.trim(),
                    email: email.value.trim(),
                    subject: subject.value.trim() || 'No subject',
                    message: message.value.trim()
                })
            });

            if (response.ok) {
                statusEl.textContent = '✅ Message sent — I\'ll get back to you soon!';
                statusEl.style.color = '#00ff41';
                form.reset();
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            statusEl.textContent = '📧 Opening your email client...';
            statusEl.style.color = 'var(--hacker-green)';
            var mailtoLink = 'mailto:thirutharun65@gmail.com?subject=' + encodeURIComponent(subject.value.trim() || 'Portfolio Contact') + '&body=' + encodeURIComponent('Name: ' + name.value.trim() + '\nEmail: ' + email.value.trim() + '\n\n' + message.value.trim());
            window.open(mailtoLink, '_blank');
        }

        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }

    window.initContact = initContact;
})();