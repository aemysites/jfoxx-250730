/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing two main columns (text+buttons, images)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const topLevelCols = Array.from(grid.children);
  if (topLevelCols.length < 2) return;

  // Left column: text content (heading, subheading, buttons)
  const leftCol = topLevelCols[0];
  // Right column: images grid
  const rightCol = topLevelCols[1];

  // LEFT COLUMN: gather all direct children for robustness
  const leftContent = [];
  Array.from(leftCol.children).forEach(child => {
    leftContent.push(child);
  });

  // RIGHT COLUMN: find grid of images, or fallback to all images
  let imagesGrid = rightCol.querySelector('.w-layout-grid');
  if (!imagesGrid) {
    // fallback: wrap all images in a div
    imagesGrid = document.createElement('div');
    Array.from(rightCol.querySelectorAll('img')).forEach(img => imagesGrid.appendChild(img));
  }

  // Build table (header row, then content row with two columns)
  const headerRow = ['Columns (columns36)'];
  const contentRow = [leftContent, imagesGrid];
  const cells = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
