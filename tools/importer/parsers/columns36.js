/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get immediate children (should be two columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // First column: navigation links
  let navContent = null;
  if (columns[0]) {
    // Find the <ul> inside the first column
    const navList = columns[0].querySelector('ul');
    if (navList) {
      navContent = navList;
    } else {
      navContent = columns[0]; // fallback: use the whole column
    }
  }

  // Second column: search form
  let searchContent = null;
  if (columns[1]) {
    // Find the <form> inside the second column
    const searchForm = columns[1].querySelector('form');
    if (searchForm) {
      searchContent = searchForm;
    } else {
      searchContent = columns[1]; // fallback: use the whole column
    }
  }

  // Table header row
  const headerRow = ['Columns (columns36)'];
  // Table content row: two columns, nav and search
  const contentRow = [navContent, searchContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
