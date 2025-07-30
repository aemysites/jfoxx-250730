/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // The grid children: 1st is the large card, 2nd is the top right group, 3rd is the bottom right group
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;

  // 1. Left: Large feature card
  const leftCol = gridChildren[0];

  // 2. Right, upper: Two stacked smaller cards (each is an <a>)
  const rightColTop = gridChildren[1];
  const rightTopLinks = Array.from(rightColTop.querySelectorAll(':scope > a'));

  // 3. Right, lower: Several stacked headline links with dividers
  const rightColBottom = gridChildren[2];
  // Only <a>s, ignore divider divs
  const rightBottomLinks = Array.from(rightColBottom.querySelectorAll(':scope > a'));
  const rightBottomDividers = Array.from(rightColBottom.querySelectorAll(':scope > .divider'));

  // Compose the right cell, preserving order (a, divider, a, divider...)
  const rightCell = document.createElement('div');
  // First add the top two cards
  rightTopLinks.forEach(a => rightCell.appendChild(a));
  // Add some space between top and bottom content if both exist
  if (rightTopLinks.length && rightBottomLinks.length) {
    rightCell.appendChild(document.createElement('br'));
  }
  // Now add the bottom list, interleaving <a> and <hr> dividers
  rightBottomLinks.forEach((a, idx) => {
    rightCell.appendChild(a);
    if (idx < rightBottomLinks.length - 1 && rightBottomDividers[idx]) {
      // Use <hr> for divider
      const hr = document.createElement('hr');
      rightCell.appendChild(hr);
    }
  });

  // Header row as in the markdown example
  const headerRow = ['Columns (columns2)'];
  // Data row: two columns, left big card, right stacked group
  const contentRow = [leftCol, rightCell];

  // Create columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original section with the table
  element.replaceWith(table);
}
