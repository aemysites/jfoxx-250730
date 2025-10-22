/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get sidebar and main content columns
  function getColumns(el) {
    // Find the main grid-row that contains sidebar and main content
    const gridRows = el.querySelectorAll('.grid-row.grid-gap');
    for (const row of gridRows) {
      const sidebar = row.querySelector('.block-gsa-left-nav');
      const mainContent = row.querySelector('.in-page-main-content');
      if (sidebar && mainContent) {
        return [sidebar, mainContent];
      }
    }
    return [];
  }

  // Get the two main columns: sidebar and main content
  let [sidebar, mainContent] = getColumns(element);
  if (!sidebar || !mainContent) {
    sidebar = element.querySelector('.block-gsa-left-nav');
    mainContent = element.querySelector('.in-page-main-content');
  }
  if (!sidebar || !mainContent) return;

  // Find the footer utility row and append to main content
  const footerRow = element.querySelector('#content_footer');
  if (footerRow) {
    // Clone to avoid moving from DOM
    mainContent.appendChild(footerRow.cloneNode(true));
  }
  // Find the Glossary button and append to main content
  const glossaryBtn = element.querySelector('.block-glossary button.glossary_open');
  if (glossaryBtn) {
    mainContent.appendChild(glossaryBtn.cloneNode(true));
  }
  // Find the "Top" button and append to main content
  const topBtn = element.querySelector('a#backtotop');
  if (topBtn) {
    mainContent.appendChild(topBtn.cloneNode(true));
  }

  // Compose table rows
  const headerRow = ['Columns (columns33)'];
  const contentRow = [sidebar, mainContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
