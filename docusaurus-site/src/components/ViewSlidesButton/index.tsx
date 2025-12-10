import React from 'react';
import styles from './styles.module.css';

interface ViewSlidesButtonProps {
  lectureSlug: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Button component to link from lecture pages to reveal.js presentations
 *
 * Uses pathname:// protocol to bypass Docusaurus SPA router and serve static files.
 * This is the recommended approach from Docusaurus documentation for external static files.
 *
 * @example
 * ```tsx
 * <ViewSlidesButton lectureSlug="arrays-binary-search" />
 * ```
 */
export default function ViewSlidesButton({
  lectureSlug,
  variant = 'primary',
  size = 'lg'
}: ViewSlidesButtonProps) {
  const slideUrl = `pathname:///slides/${lectureSlug}/`;

  return (
    <div className={styles.container}>
      <a
        href={slideUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`button button--${variant} button--${size}`}
      >
        📊 Виж Презентация
      </a>
    </div>
  );
}
