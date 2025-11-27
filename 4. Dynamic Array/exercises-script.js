// Active Navigation Highlighting
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.sticky-nav a');

    // Intersection Observer for fade-in animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Active navigation link highlighting
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#') && href === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -66% 0px'
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle internal anchors
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.sticky-nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Interactive Options List - Click to highlight answer
    const optionsLists = document.querySelectorAll('.options-list');
    
    optionsLists.forEach(list => {
        const items = list.querySelectorAll('li');
        
        items.forEach(item => {
            item.addEventListener('click', () => {
                // Remove previous selection from siblings
                items.forEach(i => {
                    i.style.backgroundColor = '';
                    i.style.borderLeftColor = '';
                });
                
                // Highlight selected
                item.style.backgroundColor = '#dbeafe';
                item.style.borderLeftColor = 'var(--primary-color)';
            });
        });
    });

    // Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = '↑';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: var(--warning-color);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.style.transform = 'scale(1.1)';
    });

    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.style.transform = 'scale(1)';
    });

    // Exercise Counter
    const exerciseCards = document.querySelectorAll('.exercise-card');
    console.log(`✅ Заредени ${exerciseCards.length} упражнения`);

    // Count exercises by difficulty
    const easyCount = document.querySelectorAll('.difficulty-badge.easy').length;
    const mediumCount = document.querySelectorAll('.difficulty-badge.medium').length;
    const mediumHardCount = document.querySelectorAll('.difficulty-badge.medium-hard').length;
    const hardCount = document.querySelectorAll('.difficulty-badge.hard').length;

    console.log(`🟢 Лесни: ${easyCount}`);
    console.log(`🟡 Средни: ${mediumCount}`);
    console.log(`🟠 Средно-трудни: ${mediumHardCount}`);
    console.log(`🔴 Трудни: ${hardCount}`);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Arrow Keys for navigation between sections
        if ((e.ctrlKey || e.metaKey) && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
            e.preventDefault();
            
            const currentSection = Array.from(sections).find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top >= 0 && rect.top <= window.innerHeight / 2;
            });
            
            if (currentSection) {
                const currentIndex = Array.from(sections).indexOf(currentSection);
                let targetIndex;
                
                if (e.key === 'ArrowRight') {
                    targetIndex = Math.min(currentIndex + 1, sections.length - 1);
                } else {
                    targetIndex = Math.max(currentIndex - 1, 0);
                }
                
                const targetSection = sections[targetIndex];
                const navHeight = document.querySelector('.sticky-nav').offsetHeight;
                
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight - 20,
                    behavior: 'smooth'
                });
            }
        }

        // Press 'H' to go to answers
        if (e.key === 'h' || e.key === 'H') {
            const answersSection = document.getElementById('answers');
            if (answersSection) {
                const navHeight = document.querySelector('.sticky-nav').offsetHeight;
                window.scrollTo({
                    top: answersSection.offsetTop - navHeight - 20,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Add completion tracking
    const completedExercises = new Set();
    
    exerciseCards.forEach((card, index) => {
        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✓ Маркирай като завършено';
        completeBtn.style.cssText = `
            background-color: var(--success-color);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 1rem;
            font-weight: 600;
            transition: all 0.3s ease;
        `;
        
        const content = card.querySelector('.exercise-content');
        content.appendChild(completeBtn);
        
        completeBtn.addEventListener('click', () => {
            if (completedExercises.has(index)) {
                completedExercises.delete(index);
                completeBtn.textContent = '✓ Маркирай като завършено';
                completeBtn.style.backgroundColor = 'var(--success-color)';
                card.style.opacity = '1';
            } else {
                completedExercises.add(index);
                completeBtn.textContent = '✓ Завършено!';
                completeBtn.style.backgroundColor = 'var(--gray)';
                card.style.opacity = '0.7';
            }
            
            updateProgress();
        });
    });

    function updateProgress() {
        const total = exerciseCards.length;
        const completed = completedExercises.size;
        console.log(`📊 Прогрес: ${completed}/${total} упражнения (${Math.round(completed/total*100)}%)`);
    }

    // Print-friendly mode toggle
    const printBtn = document.createElement('button');
    printBtn.textContent = '🖨️ Принтирай';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        background-color: var(--info-color);
        color: white;
        border: none;
        padding: 0.75rem 1.25rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;
    document.body.appendChild(printBtn);

    printBtn.addEventListener('click', () => {
        window.print();
    });

    printBtn.addEventListener('mouseenter', () => {
        printBtn.style.transform = 'scale(1.05)';
    });

    printBtn.addEventListener('mouseleave', () => {
        printBtn.style.transform = 'scale(1)';
    });

    console.log('✅ Упражненията за динамичен масив са заредени успешно!');
    console.log('💡 Използвайте Ctrl+← и Ctrl+→ за навигация между секции');
    console.log('💡 Натиснете "H" за преход към отговорите');
});