import React, { ReactNode } from 'react';
import InfoBox from './InfoBox';

interface SuccessBoxProps {
  title?: string;
  children: ReactNode;
}

export default function SuccessBox({ title, children }: SuccessBoxProps): JSX.Element {
  return (
    <InfoBox title={title} type="success">
      {children}
    </InfoBox>
  );
}
