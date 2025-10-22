/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main technical procedures table in the element
  const table = element.querySelector('table.usa-table.scrollTable_search');
  if (!table) return;

  // Extract column headers from the first visible header row (not the sizing row)
  let columnHeaders = [];
  const theads = table.querySelectorAll('thead');
  for (const thead of theads) {
    const tr = thead.querySelector('tr');
    if (tr && tr.querySelectorAll('th').length === 4) {
      columnHeaders = Array.from(tr.querySelectorAll('th')).map(th => th.textContent.trim());
      break;
    }
  }
  if (columnHeaders.length !== 4) {
    columnHeaders = ['Title', 'Division', 'Procedure Type', 'Section'];
  }

  // Get all data rows from the table
  const bodyRows = Array.from(table.querySelectorAll('tbody > tr'));

  // For each row, extract the four columns
  const dataRows = bodyRows.map(tr => {
    const tds = Array.from(tr.querySelectorAll('td'));
    if (tds.length < 4) return null;
    // Title cell: preserve the link (clone to avoid DOM move)
    const titleLink = tds[0].querySelector('a');
    let titleCell;
    if (titleLink) {
      const a = document.createElement('a');
      // Use absolute URL if possible
      a.href = titleLink.href;
      a.textContent = titleLink.textContent;
      titleCell = a;
    } else {
      titleCell = tds[0].textContent.trim();
    }
    const divisionCell = tds[1].textContent.trim();
    const typeCell = tds[2].textContent.trim();
    const sectionCell = tds[3].textContent.trim();
    return [titleCell, divisionCell, typeCell, sectionCell];
  }).filter(Boolean);

  // Compose the block table
  // First row: block name (single cell)
  const headerRow = ['Table (striped, bordered, tableStripedBordered15)'];
  // Compose all rows: header row, then column header row, then data rows
  const cells = [headerRow, columnHeaders, ...dataRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block (not just the table!)
  element.replaceWith(block);
}
