/* global WebImporter */
export default function parse(element, { document }) {
  // Find the table containing the cards
  const cardsTable = element.querySelector('table.stripedTable');
  if (!cardsTable) return;

  // Get all rows in the table
  const rows = Array.from(cardsTable.querySelectorAll('tbody > tr'));

  // Prepare the block table rows
  const tableRows = [];

  // Header row as required
  const headerRow = ['Cards (cards2)'];
  tableRows.push(headerRow);

  // For each card row in the table
  rows.forEach((row) => {
    const cells = row.querySelectorAll('td');
    if (cells.length < 2) return;

    // --- Image Cell ---
    const imgLink = cells[0].querySelector('a');
    let imgElem = null;
    if (imgLink) {
      imgElem = imgLink.querySelector('img');
    }
    if (!imgElem) return;

    // --- Text Cell ---
    const textCell = cells[1];
    const titleLink = textCell.querySelector('a');
    const textFragment = document.createDocumentFragment();
    if (titleLink) {
      const titleHeading = document.createElement('h3');
      titleHeading.appendChild(titleLink.cloneNode(true));
      textFragment.appendChild(titleHeading);
    }
    // Collect all content after the title link as a single paragraph, preserving inline elements
    let foundTitle = false;
    const descParagraph = document.createElement('p');
    textCell.childNodes.forEach((node) => {
      if (!foundTitle && node === titleLink) {
        foundTitle = true;
        return;
      }
      if (foundTitle) {
        if (node.nodeType === Node.TEXT_NODE) {
          descParagraph.appendChild(document.createTextNode(node.textContent));
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName.toLowerCase() !== 'br') {
            descParagraph.appendChild(node.cloneNode(true));
          }
        }
      }
    });
    // Only append if there's actual content
    if (descParagraph.textContent.trim() || descParagraph.childNodes.length > 0) {
      textFragment.appendChild(descParagraph);
    }

    tableRows.push([imgElem.cloneNode(true), textFragment]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
