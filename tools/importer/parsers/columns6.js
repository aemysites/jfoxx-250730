/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the three field columns (label + input/select)
  const gridRow = element.querySelector('.grid-row');
  let fieldColumns = [];
  if (gridRow) {
    fieldColumns = Array.from(gridRow.children).filter(child => child.matches('div'));
  }

  // Reference the button group (ul) as a cell
  const buttonGroup = element.querySelector('.usa-button-group');

  // Reference the required fields note
  const requiredNote = element.querySelector('p');

  // Always use the correct block header
  const rows = [
    ['Columns (columns6)'],
    [
      fieldColumns[0] || '',
      fieldColumns[1] || '',
      fieldColumns[2] || ''
    ]
  ];

  // If there is a button group, add as a new row with same column count
  if (buttonGroup) {
    rows.push([
      buttonGroup,
      '',
      ''
    ]);
  }

  // If there is a required-fields note, add as a new row with same column count
  if (requiredNote) {
    rows.push([
      requiredNote,
      '',
      ''
    ]);
  }

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
