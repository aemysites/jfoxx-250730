/* global WebImporter */
export default function parse(element, { document }) {
  // HERO (hero4) block parsing
  // Table: 1 col, 3 rows: [block name], [image], [headline/subheadline/cta]

  // Header row
  const headerRow = ['Hero (hero4)'];

  // --- Row 2: Background Image (optional) ---
  // Find the image element inside the hero banner
  let imgCell = '';
  const img = element.querySelector('img');
  if (img) {
    imgCell = img;
  }

  // --- Row 3: Headline/Subheadline/CTA ---
  // Find the headline (h1)
  let contentCell = [];
  // Find the headline
  const headline = element.querySelector('h1');
  if (headline) {
    contentCell.push(headline);
  }
  // No subheading or CTA in this example, but parser is resilient for future variations

  // Build the table
  const cells = [
    headerRow,
    [imgCell],
    [contentCell]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
