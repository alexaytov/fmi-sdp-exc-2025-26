import React, { useState } from 'react';
import styles from './QuickSummary.module.css';

interface QuickSummaryProps {
  title?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

/**
 * QuickSummary Component - Displays a collapsible TLDR/summary of key points for exam preparation
 *
 * Usage:
 * <QuickSummary>
 *   - Key point 1
 *   - Key point 2
 *   - Key point 3
 * </QuickSummary>
 *
 * Or with custom title and default open state:
 * <QuickSummary title="Ключови Моменти" defaultOpen={true}>
 *   Content here
 * </QuickSummary>
 */
const QuickSummary: React.FC<QuickSummaryProps> = ({
  title = "⚡ Накратко",
  children,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.quickSummary}>
      <div
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <h3 className={styles.title}>
          <span className={styles.icon}>{isOpen ? '▼' : '▶'}</span>
          {title}
        </h3>
        <span className={styles.badge}>
          {isOpen ? 'Скрий' : 'За Изпита'}
        </span>
      </div>
      {isOpen && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
};

export default QuickSummary;
