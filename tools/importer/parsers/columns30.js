/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct child elements of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Create the table rows: header is a SINGLE cell; content row matches columns
  const headerRow = ['Columns (columns30)'];
  const contentRow = columns;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the entire original element with the new table
  element.replaceWith(table);
}
