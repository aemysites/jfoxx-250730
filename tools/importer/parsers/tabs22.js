/* global WebImporter */
export default function parse(element, { document }) {
  // Get tab menu and tab content container
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');
  
  // Gather tab labels in order
  const tabLinks = tabMenu ? Array.from(tabMenu.children) : [];
  const tabLabels = tabLinks.map(link => {
    const labelDiv = link.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // Gather tab contents in order (each .w-tab-pane)
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];
  const tabContents = tabPanes.map(pane => {
    const grid = pane.querySelector('.grid-layout');
    if (grid) return grid;
    // fallback: use the pane
    return pane;
  });

  // Build rows: header row is single column, then each tab is two columns
  const rows = [];
  rows.push(['Tabs']); // 1-column header row
  for (let i = 0; i < tabLabels.length; i++) {
    rows.push([
      tabLabels[i],
      tabContents[i] || document.createTextNode('')
    ]);
  }

  // Replace element with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
