export default class NotificationMessage {
  static lastShownNotification;
  element;

  constructor(message, props) {
    this.message = message;
    this.type = props?.type || 'success';
    this.duration = props?.duration || 1000;
    this.element = this.createElement();
  }

  createTemplate() {
    return `
        <div class="notification ${this.type}" style="--value:${this.duration}ms">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();
    return element.firstElementChild;
  }

  show(container = document.body) {
    if (NotificationMessage.lastShownNotification) {
      NotificationMessage.lastShownNotification.destroy();
    }
    NotificationMessage.lastShownNotification = this;
    container.appendChild(this.element);

    this.timerId = setTimeout(() => {
      this.destroy();
    }, this.duration);
  }

  destroy() {
    if (this.element) {
      this.remove();
    }
    this.element = null;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  remove() {
    this.element.remove();
  }
}
