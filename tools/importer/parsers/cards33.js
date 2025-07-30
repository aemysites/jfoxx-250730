/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per instructions
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Each card is an <a> direct child of the main grid
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));
  cardLinks.forEach(card => {
    // Extract the image element (first img descendant)
    const img = card.querySelector('img');

    // Get the main text content container (the div next to the img)
    // The structure is known: <div.w-layout-grid> -> [img, div]
    let contentDiv;
    const gridDiv = card.querySelector('div.w-layout-grid');
    if (gridDiv) {
      // Find the first <div> that's not the img
      const childDivs = Array.from(gridDiv.children);
      contentDiv = childDivs.find(child => child !== img && child.tagName === 'DIV');
    }
    if (!contentDiv) contentDiv = card; // fallback to card itself

    // Compose the text cell with all relevant elements, referencing originals
    const textParts = [];

    // Tags and 'min read' info (optional)
    const tagRow = contentDiv.querySelector('.flex-horizontal');
    if (tagRow) {
      // Tag
      const tag = tagRow.querySelector('.tag');
      if (tag) textParts.push(tag);
      // Read time
      const minRead = tagRow.querySelector('.paragraph-sm');
      if (minRead) textParts.push(minRead);
    }
    // Heading
    const heading = contentDiv.querySelector('h3, .h4-heading');
    if (heading) textParts.push(heading);
    // Description
    const desc = contentDiv.querySelector('p');
    if (desc) textParts.push(desc);
    // CTA (look for a div with text 'Read' at the bottom)
    // Should be an actual <a> element in the output, using card's href
    const readDivs = Array.from(contentDiv.querySelectorAll('div'));
    const readDiv = readDivs.find(div => div.textContent.trim().toLowerCase() === 'read');
    if (readDiv && card.href) {
      const cta = document.createElement('a');
      cta.href = card.href;
      cta.textContent = 'Read';
      textParts.push(cta);
    }

    // Add the row for this card: [img, [all text content elements]]
    rows.push([
      img,
      textParts
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
