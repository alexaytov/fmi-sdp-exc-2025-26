// Навигация - активен линк при скрол
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
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Intersection Observer за fade-in анимации
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Активен навигационен линк при скрол
    function setActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNav);
    setActiveNav(); // Инициализация
    
    // Клавиатурни shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl + Arrow Right - Следваща секция
        if (e.ctrlKey && e.key === 'ArrowRight') {
            e.preventDefault();
            const currentIndex = Array.from(sections).findIndex(s => s.classList.contains('visible'));
            if (currentIndex < sections.length - 1) {
                sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        
        // Ctrl + Arrow Left - Предишна секция
        if (e.ctrlKey && e.key === 'ArrowLeft') {
            e.preventDefault();
            const currentIndex = Array.from(sections).findIndex(s => s.classList.contains('visible'));
            if (currentIndex > 0) {
                sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        
        // Ctrl + Home - Начало
        if (e.ctrlKey && e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // Копиране на код при клик върху code block
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        block.style.cursor = 'pointer';
        block.title = 'Кликни за копиране';
        
        block.addEventListener('click', async () => {
            const code = block.querySelector('code').textContent;
            
            try {
                await navigator.clipboard.writeText(code);
                
                // Визуална обратна връзка
                const originalBg = block.style.background;
                block.style.background = '#2d5016';
                block.style.transition = 'background 0.3s ease';
                
                setTimeout(() => {
                    block.style.background = originalBg;
                }, 500);
                
                // Показване на съобщение
                showCopyNotification(block);
            } catch (err) {
                console.error('Грешка при копиране:', err);
            }
        });
    });
    
    function showCopyNotification(element) {
        const notification = document.createElement('div');
        notification.textContent = '✓ Копирано!';
        notification.style.position = 'absolute';
        notification.style.background = '#28a745';
        notification.style.color = 'white';
        notification.style.padding = '8px 16px';
        notification.style.borderRadius = '4px';
        notification.style.fontSize = '14px';
        notification.style.fontWeight = '600';
        notification.style.zIndex = '1000';
        notification.style.pointerEvents = 'none';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        
        document.body.appendChild(notification);
        
        const rect = element.getBoundingClientRect();
        notification.style.top = `${rect.top + window.scrollY - 40}px`;
        notification.style.left = `${rect.left + rect.width / 2 - notification.offsetWidth / 2}px`;
        
        setTimeout(() => notification.style.opacity = '1', 10);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
    
    // Smooth scroll за всички навигационни линкове
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Показване на бутон "Към началото" при скрол надолу
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'scale(1)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'scale(0.8)';
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'scale(1)';
    });
    
    console.log('🚀 Лекция за Сложност и Big-O заредена успешно!');
    console.log('📝 Клавиатурни shortcuts:');
    console.log('   Ctrl + → : Следваща секция');
    console.log('   Ctrl + ← : Предишна секция');
    console.log('   Ctrl + Home : Към началото');
    console.log('   Кликни върху code block за копиране');
});