/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero/banner section
  const banner = element.querySelector('.standard-banner.page-banner');
  if (!banner) return;

  // Row 1: Header
  const headerRow = ['Hero (hero10)'];

  // Row 2: Background image
  let bgImgEl = null;
  // Use absolute URL for image if available
  const img = banner.querySelector('img');
  if (img && img.src) {
    bgImgEl = document.createElement('img');
    bgImgEl.src = img.src;
  }
  const bgRow = [bgImgEl ? bgImgEl : ''];

  // Row 3: Headline, subheading, CTA
  const contentCell = [];
  // Headline
  const headline = banner.querySelector('.grid-container.page-headline h1');
  if (headline) contentCell.push(headline);
  // Subheading: look for <p><strong>...</strong></p> after banner
  let subheading = null;
  let next = banner.parentElement.querySelector('.standard__container');
  if (next) {
    const strongP = next.querySelector('p > strong');
    if (strongP) {
      subheading = strongP.parentElement;
      contentCell.push(subheading);
    }
  }
  // No CTA detected in hero

  const contentRow = [contentCell.length ? contentCell : ''];

  // Build table
  const cells = [headerRow, bgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  banner.replaceWith(block);
}
