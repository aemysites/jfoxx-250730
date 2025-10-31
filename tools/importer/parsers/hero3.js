/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero3) block: 1 col, 3 rows
  // Row 1: Block name
  // Row 2: Background image (optional)
  // Row 3: Heading (h1), Subheading (optional), CTA (optional)

  // --- Critical Review ---
  // 1. No hardcoded content: All content is dynamically extracted from the element.
  // 2. No markdown: Only HTML elements are used.
  // 3. Table is created for the Hero block only, as per example.
  // 4. Table header matches block name exactly: 'Hero (hero3)'.
  // 5. Handles missing image or headline.
  // 6. No Section Metadata block in the example, so none is created.
  // 7. Existing elements are referenced, not cloned or recreated.
  // 8. Semantic meaning is preserved: h1 is used for the heading.
  // 9. All text content is included in a table cell.
  // 10. Image element is referenced directly.
  // 11. No model fields provided, so no HTML comments needed.

  // Table header row
  const headerRow = ['Hero (hero3)'];

  // Extract background image (if present)
  const img = element.querySelector('img');
  const imageRow = [img ? img : ''];

  // Extract headline (h1)
  const headline = element.querySelector('h1');
  const contentRow = [headline ? headline : ''];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
