/* global WebImporter */
export default function parse(element, { document }) {
  // --- Critical Review ---
  // 1. Header row must match block name exactly
  const headerRow = ['Columns (columns4)'];

  // 2. Extract left column: logo image (reference existing element)
  let logoImg = null;
  const logoContainer = element.querySelector('.usa-footer__logo');
  if (logoContainer) {
    logoImg = logoContainer.querySelector('img');
  }
  if (!logoImg) {
    logoImg = element.querySelector('img');
  }

  // 3. Extract right column: social links and heading
  let rightColumnContent = [];
  const contactLinks = element.querySelector('.usa-footer__contact-links');
  if (contactLinks) {
    // Social links list (ul)
    const socialList = contactLinks.querySelector('ul.usa-footer__social-links');
    if (socialList) {
      rightColumnContent.push(socialList);
    }
    // Heading (bold text)
    const heading = contactLinks.querySelector('.usa-footer__contact-heading');
    if (heading) {
      rightColumnContent.push(heading);
    }
  }
  // Defensive fallback: if not found, grab all links and bold text
  if (rightColumnContent.length === 0) {
    const allLinks = Array.from(element.querySelectorAll('a'));
    const boldText = element.querySelector('p.text-bold');
    rightColumnContent = [...allLinks];
    if (boldText) rightColumnContent.push(boldText);
  }

  // 4. Build table rows
  // Each cell must reference the actual DOM element (not clone/new)
  const cells = [
    headerRow,
    [logoImg, rightColumnContent],
  ];

  // 5. Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
