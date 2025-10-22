/* global WebImporter */
export default function parse(element, { document }) {
  // Extract header (logo, org name, nav bar, search bar)
  const header = element.querySelector('header') || document.querySelector('header');
  let headerDiv = null;
  if (header) {
    headerDiv = document.createElement('div');
    headerDiv.appendChild(header.cloneNode(true));
  }

  // Extract breadcrumb navigation
  const breadcrumbs = element.querySelector('.region-content nav[aria-label]') || document.querySelector('.region-content nav[aria-label]');
  let breadcrumbDiv = null;
  if (breadcrumbs) {
    breadcrumbDiv = document.createElement('div');
    breadcrumbDiv.appendChild(breadcrumbs.cloneNode(true));
  }

  // Extract left sidebar navigation
  const leftNav = element.querySelector('#block-gsaleftnav');
  let leftNavDiv = null;
  if (leftNav) {
    leftNavDiv = document.createElement('div');
    leftNavDiv.appendChild(leftNav.cloneNode(true));
  }

  // Extract main content (including alert box at the top)
  const mainContent = element.querySelector('.gsa-in-page-nav-main-content');
  let mainDiv = null;
  if (mainContent) {
    mainDiv = document.createElement('div');
    // Also include the alert box if present, but only once at the top of main
    const alertBox = element.querySelector('.usa-alert');
    if (alertBox) {
      mainDiv.appendChild(alertBox.cloneNode(true));
    }
    mainDiv.appendChild(mainContent.cloneNode(true));
  }

  // Extract right sidebar
  const rightSidebar = element.querySelector('.body_content--sidebar-column article');
  let rightDiv = null;
  if (rightSidebar) {
    rightDiv = document.createElement('div');
    rightDiv.appendChild(rightSidebar.cloneNode(true));
  }

  // Extract footer (Glossary button, last updated date)
  const footer = element.querySelector('.topic_page_footer--container');
  let footerDiv = null;
  if (footer) {
    footerDiv = document.createElement('div');
    footerDiv.appendChild(footer.cloneNode(true));
  }

  // Compose columns: left nav, main content, right sidebar
  const secondRow = [];
  if (leftNavDiv) secondRow.push(leftNavDiv);
  if (mainDiv) secondRow.push(mainDiv);
  if (rightDiv) secondRow.push(rightDiv);

  // Add header, breadcrumbs, and footer as separate rows below the main columns
  const tableData = [['Columns (columns29)'], secondRow];
  if (headerDiv) tableData.push([headerDiv]);
  if (breadcrumbDiv) tableData.push([breadcrumbDiv]);
  if (footerDiv) tableData.push([footerDiv]);

  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
