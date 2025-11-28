// Navigation Active State
document.addEventListener('DOMContentLoaded', function() {
    // Initialize highlight.js for syntax highlighting
    if (window.hljs && typeof window.hljs.highlightAll === 'function') {
        window.hljs.highlightAll();
    }
    // Add language-cpp class to code blocks without language
    document.querySelectorAll('pre > code').forEach(code => {
        const hasLang = Array.from(code.classList).some(c => c.startsWith('language-'));
        if (!hasLang) {
            code.classList.add('language-cpp');
        }
    });
    
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Intersection Observer for section highlighting
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Expandable sections
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expandable = this.closest('.expandable');
            const content = expandable.querySelector('.expandable-content');
            
            content.classList.toggle('active');
            
            // Update button text or icon if needed
            const isActive = content.classList.contains('active');
            this.textContent = this.textContent.replace(
                isActive ? '📖' : '📕',
                isActive ? '📕' : '📖'
            );
        });
    });

    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.content-section');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + Arrow keys for navigation
        if (e.ctrlKey) {
            const currentSection = document.querySelector('.content-section.fade-in');
            if (!currentSection) return;

            let targetSection = null;

            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                targetSection = currentSection.nextElementSibling;
                while (targetSection && !targetSection.classList.contains('content-section')) {
                    targetSection = targetSection.nextElementSibling;
                }
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                targetSection = currentSection.previousElementSibling;
                while (targetSection && !targetSection.classList.contains('content-section')) {
                    targetSection = targetSection.previousElementSibling;
                }
            }

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Copy code to clipboard
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code').textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Копирано!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Грешка при копиране:', err);
        button.textContent = 'Грешка';
        setTimeout(() => {
            button.textContent = 'Копирай';
        }, 2000);
    });
}
