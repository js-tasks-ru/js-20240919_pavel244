export default class SortableTable {
  element;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement();
  }

  createSortArrow() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `;
  }

  createTableHeader() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headerConfig.map(item => `
          <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order="asc">
            <span>${item.title}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  createTableCell(value) {
    return `<div class="sortable-table__cell">${value}</div>`;
  }

  createTableRow(data) {
    return `
    <a href="/products/3d-ochki-optoma-zd302" class="sortable-table__row">
      ${this.headerConfig.map(item =>
    item.template
      ? item.template(data.images)
      : this.createTableCell(data[item.id])
  ).join('')}
    </a>`;
  }

  createTableTemplate(data = this.data) {
    return `
        ${this.createTableHeader()}
      <div data-element="body" class="sortable-table__body">
        ${data.map(item => this.createTableRow(item)).join('')}
      </div>
    `;
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTableTemplate();
    return element;
  }

  sort(fieldValue, orderValue) {

  }

  update(newData) {
    this.data = newData;
    this.element.innerHTML = this.createElement();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

