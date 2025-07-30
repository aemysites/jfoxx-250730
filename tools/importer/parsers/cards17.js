/* global WebImporter */
export default function parse(element, { document }) {
  // The Cards (cards17) block always starts with header row with the block name
  const rows = [['Cards (cards17)']];

  // Get all direct card containers (each contains one image)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach(cardDiv => {
    // Use the actual <img> element for the card's image
    const img = cardDiv.querySelector('img');
    // 2 columns: image | text (if present)
    // In this HTML, there is no text content, so the text cell is empty
    rows.push([
      img,
      ''
    ]);
  });

  // Create and insert the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
