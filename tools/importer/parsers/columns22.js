/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get direct children for layout
  const children = element.querySelectorAll(':scope > div');
  // Expecting two columns: left (heading), right (social links)
  let headingCell = null;
  let linksCell = null;

  if (children.length === 2) {
    // Left column: heading
    headingCell = children[0];
    // Right column: social links
    linksCell = children[1];
  } else {
    // Fallback: try to find heading and links
    headingCell = element.querySelector('.social-header') || element;
    linksCell = element.querySelector('.social-links') || element;
  }

  // Table header row
  const headerRow = ['Columns (columns22)'];
  // Second row: two columns, heading and links
  const secondRow = [headingCell, linksCell];

  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
