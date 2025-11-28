import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface CardProps {
  children: ReactNode;
  title?: string;
  highlight?: boolean;
}

export default function Card({ children, title, highlight = false }: CardProps): JSX.Element {
  return (
    <div className={`${styles.card} ${highlight ? styles.highlight : ''}`}>
      {title && <h4 className={styles.cardTitle}>{title}</h4>}
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
}
