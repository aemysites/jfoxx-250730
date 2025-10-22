/* global WebImporter */
export default function parse(element, { document }) {
  // Extract main cards only (no sidebar, no footer, no utility rows)
  const cardRows = Array.from(
    element.querySelectorAll('.grid-row.grid-gap-md.padding-205.bg-accent-warm-lighter')
  );

  if (!cardRows.length) return;

  // Header row as required
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  cardRows.forEach(card => {
    // Image: find the first child div that contains an img
    const imgCol = Array.from(card.children).find(div => div.querySelector('img'));
    const imgEl = imgCol ? imgCol.querySelector('img') : '';
    const imgCell = imgEl || '';

    // Text: find the child div that contains the h2 (title) and p (description)
    const textCol = Array.from(card.children).find(div => div.querySelector('h2'));
    let textCell = '';
    if (textCol) {
      const cellContent = [];
      // Add h2 (title with link)
      const h2 = textCol.querySelector('h2');
      if (h2) cellContent.push(h2);
      // Add all paragraphs (description)
      textCol.querySelectorAll('p').forEach(p => cellContent.push(p));
      textCell = cellContent;
    }
    rows.push([imgCell, textCell]);
  });

  // Sidebar content (add as a separate card, only if it contains meaningful text)
  const sidebar = element.querySelector('.body_content--sidebar-column .block_location--right');
  if (sidebar) {
    // Only add if there is meaningful content
    const sidebarText = sidebar.textContent.replace(/\s+/g, ' ').trim();
    if (sidebarText) {
      const sidebarContent = [];
      const h2 = sidebar.querySelector('h2');
      if (h2) sidebarContent.push(h2);
      sidebar.querySelectorAll('p').forEach(p => {
        if (p.textContent.replace(/\s+/g, '').length > 0 && p.textContent.replace(/\s+/g, '').replace(/&nbsp;/g, '').length > 0) {
          sidebarContent.push(p);
        }
      });
      sidebar.querySelectorAll('a').forEach(a => sidebarContent.push(a));
      if (sidebarContent.length) rows.push(['', sidebarContent]);
    }
  }

  // Footer content (add as a separate card, only if it contains meaningful text)
  const lastReviewed = element.querySelector('.last-reviewed .margin-top-05');
  if (lastReviewed && lastReviewed.textContent.replace(/\s+/g, '').length > 0) {
    rows.push(['', lastReviewed.textContent.trim()]);
  }

  // Replace element with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
