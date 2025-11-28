import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface ComparisonItem {
  title: string;
  content: ReactNode;
}

interface ComparisonBoxProps {
  wrong: ComparisonItem;
  correct: ComparisonItem;
}

export default function ComparisonBox({ wrong, correct }: ComparisonBoxProps): JSX.Element {
  return (
    <div className={styles.comparisonBox}>
      <div className={`${styles.comparisonItem} ${styles.wrong}`}>
        <div className={styles.header}>
          <span className={styles.icon}>❌</span>
          <h4>{wrong.title}</h4>
        </div>
        <div className={styles.content}>
          {wrong.content}
        </div>
      </div>
      <div className={`${styles.comparisonItem} ${styles.correct}`}>
        <div className={styles.header}>
          <span className={styles.icon}>✅</span>
          <h4>{correct.title}</h4>
        </div>
        <div className={styles.content}>
          {correct.content}
        </div>
      </div>
    </div>
  );
}
