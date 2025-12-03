import React, { useState, useEffect, JSX } from 'react';
import styles from './styles.module.css';
import { useExerciseContext } from './ExerciseContext';

interface Exercise {
  id: number | string;
  difficulty?: string;
}

interface ProgressTrackerProps {
  exercises?: Exercise[] | string[] | number[]; // Optional: Array of exercise objects or IDs. If not provided, will auto-detect from DOM
  title?: string;
}

export default function ProgressTracker({
  exercises: providedExercises,
  title = 'Напредък'
}: ProgressTrackerProps): JSX.Element {
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  const context = useExerciseContext();

  // Calculate progress based on context exercises
  const calculateProgress = () => {
    const registeredExercises = context.exercises;
    let count = 0;

    registeredExercises.forEach(exercise => {
      const key = context.getStorageKey(exercise.id);
      if (localStorage.getItem(key) === 'true') {
        count++;
      }
    });

    setCompleted(count);
    setTotal(registeredExercises.length);
  };

  // Recalculate when exercises change or on storage events
  useEffect(() => {
    calculateProgress();

    // Listen for changes
    const handleProgressChange = () => calculateProgress();
    window.addEventListener('exerciseProgressChanged', handleProgressChange);

    return () => {
      window.removeEventListener('exerciseProgressChanged', handleProgressChange);
    };
  }, [context.exercises]);

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const clearProgress = () => {
    if (confirm('Сигурни ли сте, че искате да изчистите целия напредък?')) {
      context.exercises.forEach(exercise => {
        const key = context.getStorageKey(exercise.id);
        localStorage.removeItem(key);
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
