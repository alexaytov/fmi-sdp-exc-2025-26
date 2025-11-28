// Exercise tracking with localStorage
document.addEventListener('DOMContentLoaded', function() {
    // Initialize syntax highlighting
    hljs.highlightAll();
    
    // Answer toggle functionality
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answerContent = this.nextElementSibling;
            const isShowing = answerContent.classList.contains('show');
            
            if (isShowing) {
                answerContent.classList.remove('show');
                this.textContent = 'Покажи Отговор ↓';
            } else {
                answerContent.classList.add('show');
                this.textContent = 'Скрий Отговор ↑';
                // Re-highlight code in the answer after showing
                answerContent.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
            }
        });
    });
    
    const STORAGE_KEY = 'linear-data-structures-exercises-progress';
    const totalExercises = 30;
    
    // Load saved progress from localStorage
    function loadProgress() {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    }
    
    // Save progress to localStorage
    function saveProgress(progress) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
    
    // Initialize progress from localStorage
    let progress = loadProgress();
    
    // Apply saved state to checkboxes
    Object.keys(progress).forEach(exerciseId => {
        const checkbox = document.getElementById(exerciseId);
        if (checkbox && progress[exerciseId]) {
            checkbox.checked = true;
            const card = checkbox.closest('.exercise-card');
            if (card) {
                card.classList.add('completed');
            }
        }
    });
    
    // Update progress statistics
    function updateStatistics() {
        const completedCount = Object.values(progress).filter(v => v).length;
        const percentage = Math.round((completedCount / totalExercises) * 100);
        
        document.getElementById('completed-count').textContent = completedCount;
        document.getElementById('total-count').textContent = totalExercises;
        document.getElementById('progress-percent').textContent = percentage;
        document.getElementById('progress-fill').style.width = percentage + '%';
    }
    
    // Initial statistics update
    updateStatistics();
    
    // Checkbox change handler
    const checkboxes = document.querySelectorAll('.exercise-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const exerciseId = this.id;
            const card = this.closest('.exercise-card');
            
            if (this.checked) {
                progress[exerciseId] = true;
                if (card) {
                    card.classList.add('completed');
                }
            } else {
                progress[exerciseId] = false;
                if (card) {
                    card.classList.remove('completed');
                }
            }
            
            saveProgress(progress);
            updateStatistics();
        });
    });
    
    // Label click handler (alternative to checkbox)
    const labels = document.querySelectorAll('.exercise-number');
    labels.forEach(label => {
        label.addEventListener('click', function() {
            const checkbox = document.getElementById(label.getAttribute('for'));
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    });
    
    // Clear progress button
    const clearButton = document.getElementById('clear-progress');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            if (confirm('Сигурни ли сте, че искате да изчистите целия прогрес? Това действие не може да бъде отменено.')) {
                // Clear all checkboxes
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                    const card = checkbox.closest('.exercise-card');
                    if (card) {
                        card.classList.remove('completed');
                    }
                });
                
                // Clear progress and save
                progress = {};
                saveProgress(progress);
                updateStatistics();
                
                // Visual feedback
                this.textContent = 'Изчистено!';
                this.style.background = '#10b981';
                
                setTimeout(() => {
                    this.textContent = 'Изчисти Прогреса (Ctrl+Shift+C)';
                    this.style.background = '';
                }, 2000);
            }
        });
    }
    
    // Keyboard shortcut for clear progress (Ctrl+Shift+C)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            clearButton.click();
        }
    });
    
    // Navigation highlighting on scroll
    const sections = document.querySelectorAll('.exercises-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-150px 0px -66%',
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
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.sticky-nav').offsetHeight;
                const progressHeight = document.querySelector('.progress-container').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - progressHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fade-in animation for exercise cards
    const cards = document.querySelectorAll('.exercise-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });
    
    // Progress celebration effect
    function celebrateProgress() {
        const completedCount = Object.values(progress).filter(v => v).length;
        
        if (completedCount === totalExercises) {
            // All exercises completed!
            const celebration = document.createElement('div');
            celebration.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                text-align: center;
                animation: scaleIn 0.3s ease;
            `;
            celebration.innerHTML = `
                <h2 style="color: #10b981; font-size: 2rem; margin-bottom: 1rem;">🎉 Поздравления! 🎉</h2>
                <p style="color: #475569; font-size: 1.125rem;">Завършихте всички 30 упражнения!</p>
                <button onclick="this.parentElement.remove()" style="
                    margin-top: 1.5rem;
                    padding: 0.75rem 1.5rem;
                    background: #2563eb;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 600;
                ">Благодаря!</button>
            `;
            
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 9999;
            `;
            overlay.onclick = () => {
                celebration.remove();
                overlay.remove();
            };
            
            document.body.appendChild(overlay);
            document.body.appendChild(celebration);
        } else if (completedCount > 0 && completedCount % 10 === 0) {
            // Milestone reached
            showNotification(`Отлична работа! Завършихте ${completedCount} от ${totalExercises} упражнения!`);
        }
    }
    
    // Simple notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Override checkbox change to include celebration
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            setTimeout(celebrateProgress, 300);
        });
    });
    
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
    
    // Export/Import progress functionality
    function exportProgress() {
        const dataStr = JSON.stringify(progress, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'linear-data-structures-progress.json';
        link.click();
        URL.revokeObjectURL(url);
    }
    
    // Console helpers for debugging
    console.log('%cУпражнения: Линейни Структури от Данни', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%cФМИ - Структури от Данни и Програмиране', 'color: #64748b; font-size: 14px;');
    console.log(`%cПрогрес: ${Object.values(progress).filter(v => v).length}/${totalExercises}`, 'color: #10b981; font-size: 12px;');
    console.log('%cКлавиатурни комбинации:', 'color: #f59e0b; font-weight: bold;');
    console.log('  Ctrl+Shift+C - Изчисти прогреса');
    
    // Make export function available in console
    window.exportProgress = exportProgress;
    console.log('%cКоманди в конзолата:', 'color: #f59e0b; font-weight: bold;');
    console.log('  exportProgress() - Експортирай прогреса като JSON файл');
});
