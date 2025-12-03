import React, { useState, useEffect, useMemo, JSX } from 'react';
import styles from './styles.module.css';
import { useExerciseContext, slugify } from './ExerciseContext';

interface ExerciseCardProps {
  id?: string; // Optional: if not provided, will auto-generate from children
  difficulty: 'easy' | 'medium' | 'hard' | 'easy-medium' | 'medium-hard';
  question?: React.ReactNode;
  answer?: React.ReactNode;
  number?: number;
  timeEstimate?: string;
  tags?: string[];
  children?: React.ReactNode;
}

export default function ExerciseCard({
  id: providedId,
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
  const [semanticId, setSemanticId] = useState<string | null>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const context = useExerciseContext();

  // Destructure functions to avoid context object dependency
  const { registerExercise, unregisterExercise, getStorageKey } = context;

  // Extract heading and generate semantic ID on mount
  useEffect(() => {
    if (!cardRef.current) return;

    let headingText = '';
    let id = '';

    // Check if there's a heading INSIDE this ExerciseCard (in children)
    const innerHeading = cardRef.current.querySelector('h3, h2, h4');
    if (innerHeading) {
      headingText = innerHeading.textContent || '';

      // Remove "Задача N:" or "Упражнение N" prefix
      const cleanTitle = headingText.replace(/^(Задача|Упражнение)\s+\d+:?\s*/, '').trim();
      id = slugify(cleanTitle);

      setSemanticId(id);
      registerExercise(difficulty, id);

      return () => {
        unregisterExercise(id);
      };
    } else {
      // No heading found - throw error to crash the site
      throw new Error(
        '❌ ExerciseCard Error: No heading (h2, h3, or h4) found inside this exercise card.\n\n' +
        'Each ExerciseCard MUST have a descriptive heading inside for proper ID generation.\n\n' +
        'Required structure:\n' +
        '<ExerciseCard difficulty="easy">\n' +
        '  ### Your Exercise Title Here\n' +
        '  Content...\n' +
        '</ExerciseCard>\n\n' +
        'Please add a heading inside this ExerciseCard component.'
      );
    }
  }, [difficulty, registerExercise, unregisterExercise]);

  // Generate storage key
  const storageKey = useMemo(() => {
    if (!semanticId) return null;
    return getStorageKey(semanticId);
  }, [semanticId, getStorageKey]);

  // Load completed state from localStorage
  useEffect(() => {
    if (!storageKey) return;

    const completed = localStorage.getItem(storageKey) === 'true';
    setIsCompleted(completed);
  }, [storageKey]);

  // Save completed state to localStorage
  const toggleCompleted = () => {
    if (!storageKey) return;

    const newState = !isCompleted;
    setIsCompleted(newState);
    localStorage.setItem(storageKey, String(newState));

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
    <div
      ref={cardRef}
      className={`${styles.exerciseCard} ${styles[difficulty]}`}
      data-difficulty={difficulty}
    >
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <input
            type="checkbox"
            id={`checkbox-${semanticId}`}
            className={styles.checkbox}
            checked={isCompleted}
            onChange={toggleCompleted}
          />
          <label htmlFor={`checkbox-${semanticId}`} className={styles.exerciseNumber}>
            Упражнение {number || ''}
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
