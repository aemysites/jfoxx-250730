/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as specified
  const headerRow = ['Accordion (accordion13)'];
  const rows = [headerRow];

  // We want each accordion item, each is a .divider with a grid inside
  // For slightly more resilience, also allow the first .divider to be nested (as seen in the input)
  // The outer element may also have a class, but only direct children should be considered for .divider

  // Collect all .divider children, including the first which is nested inside another .divider
  let dividers = [];
  const directDividers = Array.from(element.querySelectorAll(':scope > .divider'));
  // Check if the very first child is a .divider with a .divider as its child
  const firstChild = element.firstElementChild;
  if (
    firstChild &&
    firstChild.classList.contains('divider') &&
    firstChild.querySelector('.divider')
  ) {
    // The first .divider contains another .divider (the real content), use that
    dividers.push(firstChild);
    // The rest are the .divider siblings
    dividers.push(...directDividers.slice(1));
  } else {
    dividers = directDividers;
  }

  // For each divider, extract grid children: [title, content]
  dividers.forEach(divider => {
    // The content grid is either the only child or the first child
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    const [title, content] = Array.from(grid.children);
    if (!title || !content) return; // both required
    rows.push([title, content]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
