/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell, as specified
  const headerRow = ['Columns (columns38)'];

  // Gather direct children as columns/content for the second row
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each cell in the second row should be a column's entire content (the div)
  const contentRow = columns;

  // Compose the table: first row is header (one cell), second row is the columns (N cells)
  const cells = [
    headerRow,
    contentRow
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}