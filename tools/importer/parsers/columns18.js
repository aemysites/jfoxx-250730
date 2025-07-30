/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the logical columns)
  const gridChildren = Array.from(grid.children);

  // Prepare left and right cell content
  let leftFragment = document.createDocumentFragment();
  let leftContent;
  let listContent;
  let imgContent;

  for (const child of gridChildren) {
    if (!leftContent && child.tagName === 'DIV' && child.querySelector('h2') && child.querySelector('h3')) {
      leftContent = child;
    } else if (!listContent && child.tagName === 'UL') {
      listContent = child;
    } else if (!imgContent && child.tagName === 'IMG') {
      imgContent = child;
    }
  }
  if (leftContent) leftFragment.appendChild(leftContent);
  if (listContent) leftFragment.appendChild(listContent);
  const leftCell = leftFragment.childNodes.length ? leftFragment : '';
  const rightCell = imgContent || '';

  // Header row: single cell, not spanning multiple (table headers in HTML always occupy one cell, but can visually span columns with colspan, which is up to rendering logic)
  const cells = [
    ['Columns (columns18)'], // header row, ONE cell
    [leftCell, rightCell]    // content row, TWO cells/columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
