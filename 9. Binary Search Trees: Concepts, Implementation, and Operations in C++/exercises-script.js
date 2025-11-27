document.addEventListener('DOMContentLoaded', () => {
    // Toggle hint boxes with preserved custom labels
    document.querySelectorAll('.hint-btn').forEach(btn => {
        const showLabel = btn.getAttribute('data-show-label') || btn.textContent.trim();
        const hideLabel = btn.getAttribute('data-hide-label') || '🔽 Скрий';
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            if (!content) return;
            const isOpen = content.style.display === 'block';
            content.style.display = isOpen ? 'none' : 'block';
            btn.textContent = isOpen ? showLabel : hideLabel;
            btn.setAttribute('aria-expanded', String(!isOpen));
        });
        // Initialize labels
        btn.textContent = showLabel;
        btn.setAttribute('aria-expanded', 'false');
    });

    // Copy code functionality
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const code = btn.getAttribute('data-copy') || btn.nextElementSibling?.textContent;
            if (!code) return;
            
            try {
                await navigator.clipboard.writeText(code);
                const originalText = btn.textContent;
                btn.textContent = '✅ Копирано!';
                btn.classList.add('copied');
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                btn.textContent = '❌ Грешка';
                setTimeout(() => btn.textContent = '📋 Копирай', 2000);
            }
        });
    });

    // Exercise completion tracking
    const totalExercises = 25;
    let completedCount = 0;
    
    // Load progress from localStorage
    const loadProgress = () => {
        const saved = localStorage.getItem('bst-exercises-progress');
        if (saved) {
            try {
                const completed = JSON.parse(saved);
                completed.forEach(id => {
                    const checkbox = document.getElementById(`ex${id}`);
                    if (checkbox) {
                        checkbox.checked = true;
                        checkbox.closest('.exercise').classList.add('completed');
                    }
                });
                completedCount = completed.length;
                updateProgress();
            } catch (e) {
                console.error('Error loading progress:', e);
            }
        }
    };
    
    // Save progress to localStorage
    const saveProgress = () => {
        const completed = [];
        document.querySelectorAll('.exercise-checkbox:checked').forEach(cb => {
            const id = cb.id.replace('ex', '');
            completed.push(parseInt(id));
        });
        localStorage.setItem('bst-exercises-progress', JSON.stringify(completed));
    };
    
    // Update progress bar
    const updateProgress = () => {
        const percentage = (completedCount / totalExercises) * 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (progressText) progressText.textContent = `Напредък: ${completedCount} от ${totalExercises} задачи (${Math.round(percentage)}%)`;
    };
    
    // Handle checkbox changes
    document.querySelectorAll('.exercise-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const exercise = e.target.closest('.exercise');
            if (e.target.checked) {
                exercise.classList.add('completed');
                completedCount++;
            } else {
                exercise.classList.remove('completed');
                completedCount--;
            }
            updateProgress();
            saveProgress();
        });
    });
    
    // Load initial progress
    loadProgress();
    
    // Reset progress button
    const resetBtn = document.getElementById('resetProgress');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Сигурен ли си, че искаш да изчистиш целия прогрес?')) {
                localStorage.removeItem('bst-exercises-progress');
                document.querySelectorAll('.exercise-checkbox').forEach(cb => {
                    cb.checked = false;
                    cb.closest('.exercise').classList.remove('completed');
                });
                completedCount = 0;
                updateProgress();
            }
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K: Scroll to top
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
        
        // Ctrl/Cmd + H: Toggle nearest hint
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            const scrollPos = window.scrollY + window.innerHeight / 2;
            let nearestBtn = null;
            let minDist = Infinity;
            
            document.querySelectorAll('.hint-btn').forEach(btn => {
                const rect = btn.getBoundingClientRect();
                const btnY = rect.top + window.scrollY;
                const dist = Math.abs(btnY - scrollPos);
                if (dist < minDist) {
                    minDist = dist;
                    nearestBtn = btn;
                }
            });
            
            if (nearestBtn) nearestBtn.click();
        }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('.section, .intro-section, .conclusion-section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateNav() {
        let current = '';
        sections.forEach(s => {
            const top = s.getBoundingClientRect().top;
            if (top <= 120) current = s.id || current;
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    }

    window.addEventListener('scroll', updateNav);

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            const offset = 80;
            const y = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({top: y, behavior: 'smooth'});
        });
    });
});