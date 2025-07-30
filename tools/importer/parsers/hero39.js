/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get background image (optional)
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // 2. Get headline, subheading/paragraph(s), CTA (optional)
  let contentCellContent = [];
  for (const div of gridDivs) {
    // Look for a heading in this div
    const heading = div.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      // Get all direct children in the grid-layout (the heading and content block)
      const gridInner = div.querySelector('.w-layout-grid');
      if (gridInner) {
        // Take all immediate children of gridInner
        const nodes = Array.from(gridInner.children);
        nodes.forEach((node) => {
          // For the content block (likely a div), flatten its children
          if (node.matches('.flex-vertical')) {
            contentCellContent.push(...Array.from(node.children));
          } else {
            contentCellContent.push(node);
          }
        });
      } else {
        // Fallback: just use heading and any paragraphs/buttons
        contentCellContent.push(heading);
        const paragraphs = Array.from(div.querySelectorAll('p'));
        contentCellContent.push(...paragraphs);
        const button = div.querySelector('a');
        if (button) {
          contentCellContent.push(button);
        }
      }
      break;
    }
  }

  // Compose table data
  const cells = [
    ['Hero (hero39)'],
    [bgImg ? bgImg : ''],
    [contentCellContent.length > 0 ? contentCellContent : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
