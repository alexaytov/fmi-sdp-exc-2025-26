// Навигация и анимации за упражненията
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const exerciseCards = document.querySelectorAll('.exercise-card');
    
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
    
    // Smooth scroll за навигационни линкове
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
    
    // Копиране на код при клик върху code block
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        block.title = 'Кликни за копиране на кода';
        
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
                
                showNotification('✓ Код копиран!', 'success', block);
            } catch (err) {
                console.error('Грешка при копиране:', err);
                showNotification('✗ Грешка при копиране', 'error', block);
            }
        });
    });
    
    // Функция за показване на notification
    function showNotification(message, type, element) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'absolute';
        notification.style.background = type === 'success' ? '#28a745' : '#dc3545';
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
    
    // Бутон "Към началото"
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
    
    // Филтриране по трудност
    function createDifficultyFilter() {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'difficulty-filter';
        filterContainer.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: white;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const filterTitle = document.createElement('div');
        filterTitle.textContent = 'Филтър';
        filterTitle.style.cssText = `
            font-weight: 700;
            margin-bottom: 12px;
            font-size: 14px;
            color: var(--text-color);
        `;
        filterContainer.appendChild(filterTitle);
        
        const difficulties = [
            { name: 'Всички', class: 'all', color: '#0066cc' },
            { name: 'Лесни', class: 'difficulty-easy', color: '#28a745' },
            { name: 'Средно-лесни', class: 'difficulty-easy-medium', color: '#20c997' },
            { name: 'Средни', class: 'difficulty-medium', color: '#ffc107' },
            { name: 'Средно-трудни', class: 'difficulty-medium-hard', color: '#fd7e14' },
            { name: 'Трудни', class: 'difficulty-hard', color: '#dc3545' }
        ];
        
        difficulties.forEach(diff => {
            const btn = document.createElement('button');
            btn.textContent = diff.name;
            btn.style.cssText = `
                display: block;
                width: 100%;
                padding: 8px 12px;
                margin: 4px 0;
                border: 2px solid ${diff.color};
                background: white;
                color: ${diff.color};
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 600;
                transition: all 0.3s ease;
            `;
            
            btn.addEventListener('click', () => {
                filterExercises(diff.class);
                
                // Активен стил
                filterContainer.querySelectorAll('button').forEach(b => {
                    b.style.background = 'white';
                    b.style.color = b.dataset.color;
                });
                btn.style.background = diff.color;
                btn.style.color = 'white';
            });
            
            btn.addEventListener('mouseenter', () => {
                if (btn.style.background === 'white') {
                    btn.style.background = diff.color;
                    btn.style.color = 'white';
                }
            });
            
            btn.addEventListener('mouseleave', () => {
                if (filterContainer.querySelector('button[style*="background: white"]') !== btn) {
                    return;
                }
                btn.style.background = 'white';
                btn.style.color = diff.color;
            });
            
            btn.dataset.color = diff.color;
            filterContainer.appendChild(btn);
        });
        
        document.body.appendChild(filterContainer);
        
        // Показване на филтъра при скрол
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                filterContainer.style.opacity = '1';
            } else {
                filterContainer.style.opacity = '0';
            }
        });
    }
    
    function filterExercises(difficultyClass) {
        exerciseCards.forEach(card => {
            if (difficultyClass === 'all' || card.classList.contains(difficultyClass)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-in';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    createDifficultyFilter();
    
    // Клавиатурни shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl + Arrow Down - Следваща задача
        if (e.ctrlKey && e.key === 'ArrowDown') {
            e.preventDefault();
            const currentCard = Array.from(exerciseCards).find(card => {
                const rect = card.getBoundingClientRect();
                return rect.top > 100;
            });
            if (currentCard) {
                currentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        // Ctrl + Home - Начало
        if (e.ctrlKey && e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Цифри 1-5 за бърз филтър
        if (e.key >= '1' && e.key <= '5' && !e.ctrlKey && !e.altKey) {
            const difficulties = ['difficulty-easy', 'difficulty-easy-medium', 'difficulty-medium', 'difficulty-medium-hard', 'difficulty-hard'];
            filterExercises(difficulties[parseInt(e.key) - 1]);
        }
        
        // 0 за показване на всички
        if (e.key === '0' && !e.ctrlKey && !e.altKey) {
            filterExercises('all');
        }
    });
    
    // Броене на задачи
    const totalExercises = exerciseCards.length;
    console.log(`📚 ${totalExercises} упражнения заредени успешно!`);
    console.log('🎯 Клавиатурни shortcuts:');
    console.log('   Ctrl + ↓ : Следваща задача');
    console.log('   Ctrl + Home : Към началото');
    console.log('   1-5 : Филтър по трудност (1=Лесни, 5=Трудни)');
    console.log('   0 : Показване на всички задачи');
    console.log('   Кликни върху code block за копиране');
    
    // Прогрес tracking (опционално - в localStorage)
    const progressKey = 'sdp-exercises-progress';
    
    exerciseCards.forEach((card, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.cssText = `
            width: 20px;
            height: 20px;
            cursor: pointer;
            margin-left: 12px;
        `;
        checkbox.title = 'Маркирай като завършена';
        
        // Зареждане на запазен прогрес
        const savedProgress = JSON.parse(localStorage.getItem(progressKey) || '{}');
        if (savedProgress[index]) {
            checkbox.checked = true;
            card.style.opacity = '0.6';
        }
        
        checkbox.addEventListener('change', () => {
            const progress = JSON.parse(localStorage.getItem(progressKey) || '{}');
            progress[index] = checkbox.checked;
            localStorage.setItem(progressKey, JSON.stringify(progress));
            
            if (checkbox.checked) {
                card.style.opacity = '0.6';
                showNotification('✓ Завършена!', 'success', card);
            } else {
                card.style.opacity = '1';
            }
        });
        
        card.querySelector('.exercise-header').appendChild(checkbox);
    });
});