/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards13) block parsing
  const cardSelector = '.grid-row.grid-gap-md.padding-205.bg-accent-warm-lighter.margin-bottom-3.width-full';
  const cards = Array.from(element.querySelectorAll(cardSelector));

  // Table header row
  const headerRow = ['Cards (cards13)'];
  const rows = [headerRow];

  // For each card, extract image (first column) and text content (second column)
  cards.forEach(card => {
    // Image column: find the first img inside the card
    const imgCol = card.querySelector('img');

    // Text column: find the right-side content
    let textCol = Array.from(card.querySelectorAll('div')).find(div =>
      div.className && div.className.includes('grid-col-8')
    );
    if (!textCol) {
      textCol = Array.from(card.querySelectorAll('div')).find(div =>
        div.className && div.className.includes('grid-col-12')
      );
    }
    if (!textCol) {
      // fallback to the second child div if not found
      const divs = card.querySelectorAll('div');
      textCol = divs[1] || card;
    }
    // Extract the full HTML content of the text column
    const cell = document.createElement('div');
    cell.innerHTML = textCol.innerHTML;
    rows.push([
      imgCol,
      cell
    ]);
  });

  // Extract sidebar content (Resources) and add as a separate table below the cards table
  const sidebar = element.querySelector('.body_content--sidebar-column');
  if (sidebar) {
    // Create a new table for sidebar content
    const sidebarRows = [['Resources']];
    const sidebarArticle = sidebar.querySelector('article');
    if (sidebarArticle) {
      const sidebarCell = document.createElement('div');
      sidebarCell.innerHTML = sidebarArticle.innerHTML;
      sidebarRows.push([sidebarCell]);
    }
    const sidebarTable = WebImporter.DOMUtils.createTable(sidebarRows, document);
    // Insert the sidebar table after the cards table
    const block = WebImporter.DOMUtils.createTable(rows, document);
    block.after(sidebarTable);
    element.replaceWith(block);
  } else {
    // Create the block table
    const block = WebImporter.DOMUtils.createTable(rows, document);
    // Replace the original element with the new block table
    element.replaceWith(block);
  }
}
