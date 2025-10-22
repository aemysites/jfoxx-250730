/* global WebImporter */
export default function parse(element, { document }) {
  // Only extract the cards block content: header row and card rows (image + text)
  const cardsContainer = element.querySelector('.gsa-in-page-nav-main-content');
  if (!cardsContainer) return;

  // Find all card rows: direct children .grid-row.grid-gap
  const cardRows = Array.from(cardsContainer.querySelectorAll(':scope > .grid-row.grid-gap'));
  if (!cardRows.length) return;

  // Prepare the header row
  const headerRow = ['Cards (cards41)'];
  const rows = [headerRow];

  // For each card row, extract image and text (all content in .grid-col-9)
  cardRows.forEach(cardRow => {
    // Image cell: .grid-col-3 img
    const imgCol = cardRow.querySelector('.grid-col-3 img');
    // Text cell: .grid-col-9 (grab all content, not just <p>)
    const textCol = cardRow.querySelector('.grid-col-9');
    if (!imgCol || !textCol) return;
    // Clone the textCol to preserve all its children (links, text, etc.)
    const textCell = document.createElement('div');
    Array.from(textCol.childNodes).forEach(node => textCell.appendChild(node.cloneNode(true)));
    rows.push([imgCol, textCell]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
