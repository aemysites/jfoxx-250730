/* global WebImporter */
export default function parse(element, { document }) {
  // Find the striped table in the source HTML
  const table = element.querySelector('table.usa-table--striped');
  if (!table) return;

  // Prepare the block header row
  const headerRow = ['Table (striped, tableStriped30)'];
  const rows = [headerRow];

  // Get table headers (column names) as first data row (not a header row)
  const thead = table.querySelector('thead');
  const ths = thead ? Array.from(thead.querySelectorAll('th')) : [];
  if (ths.length) {
    rows.push(ths.map(th => th.textContent.trim()));
  }

  // Get table body rows
  const tbody = table.querySelector('tbody');
  if (tbody) {
    Array.from(tbody.querySelectorAll('tr')).forEach(tr => {
      const tds = Array.from(tr.children).map(td => {
        // For the Title column, preserve the anchor element if present
        const link = td.querySelector('a');
        if (link) return link;
        // Otherwise, use textContent
        return td.textContent.trim();
      });
      rows.push(tds);
    });
  }

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original table with the block table
  table.replaceWith(blockTable);

  // Do NOT create any extra tables for page text
  // All visible page text outside the table is intentionally omitted from output
}
