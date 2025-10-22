/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards39) block parser
  const headerRow = ['Cards (cards39)'];
  const cells = [headerRow];

  // Find all card rows by their distinctive class
  const cardRows = element.querySelectorAll('.grid-row.grid-gap-md.padding-205.bg-accent-warm-lighter.margin-bottom-3.width-full');

  cardRows.forEach((cardRow) => {
    // Image cell: find the image inside the left column
    let imageCell = null;
    let imgCol = null;
    // Find the column with the image by looking for a child that contains an <img>
    for (const child of cardRow.children) {
      if (child.querySelector('img')) {
        imgCol = child;
        break;
      }
    }
    if (imgCol) {
      const img = imgCol.querySelector('img');
      if (img) {
        imageCell = img;
      }
    }

    // Text cell: find the right column (the one without the image)
    let textCell = document.createElement('div');
    let textCol = null;
    for (const child of cardRow.children) {
      if (!child.querySelector('img')) {
        textCol = child;
        break;
      }
    }
    if (textCol) {
      // Heading
      const heading = textCol.querySelector('h2');
      if (heading) {
        textCell.appendChild(heading.cloneNode(true));
      }
      // Paragraphs and links
      textCol.querySelectorAll('p').forEach((p) => {
        textCell.appendChild(p.cloneNode(true));
      });
    }

    // Only add card if both image and text are present
    if (imageCell && textCell.childNodes.length > 0) {
      cells.push([imageCell, textCell]);
    }
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
