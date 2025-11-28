import React, { ReactNode, useState } from 'react';
import styles from './styles.module.css';

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: string;
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  icon
}: CollapsibleSectionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={`${styles.collapsible} ${isOpen ? styles.open : ''}`}>
      <button
        className={styles.header}
        onClick={toggleOpen}
        aria-expanded={isOpen}
        type="button"
      >
        <span className={styles.titleContent}>
          {icon && <span className={styles.customIcon}>{icon}</span>}
          <span className={styles.title}>{title}</span>
        </span>
        <span className={styles.arrow}>
          {isOpen ? '▼' : '▶'}
        </span>
      </button>
      <div className={`${styles.content} ${isOpen ? styles.contentOpen : ''}`}>
        <div className={styles.contentInner}>
          {children}
        </div>
      </div>
    </div>
  );
}
