/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row should be a single cell (one column)
  const headerRow = ['Columns (columns31)'];
  // Content row contains one cell for each column
  const contentRow = columns;
  // Build the table: header row (one cell), then one row with the columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
