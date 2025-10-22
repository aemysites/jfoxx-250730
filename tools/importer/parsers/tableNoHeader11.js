/* global WebImporter */
export default function parse(element, { document }) {
  // Table block name header row
  const headerRow = ['Table (no header, tableNoHeader11)'];
  const cells = [headerRow];

  // Find all <li> elements inside any <ul> descendant of element
  const listItems = Array.from(element.querySelectorAll('ul li'));
  listItems.forEach((li) => {
    // Get all text content inside the <li>, including nested elements
    const text = li.textContent.trim();
    if (text) {
      cells.push([text]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
