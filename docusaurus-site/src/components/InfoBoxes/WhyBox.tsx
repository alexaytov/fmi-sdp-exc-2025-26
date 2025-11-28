import React, { ReactNode } from 'react';
import InfoBox from './InfoBox';

interface WhyBoxProps {
  title?: string;
  children: ReactNode;
}

export default function WhyBox({ title, children }: WhyBoxProps): JSX.Element {
  return (
    <InfoBox title={title} type="why">
      {children}
    </InfoBox>
  );
}
