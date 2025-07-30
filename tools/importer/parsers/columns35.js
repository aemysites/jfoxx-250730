/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout within the section structure
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children (columns) of the grid
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Build cells: header row is single column, columns row matches number of columns
  const headerRow = ['Columns (columns35)']; // Single cell for header row
  const columnsRow = columns.map(col => col); // Each col in its own cell

  const cells = [
    headerRow,
    columnsRow
  ];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
