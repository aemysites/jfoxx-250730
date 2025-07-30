/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Group all children of the grid into a single div (for the first column)
  const colDiv = document.createElement('div');
  Array.from(grid.children).forEach(child => colDiv.appendChild(child));

  // The first column gets all grouped content, second column is empty
  const headerRow = ['Columns (columns14)'];
  const contentRow = [colDiv, ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
