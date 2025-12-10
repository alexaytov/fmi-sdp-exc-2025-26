import React, { useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface Props {
  slideData: {
    lectureSlug: string;
    lectureTitle: string;
    baseUrl: string;
  };
}

/**
 * Component that redirects to the static reveal.js HTML file
 *
 * We use window.location.href (not replace) so the navbar back button works.
 */
export default function SlidesRenderer({ slideData }: Props): JSX.Element {
  const { lectureSlug, lectureTitle, baseUrl } = slideData;
  const slideUrl = `${baseUrl}slides/${lectureSlug}/index.html`;

  useEffect(() => {
    // Use href instead of replace so back button brings you back to Docusaurus
    window.location.href = slideUrl;
  }, [slideUrl]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Loading presentation...</h2>
        <p>{lectureTitle}</p>
        <p style={{ marginTop: '20px' }}>
          <a href={slideUrl}>Click here if not redirected automatically</a>
        </p>
      </div>
    </div>
  );
}
