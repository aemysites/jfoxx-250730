/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card column
  function extractCardContent(cardCol) {
    // Image (mandatory)
    let img = cardCol.querySelector('img');
    // Text content (title, description, links)
    const textContent = document.createElement('div');
    // Title (h2 with link)
    const h2 = cardCol.querySelector('h2');
    if (h2) textContent.appendChild(h2);
    // Description (p)
    const desc = cardCol.querySelector('p');
    if (desc && desc.textContent.trim() && desc.textContent.trim() !== '\u00A0') {
      textContent.appendChild(desc);
    }
    // List of links (ul.field__items)
    const linksList = cardCol.querySelector('ul.field__items');
    if (linksList) textContent.appendChild(linksList);
    return [img, textContent];
  }

  // Find all card rows
  const cardRows = Array.from(element.querySelectorAll('.grid-row.three-col'));
  const cards = [];
  cardRows.forEach(row => {
    const cols = Array.from(row.children).filter(col => col.className.includes('tablet:grid-col-4'));
    cols.forEach(col => {
      // Defensive: skip empty columns (those with only <p>&nbsp;</p>)
      if (col.textContent.trim() === '\u00A0') return;
      // Only push if there is actual card content (must have an image)
      if (col.querySelector('img')) {
        cards.push(extractCardContent(col));
      }
    });
  });

  // Header row
  const headerRow = ['Cards (cards28)'];
  // Build table rows: each card is a row with [image, text content]
  const tableRows = cards.map(([img, textContent]) => [img, textContent]);
  const cells = [headerRow, ...tableRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
