import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends SortableTableV1 {
  arrowElement;

  constructor(headersConfig, {
    data = [],
    sorted = {},
  } = {}) {
    super(headersConfig, data);

    this.createListeners();
    this.createArrowElement();

    if (sorted.id) {
      this.sort(sorted.id, sorted.order ? sorted.order : 'desc');
      const sortedColumnHeader = this.subElements.header.querySelector(`[data-id=${sorted.id}]`);
      sortedColumnHeader.insertAdjacentElement('beforeend', this.arrowElement);
      sortedColumnHeader.dataset.order = sorted.order;
    }
  }

  createArrowElement() {
    const element = document.createElement("div");
    element.innerHTML = this.createSortArrowTemplate();
    this.arrowElement = element.firstElementChild;
  }

  createListeners() {
    this.subElements.header.addEventListener('pointerdown', this.handleHeaderClack);
  }

  removeListeners() {
    this.subElements.header.removeEventListener('pointerdown', this.handleHeaderClack);
  }

  handleHeaderClack = (event) => {
    const columnHeader = event.target.closest('.sortable-table__cell');
    if (columnHeader && columnHeader.dataset.sortable) {
      const order = columnHeader.dataset.order === 'desc' ? 'asc' : 'desc';
      columnHeader.dataset.order = order;
      this.sort(columnHeader.dataset.id, order);
      columnHeader.insertAdjacentElement('beforeend', this.arrowElement);
    }
  };

  remove() {
    this.removeListeners();
    super.remove();
  }
}
