/* global WebImporter */
export default function parse(element, { document }) {
  // Find logo image (left column)
  let logoImg = null;
  const logoContainer = element.querySelector('.usa-footer__logo');
  if (logoContainer) {
    logoImg = logoContainer.querySelector('img');
  }
  if (!logoImg) {
    logoImg = element.querySelector('img');
  }

  // Compose left column: image + visible text 'GSA' (from screenshot, not from alt)
  // The logo visually contains 'GSA' as text, so we must include it as visible text.
  const leftColumnContent = [];
  if (logoImg) leftColumnContent.push(logoImg);
  // Add 'GSA' as visible text, since it's present in the logo in the screenshot
  leftColumnContent.push('GSA');

  // Find social links and heading (right column)
  let socialLinks = null;
  let heading = null;
  const contactLinksContainer = element.querySelector('.usa-footer__contact-links');
  if (contactLinksContainer) {
    socialLinks = contactLinksContainer.querySelector('ul.usa-footer__social-links');
    heading = contactLinksContainer.querySelector('p.usa-footer__contact-heading');
  }
  if (!socialLinks) {
    socialLinks = element.querySelector('ul.usa-footer__social-links');
  }
  if (!heading) {
    heading = element.querySelector('p.usa-footer__contact-heading');
  }

  // Compose right column: social links + heading
  const rightColumnContent = [];
  if (socialLinks) rightColumnContent.push(socialLinks);
  if (heading) rightColumnContent.push(heading);

  // Table structure
  const headerRow = ['Columns (columns19)'];
  const columnsRow = [leftColumnContent, rightColumnContent];

  const cells = [headerRow, columnsRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
