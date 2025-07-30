/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero12)'];

  // 2. Background image (optional, 2nd row)
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  let backgroundImg = '';
  if (grid) {
    // Look for .cover-image NOT inside .card
    const imgs = Array.from(grid.querySelectorAll('img.cover-image'));
    backgroundImg = imgs.find(img => !img.closest('.card')) || '';
  }

  // 3. Content cell (headline, subheading, cta, etc., 3rd row)
  // Find the .card-body inside .card inside .container
  let contentCell = '';
  const container = element.querySelector('.container');
  if (container) {
    const card = container.querySelector('.card');
    if (card) {
      const cardBody = card.querySelector('.card-body');
      if (cardBody) contentCell = cardBody;
    }
  }

  const cells = [
    headerRow,
    [backgroundImg],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
