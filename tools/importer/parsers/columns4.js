/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all direct column divs
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Header row matches the required format exactly
  const headerRow = ['Columns (columns4)'];
  // Gather content for each column (each column is a cell in the row)
  const contentRow = columnDivs.map(colDiv => {
    // For this content, each colDiv has a single img (may change in future)
    // We'll include all child nodes (if more are added in future HTMLs)
    // Only keep elements (nodeType 1) or non-empty text nodes (nodeType 3)
    const nodes = Array.from(colDiv.childNodes).filter(n => {
      return n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim());
    });
    if (nodes.length === 1) {
      return nodes[0];
    }
    if (nodes.length > 1) {
      return nodes;
    }
    // If empty, provide empty string
    return '';
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
