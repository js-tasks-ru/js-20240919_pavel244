class Tooltip {
  static instance;
  element;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
    Tooltip.instance = this;
  }

  initialize() {
    this.createElement();
    this.createListeners();
  }

  createElement() {
    const element = document.createElement("div");
    element.classList.add('tooltip');
    this.element = element;
  }

  render(content) {
    this.element.innerHTML = content;
    document.body.appendChild(this.element);
  }

  handlerPointerOver(event) {
    const {target} = event;
    if (target.dataset.tooltip) {
      this.render(target.dataset.tooltip);
    }
  }

  handlerPointerOut() {
    if (this.element) {
      this.element.remove();
    }
  }

  handlerPointerMove(event) {
    if (event.target.dataset.tooltip) {
      this.element.style.top = event.clientY + 18 + 'px';
      this.element.style.left = event.clientX + 12 + 'px';
    }
  }

  createListeners() {
    document.addEventListener('pointerover', event => this.handlerPointerOver(event));
    document.addEventListener('pointerout', event => this.handlerPointerOut(event));
    document.addEventListener('pointermove', event => this.handlerPointerMove(event));
  }

  removeListeners() {
    document.removeEventListener('pointerover', event => this.handlerPointerOver(event));
    document.removeEventListener('pointerout', event => this.handlerPointerOut(event));
    document.removeEventListener('pointermove', event => this.handlerPointerMove(event));
  }

  destroy() {
    this.element.remove();
    this.removeListeners();
  }
}

export default Tooltip;
