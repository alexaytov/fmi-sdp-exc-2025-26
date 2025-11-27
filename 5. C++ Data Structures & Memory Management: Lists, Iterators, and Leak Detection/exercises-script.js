// Sticky Navigation Active Link Highlighting
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Intersection Observer for section visibility
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Progress Bar
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) {
        // Create progress bar if it doesn't exist
        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        document.body.appendChild(bar);
    }
    
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    document.querySelector('.progress-bar').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateProgressBar);

// Checkbox functionality - Load and save states
document.addEventListener('DOMContentLoaded', function() {
    loadCheckboxStates();
    
    // Add event listeners to all checkboxes
    document.querySelectorAll('.exercise-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            saveCheckboxState(this.id, this.checked);
            updateStatisticsDisplay();
        });
    });
});

// Save checkbox state to localStorage
function saveCheckboxState(checkboxId, isChecked) {
    localStorage.setItem('checkbox_' + checkboxId, isChecked ? 'true' : 'false');
}

// Load checkbox states from localStorage
function loadCheckboxStates() {
    document.querySelectorAll('.exercise-checkbox').forEach(checkbox => {
        const state = localStorage.getItem('checkbox_' + checkbox.id);
        if (state === 'true') {
            checkbox.checked = true;
        }
    });
}

// Exercise Card Interaction - removed old completion toggle
document.querySelectorAll('.exercise-card').forEach(card => {
    // No click handler needed anymore - checkboxes handle everything
});

// Option Selection for Multiple Choice
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card completion toggle
        
        // Toggle selection
        const wasSelected = this.classList.contains('selected');
        
        // Remove selection from siblings (for single-choice)
        const siblings = this.parentElement.querySelectorAll('.option');
        siblings.forEach(sib => sib.classList.remove('selected'));
        
        // Toggle this option
        if (!wasSelected) {
            this.classList.add('selected');
        }
    });
});

// Add selection styling
const selectionStyle = document.createElement('style');
selectionStyle.textContent = `
    .option.selected {
        background-color: #dbeafe;
        border-color: #3b82f6;
        font-weight: 600;
    }
    
    .option.selected::before {
        content: '✓ ';
        color: #3b82f6;
        font-weight: bold;
    }
`;
document.head.appendChild(selectionStyle);

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Arrow keys for navigation
    if ((e.ctrlKey || e.metaKey)) {
        const currentActive = document.querySelector('.nav-link.active');
        
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            if (currentActive && currentActive.parentElement.nextElementSibling) {
                const nextLink = currentActive.parentElement.nextElementSibling.querySelector('.nav-link');
                if (nextLink) nextLink.click();
            }
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentActive && currentActive.parentElement.previousElementSibling) {
                const prevLink = currentActive.parentElement.previousElementSibling.querySelector('.nav-link');
                if (prevLink) prevLink.click();
            }
        }
    }
    
    // 'C' key to clear all completions
    if (e.key === 'c' && e.shiftKey && e.ctrlKey) {
        if (confirm('Изчистване на всички завършени упражнения?')) {
            // Clear all checkboxes
            document.querySelectorAll('.exercise-checkbox').forEach(checkbox => {
                checkbox.checked = false;
                localStorage.removeItem('checkbox_' + checkbox.id);
            });
            updateStatisticsDisplay();
        }
    }
});

// Exercise Statistics
function calculateStatistics() {
    const total = document.querySelectorAll('.exercise-checkbox').length;
    const completed = document.querySelectorAll('.exercise-checkbox:checked').length;
    const percentage = Math.round((completed / total) * 100);
    
    return {
        total,
        completed,
        remaining: total - completed,
        percentage
    };
}

// Display statistics in console
function showStatistics() {
    const stats = calculateStatistics();
    console.log('📊 Статистика за упражненията:');
    console.log(`Общо: ${stats.total}`);
    console.log(`Завършени: ${stats.completed} (${stats.percentage}%)`);
    console.log(`Оставащи: ${stats.remaining}`);
}

// Call statistics on load
setTimeout(showStatistics, 1000);

// Add statistics display to page
function addStatisticsDisplay() {
    const stats = calculateStatistics();
    const statsDiv = document.createElement('div');
    statsDiv.className = 'stats-display';
    statsDiv.innerHTML = `
        <div class="stats-content">
            <strong>Прогрес:</strong> ${stats.completed}/${stats.total} (${stats.percentage}%)
            <div class="stats-bar">
                <div class="stats-fill" style="width: ${stats.percentage}%"></div>
            </div>
        </div>
    `;
    
    // Add to page
    const nav = document.querySelector('.sticky-nav .container');
    if (nav && !document.querySelector('.stats-display')) {
        nav.appendChild(statsDiv);
    }
}

// Add statistics styling
const statsStyle = document.createElement('style');
statsStyle.textContent = `
    .stats-display {
        padding: 0.5rem 0;
        font-size: 0.875rem;
    }
    
    .stats-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .stats-bar {
        flex: 1;
        height: 6px;
        background-color: #e5e7eb;
        border-radius: 3px;
        overflow: hidden;
    }
    
    .stats-fill {
        height: 100%;
        background: linear-gradient(90deg, #10b981, #059669);
        transition: width 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .stats-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .stats-bar {
            width: 100%;
        }
    }
`;
document.head.appendChild(statsStyle);

// Initialize statistics display
setTimeout(addStatisticsDisplay, 500);

// Update statistics display function
function updateStatisticsDisplay() {
    const statsDisplay = document.querySelector('.stats-display');
    if (statsDisplay) {
        statsDisplay.remove();
    }
    addStatisticsDisplay();
    showStatistics();
}

// Update statistics when checkbox changes - handled by checkbox event listener above

// Back to Top Button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
}

// Initialize back to top button
createBackToTopButton();

// Fade-in Animation on Scroll
const fadeElements = document.querySelectorAll('.exercise-card');

const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
    fadeObserver.observe(element);
});

// Answer toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.answer-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const answerContent = this.nextElementSibling;
            answerContent.classList.toggle('visible');
            
            if (answerContent.classList.contains('visible')) {
                this.textContent = 'Скрий отговор';
                this.style.background = 'var(--accent-color)';
                this.style.color = 'white';
                this.style.borderColor = 'var(--accent-color)';
            } else {
                this.textContent = 'Покажи отговор';
                this.style.background = '';
                this.style.color = '';
                this.style.borderColor = '';
            }
        });
    });
});

console.log('Упражнения скриптове заредени успешно! 🎯');
console.log('Съвети:');
console.log('- Отметнете checkbox за всяко упражнение за маркиране като завършено');
console.log('- Използвайте Ctrl+Shift+C за изчистване на всички завършени');
console.log('- Вашият прогрес се съхранява локално в браузъра');
console.log('- Кликнете "Покажи отговор" за да видите решението на упражнението');
