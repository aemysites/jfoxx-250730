/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row for the block table
  const rows = [
    ['Cards']
  ];

  // Get all immediate child divs (cards)
  const cards = element.querySelectorAll(':scope > div');
  cards.forEach((cardDiv) => {
    // Each card has a <p> containing the card description
    const p = cardDiv.querySelector('p');
    if (p) {
      rows.push([p]);
    }
  });

  // Build and replace the element with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
