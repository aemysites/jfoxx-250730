/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns18)'];

  // Find the three-column info block below main content
  // It has: .grid-row.grid-gap.three-col > .mobile:grid-col-4
  const infoBlock = element.querySelector('.block_location--bottom article .grid-row.three-col');
  let columns = [];
  if (infoBlock) {
    // Each column is a direct child
    const colEls = Array.from(infoBlock.children);
    // For each column, collect all its visible content (not just elements)
    columns = colEls.map(col => {
      // Create a wrapper div to hold all content in the column
      const wrapper = document.createElement('div');
      // Copy all children (including text nodes)
      Array.from(col.childNodes).forEach(node => {
        wrapper.appendChild(node.cloneNode(true));
      });
      return wrapper;
    });
  }

  // Defensive: If not found, fallback to any .grid-row.three-col
  if (columns.length === 0) {
    const fallback = element.querySelector('.grid-row.three-col');
    if (fallback) {
      columns = Array.from(fallback.children).map(col => {
        const wrapper = document.createElement('div');
        Array.from(col.childNodes).forEach(node => {
          wrapper.appendChild(node.cloneNode(true));
        });
        return wrapper;
      });
    }
  }

  // --- TABLE STRUCTURE ---
  // Only create the columns row if columns are found
  const rows = [headerRow];
  if (columns.length > 0) {
    rows.push(columns);
  }

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
