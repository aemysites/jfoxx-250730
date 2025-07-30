/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table Header
  const headerRow = ['Hero (hero20)'];

  // 2. Background Image(s) row
  let backgroundCell = '';
  // Find the grid that contains background images (the mosaic)
  const layoutGrid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  if (layoutGrid) {
    // Find all direct img children in the grid (mosaic images)
    const bgImages = Array.from(layoutGrid.querySelectorAll('img'));
    if (bgImages.length === 1) {
      backgroundCell = bgImages[0];
    } else if (bgImages.length > 1) {
      // Reference all images in a div for robustness
      const bgDiv = document.createElement('div');
      bgImages.forEach(img => bgDiv.appendChild(img));
      backgroundCell = bgDiv;
    }
  }

  // 3. Content Row (headline, subtitle, CTA)
  let contentCell = '';
  // Find the content wrapper (the text + CTAs)
  const contentWrapper = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentWrapper) {
    // Reference all direct children (usually h1, p, button group)
    const children = Array.from(contentWrapper.children);
    if (children.length === 1) {
      contentCell = children[0];
    } else if (children.length > 1) {
      // Wrap children in a <div> if needed
      const contentDiv = document.createElement('div');
      children.forEach(child => contentDiv.appendChild(child));
      contentCell = contentDiv;
    }
  }

  const cells = [
    headerRow,
    [backgroundCell],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
