/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match exactly
  const headerRow = ['Hero (hero6)'];

  // Find the background image (img with class 'cover-image')
  const bgImg = element.querySelector('img.cover-image');
  const imgRow = [bgImg ? bgImg : ''];

  // Find the card containing heading, subheading, CTAs
  const card = element.querySelector('.card');
  // If content is missing, ensure empty string so row is added
  const contentRow = [card ? card : ''];

  // Build the table as in the example (no extra rows/cells)
  const cells = [headerRow, imgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
