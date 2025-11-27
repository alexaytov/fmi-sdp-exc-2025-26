document.addEventListener('DOMContentLoaded', () => {
  // Keyboard navigation between cards
  const cards = Array.from(document.querySelectorAll('.card'));
  let idx = 0;
  function focusCard(i) {
    idx = Math.max(0, Math.min(cards.length - 1, i));
    cards[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') focusCard(idx + 1);
    if (e.key === 'ArrowLeft') focusCard(idx - 1);
    if (e.key === 'Home') focusCard(0);
    if (e.key === 'End') focusCard(cards.length - 1);
  });

  // Dynamically compute correct base prefix for links (local vs GitHub Pages)
  const isFile = window.location.protocol === 'file:';
  const hostname = window.location.hostname;
  const path = window.location.pathname;
  
  // GitHub Pages detection: github.io domain and path contains repo name
  const isGitHubPages = hostname.includes('github.io');
  
  let base;
  if (isGitHubPages) {
    // Extract /<owner>/<repo>/ from pathname
    // Path format on GitHub Pages: /<repo>/docs/index.html or /<repo>/...
    const segments = path.split('/').filter(Boolean);
    if (segments.length >= 1) {
      base = `/${segments[0]}/`; // e.g., /fmi-sdp-exc-2025-26/
    } else {
      base = '/';
    }
  } else if (isFile) {
    base = '../'; // navigate from docs/ up to repo root on file://
  } else {
    // Local dev server
    if (path.endsWith('/docs/') || path.endsWith('/docs/index.html')) {
      base = '/';
    } else if (path.includes('/docs/')) {
      base = '../';
    } else {
      base = '/';
    }
  }
  const links = document.querySelectorAll('a.link-dynamic[data-path]');
  links.forEach(a => {
    const target = a.getAttribute('data-path');
    // Encode each segment for both HTTP and file:// to handle spaces and '+' correctly
    const encoded = target.split('/').map(encodeURIComponent).join('/');
    a.setAttribute('href', `${base}${encoded}`);
  });

  // Optional: hide buttons if target 404s (skip on file:// to avoid errors)
  if (!isFile) {
    links.forEach(async a => {
      const href = a.getAttribute('href');
      try {
        const res = await fetch(href, { method: 'HEAD' });
        if (!res.ok) {
          a.style.display = 'none';
        }
      } catch {
        // Ignore network/CORS errors on local dev
      }
    });
  }

  // Minimal debug to aid troubleshooting without noise
  if (window.console && console.debug) {
    console.debug('[docs] base prefix:', base, 'isGitHubPages:', isGitHubPages, 'isFile:', isFile, 'hostname:', hostname);
  }
});
