/* global WebImporter */
export default function parse(element, { document }) {
  // Find the table containing the photo gallery
  const table = element.querySelector('table.usa-table');
  if (!table) return;

  // Prepare the block header row
  const headerRow = ['Table (striped, bordered, tableStripedBordered23)'];
  const rows = [headerRow];

  // Add the column headers row (from the original table)
  const thead = table.querySelector('thead');
  if (thead) {
    const ths = Array.from(thead.querySelectorAll('th'));
    if (ths.length) {
      rows.push(ths.map(th => th.textContent.trim()));
    }
  }

  // Get all tbody rows from the source table
  const tbody = table.querySelector('tbody');
  if (!tbody) return;
  const trList = Array.from(tbody.querySelectorAll('tr'));

  // For each row, extract the photo and gallery info
  trList.forEach((tr) => {
    const tds = tr.querySelectorAll('td');
    if (tds.length < 2) return;

    // Photo cell: extract all child nodes as an array
    const photoCell = Array.from(tds[0].childNodes);
    // Gallery cell: extract all child nodes as an array
    const galleryCell = Array.from(tds[1].childNodes);

    rows.push([
      photoCell,
      galleryCell
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original table with the block table
  table.replaceWith(block);
}
