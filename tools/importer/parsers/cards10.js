/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row exactly as in the example
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Collect each card (direct child <a> elements)
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // First column: image (first <img> in card)
    let imgEl = card.querySelector('img');

    // Second column: text content (tag, heading, description)
    const textParts = [];
    // Tag
    const tag = card.querySelector('.tag-group .tag');
    if (tag) {
      // Reference the existing tag element, but wrap in a div for display, as in visual example
      const tagDiv = document.createElement('div');
      tagDiv.appendChild(tag);
      textParts.push(tagDiv);
    }
    // Heading (h3)
    const heading = card.querySelector('h3');
    if (heading) {
      textParts.push(heading);
    }
    // Description (p)
    const para = card.querySelector('p');
    if (para) {
      textParts.push(para);
    }
    rows.push([
      imgEl || '',
      textParts
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
