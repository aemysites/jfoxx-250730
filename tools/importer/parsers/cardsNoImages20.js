/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cardsNoImages20) block
  const headerRow = ['Cards (cardsNoImages20)'];
  const rows = [headerRow];

  // --- 1. Sidebar navigation ---
  const sidebar = element.querySelector('.block-gsa-left-nav nav');
  if (sidebar) {
    rows.push([[sidebar.cloneNode(true)]]);
  }

  // --- 2. Main content area ---
  const mainContent = element.querySelector('.in-page-main-content');
  if (mainContent) {
    // Heading (h1)
    const h1 = mainContent.querySelector('h1');
    if (h1) {
      rows.push([[h1.cloneNode(true)]]);
    }
    // First paragraph (intro)
    const introP = mainContent.querySelector('p');
    if (introP) {
      rows.push([[introP.cloneNode(true)]]);
    }
    // Card items from icon list
    const iconList = mainContent.querySelector('.usa-icon-list');
    if (iconList) {
      iconList.querySelectorAll('.usa-icon-list__item').forEach((item) => {
        const content = item.querySelector('.usa-icon-list__content');
        if (content) {
          const cardFragments = [];
          // Heading (h2 with link)
          const heading = content.querySelector('.usa-icon-list__title');
          if (heading) cardFragments.push(heading.cloneNode(true));
          // Description paragraphs
          content.querySelectorAll('p').forEach((p) => {
            cardFragments.push(p.cloneNode(true));
          });
          if (cardFragments.length > 0) {
            rows.push([cardFragments]);
          }
        }
      });
    }
    // Additional paragraphs after icon list (info/contact)
    const navContent = mainContent.querySelector('.gsa-in-page-nav-main-content');
    if (navContent) {
      navContent.querySelectorAll(':scope > p').forEach((p) => {
        rows.push([[p.cloneNode(true)]]);
      });
    }
  }

  // --- 3. Glossary button and last updated info ---
  const footer = element.querySelector('.topic_page_footer--container');
  if (footer) {
    // Glossary button
    const glossaryBtn = footer.querySelector('.glossary_open');
    if (glossaryBtn) {
      rows.push([[glossaryBtn.cloneNode(true)]]);
    }
    // Last updated info
    const lastUpdated = footer.querySelector('.last-reviewed');
    if (lastUpdated) {
      rows.push([[lastUpdated.cloneNode(true)]]);
    }
  }

  // Create the block table with all cards
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
