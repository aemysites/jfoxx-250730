/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell (one-column) with the block name
  const headerRow = ['Columns (columns29)'];

  // Each immediate child div represents a column
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // The second row must have one cell per column in the layout
  const contentRow = columns;

  // Construct the table with a single-column header row, and a multi-column content row
  const tableRows = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
