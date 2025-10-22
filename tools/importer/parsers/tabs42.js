/* global WebImporter */
export default function parse(element, { document }) {
  // Get sidebar tab labels
  function getTabLabels() {
    const aside = document.querySelector('aside#block-gsaleftnav');
    if (!aside) return [];
    return Array.from(aside.querySelectorAll('ul.usa-sidenav > li a')).map(a => a.textContent.trim());
  }

  // Get main heading
  function getMainHeading() {
    const h1 = document.querySelector('h1');
    return h1 ? h1.cloneNode(true) : null;
  }

  // Get footer content (print/share, glossary, last updated)
  function getFooterContent() {
    const footerRow = document.querySelector('.footer-row');
    const glossaryBtn = document.querySelector('.glossary_open');
    const frag = document.createDocumentFragment();
    if (footerRow) frag.appendChild(footerRow.cloneNode(true));
    if (glossaryBtn) frag.appendChild(glossaryBtn.cloneNode(true));
    return frag.childNodes.length ? frag : null;
  }

  // Get tab contents, ensuring ALL text and elements are included for each tab
  function getTabContents() {
    const mainContent = element.querySelector('.gsa-in-page-nav-main-content');
    if (!mainContent) return [];
    const children = Array.from(mainContent.children);
    // Find all indices of image divs
    const imageDivIndices = children
      .map((el, idx) => el.tagName === 'DIV' && el.querySelector('img') ? idx : -1)
      .filter(idx => idx !== -1);
    const sections = [];
    for (let i = 0; i < imageDivIndices.length; i++) {
      const startIdx = imageDivIndices[i];
      const endIdx = i < imageDivIndices.length - 1 ? imageDivIndices[i + 1] : children.length;
      const section = [];
      for (let j = startIdx; j < endIdx; j++) {
        section.push(children[j].cloneNode(true));
      }
      // For the last tab, append all elements after last image div (including <ul> and any others)
      if (i === imageDivIndices.length - 1) {
        for (let k = endIdx; k < children.length; k++) {
          section.push(children[k].cloneNode(true));
        }
      }
      sections.push(section);
    }
    return sections;
  }

  const tabLabels = getTabLabels();
  const tabContents = getTabContents();
  const mainHeading = getMainHeading();
  const footerContent = getFooterContent();

  const rows = [];
  const headerRow = ['Tabs (tabs42)'];
  rows.push(headerRow);

  for (let i = 0; i < tabLabels.length; i++) {
    let content = tabContents[i] ? tabContents[i].slice() : [];
    // For first tab, prepend main heading
    if (i === 0 && mainHeading) {
      content.unshift(mainHeading);
    }
    // For last tab, append footer content
    if (i === tabLabels.length - 1 && footerContent) {
      content.push(footerContent);
    }
    rows.push([tabLabels[i], content]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
