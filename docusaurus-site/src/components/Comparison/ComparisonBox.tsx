import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface ComparisonItem {
  title: string;
  content: ReactNode;
}

interface ComparisonBoxProps {
  wrong?: ComparisonItem;
  correct?: ComparisonItem;
  left?: ComparisonItem;
  right?: ComparisonItem;
}

export default function ComparisonBox({ wrong, correct, left, right }: ComparisonBoxProps): React.JSX.Element {
  // Support both naming conventions: wrong/correct OR left/right
  const leftItem = wrong || left;
  const rightItem = correct || right;

  if (!leftItem || !rightItem) {
    console.error('ComparisonBox: Missing required props. Use either (wrong, correct) or (left, right)');
    return <div>Error: Missing comparison items</div>;
  }
  return (
    <div className={styles.comparisonBox}>
      <div className={`${styles.comparisonItem} ${styles.wrong}`}>
        <div className={styles.header}>
          <span className={styles.icon}>❌</span>
          <h4>{leftItem.title}</h4>
        </div>
        <div className={styles.content}>
          {leftItem.content}
        </div>
      </div>
      <div className={`${styles.comparisonItem} ${styles.correct}`}>
        <div className={styles.header}>
          <span className={styles.icon}>✅</span>
          <h4>{rightItem.title}</h4>
        </div>
        <div className={styles.content}>
          {rightItem.content}
        </div>
      </div>
    </div>
  );
}
