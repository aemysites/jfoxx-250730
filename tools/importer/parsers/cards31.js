/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards31) block parsing for historic buildings page

  // Helper to extract card rows from the main content
  function extractCards(container) {
    const cards = [];
    // Look for grid-row.grid-gap pairs that contain cards
    const cardRows = container.querySelectorAll('.grid-row.grid-gap');
    cardRows.forEach((row) => {
      // Each row has two columns: image (grid-col-3) and text (grid-col-9)
      const imgCol = row.querySelector('.grid-col-3');
      const textCol = row.querySelector('.grid-col-9');
      if (imgCol && textCol) {
        // Find the image (mandatory)
        const img = imgCol.querySelector('img');
        // For text: include ALL content in textCol (not just headings, paragraphs, lists)
        // This ensures we don't miss any text
        const textContent = Array.from(textCol.childNodes).filter(node => {
          // Exclude empty text nodes
          return node.nodeType !== Node.TEXT_NODE || node.textContent.trim();
        });
        // Add assembled card row
        cards.push([
          img || '', // image cell
          textContent // text cell (array of elements and/or text nodes)
        ]);
      }
    });
    return cards;
  }

  // Find the main card container
  const mainContent = element.querySelector('.gsa-in-page-nav-main-content');
  if (!mainContent) return;

  // Get the introductory text above the cards (strong inside first p)
  let introText = '';
  const introP = mainContent.querySelector('p strong');
  if (introP && introP.textContent.trim()) {
    introText = introP.textContent.trim();
  }
  // If found, add the intro text to the first card's text content
  const headerRow = ['Cards (cards31)'];
  const cardRows = extractCards(mainContent);
  if (introText && cardRows.length > 0) {
    // Prepend intro text to the first card's text cell
    if (Array.isArray(cardRows[0][1])) {
      cardRows[0][1].unshift(document.createTextNode(introText));
    }
  }
  const tableData = [headerRow, ...cardRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
