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

    // Find the previous heading (h2 or h3) before this ExerciseCard
    let element = cardRef.current.previousElementSibling;
    let headingText = '';

    while (element) {
      if (element.tagName === 'H3' || element.tagName === 'H2') {
        headingText = element.textContent || '';
        break;
      }
      element = element.previousElementSibling;
    }

    if (headingText) {
      // Remove "Задача N:" prefix
      const cleanTitle = headingText.replace(/^(Задача|Упражнение)\s+\d+:\s*/, '').trim();
      const id = slugify(cleanTitle);

      setSemanticId(id);
      registerExercise(difficulty, id);

      return () => {
        unregisterExercise(id);
      };
    } else {
      // Fallback: use timestamp-based ID
      const fallbackId = `exercise-${difficulty}-${Date.now()}`;
      setSemanticId(fallbackId);
      registerExercise(difficulty, fallbackId);

      return () => {
        unregisterExercise(fallbackId);
      };
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
  }, [storageKey, semanticId]);

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
