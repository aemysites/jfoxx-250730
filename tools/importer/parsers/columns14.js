/* global WebImporter */
export default function parse(element, { document }) {
  // Find the sitemap view container
  const viewContent = element.querySelector('.view-content');
  if (!viewContent) return;

  // Get all columns (each .item-list is a column)
  const columns = Array.from(viewContent.querySelectorAll('.item-list'));
  if (columns.length === 0) return;

  // Header row for the block
  const headerRow = ['Columns (columns14)'];

  // For each column, create a cell containing the heading and its list
  const columnCells = columns.map((col) => {
    // Extract the heading (h2 > a)
    const headingLink = col.querySelector('h2 > a');
    // Extract the list (ul)
    const list = col.querySelector('ul');
    // Compose a wrapper div for each column
    const wrapper = document.createElement('div');
    if (headingLink) wrapper.appendChild(headingLink);
    if (list) wrapper.appendChild(list);
    return wrapper;
  });

  // The block table: header row, then one row with all columns
  const rows = [headerRow, columnCells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
