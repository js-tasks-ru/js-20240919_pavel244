export default class SortableTable {
  element;
  subElements = {};
  sortState = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement();
    this.selectSubElements();
  }

  createSortArrowTemplate = () => `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `;

  createTableHeaderTemplate() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headerConfig.map(item => `
          <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}"
           ${this.sortState.order && this.sortState.field === item.id ? 'data-order=' + this.sortState.order : ''}>
            <span>${item.title}</span>
            ${this.sortState.field === item.id ? this.createSortArrowTemplate() : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  createTableCellTemplate(value) {
    return `<div class="sortable-table__cell">${value}</div>`;
  }

  createTableRowTemplate(data) {
    return `
    <a href="/products/3d-ochki-optoma-zd302" class="sortable-table__row">
      ${this.headerConfig.map(item =>
    item.template
      ? item.template(data.images)
      : this.createTableCellTemplate(data[item.id])
  ).join('')}
    </a>`;
  }

  createTableRowsTemplate() {
    return this.data.map(item => this.createTableRowTemplate(item)).join('');
  }

  createTableTemplate() {
    return `
        ${this.createTableHeaderTemplate()}
        <div data-element="body" class="sortable-table__body">
            ${this.createTableRowsTemplate()}
        </div>
    `;
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTableTemplate();
    return element;
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  sort(fieldValue, orderValue) {
    const locales = ["ru", "en"];
    const options = {sensitivity: "variant", caseFirst: "upper", numeric: true};
    const collator = new Intl.Collator(locales, options);

    const ascFilter = (a, b) => collator.compare(a[fieldValue], b[fieldValue]);
    const descFilter = (a, b) => collator.compare(b[fieldValue], a[fieldValue]);

    this.data.sort(orderValue === 'asc' ? ascFilter : descFilter);
    this.sortState = {
      field: fieldValue,
      order: orderValue,
    };
    this.update();
  }

  update() {
    this.subElements.body.innerHTML = this.createTableRowsTemplate();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

