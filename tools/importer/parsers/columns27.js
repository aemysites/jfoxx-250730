/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of grid, which are columns
  const gridChildren = Array.from(grid.children);

  // The example is a 2-column layout: text content and an image
  // Let's extract the left content column and the right image column
  // Usually, one column is a div (with multiple content pieces), one is an img
  let leftCol = null;
  let rightCol = null;

  // Look for the first div and the first img
  for (const child of gridChildren) {
    if (!leftCol && child.tagName === 'DIV') {
      leftCol = child;
    } else if (!rightCol && child.tagName === 'IMG') {
      rightCol = child;
    }
  }

  // Fallback: if not found, just use grid children order
  if (!leftCol && gridChildren[0]) leftCol = gridChildren[0];
  if (!rightCol && gridChildren[1]) rightCol = gridChildren[1];

  // Only continue if both columns present
  if (!leftCol || !rightCol) return;

  // Compose table structure
  const cells = [
    ['Columns (columns27)'],
    [leftCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
