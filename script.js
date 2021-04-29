class FYIUnit extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({mode: 'open'});

    this.state = {
      title: 'FYI',
      originalContent: ''
    }
  }

  connectedCallback() {
    this.state.originalContent = this.innerHTML;
    this.render();
  }

  attributeChangedCallback(name, oldVal, newVal) {

    if(!oldVal) {
      return;
    }

    this.render();
  }

  get message() {
    return this.getAttribute('message') || '';
  }

  static get observedAttributes() {
    return ['message'];
  }

  render() {
    this.root.innerHTML = `
      <div>
        <h2>${this.state.title} - ${this.message}</h2>
        <slot></slot>
      </div>
    `;
  }
}

if('customElements' in window) {
  customElements.define('fyi-unit', FYIUnit);
}

export default FYIUnit;