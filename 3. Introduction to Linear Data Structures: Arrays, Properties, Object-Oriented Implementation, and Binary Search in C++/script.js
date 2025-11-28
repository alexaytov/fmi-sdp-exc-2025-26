// Smooth scrolling and active navigation highlighting
document.addEventListener('DOMContentLoaded', function() {
    // Initialize syntax highlighting
    hljs.highlightAll();
    
    // Navigation highlighting on scroll
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -66%',
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
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.parentElement;
            const code = codeBlock.querySelector('code').textContent;
            
            navigator.clipboard.writeText(code).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Копирано!';
                this.style.background = '#10b981';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Грешка при копиране:', err);
                this.textContent = 'Грешка!';
                setTimeout(() => {
                    this.textContent = 'Копирай';
                }, 2000);
            });
        });
    });
    
    // Expandable sections
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            if (isActive) {
                content.classList.remove('active');
                this.innerHTML = this.innerHTML.replace('↑', '↓');
            } else {
                content.classList.add('active');
                this.innerHTML = this.innerHTML.replace('↓', '↑');
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Ctrl + Arrow keys for navigation
        if (e.ctrlKey) {
            const currentSection = document.querySelector('.nav-link.active');
            if (!currentSection) return;
            
            const allLinks = Array.from(navLinks);
            const currentIndex = allLinks.indexOf(currentSection);
            
            if (e.key === 'ArrowRight' && currentIndex < allLinks.length - 1) {
                e.preventDefault();
                const nextLink = allLinks[currentIndex + 1];
                const targetId = nextLink.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                const prevLink = allLinks[currentIndex - 1];
                const targetId = prevLink.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.sticky-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to boxes on scroll
    const boxes = document.querySelectorAll('.box-why, .box-success, .box-warning, .box-info');
    const boxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, 100);
                
                boxObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    boxes.forEach(box => {
        boxObserver.observe(box);
    });
    
    // Progress indicator
    const createProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };
    
    createProgressBar();
    
    // Table of contents generation (if needed)
    const generateTOC = () => {
        const headings = document.querySelectorAll('.content-section h2, .content-section h3');
        if (headings.length === 0) return;
        
        // TOC generation logic can be added here if needed
    };
    
    // Back to top button
    const createBackToTop = () => {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'back-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #2563eb;
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        `;
        
        document.body.appendChild(button);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    };
    
    createBackToTop();
    
    // Print-friendly formatting
    window.addEventListener('beforeprint', () => {
        // Expand all collapsible sections before printing
        const expandContents = document.querySelectorAll('.expand-content');
        expandContents.forEach(content => {
            content.classList.add('active');
        });
    });
    
    window.addEventListener('afterprint', () => {
        // Collapse sections after printing
        const expandContents = document.querySelectorAll('.expand-content');
        expandContents.forEach(content => {
            content.classList.remove('active');
        });
    });
    
    // Console message for developers
    console.log('%cВъведение в Линейни Структури от Данни', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%cФМИ - Структури от Данни и Програмиране', 'color: #64748b; font-size: 14px;');
    console.log('%cИспользвайте Ctrl + ← / → за навигация между секции', 'color: #10b981; font-size: 12px;');
});
