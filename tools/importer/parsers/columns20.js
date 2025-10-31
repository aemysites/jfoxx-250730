/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns20)'];

  // Defensive selectors for the two main columns
  // Left column: logo image (reference existing element)
  let logoImg = null;
  const logoContainer = element.querySelector('.usa-footer__logo');
  if (logoContainer) {
    logoImg = logoContainer.querySelector('img');
  }

  // Right column: social icons and heading
  let rightContent = document.createElement('div');
  const contactLinks = element.querySelector('.usa-footer__contact-links');
  if (contactLinks) {
    // Social links list
    const socialLinks = contactLinks.querySelector('ul.usa-footer__social-links');
    if (socialLinks) {
      rightContent.appendChild(socialLinks);
    }
    // Heading text
    const heading = contactLinks.querySelector('.usa-footer__contact-heading');
    if (heading) {
      rightContent.appendChild(heading);
    }
  }

  // Compose the columns row
  const columnsRow = [logoImg, rightContent];

  // Create the block table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
