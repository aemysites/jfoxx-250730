/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid as columns
  const columnDivs = Array.from(grid.children);

  // For each column, extract the main visible content block (usually the innermost child)
  const colsContent = columnDivs.map(col => {
    // Find the innermost child that holds the content
    let content = col;
    // Drill down if there is only one child and it's a div
    while (content && content.children && content.children.length === 1 && content.firstElementChild.tagName === 'DIV') {
      content = content.firstElementChild;
    }
    // If only one child, just return that child (likely an <img> or similar)
    if (content && content.children.length === 1) {
      return content.firstElementChild;
    }
    // Else, return all children as an array (preserves possible text+image or other content)
    if (content && content.children.length > 1) {
      return Array.from(content.children);
    }
    // Fallback: return the div itself
    return content;
  });

  // The header row is a single cell as per the example
  const cells = [
    ['Columns (columns16)'],
    colsContent // this will be an array with as many columns as needed
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
