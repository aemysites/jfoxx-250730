/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Cards (cards25)'];
  const cells = [headerRow];

  // Only process direct children divs, as each represents a card or image cell (even if some have only an image)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach(card => {
    // Try to find the image (always present)
    const img = card.querySelector('img');
    // Try to find the text container (h3 and/or p)
    let textElements = [];
    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    if (h3) textElements.push(h3);
    if (p) textElements.push(p);
    // If textElements is empty, set to empty string (so cell has empty content) else use array
    const textCell = textElements.length ? textElements : '';
    // Add the row. If there is no image, fill with empty string (will be rare, but for robustness)
    cells.push([
      img ? img : '',
      textCell
    ]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
