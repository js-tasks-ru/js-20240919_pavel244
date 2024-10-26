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
    this.createListener();
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

  handlerPointerOver = (event) => {
    document.addEventListener('pointerout', this.handlerPointerOut);
    document.addEventListener('pointermove', this.handlerPointerMove);

    const {target} = event;
    if (target.dataset.tooltip) {
      this.render(target.dataset.tooltip);
    }
  }

  handlerPointerOut = () => {
    document.removeEventListener('pointerout', this.handlerPointerOut);
    document.removeEventListener('pointermove', this.handlerPointerMove);

    if (this.element) {
      this.element.remove();
    }
  }

  handlerPointerMove = (event) => {
    if (event.target.dataset.tooltip) {
      this.element.style.top = event.clientY + 18 + 'px';
      this.element.style.left = event.clientX + 12 + 'px';
    }
  }

  createListener() {
    document.addEventListener('pointerover', this.handlerPointerOver);
  }

  removeListener() {
    document.removeEventListener('pointerover', this.handlerPointerOver);
  }

  destroy() {
    this.element.remove();
    this.removeListener();
  }
}

export default Tooltip;
