import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface ExerciseCardProps {
  id?: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'easy-medium' | 'medium-hard';
  question?: React.ReactNode;
  answer?: React.ReactNode;
  number?: number;
  timeEstimate?: string;
  tags?: string[];
  children?: React.ReactNode;
}

export default function ExerciseCard({
  id,
  difficulty,
  question,
  answer,
  number,
  timeEstimate,
  tags,
  children
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
    hard: 'ТРУДНО',
    'easy-medium': 'ЛЕСНО-СРЕДНО',
    'medium-hard': 'СРЕДНО-ТРУДНО'
  };

  // When using children pattern, CollapsibleSection handles answer visibility
  const isChildrenPattern = !!children;

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
          {timeEstimate && (
            <span className={styles.timeEstimate}>{timeEstimate}</span>
          )}
          <span className={`${styles.badge} ${styles[difficulty]}`}>
            {difficultyLabels[difficulty]}
          </span>
          {!isChildrenPattern && (
            <button
              className={styles.showAnswerBtn}
              onClick={() => setShowAnswer(!showAnswer)}
              type="button"
            >
              {showAnswer ? 'Скрий отговор' : 'Покажи отговор'}
            </button>
          )}
        </div>
      </div>
      <div className={styles.content}>
        {isChildrenPattern ? (
          <div className={styles.question}>
            {children}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
