/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // 1. Header row for Cards block
  const headerRow = ['Cards (cards35)'];
  rows.push(headerRow);

  // 2. Cards (only the cards, two columns per row)
  const cardGroup = element.querySelector('.usa-card-group');
  if (cardGroup) {
    const cardItems = Array.from(cardGroup.querySelectorAll('.usa-card'));
    cardItems.forEach(card => {
      // Image cell
      let imgCell = null;
      const img = card.querySelector('img');
      if (img) {
        imgCell = img.cloneNode(true);
      }
      // Text cell
      const textCellElements = [];
      // Title
      const heading = card.querySelector('.usa-card__heading');
      if (heading) {
        const h2 = document.createElement('h2');
        h2.textContent = heading.textContent.trim();
        textCellElements.push(h2);
      }
      // Description and CTA (get all text, including links and text nodes)
      const body = card.querySelector('.usa-card__body');
      if (body) {
        Array.from(body.childNodes).forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            textCellElements.push(node.cloneNode(true));
          } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            textCellElements.push(document.createTextNode(node.textContent));
          }
        });
      }
      rows.push([
        imgCell,
        textCellElements
      ]);
    });
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
