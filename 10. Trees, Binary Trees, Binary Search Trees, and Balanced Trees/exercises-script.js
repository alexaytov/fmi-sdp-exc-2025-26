// Toggle solution visibility
function toggleSolution(exerciseId) {
    const solutionBox = document.getElementById(`solution-${exerciseId}`);
    const button = event.currentTarget;
    const isOpen = solutionBox.classList.contains('open');
    
    if (isOpen) {
        // Close the solution
        solutionBox.classList.remove('open');
        solutionBox.style.display = 'none';
        button.classList.remove('active');
        button.querySelector('.btn-text').textContent = 'Виж решение';
    } else {
        // Open the solution and load content if not already loaded
        const contentDiv = solutionBox.querySelector('.solution-content-inner');
        
        // Check if solution is already loaded
        if (!contentDiv.hasChildNodes() || contentDiv.children.length === 0) {
            // Get solution from solutions.js
            if (window.solutions && window.solutions[exerciseId]) {
                contentDiv.innerHTML = window.solutions[exerciseId];
                
                // Re-highlight code blocks in the solution
                if (window.hljs) {
                    contentDiv.querySelectorAll('pre code').forEach(block => {
                        window.hljs.highlightElement(block);
                    });
                }
            } else {
                contentDiv.innerHTML = '<p style="color: #ef4444;">Решението все още не е налично.</p>';
            }
        }
        
        solutionBox.style.display = 'block';
        setTimeout(() => {
            solutionBox.classList.add('open');
        }, 10);
        button.classList.add('active');
        button.querySelector('.btn-text').textContent = 'Скрий решение';
    }
}

// Exercise tracking and progress management
document.addEventListener('DOMContentLoaded', function() {
    // Initialize highlight.js for syntax highlighting
    if (window.hljs && typeof window.hljs.highlightAll === 'function') {
        window.hljs.highlightAll();
    }
    // Add language-cpp class to code blocks without language
    document.querySelectorAll('pre > code').forEach(code => {
        const hasLang = Array.from(code.classList).some(c => c.startsWith('language-'));
        if (!hasLang && !code.classList.contains('language-plaintext')) {
            code.classList.add('language-cpp');
        }
    });
    
    const STORAGE_KEY = 'trees-bst-exercises-progress';
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
    
    // Update statistics and progress bar
    function updateStats() {
        const checkboxes = document.querySelectorAll('.exercise-checkbox');
        const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
        const remaining = totalExercises - completed;
        const percentage = Math.round((completed / totalExercises) * 100);
        
        document.getElementById('completed-count').textContent = completed;
        document.getElementById('remaining-count').textContent = remaining;
        document.getElementById('progress-percentage').textContent = percentage + '%';
        document.getElementById('progress-fill').style.width = percentage + '%';
    }
    
    // Initialize checkboxes from saved progress
    function initializeCheckboxes() {
        const progress = loadProgress();
        const checkboxes = document.querySelectorAll('.exercise-checkbox');
        
        checkboxes.forEach(checkbox => {
            const exerciseId = checkbox.id;
            if (progress[exerciseId]) {
                checkbox.checked = true;
                checkbox.closest('.exercise-card').classList.add('completed');
            }
            
            // Add change event listener
            checkbox.addEventListener('change', function() {
                const card = this.closest('.exercise-card');
                const progress = loadProgress();
                
                if (this.checked) {
                    card.classList.add('completed');
                    progress[exerciseId] = true;
                } else {
                    card.classList.remove('completed');
                    delete progress[exerciseId];
                }
                
                saveProgress(progress);
                updateStats();
            });
        });
        
        updateStats();
    }
    
    // Clear all progress
    function clearAllProgress() {
        if (confirm('Сигурни ли сте, че искате да изчистите целия прогрес?')) {
            localStorage.removeItem(STORAGE_KEY);
            const checkboxes = document.querySelectorAll('.exercise-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.closest('.exercise-card').classList.remove('completed');
            });
            updateStats();
        }
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+Shift+C to clear all progress
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            clearAllProgress();
        }
    });
    
    // Fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all exercise cards
    const exerciseCards = document.querySelectorAll('.exercise-card');
    exerciseCards.forEach(card => {
        observer.observe(card);
    });
    
    // Initialize
    initializeCheckboxes();
    
    // Add click handler to exercise numbers (labels)
    const labels = document.querySelectorAll('.exercise-number');
    labels.forEach(label => {
        label.addEventListener('click', function() {
            const checkbox = document.getElementById(this.getAttribute('for'));
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    });
    
    // Export progress statistics
    window.getExerciseStats = function() {
        const progress = loadProgress();
        const completed = Object.keys(progress).length;
        return {
            total: totalExercises,
            completed: completed,
            remaining: totalExercises - completed,
            percentage: Math.round((completed / totalExercises) * 100),
            completedExercises: Object.keys(progress).sort()
        };
    };
    
    // Console helper message
    console.log('%c📚 Упражнения за Дървета и BST', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%cСъвети:', 'color: #10b981; font-weight: bold;');
    console.log('• Ctrl+Shift+C - Изчистване на целия прогрес');
    console.log('• getExerciseStats() - Показва статистики за прогреса');
    console.log('• Прогресът се запазва автоматично в браузъра');
});
