/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match the spec
  const headerRow = ['Columns (columns11)'];

  // Find main content holder
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Find all top-level direct .grid-layout children (main and images)
  const grids = container.querySelectorAll(':scope > .grid-layout');
  if (grids.length < 2) return;

  const mainGrid = grids[0]; // The grid containing text, headline, etc
  const imagesGrid = grids[1]; // The grid containing two images

  // --- First row: two columns ---
  // Left column: headline block (eyebrow + h1)
  // Right column: description, author, cta
  let col1Content = null;
  let col2Content = null;
  if (mainGrid && mainGrid.children.length >= 2) {
    col1Content = mainGrid.children[0]; // left headline block
    col2Content = mainGrid.children[1]; // right block (desc, author, cta)
  }

  // --- Second row: two columns of images ---
  let imgCol1 = null;
  let imgCol2 = null;
  if (imagesGrid) {
    // Each child is a .utility-aspect-1x1 div wrapping the img
    const imgDivs = imagesGrid.querySelectorAll(':scope > .utility-aspect-1x1');
    if (imgDivs.length >= 2) {
      imgCol1 = imgDivs[0];
      imgCol2 = imgDivs[1];
    }
  }

  // Make sure all cells are present, otherwise use fallback empty placeholder
  const cells = [
    headerRow,
    [col1Content || document.createElement('div'), col2Content || document.createElement('div')],
    [imgCol1 || document.createElement('div'), imgCol2 || document.createElement('div')]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
