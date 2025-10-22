/* global WebImporter */
export default function parse(element, { document }) {
  // Table block name header row
  const headerRow = ['Table (striped, bordered, tableStripedBordered32)'];

  // Collect all visible text content before the table (heading, buttons, filters)
  const content = [];
  // Heading
  const heading = element.querySelector('.view-header h2');
  if (heading) content.push(heading.textContent.trim());
  // Past events button
  const pastEventsBtn = element.querySelector('.view-header .usa-button');
  if (pastEventsBtn) content.push(pastEventsBtn.cloneNode(true));
  // Filters
  const filters = element.querySelector('.view-filters');
  if (filters) content.push(filters.cloneNode(true));

  // Find the table within the block
  const table = element.querySelector('table');
  if (!table) return;

  // Get table header cells (to determine columns)
  const thead = table.querySelector('thead');
  const headerCells = Array.from(thead.querySelectorAll('th'));
  const columnHeaderRow = headerCells.map(th => th.textContent.trim());

  // Get table body rows
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  // For each row, build an array of cell contents
  const dataRows = rows.map(tr => {
    const tds = Array.from(tr.querySelectorAll('td'));
    return tds.map(td => {
      // If cell contains text and elements (e.g., link + description), preserve all
      if (td.childNodes.length > 1) {
        return Array.from(td.childNodes);
      }
      // If cell contains a single element (e.g., div), use its text
      if (td.children.length === 1 && td.firstElementChild.tagName === 'DIV') {
        return td.firstElementChild.textContent.trim();
      }
      // Otherwise, use the text content
      return td.textContent.trim();
    });
  });

  // Compose the final table rows
  const cells = [
    headerRow,
    ...dataRows
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Compose all content into a wrapper div
  const wrapper = document.createElement('div');
  content.forEach(item => {
    if (typeof item === 'string') {
      const p = document.createElement('p');
      p.textContent = item;
      wrapper.appendChild(p);
    } else {
      wrapper.appendChild(item);
    }
  });
  wrapper.appendChild(block);

  // Replace the original element with the wrapper
  element.replaceWith(wrapper);
}
