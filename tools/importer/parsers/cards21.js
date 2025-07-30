/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as in the example
  const headerRow = ['Cards (cards21)'];

  // Defensive: handle element variations
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // Try fallback: maybe the structure is slightly different
    cardBody = element.querySelector('[class*="card-body"]');
  }
  if (!cardBody) return;

  // Find the main image (first img in cardBody)
  const img = cardBody.querySelector('img');

  // Find a heading (any h* or class that indicates heading)
  let title = cardBody.querySelector('.h4-heading');
  if (!title) {
    title = cardBody.querySelector('h4, h3, h2, h1');
  }

  // Compose the text cell
  const textCell = [];
  if (title) textCell.push(title);
  // Add description if present (any p, span, or not-title text node after heading)
  // In this HTML, only the title exists, but let's future-proof:
  let foundDescription = false;
  cardBody.childNodes.forEach((node) => {
    if (node === title) {
      foundDescription = true;
    } else if (foundDescription && node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      // Direct text after heading
      const p = document.createElement('p');
      p.textContent = node.textContent.trim();
      textCell.push(p);
    } else if (foundDescription && node.nodeType === Node.ELEMENT_NODE && node !== img && node !== title) {
      // Any element after heading that isn't the image
      textCell.push(node);
    }
  });

  // If no image, use empty string (to maintain 2 columns)
  const cardRow = [img || '', textCell.length ? textCell : ''];

  // Build the table
  const tableCells = [headerRow, cardRow];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(table);
}
