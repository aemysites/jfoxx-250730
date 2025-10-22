/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main table inside the wrapper
  const table = element.querySelector('table');
  if (!table) return;

  // Compose the cells array for createTable
  const cells = [];
  // Block name header row
  cells.push(['Table (striped, bordered, tableStripedBordered17)']);

  // Get header cells (all columns, even if hidden)
  const thead = table.querySelector('thead');
  let headerRow = [];
  if (thead) {
    const tr = thead.querySelector('tr');
    if (tr) {
      headerRow = Array.from(tr.children).map(th => th.textContent.trim());
      cells.push(headerRow);
    }
  }

  // Get body rows (all columns, even if hidden)
  const tbody = table.querySelector('tbody');
  if (tbody) {
    Array.from(tbody.children).forEach((tr) => {
      const row = Array.from(tr.children).map(td => {
        // For email column, preserve the anchor element if present
        const a = td.querySelector('a[href^="mailto:"]');
        if (a) {
          return a.cloneNode(true);
        }
        return td.textContent.trim();
      });
      cells.push(row);
    });
  }

  // Replace original element with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
