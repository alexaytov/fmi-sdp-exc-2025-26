// Sticky Navigation Active Link Highlighting
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
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Intersection Observer for section visibility
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Expandable Sections
document.querySelectorAll('.expand-btn').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        
        if (content && content.classList.contains('expand-content')) {
            content.classList.toggle('active');
        }
    });
});

// Copy Code to Clipboard
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const codeElement = codeBlock.querySelector('code');
    
    if (codeElement) {
        const code = codeElement.textContent;
        
        // Create temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        // Select and copy
        textarea.select();
        textarea.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            
            // Visual feedback
            const originalText = button.textContent;
            button.textContent = '✓ Копирано!';
            button.style.backgroundColor = '#10b981';
            button.style.color = 'white';
            button.style.borderColor = '#10b981';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
                button.style.color = '';
                button.style.borderColor = '';
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy code:', err);
            button.textContent = '✗ Грешка';
            
            setTimeout(() => {
                button.textContent = '📋 Копирай';
            }, 2000);
        }
        
        document.body.removeChild(textarea);
    }
}

// Fade-in Animation on Scroll
const fadeElements = document.querySelectorAll('.content-section');

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

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Arrow keys for navigation
    if ((e.ctrlKey || e.metaKey)) {
        const currentActive = document.querySelector('.nav-link.active');
        
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            if (currentActive && currentActive.parentElement.nextElementSibling) {
                const nextLink = currentActive.parentElement.nextElementSibling.querySelector('.nav-link');
                if (nextLink) nextLink.click();
            }
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentActive && currentActive.parentElement.previousElementSibling) {
                const prevLink = currentActive.parentElement.previousElementSibling.querySelector('.nav-link');
                if (prevLink) prevLink.click();
            }
        }
    }
});

// Print-friendly: Expand all sections before printing
window.addEventListener('beforeprint', function() {
    document.querySelectorAll('.expand-btn').forEach(btn => {
        if (!btn.classList.contains('active')) {
            btn.click();
        }
    });
});

// Back to Top Button (Optional - can be added to HTML)
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
}

// Initialize back to top button
createBackToTopButton();

console.log('Лекция скриптове заредени успешно! 🚀');
