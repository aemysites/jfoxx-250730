/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extract sidebar navigation as heading + <ul> list (no duplicates)
  function getSidebarContent() {
    const aside = document.querySelector('aside.block-gsa-left-nav');
    if (!aside) return [];
    const heading = aside.querySelector('h2');
    const nav = aside.querySelector('nav');
    if (!nav) return heading ? [heading] : [];
    const ul = nav.querySelector('ul.usa-sidenav');
    // Only include heading and nav list (no duplicate heading)
    return [heading, ul ? ul.cloneNode(true) : null].filter(Boolean);
  }

  // Helper: Extract main content (heading, paragraphs, links, 'Top' link, utility/footer bar)
  function getMainContent() {
    const mainContent = element.querySelector('.in-page-main-content');
    if (!mainContent) return [];
    const children = Array.from(mainContent.children);
    // Add 'Top' link/button if present
    const topLink = document.querySelector('a#backtotop');
    if (topLink && !children.includes(topLink)) {
      children.push(topLink);
    }
    // Add utility/footer bar if present
    const footer = document.querySelector('.topic_page_footer--container');
    if (footer) {
      children.push(footer.cloneNode(true));
    }
    return children;
  }

  // Compose table rows
  const headerRow = ['Columns (columns25)'];
  const sidebarContent = getSidebarContent();
  const mainContent = getMainContent();

  // Columns: Sidebar | Main Content
  const columnsRow = [sidebarContent, mainContent];

  // Build table (no unnecessary empty rows or duplicate content)
  const cells = [
    headerRow,
    columnsRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
