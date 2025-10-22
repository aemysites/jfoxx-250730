/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero24) block: 1 column, 3 rows
  // Row 1: Block name
  const headerRow = ['Hero (hero24)'];

  // Row 2: Background image (none in source)
  const imageRow = [''];

  // Row 3: Content (all text content from the original HTML, preserving line breaks and structure)
  // Instead of only <p>, get all text content from the element, preserving <br> and <strong>
  const contentDiv = document.createElement('div');
  contentDiv.innerHTML = element.innerHTML; // preserves <br> and <strong>
  const contentRow = [contentDiv];

  // Build table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
