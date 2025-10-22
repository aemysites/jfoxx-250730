/* global WebImporter */
export default function parse(element, { document }) {
  // Build the table block only (per spec: only the table block, not the rest of the page)
  const table = element.querySelector('table.usa-table--striped');
  if (!table) return;

  // Extract column headers
  const sourceHeaderCells = Array.from(table.querySelectorAll('thead tr th')).map(th => th.textContent.trim());
  // Extract data rows
  const sourceRows = Array.from(table.querySelectorAll('tbody tr'));

  // Compose the rows for the block
  const rows = [];
  // Block header row (single cell)
  rows.push(['Table (striped, bordered, tableStripedBordered40)']);
  // Second row: column headers
  rows.push(sourceHeaderCells);
  // Data rows
  sourceRows.forEach(tr => {
    const cells = Array.from(tr.children).map(td => {
      const link = td.querySelector('a');
      if (link) return link;
      return td.textContent.trim();
    });
    rows.push(cells);
  });

  // Create and replace the block table only
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  table.replaceWith(blockTable);
}
