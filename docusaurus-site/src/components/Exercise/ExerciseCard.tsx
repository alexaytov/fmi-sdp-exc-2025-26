import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface ExerciseCardProps {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: React.ReactNode;
  answer: React.ReactNode;
  number?: number;
}

export default function ExerciseCard({
  id,
  difficulty,
  question,
  answer,
  number
}: ExerciseCardProps): JSX.Element {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load completed state from localStorage
  useEffect(() => {
    const completed = localStorage.getItem(`exercise_${id}`) === 'true';
    setIsCompleted(completed);
  }, [id]);

  // Save completed state to localStorage
  const toggleCompleted = () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    localStorage.setItem(`exercise_${id}`, String(newState));

    // Dispatch custom event for ProgressTracker
    window.dispatchEvent(new Event('exerciseProgressChanged'));
  };

  const difficultyLabels = {
    easy: 'ЛЕСНО',
    medium: 'СРЕДНО',
    hard: 'ТРУДНО'
  };

  return (
    <div className={`${styles.exerciseCard} ${styles[difficulty]}`} data-difficulty={difficulty}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <input
            type="checkbox"
            id={`checkbox-${id}`}
            className={styles.checkbox}
            checked={isCompleted}
            onChange={toggleCompleted}
          />
          <label htmlFor={`checkbox-${id}`} className={styles.exerciseNumber}>
            Упражнение {number || id}
          </label>
        </div>
        <div className={styles.actions}>
          <span className={`${styles.badge} ${styles[difficulty]}`}>
            {difficultyLabels[difficulty]}
          </span>
          <button
            className={styles.showAnswerBtn}
            onClick={() => setShowAnswer(!showAnswer)}
            type="button"
          >
            {showAnswer ? 'Скрий отговор' : 'Покажи отговор'}
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.question}>
          {question}
        </div>
        {showAnswer && (
          <div className={styles.answer}>
            <div className={styles.answerLabel}>
              <strong>Отговор:</strong>
            </div>
            {answer}
          </div>
        )}
      </div>
    </div>
  );
}
