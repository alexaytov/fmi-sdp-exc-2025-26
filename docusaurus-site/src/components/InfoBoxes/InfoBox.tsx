import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface InfoBoxProps {
  title?: string;
  children: ReactNode;
  type?: 'info' | 'warning' | 'success' | 'why';
}

export default function InfoBox({ title, children, type = 'info' }: InfoBoxProps): JSX.Element {
  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
    why: '💡'
  };

  return (
    <div className={`${styles.infoBox} ${styles[type]}`}>
      {title && (
        <div className={styles.title}>
          <span className={styles.icon}>{icons[type]}</span>
          {title}
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
