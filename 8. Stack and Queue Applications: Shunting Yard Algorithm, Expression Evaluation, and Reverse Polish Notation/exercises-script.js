// Exercise completion tracking
document.addEventListener('DOMContentLoaded', function() {
    const STORAGE_KEY = 'shuntingYard_exerciseProgress';
    const TOTAL_EXERCISES = 32;
    
    const checkboxes = document.querySelectorAll('.exercise-checkbox');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const clearProgressBtn = document.getElementById('clearProgressBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const exerciseCards = document.querySelectorAll('.exercise-card');
    
    // Load saved progress from localStorage
    function loadProgress() {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    }
    
    // Save progress to localStorage
    function saveProgress(progress) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
    
    // Update progress bar and text
    function updateProgress() {
        const progress = loadProgress();
        const completed = Object.values(progress).filter(Boolean).length;
        const percentage = (completed / TOTAL_EXERCISES) * 100;
        
        progressBar.style.width = `${percentage}%`;
        progressBar.textContent = percentage > 0 ? `${Math.round(percentage)}%` : '';
        progressText.textContent = `${completed} / ${TOTAL_EXERCISES} завършени`;
        
        // Add celebration for 100% completion
        if (completed === TOTAL_EXERCISES && percentage === 100) {
            progressBar.textContent = '🎉 100% 🎉';
            showCelebration();
        }
    }
    
    // Show celebration message
    function showCelebration() {
        console.log('%c🎉 Поздравления! Завършихте всички упражнения! 🎉', 
                    'color: #10b981; font-weight: bold; font-size: 18px; padding: 10px;');
        
        // Optional: Could add a visual celebration effect here
        setTimeout(() => {
            alert('🎉 Поздравления! Завършихте всички 32 упражнения по Shunting Yard алгоритъма!');
        }, 500);
    }
    
    // Initialize checkboxes with saved state
    function initializeCheckboxes() {
        const progress = loadProgress();
        
        checkboxes.forEach(checkbox => {
            const exerciseId = checkbox.id;
            const isChecked = progress[exerciseId] || false;
            
            checkbox.checked = isChecked;
            updateExerciseCardState(checkbox);
        });
        
        updateProgress();
    }
    
    // Update exercise card visual state
    function updateExerciseCardState(checkbox) {
        const card = checkbox.closest('.exercise-card');
        if (checkbox.checked) {
            card.classList.add('completed');
        } else {
            card.classList.remove('completed');
        }
    }
    
    // Handle checkbox change
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const progress = loadProgress();
            progress[this.id] = this.checked;
            saveProgress(progress);
            updateExerciseCardState(this);
            updateProgress();
            
            // Log to console
            if (this.checked) {
                console.log(`✅ Упражнение ${this.id} завършено!`);
            } else {
                console.log(`⬜ Упражнение ${this.id} маркирано като незавършено.`);
            }
        });
    });
    
    // Clear all progress
    clearProgressBtn.addEventListener('click', function() {
        const confirmClear = confirm('Сигурни ли сте, че искате да изчистите целия си прогрес?');
        
        if (confirmClear) {
            localStorage.removeItem(STORAGE_KEY);
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                updateExerciseCardState(checkbox);
            });
            
            updateProgress();
            console.log('🗑️ Прогресът е изчистен.');
        }
    });
    
    // Keyboard shortcut for clearing progress
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            clearProgressBtn.click();
        }
    });
    
    // Filter exercises by difficulty
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            exerciseCards.forEach(card => {
                const difficulty = card.getAttribute('data-difficulty');
                
                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else if (difficulty === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
            
            console.log(`📊 Филтриране по: ${filter === 'all' ? 'Всички' : filter}`);
        });
    });
    
    // Smooth scroll to exercise when clicking on label
    document.querySelectorAll('.exercise-number').forEach(label => {
        label.addEventListener('click', function(e) {
            // Don't scroll if clicking the checkbox itself
            if (e.target.tagName !== 'INPUT') {
                const card = this.closest('.exercise-card');
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
    
    // Add fade-in animation to cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    exerciseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Initialize everything
    initializeCheckboxes();
    
    // Add solution buttons to each exercise
    addSolutionButtons();
    
    // Console welcome message
    console.log('%c📚 Shunting Yard Упражнения', 'color: #2563eb; font-weight: bold; font-size: 16px;');
    console.log('%c32 упражнения за практика', 'color: #6b7280; font-size: 14px;');
    console.log('%c💡 Keyboard Shortcut:', 'color: #10b981; font-weight: bold; font-size: 14px;');
    console.log('   Ctrl/Cmd + Shift + C : Изчистване на прогреса');
    
    // Performance monitoring
    window.addEventListener('load', function() {
        if (window.performance) {
            const perfData = window.performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Страницата се зареди за ${loadTime}ms`);
        }
    });
    
    // Export progress function for debugging
    window.getExerciseProgress = function() {
        const progress = loadProgress();
        const completed = Object.values(progress).filter(Boolean).length;
        console.table({
            'Завършени': completed,
            'Общо': TOTAL_EXERCISES,
            'Процент': `${Math.round((completed / TOTAL_EXERCISES) * 100)}%`
        });
        return progress;
    };
    
    console.log('%cDebug: window.getExerciseProgress()', 'color: #6b7280; font-style: italic;');
});

// Add solution buttons to each exercise card
function addSolutionButtons() {
    const exerciseCards = document.querySelectorAll('.exercise-card');
    
    exerciseCards.forEach(card => {
        const exerciseContent = card.querySelector('.exercise-content');
        const checkbox = card.querySelector('.exercise-checkbox');
        const exerciseId = checkbox.id;
        
        // Create solution button
        const solutionBtn = document.createElement('button');
        solutionBtn.className = 'solution-btn';
        solutionBtn.textContent = '📖 Покажи решение';
        solutionBtn.setAttribute('data-exercise-id', exerciseId);
        
        // Create solution container (hidden by default)
        const solutionContainer = document.createElement('div');
        solutionContainer.className = 'solution-container hidden';
        solutionContainer.setAttribute('data-exercise-id', exerciseId);
        
        // Add button click handler
        solutionBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSolution(exerciseId);
        });
        
        // Append button and container
        exerciseContent.appendChild(solutionBtn);
        exerciseContent.appendChild(solutionContainer);
    });
}

// Toggle solution visibility
function toggleSolution(exerciseId) {
    const button = document.querySelector(`.solution-btn[data-exercise-id="${exerciseId}"]`);
    const container = document.querySelector(`.solution-container[data-exercise-id="${exerciseId}"]`);
    
    if (!button || !container) return;
    
    const isHidden = container.classList.contains('hidden');
    
    if (isHidden) {
        // Load solution if not already loaded
        if (container.innerHTML === '') {
            loadSolution(exerciseId, container);
        }
        container.classList.remove('hidden');
        button.textContent = '🔼 Скрий решение';
        button.classList.add('active');
        
        // Scroll solution into view
        setTimeout(() => {
            container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        container.classList.add('hidden');
        button.textContent = '📖 Покажи решение';
        button.classList.remove('active');
    }
}

// Load solution content dynamically
function loadSolution(exerciseId, container) {
    // Load solutions from external file
    if (typeof solutions !== 'undefined' && solutions[exerciseId]) {
        container.innerHTML = solutions[exerciseId];
        
        // Re-apply syntax highlighting to the solution
        if (typeof hljs !== 'undefined') {
            container.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        }
    } else {
        container.innerHTML = '<div class="solution-box"><p>Решението не е налично.</p></div>';
    }
}

// Easter egg - Quick exercise navigator
window.goToExercise = function(number) {
    const checkbox = document.getElementById(`ex${number}`);
    if (checkbox) {
        const card = checkbox.closest('.exercise-card');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Highlight the card briefly
        card.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.5)';
        setTimeout(() => {
            card.style.boxShadow = '';
        }, 2000);
        
        console.log(`➡️ Навигирахте към упражнение ${number}`);
    } else {
        console.error(`❌ Упражнение ${number} не съществува (валиден диапазон: 1-32)`);
    }
};

console.log('%cTry: goToExercise(25)', 'color: #6b7280; font-style: italic;');
