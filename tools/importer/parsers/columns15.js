/* global WebImporter */
export default function parse(element, { document }) {
  // Find the column grid layout (with multiple columns)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  
  // Each direct child of the grid is a column
  const columns = Array.from(grid.children);
  
  // For each column, collect all child elements and text nodes (to ensure all text content is included)
  const contentRow = columns.map(col => {
    // For each column, if it's a DIV, we include all its child nodes (elements and text)
    if (col.tagName === 'DIV') {
      const nodes = [];
      col.childNodes.forEach(node => {
        // Omit empty text nodes, but include all else
        if (node.nodeType === 3 && node.textContent.trim() !== '') {
          nodes.push(document.createTextNode(node.textContent));
        } else if (node.nodeType === 1) {
          nodes.push(node);
        }
      });
      if (nodes.length === 1) return nodes[0];
      if (nodes.length > 1) return nodes;
      return '';
    }
    // If not a div (e.g. img), just include as is
    return col;
  });

  // The first row is always the block name, exactly as required
  const headerRow = ['Columns (columns15)'];
  
  // Create the table block and replace the original element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
