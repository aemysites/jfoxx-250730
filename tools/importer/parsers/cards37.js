/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract text content: heading, description, and optional CTA
  function getTextContent(container) {
    const fragment = document.createDocumentFragment();
    // Get heading: h2, h3, h4, h5, h6 (only the first one in context)
    const heading = container.querySelector('h2, h3, h4, h5, h6');
    if (heading) fragment.appendChild(heading);
    // Get the first <p> (description)
    const desc = container.querySelector('p');
    if (desc) fragment.appendChild(desc);
    // Get a button or CTA if present
    const button = container.querySelector('.button, button, a.button');
    if (button) fragment.appendChild(button);
    return fragment;
  }

  // Find the main grid containing cards
  let mainGrid = element.querySelector('.grid-layout');
  // Defensive: if the top-level grid is not present, fallback to element itself
  if (!mainGrid) mainGrid = element;

  // Gather all card elements, flattening sub-grids if necessary
  let cards = [];
  Array.from(mainGrid.children).forEach(child => {
    if (child.classList && child.classList.contains('grid-layout')) {
      // Child grid: get all cards inside
      Array.from(child.children).forEach(subChild => {
        if (subChild.tagName === 'A') cards.push(subChild);
      });
    } else if (child.tagName === 'A') {
      cards.push(child);
    }
  });

  // Build table rows: header first
  const rows = [['Cards (cards37)']];
  cards.forEach(card => {
    // Find image container: prefer the aspect-ratio wrapper, fallback to img
    let imgContainer = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if (!imgContainer) imgContainer = card.querySelector('img');
    // Find text container: prefer the padding wrapper, fallback to card itself
    let textContainer = card.querySelector('.utility-padding-all-2rem') || card;
    const textContent = getTextContent(textContainer);
    rows.push([
      imgContainer || '',
      textContent.childNodes.length ? textContent : ''
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
