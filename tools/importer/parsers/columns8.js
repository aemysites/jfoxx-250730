/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns8)'];

  // Find the print/share icons container and last updated text
  const iconsContainer = element.querySelector('.page-print');
  const lastUpdatedContainer = element.querySelector('.last-reviewed');

  // Gather all icon anchors and their associated tooltip text
  let iconsCellContent = [];
  if (iconsContainer) {
    // Get all anchors (icons)
    const anchors = Array.from(iconsContainer.querySelectorAll('a'));
    anchors.forEach((a) => {
      // Clone the anchor
      const anchorClone = a.cloneNode(true);
      iconsCellContent.push(anchorClone);
    });
    // Get all tooltip bodies (these are visible on hover)
    const tooltips = Array.from(iconsContainer.querySelectorAll('.usa-tooltip__body'));
    tooltips.forEach((tip) => {
      // Clone tooltip span
      iconsCellContent.push(tip.cloneNode(true));
    });
  }

  // Get all visible content from the last updated container
  let lastUpdatedCellContent = '';
  if (lastUpdatedContainer) {
    lastUpdatedCellContent = lastUpdatedContainer.textContent.trim();
  }

  // Build the table rows
  const contentRow = [iconsCellContent, lastUpdatedCellContent];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
