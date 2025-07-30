/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row - matches the example
  const headerRow = ['Cards (cards7)'];

  // Each immediate child div is a card wrapper
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each card: first cell is the image, second cell is empty (no text content in this HTML)
  const rows = cardDivs.map(cardDiv => {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    return [img, '']; // Second cell is empty since there's no text element
  });

  // Build the final cells array for the table
  const cells = [headerRow, ...rows];

  // Create the table using the utility
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
