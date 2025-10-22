/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns28)'];

  // Get all direct child columns of the grid-row
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, collect only its semantic content (not the wrapper div)
  const cells = columns.map((col) => {
    // Gather all children of the column div (h2, ul, p, etc.)
    return Array.from(col.childNodes).filter((node) => {
      // Only include element nodes and text nodes with non-whitespace
      return node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    });
  });

  // Build the table rows: header, then one row with all columns
  const tableRows = [headerRow, cells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
