/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, matching the block/component name exactly as in the example
  const headerRow = ['Cards (cards24)'];
  const cells = [headerRow];

  // Each direct child <a> is a card
  const cardLinks = element.querySelectorAll(':scope > a.utility-link-content-block');
  cardLinks.forEach((card) => {
    // First cell: Image (mandatory)
    let imgEl = null;
    const imgWrapper = card.querySelector('.utility-aspect-2x3');
    if (imgWrapper) {
      imgEl = imgWrapper.querySelector('img');
    }

    // Second cell: Tag, Date, Title (Heading)
    const fragments = [];
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      // Add tag(s) and date, separated by a space, preserving original elements
      tagRow.childNodes.forEach((node, i) => {
        if (node.nodeType === 1) { // Element
          fragments.push(node);
          if (i < tagRow.childNodes.length - 1) fragments.push(document.createTextNode(' '));
        }
      });
      // Add a line break after tag/date only if there is more after
      if (tagRow.childNodes.length > 0) {
        fragments.push(document.createElement('br'));
      }
    }
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) {
      fragments.push(heading);
    }

    cells.push([
      imgEl,
      fragments.length === 1 ? fragments[0] : fragments
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
