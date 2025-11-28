import React from 'react';
import styles from './styles.module.css';

interface LearningObjectivesProps {
  objectives: string[];
  title?: string;
}

export default function LearningObjectives({
  objectives,
  title = 'Учебни Цели'
}: LearningObjectivesProps): JSX.Element {
  return (
    <div className={styles.learningObjectives}>
      <h3 className={styles.title}>
        <span className={styles.icon}>🎯</span>
        {title}
      </h3>
      <p className={styles.subtitle}>
        След края на тази лекция вие ще можете да:
      </p>
      <ul className={styles.objectivesList}>
        {objectives.map((objective, index) => (
          <li key={index} className={styles.objectiveItem}>
            <span className={styles.checkmark}>✓</span>
            <span className={styles.objectiveText}>{objective}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
