/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children
  const getDirectChildren = (el, selector) => Array.from(el.children).filter(child => child.matches(selector));

  // Find sidebar navigation (left column)
  let sidebar = null;
  const aside = element.querySelector('aside.block-gsa-left-nav');
  if (aside) {
    // Find the nav list inside the aside
    const nav = aside.querySelector('nav');
    if (nav) {
      sidebar = nav;
    }
  }

  // Find main content (right column)
  let mainContent = null;
  const mainContentDiv = element.querySelector('.in-page-main-content');
  if (mainContentDiv) {
    mainContent = document.createElement('div');
    // Grab heading, subheading, and paragraph with link
    const h1 = mainContentDiv.querySelector('h1');
    if (h1) mainContent.appendChild(h1);
    const navMain = mainContentDiv.querySelector('.gsa-in-page-nav-main-content');
    if (navMain) {
      // Add all children (h2, p)
      Array.from(navMain.children).forEach(child => {
        mainContent.appendChild(child);
      });
    }
  }

  // Find footer row (print/share icons, last updated, glossary)
  let footerContent = null;
  const footerRow = element.querySelector('.footer-row');
  if (footerRow) {
    // We'll include the entire footer row as a block
    footerContent = footerRow;
  }
  // Find glossary button (sometimes outside footerRow)
  const glossaryBlock = element.querySelector('.block-glossary');
  let glossaryBtn = null;
  if (glossaryBlock) {
    const btn = glossaryBlock.querySelector('button');
    if (btn) glossaryBtn = glossaryBlock;
  }

  // Compose right column: main content + footer
  const rightCol = document.createElement('div');
  if (mainContent) rightCol.appendChild(mainContent);
  if (footerContent) rightCol.appendChild(footerContent);
  if (glossaryBtn) rightCol.appendChild(glossaryBtn);

  // Table structure: header row, then columns (sidebar, main)
  const headerRow = ['Columns (columns38)'];
  const contentRow = [sidebar, rightCol];

  // Create table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
