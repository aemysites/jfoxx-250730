/* global WebImporter */
export default function parse(element, { document }) {
  // --- Extract heading, intro, and anchor navigation ---
  const mainContent = element.querySelector('.gsa-in-page-nav-main-content');
  if (!mainContent) return;

  // Get the main heading (h1) from the card area
  const heading = element.querySelector('h1');
  // Get the intro paragraph (first <p> in mainContent)
  const introPara = mainContent.querySelector('p');
  // Get the anchor navigation list (first <ul> in mainContent)
  const anchorNav = mainContent.querySelector('ul');
  let introContent = [];
  if (heading) introContent.push(heading);
  if (introPara) introContent.push(introPara);
  if (anchorNav) introContent.push(anchorNav);
  // Create an intro table
  if (introContent.length) {
    const introTable = WebImporter.DOMUtils.createTable([
      ['Section'],
      [introContent]
    ], document);
    element.prepend(introTable);
  }

  // Find all card rows (each architectural style)
  const cardRows = Array.from(mainContent.querySelectorAll('.grid-row.grid-gap.margin-y-1'));
  if (!cardRows.length) return;

  // Header row for block table
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  cardRows.forEach(cardRow => {
    // Left column: image and caption
    const imgCol = cardRow.querySelector('[class*="desktop:grid-col-5"]');
    let imgCellContent = [];
    if (imgCol) {
      // Find image (inside <a> then <img>)
      const imgLink = imgCol.querySelector('a[href]');
      const img = imgLink ? imgLink.querySelector('img') : imgCol.querySelector('img');
      if (img) {
        imgCellContent.push(img);
      }
      // Find caption (div.img-caption)
      const caption = imgCol.querySelector('.img-caption');
      if (caption) {
        imgCellContent.push(caption);
      }
    }

    // Right column: heading, description, links
    const textCol = cardRow.querySelector('[class*="desktop:grid-col-7"]');
    let textCellContent = [];
    if (textCol) {
      // Heading (h2)
      const heading = textCol.querySelector('h2');
      if (heading) {
        textCellContent.push(heading);
      }
      // Description (first <p> after heading)
      const paragraphs = Array.from(textCol.querySelectorAll('p'));
      if (paragraphs.length) {
        let descIdx = 0;
        if (paragraphs[0].querySelector('a') && paragraphs[0].textContent.trim().length < 60) {
          descIdx = 1;
        }
        if (paragraphs[descIdx]) {
          textCellContent.push(paragraphs[descIdx]);
        }
      }
      // List of links (all <a> inside <p> after description)
      const linkPs = paragraphs.filter(p => p.querySelector('a'));
      linkPs.forEach(p => {
        const links = Array.from(p.querySelectorAll('a'));
        if (links.length) {
          textCellContent.push(...links);
        }
      });
      // Also check for <ul> with <li><a>
      const ul = textCol.querySelector('ul');
      if (ul) {
        const ulLinks = Array.from(ul.querySelectorAll('a'));
        if (ulLinks.length) {
          textCellContent.push(...ulLinks);
        }
      }
    }

    // Add row to table
    rows.push([
      imgCellContent.length ? imgCellContent : '',
      textCellContent.length ? textCellContent : ''
    ]);
  });

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
