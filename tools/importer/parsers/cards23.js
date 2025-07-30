/* global WebImporter */
export default function parse(element, { document }) {
  // Block name as required by the example
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Find all tab panes (even if only one is active, import all)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((pane) => {
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is a link (a) in the grid
    Array.from(grid.children).forEach((card) => {
      // IMAGE CELL: get <img> inside card (if present, usually inside a <div>)
      const img = card.querySelector('img');
      // Always reference the <img> element, not a clone
      const imageCell = img ? img : '';

      // TEXT CELL: heading & description
      let textCellElems = [];

      // Find heading (usually <h3> or .h4-heading)
      const heading = card.querySelector('h3, .h4-heading');
      if (heading) textCellElems.push(heading);

      // Find description (usually .paragraph-sm, not inside the heading)
      // Only use description outside of heading
      const desc = card.querySelector('.paragraph-sm');
      if (desc) textCellElems.push(desc);

      // Fallback: if no heading or desc, use card textContent (shouldn't occur in this block)
      if (textCellElems.length === 0) {
        const fallback = document.createElement('div');
        fallback.textContent = card.textContent.trim();
        textCellElems = [fallback];
      }

      rows.push([imageCell, textCellElems]);
    });
  });

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
