// Exercise tracking and progress management
document.addEventListener('DOMContentLoaded', function() {
    const STORAGE_KEY = 'doubly-linked-lists-exercises-progress';
    const checkboxes = document.querySelectorAll('.exercise-checkbox');
    const progressBar = document.getElementById('progress-bar');
    const statsElement = document.getElementById('stats');
    const answerButtons = document.querySelectorAll('.show-answer-btn');

    // Load saved progress from localStorage
    function loadProgress() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const progress = JSON.parse(saved);
                checkboxes.forEach(checkbox => {
                    if (progress[checkbox.id]) {
                        checkbox.checked = true;
                    }
                });
            } catch (e) {
                console.error('Error loading progress:', e);
            }
        }
    }

    // Save progress to localStorage
    function saveProgress() {
        const progress = {};
        checkboxes.forEach(checkbox => {
            progress[checkbox.id] = checkbox.checked;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }

    // Update progress bar and statistics
    function updateProgress() {
        const total = checkboxes.length;
        const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Update progress bar
        progressBar.style.width = percentage + '%';
        progressBar.textContent = percentage + '%';

        // Update statistics
        const easyCompleted = countCompleted('easy');
        const mediumCompleted = countCompleted('medium');
        const hardCompleted = countCompleted('hard');

        statsElement.innerHTML = `
            Завършени: <strong>${completed}/${total}</strong> 
            (Лесни: ${easyCompleted.completed}/${easyCompleted.total}, 
            Средни: ${mediumCompleted.completed}/${mediumCompleted.total}, 
            Трудни: ${hardCompleted.completed}/${hardCompleted.total})
        `;
    }

    // Count completed exercises by difficulty
    function countCompleted(difficulty) {
        const cards = document.querySelectorAll(`.exercise-card[data-difficulty="${difficulty}"]`);
        const total = cards.length;
        const completed = Array.from(cards).filter(card => {
            const checkbox = card.querySelector('.exercise-checkbox');
            return checkbox && checkbox.checked;
        }).length;
        return { completed, total };
    }

    // Clear all progress
    function clearAllProgress() {
        if (confirm('Сигурни ли сте, че искате да изчистите целия прогрес?')) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            localStorage.removeItem(STORAGE_KEY);
            updateProgress();
        }
    }

    // Toggle answer visibility
    function toggleAnswer(button) {
        const answerId = button.getAttribute('data-answer');
        const answer = document.getElementById(answerId);
        
        if (answer) {
            const isVisible = answer.classList.contains('visible');
            
            if (isVisible) {
                answer.classList.remove('visible');
                button.textContent = 'Покажи отговор';
                button.classList.remove('active');
            } else {
                answer.classList.add('visible');
                button.textContent = 'Скрий отговор';
                button.classList.add('active');
            }
        }
    }

    // Add event listeners to all checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            saveProgress();
            updateProgress();
        });
    });

    // Add event listeners to all answer buttons
    answerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            toggleAnswer(this);
        });
    });

    // Keyboard shortcut: Ctrl+Shift+C to clear all progress
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            clearAllProgress();
        }
    });

    // Initialize
    loadProgress();
    updateProgress();
});
