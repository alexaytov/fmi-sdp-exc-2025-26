// Smooth scroll and active navigation
document.addEventListener('DOMContentLoaded', function() {
    if (window.hljs && typeof window.hljs.highlightAll === 'function') {
        window.hljs.highlightAll();
    }
    document.querySelectorAll('pre > code').forEach(code => {
        const hasLang = Array.from(code.classList).some(c => c.startsWith('language-'));
        if (!hasLang) {
            code.classList.add('language-cpp');
        }
    });
    // Navigation active state
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Fade-in animation for sections
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(section);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            const currentActive = document.querySelector('.nav-link.active');
            const allLinks = Array.from(navLinks);
            const currentIndex = allLinks.indexOf(currentActive);

            if (e.key === 'ArrowRight' && currentIndex < allLinks.length - 1) {
                e.preventDefault();
                allLinks[currentIndex + 1].click();
                allLinks[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                allLinks[currentIndex - 1].click();
                allLinks[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    });
});

// Copy code functionality
function copyCode(button) {
    const codeBlock = button.nextElementSibling.querySelector('code');
    const text = codeBlock.textContent;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Копирано! ✓';
        button.style.background = '#10b981';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        button.textContent = 'Грешка!';
        setTimeout(() => {
            button.textContent = 'Копирай';
        }, 2000);
    });
}

// Add click handlers to expandable sections if needed
document.querySelectorAll('.expandable').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });
});

// Highlight current section on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.getElementById('navbar');

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// Add tooltips or additional interactivity as needed
console.log('Lecture website loaded successfully! 🎓');