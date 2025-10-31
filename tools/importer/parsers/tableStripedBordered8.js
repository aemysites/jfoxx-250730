/* global WebImporter */
export default function parse(element, { document }) {
  // Find the support table under the Support section
  const supportHeader = Array.from(element.querySelectorAll('h2, h3'))
    .find(h => h.textContent.trim().toLowerCase() === 'support');
  if (!supportHeader) return;

  // The table is the next table after the Support header
  let table = supportHeader.nextElementSibling;
  while (table && table.tagName !== 'TABLE') {
    table = table.nextElementSibling;
  }
  if (!table) return;

  // Extract column headers as plain text for the second row
  const headerCells = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());

  // Extract all data rows, preserving HTML elements (e.g., links)
  const dataRows = Array.from(table.querySelectorAll('tbody tr')).map(tr =>
    Array.from(tr.children).map(cell => {
      if (cell.childNodes.length === 1 && cell.childNodes[0].nodeType === 3) {
        return cell.textContent.trim();
      }
      // If cell contains elements (like links), return array of nodes
      return Array.from(cell.childNodes).map(n => n.cloneNode(true));
    })
  );

  // Compose block rows: header row, then column headers, then data rows
  const blockRows = [
    ['Table (striped, bordered, tableStripedBordered8)'],
    headerCells,
    ...dataRows
  ];

  const block = WebImporter.DOMUtils.createTable(blockRows, document);
  table.replaceWith(block);
}
