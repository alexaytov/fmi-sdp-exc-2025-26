import React, { ReactNode } from 'react';
import InfoBox from './InfoBox';

interface WarningBoxProps {
  title?: string;
  children: ReactNode;
}

export default function WarningBox({ title = 'Warning', children }: WarningBoxProps): JSX.Element {
  return (
    <InfoBox title={title} type="warning">
      {children}
    </InfoBox>
  );
}
