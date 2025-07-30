/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name, exactly as in the example
  const headerRow = ['Hero (hero5)'];

  // Find the prominent image (background or hero image)
  // It's an <img> directly inside the major grid
  const img = element.querySelector('img');
  // Even if missing, it's fine: the row will have null which is an empty cell

  // Find the content area (heading, paragraph, CTAs)
  // The text/CTA content is typically in the .container grid, first child
  let contentCell = [];
  const container = element.querySelector('.grid-layout.container');
  if (container) {
    // Heading (look for H1 or H2)
    const heading = container.querySelector('h1, h2, .h2-heading');
    if (heading) contentCell.push(heading);

    // Paragraph(s): inside .rich-text or .w-richtext or p
    const richText = container.querySelector('.rich-text, .w-richtext');
    if (richText) {
      // All children of the rich text block
      Array.from(richText.children).forEach(child => contentCell.push(child));
    } else {
      // Fallback to any direct p
      Array.from(container.querySelectorAll('p')).forEach(p => contentCell.push(p));
    }

    // CTA(s): in .button-group
    const buttonGroup = container.querySelector('.button-group');
    if (buttonGroup) contentCell.push(buttonGroup);
  }

  // If nothing found, ensure the cell is at least empty (never undefined)
  if (contentCell.length === 0) contentCell = [''];

  // Compose the rows as per the block requirements
  const rows = [
    headerRow,
    [img || ''],
    [contentCell]
  ];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
