/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct column children
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The header row must have exactly ONE column with the block name
  const headerRow = ['Columns (columns3)'];
  // The content row has all column elements
  const contentRow = columns;

  // Compose the table: one single-cell row, then one N-cell row
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
