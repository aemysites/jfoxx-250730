/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Tabs (tabs37)'];

  // Extract tab labels from sidebar nav
  const sidebarNav = element.querySelector('aside#block-gsaleftnav .usa-sidenav');
  let tabLabels = [];
  if (sidebarNav) {
    tabLabels = Array.from(sidebarNav.querySelectorAll('.usa-sidenav__item a span'))
      .map(span => span.textContent.trim());
  }

  // Extract main headline
  const headline = element.querySelector('.page-headline h1');

  // Extract alert box for Overview
  const alert = element.querySelector('.usa-alert__body');

  // Extract footer bar content
  const glossaryBtn = element.querySelector('button.glossary_open');
  const lastReviewed = element.querySelector('#page-last-reviewed .margin-top-05');

  // Extract tab content rows (Videos, Posters & brochures, Photographs)
  const tabContentRows = Array.from(element.querySelectorAll('.gsa-in-page-nav-main-content > .grid-row'));

  // Map sidebar labels to content
  // The order in sidebar is: Overview, Photographs, Posters & brochures, Videos
  // The order in content is: Videos, Posters & brochures, Photographs

  // Helper to extract tab content from grid-row
  function getTabContent(gridRow) {
    if (!gridRow) return '';
    const leftCol = gridRow.querySelector('[class*="grid-col-4"]');
    const rightCol = gridRow.querySelector('[class*="grid-col-8"]');
    const tabContent = [];
    if (leftCol) {
      const img = leftCol.querySelector('img');
      if (img) tabContent.push(img);
    }
    if (rightCol) {
      const heading = rightCol.querySelector('h2');
      if (heading) tabContent.push(heading);
      const paragraphs = rightCol.querySelectorAll('p');
      tabContent.push(...paragraphs);
    }
    return tabContent;
  }

  // Compose rows in the correct mapping order
  const rows = [];
  tabLabels.forEach((label, i) => {
    if (label === 'Overview') {
      // Overview: headline + alert + footer
      const overviewContent = [];
      if (headline) overviewContent.push(headline);
      if (alert) overviewContent.push(alert);
      if (glossaryBtn) overviewContent.push(glossaryBtn);
      if (lastReviewed) overviewContent.push(lastReviewed);
      rows.push([label, overviewContent]);
    } else if (label === 'Photographs') {
      // Photographs is the 3rd grid-row
      rows.push([label, getTabContent(tabContentRows[2])]);
    } else if (label === 'Posters & brochures') {
      // Posters & brochures is the 2nd grid-row
      rows.push([label, getTabContent(tabContentRows[1])]);
    } else if (label === 'Videos') {
      // Videos is the 1st grid-row
      rows.push([label, getTabContent(tabContentRows[0])]);
    } else {
      rows.push([label, '']);
    }
  });

  // Compose table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
