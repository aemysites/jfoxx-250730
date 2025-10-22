/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero3) block parsing
  // 1 column, 3 rows: [block name], [image], [content]

  // Header row
  const headerRow = ['Hero (hero3)'];

  // --- Row 2: Background Image (optional) ---
  // Find the first <img> inside the block (background image)
  let imgEl = element.querySelector('img');
  // Defensive: if no image, use null
  const imageRow = [imgEl || ''];

  // --- Row 3: Content (heading, subheading, CTA) ---
  // Find the text container (usually a div with headings and paragraph)
  // In this HTML, it's the first .hidden-xs div
  const textDiv = element.querySelector('.hidden-xs');
  let contentEls = [];
  if (textDiv) {
    // Heading (with link)
    const heading = textDiv.querySelector('h2');
    if (heading) contentEls.push(heading);
    // Subheading (paragraph)
    const subheading = textDiv.querySelector('p');
    if (subheading) contentEls.push(subheading);
    // If there is a CTA, add it (not present in this example)
    // Defensive: check for a button or extra link
    const cta = textDiv.querySelector('a:not([href="#"])');
    if (cta && (!heading || cta !== heading.querySelector('a'))) {
      contentEls.push(cta);
    }
  }
  const contentRow = [contentEls.length ? contentEls : ''];

  // Compose table rows
  const rows = [headerRow, imageRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
