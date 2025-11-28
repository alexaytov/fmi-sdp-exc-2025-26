import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface ProgressTrackerProps {
  exercises: string[]; // Array of exercise IDs
  title?: string;
}

export default function ProgressTracker({
  exercises,
  title = 'Напредък'
}: ProgressTrackerProps): JSX.Element {
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(exercises.length);

  const calculateProgress = () => {
    let count = 0;
    exercises.forEach(id => {
      if (localStorage.getItem(`exercise_${id}`) === 'true') {
        count++;
      }
    });
    setCompleted(count);
  };

  useEffect(() => {
    calculateProgress();

    // Listen for changes
    const handleProgressChange = () => calculateProgress();
    window.addEventListener('exerciseProgressChanged', handleProgressChange);

    return () => {
      window.removeEventListener('exerciseProgressChanged', handleProgressChange);
    };
  }, [exercises]);

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const clearProgress = () => {
    if (confirm('Сигурни ли сте, че искате да изчистите целия напредък?')) {
      exercises.forEach(id => {
        localStorage.removeItem(`exercise_${id}`);
      });
      setCompleted(0);
      window.dispatchEvent(new Event('exerciseProgressChanged'));
    }
  };

  return (
    <div className={styles.progressTracker}>
      <div className={styles.progressHeader}>
        <h3>{title}</h3>
        <button
          className={styles.clearButton}
          onClick={clearProgress}
          type="button"
          title="Изчисти напредък"
        >
          🔄 Нулиране
        </button>
      </div>
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${percentage}%` }}
          >
            <span className={styles.progressText}>{percentage}%</span>
          </div>
        </div>
      </div>
      <div className={styles.stats}>
        <span className={styles.statItem}>
          ✅ Завършени: <strong>{completed}</strong> / {total}
        </span>
        <span className={styles.statItem}>
          📊 Напредък: <strong>{percentage}%</strong>
        </span>
      </div>
      <p className={styles.hint}>
        💡 Напредъкът се записва локално в браузъра
      </p>
    </div>
  );
}
