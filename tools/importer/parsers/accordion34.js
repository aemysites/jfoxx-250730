/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the block info
  const headerRow = ['Accordion (accordion34)'];

  // Collect all direct child accordion blocks
  const accordionItems = Array.from(element.querySelectorAll(':scope > div.accordion, :scope > div.w-dropdown'));
  const rows = [];

  accordionItems.forEach((item) => {
    // Find the title element: .w-dropdown-toggle contains the click area; the label is usually in .paragraph-lg or as last div
    let titleCell = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Find the element containing the actual title text, usually .paragraph-lg but fallback to last div
      let label = toggle.querySelector('.paragraph-lg');
      if (!label) {
        // fallback: last child div (not the icon)
        const divs = toggle.querySelectorAll('div');
        if (divs.length > 1) {
          label = divs[divs.length - 1];
        } else if (divs.length === 1) {
          label = divs[0];
        }
      }
      titleCell = label || document.createTextNode(toggle.textContent.trim());
    }

    // Find the content: inside .w-dropdown-list or .accordion-content
    let contentCell = '';
    const dropdownList = item.querySelector('.accordion-content, .w-dropdown-list');
    if (dropdownList) {
      // The real content is often in a rich text div inside a wrapper
      let rich = dropdownList.querySelector('.rich-text, .w-richtext');
      if (rich) {
        contentCell = rich;
      } else {
        // fallback: grab the innermost div contents, or plain text
        const innerDiv = dropdownList.querySelector('div');
        if (innerDiv && innerDiv.childNodes.length) {
          contentCell = Array.from(innerDiv.childNodes);
        } else {
          // fallback: text content
          contentCell = document.createTextNode(dropdownList.textContent.trim());
        }
      }
    }
    rows.push([titleCell, contentCell]);
  });

  // Only create the block if there's at least one accordion item (besides header)
  if (rows.length > 0) {
    const tableArray = [headerRow, ...rows];
    const block = WebImporter.DOMUtils.createTable(tableArray, document);
    element.replaceWith(block);
  }
}
