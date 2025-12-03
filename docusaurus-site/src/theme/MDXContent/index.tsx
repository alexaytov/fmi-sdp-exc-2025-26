import React from 'react';
import MDXContent from '@theme-original/MDXContent';
import type { Props } from '@theme/MDXContent';
import { ExerciseProvider } from '@site/src/components/Exercise/ExerciseContext';

export default function MDXContentWrapper(props: Props): React.ReactElement {
  return (
    <ExerciseProvider>
      <MDXContent {...props} />
    </ExerciseProvider>
  );
}
