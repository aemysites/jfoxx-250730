/* global WebImporter */
export default function parse(element, { document }) {
  // Find the direct container with grid-layout (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate column children
  const cols = Array.from(grid.children);
  if (cols.length !== 2) return; // Defensive: only expected two columns

  // Identify image and text columns
  let imgCol = null;
  let textCol = null;
  for (const c of cols) {
    if (c.tagName === 'IMG') imgCol = c;
    else textCol = c;
  }
  if (!imgCol || !textCol) return;

  // Prepare header and content rows
  const headerRow = ['Columns (columns32)'];
  const contentRow = [imgCol, textCol];
  
  // Build the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
