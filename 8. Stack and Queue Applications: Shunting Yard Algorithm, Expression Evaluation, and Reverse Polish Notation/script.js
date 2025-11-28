// Navigation active link handling
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Intersection Observer for section visibility
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Update active navigation link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scroll with offset for sticky nav
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Arrow keys for navigation
        if ((e.ctrlKey || e.metaKey) && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
            e.preventDefault();
            
            const currentActive = document.querySelector('.nav-link.active');
            if (!currentActive) return;
            
            const allLinks = Array.from(navLinks);
            const currentIndex = allLinks.indexOf(currentActive);
            
            let nextIndex;
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : allLinks.length - 1;
            } else {
                nextIndex = currentIndex < allLinks.length - 1 ? currentIndex + 1 : 0;
            }
            
            allLinks[nextIndex].click();
        }
    });
    
    // Fade-in animations for sections
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(section);
    });
    
    // Code block enhancements
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((block, index) => {
        // Add copy button to code blocks
        const pre = block.parentElement;
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Копирай';
        button.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            padding: 0.4rem 0.8rem;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.75rem;
            font-family: inherit;
            transition: all 0.2s ease;
        `;
        
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        
        button.addEventListener('click', async function() {
            const code = block.textContent;
            
            try {
                await navigator.clipboard.writeText(code);
                this.textContent = '✓ Копирано!';
                this.style.background = 'rgba(16, 185, 129, 0.3)';
                
                setTimeout(() => {
                    this.textContent = 'Копирай';
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            } catch (err) {
                this.textContent = '✗ Грешка';
                this.style.background = 'rgba(239, 68, 68, 0.3)';
                
                setTimeout(() => {
                    this.textContent = 'Копирай';
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            }
        });
    });
    
    // Table responsive wrapper
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        if (!table.parentElement.classList.contains('trace-table') && 
            !table.parentElement.classList.contains('scrollable-table')) {
            const wrapper = document.createElement('div');
            wrapper.style.overflowX = 'auto';
            wrapper.style.marginBottom = '1.5rem';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
    
    // Expandable content (if needed for future enhancements)
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const target = document.getElementById(targetId);
            
            if (target) {
                target.classList.toggle('expanded');
                this.textContent = target.classList.contains('expanded') 
                    ? '▼ Скрий' 
                    : '▶ Виж повече';
            }
        });
    });
    
    // Console log for debugging
    console.log('Shunting Yard Tutorial loaded successfully!');
    console.log('Navigation sections:', sections.length);
    console.log('Code blocks:', codeBlocks.length);
    
    // Add helpful message
    console.log('%c💡 Keyboard Shortcuts:', 'color: #2563eb; font-weight: bold; font-size: 14px;');
    console.log('   Ctrl/Cmd + ← → : Navigate between sections');
});

// Performance monitoring
window.addEventListener('load', function() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
    }
});

// Easter egg - Shunting Yard calculator in console
window.shuntingYardDemo = function(expression) {
    console.log('%c🚂 Shunting Yard Demo', 'color: #10b981; font-weight: bold; font-size: 16px;');
    console.log('Expression:', expression);
    console.log('This is a learning demo - implement the full algorithm in your exercises!');
    console.log('Check the lecture content for complete implementation details.');
};

console.log('%cTry: shuntingYardDemo("3 + 4 * 2")', 'color: #6b7280; font-style: italic;');
