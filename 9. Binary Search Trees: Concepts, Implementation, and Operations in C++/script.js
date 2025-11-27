// Navigation active state on scroll
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
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Active navigation link on scroll
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Expandable sections
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.classList.toggle('active');
        });
    });
    
    // Smooth scroll with offset for sticky nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Arrow keys for section navigation
        if ((e.ctrlKey || e.metaKey) && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            e.preventDefault();
            
            const currentSection = Array.from(sections).find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top >= 0 && rect.top < window.innerHeight / 2;
            });
            
            if (currentSection) {
                const currentIndex = Array.from(sections).indexOf(currentSection);
                let nextIndex;
                
                if (e.key === 'ArrowDown') {
                    nextIndex = Math.min(currentIndex + 1, sections.length - 1);
                } else {
                    nextIndex = Math.max(currentIndex - 1, 0);
                }
                
                const nextSection = sections[nextIndex];
                const offset = 80;
                const targetPosition = nextSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
    
    // Add copy button to code blocks
    document.querySelectorAll('pre code').forEach((block) => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Копирай';
        button.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 8px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8rem;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        pre.addEventListener('mouseenter', () => {
            button.style.opacity = '1';
        });
        
        pre.addEventListener('mouseleave', () => {
            button.style.opacity = '0';
        });
        
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                button.textContent = 'Копирано!';
                setTimeout(() => {
                    button.textContent = 'Копирай';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
    
    // Add line numbers to code blocks (optional)
    document.querySelectorAll('pre code.language-cpp').forEach((block) => {
        const lines = block.textContent.split('\n');
        if (lines.length > 5) { // Only for blocks with more than 5 lines
            const lineNumbers = lines.map((_, i) => i + 1).join('\n');
            const lineNumbersDiv = document.createElement('div');
            lineNumbersDiv.className = 'line-numbers';
            lineNumbersDiv.textContent = lineNumbers;
            lineNumbersDiv.style.cssText = `
                position: absolute;
                left: 0;
                top: 0;
                padding: 1.5rem 0.5rem;
                color: #999;
                text-align: right;
                user-select: none;
                border-right: 1px solid var(--border);
                background: #f0f0f0;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.9rem;
                line-height: 1.5;
            `;
            
            const pre = block.parentElement;
            pre.style.paddingLeft = '3.5rem';
            pre.appendChild(lineNumbersDiv);
        }
    });
});

// Print functionality
function printLecture() {
    window.print();
}

// Dark mode toggle (optional)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
