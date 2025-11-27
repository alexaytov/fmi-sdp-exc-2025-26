// Navigation active state tracking
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Active navigation tracking
    const navObserverOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        if (section.id) {
            navObserver.observe(section);
        }
    });

    // Hint box functionality
    const hintButtons = document.querySelectorAll('.hint-btn');
    hintButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            if (isActive) {
                content.classList.remove('active');
                button.textContent = '💡 Подсказка';
            } else {
                content.classList.add('active');
                button.textContent = '🔼 Скрий подсказката';
            }
        });
    });

    // Multiple choice interactivity
    const multipleChoiceItems = document.querySelectorAll('.multiple-choice li');
    multipleChoiceItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove previous selections in the same list
            const siblings = item.parentElement.querySelectorAll('li');
            siblings.forEach(sibling => {
                sibling.style.backgroundColor = '';
                sibling.style.fontWeight = '';
            });
            
            // Highlight selected
            item.style.backgroundColor = '#dbeafe';
            item.style.fontWeight = '600';
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            return; // Don't interfere with browser shortcuts
        }

        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        });

        if (!currentSection) return;

        const currentIndex = Array.from(sections).indexOf(currentSection);

        // Arrow Down or Right - next section
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            if (currentIndex < sections.length - 1) {
                sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Arrow Up or Left - previous section
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentIndex > 0) {
                sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Progress indicator
    const createProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 9999;
            transition: width 0.2s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };

    createProgressBar();

    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll for exercise cards
    const exerciseCards = document.querySelectorAll('.exercise-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, 50);
            }
        });
    }, { threshold: 0.1 });

    exerciseCards.forEach(card => cardObserver.observe(card));

    // Exercise counter
    const countExercises = () => {
        const easyCount = document.querySelectorAll('.difficulty-tag.easy').length;
        const easyMediumCount = document.querySelectorAll('.difficulty-tag.easy-medium').length;
        const mediumCount = document.querySelectorAll('.difficulty-tag.medium').length;
        const mediumHardCount = document.querySelectorAll('.difficulty-tag.medium-hard').length;
        const hardCount = document.querySelectorAll('.difficulty-tag.hard').length;
        const totalCount = easyCount + easyMediumCount + mediumCount + mediumHardCount + hardCount;

        console.log('📊 Статистика за упражненията:');
        console.log(`  • Лесни: ${easyCount}`);
        console.log(`  • Лесни-Средни: ${easyMediumCount}`);
        console.log(`  • Средни: ${mediumCount}`);
        console.log(`  • Средни-Трудни: ${mediumHardCount}`);
        console.log(`  • Трудни: ${hardCount}`);
        console.log(`  • Общо: ${totalCount}`);
    };

    countExercises();

    // Local storage for tracking completed exercises
    const setupExerciseTracking = () => {
        exerciseCards.forEach((card, index) => {
            const exerciseId = `exercise-${index}`;
            const isCompleted = localStorage.getItem(exerciseId) === 'completed';

            // Add checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = isCompleted;
            checkbox.style.cssText = `
                margin-left: auto;
                width: 20px;
                height: 20px;
                cursor: pointer;
            `;
            checkbox.title = 'Маркирай като решена';

            if (isCompleted) {
                card.style.opacity = '0.6';
            }

            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    localStorage.setItem(exerciseId, 'completed');
                    card.style.opacity = '0.6';
                } else {
                    localStorage.removeItem(exerciseId);
                    card.style.opacity = '1';
                }
            });

            const header = card.querySelector('.exercise-header');
            header.appendChild(checkbox);
        });

        // Add reset button
        const resetBtn = document.createElement('button');
        resetBtn.textContent = '🔄 Изчисти напредъка';
        resetBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            background-color: var(--error-color);
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 600;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        `;
        resetBtn.addEventListener('click', () => {
            if (confirm('Сигурни ли сте, че искате да изчистите целия напредък?')) {
                localStorage.clear();
                location.reload();
            }
        });
        document.body.appendChild(resetBtn);
    };

    setupExerciseTracking();

    console.log('✅ Упражнения за компилаторни оптимизации заредени успешно!');
    console.log('📚 Използвайте стрелките (↑↓) за навигация между секциите');
    console.log('✔️ Маркирайте задачите като решени с checkbox-ите');
});
