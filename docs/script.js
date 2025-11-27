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
});
