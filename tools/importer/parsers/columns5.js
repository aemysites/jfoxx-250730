/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children by class
  function getChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList.contains(className));
  }

  // Get the main grid-row (holds both columns)
  const gridRow = element.querySelector('.grid-row.grid-gap-0');
  if (!gridRow) return;

  // Left column: logo image (reference, not clone)
  const logoCol = getChildByClass(gridRow, 'usa-footer__logo');
  let logoImg = null;
  if (logoCol) {
    logoImg = logoCol.querySelector('img');
  }

  // Right column: social links and heading
  const contactCol = getChildByClass(gridRow, 'usa-footer__contact-links');
  let socialLinksList = null;
  let heading = null;
  if (contactCol) {
    socialLinksList = contactCol.querySelector('ul.usa-footer__social-links');
    heading = contactCol.querySelector('.usa-footer__contact-heading');
  }

  // Compose right column cell: social links + heading
  const rightColContent = document.createElement('div');
  if (socialLinksList) rightColContent.appendChild(socialLinksList);
  if (heading) rightColContent.appendChild(heading);

  // Build the table rows
  const headerRow = ['Columns (columns5)'];
  const contentRow = [logoImg, rightColContent];

  // Ensure all content is present, handle edge cases
  if (!logoImg && rightColContent.childNodes.length === 0) return;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
