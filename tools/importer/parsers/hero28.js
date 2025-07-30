/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per the example and block info
  const headerRow = ['Hero (hero28)'];

  // Prepare the background image row
  let backgroundImg = '';
  // Safely find the grid and its first child for the image
  const grid = element.querySelector('.w-layout-grid');
  if (grid && grid.children.length > 0) {
    const imgParent = grid.children[0];
    const img = imgParent.querySelector('img');
    if (img) {
      backgroundImg = img;
    }
  }

  // Prepare the content row: heading, subheading, CTA (if present)
  let contentElements = [];
  if (grid && grid.children.length > 1) {
    const contentParent = grid.children[1];
    // Look for elements inside the main container
    // Search for heading(s)
    const headings = contentParent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(h => contentElements.push(h));
    // Look for any paragraph text
    const paragraphs = contentParent.querySelectorAll('p');
    paragraphs.forEach(p => contentElements.push(p));
    // Look for any call-to-action (e.g., link or button)
    // The button group may contain buttons or links
    const buttonGroup = contentParent.querySelector('.button-group');
    if (buttonGroup && buttonGroup.children.length > 0) {
      // Add all children (button, a, etc.)
      Array.from(buttonGroup.children).forEach(btn => contentElements.push(btn));
    }
  }

  // Build the table rows
  const rows = [
    headerRow,
    [backgroundImg],
    [contentElements.length > 0 ? contentElements : '']
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
