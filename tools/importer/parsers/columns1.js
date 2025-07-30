/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout that represents the columns block
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each one is a column cell)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Per requirements, use the block name as the header row
  const cells = [
    ['Columns (columns1)'],
    columns
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(block);
}
