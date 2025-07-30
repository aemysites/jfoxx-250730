/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each column)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Prepare header row as a single cell (matching the desired output structure)
  const headerRow = [
    {
      // Use an object to signal special handling for single-cell header row (colspan)
      value: 'Columns (columns9)',
      colspan: columns.length
    }
  ];

  // Prepare content row with each column's element in a cell
  const contentRow = columns;

  // To support tables where the header is a single cell spanning all columns,
  // we create the table manually and set colspan on the <th>
  const table = document.createElement('table');
  const headerTr = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = headerRow[0].value;
  if (columns.length > 1) {
    th.colSpan = columns.length;
  }
  headerTr.appendChild(th);
  table.appendChild(headerTr);

  const contentTr = document.createElement('tr');
  columns.forEach(col => {
    const td = document.createElement('td');
    td.append(col);
    contentTr.appendChild(td);
  });
  table.appendChild(contentTr);

  element.replaceWith(table);
}
