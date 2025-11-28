import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface GridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 'small' | 'medium' | 'large';
}

export default function Grid({ children, columns = 2, gap = 'medium' }: GridProps): JSX.Element {
  return (
    <div className={`${styles.grid} ${styles[`cols${columns}`]} ${styles[`gap${gap}`]}`}>
      {children}
    </div>
  );
}
