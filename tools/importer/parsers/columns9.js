/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns9)'];

  // Find the left sidebar navigation
  const leftSidebar = element.querySelector('aside#block-gsaleftnav');

  // Find the main content
  const mainContent = element.querySelector('[class*="in-page-main-content"]');

  // Find the right sidebar content (article)
  const rightSidebar = element.querySelector('.body_content--sidebar-column');

  // Find the footer (Glossary button and last updated)
  const footer = element.querySelector('.topic_page_footer--container');

  // Defensive: fallback to empty divs if not found
  const leftCell = leftSidebar || document.createElement('div');
  const middleCell = mainContent || document.createElement('div');
  // Combine right sidebar and footer into one cell
  const rightCell = document.createElement('div');
  if (rightSidebar) rightCell.appendChild(rightSidebar.cloneNode(true));
  if (footer) rightCell.appendChild(footer.cloneNode(true));

  // Build the columns row (three columns)
  const columnsRow = [leftCell, middleCell, rightCell];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
