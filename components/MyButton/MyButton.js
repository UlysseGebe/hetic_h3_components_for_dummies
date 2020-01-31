/**
 * @module my-button
 * @description
 * A custom element for injecting a custom button
 *  tailored to our needs.
 * @property {string} look The look of the button ('primary', 'secondary', 'neutral')
 * @property {string} text The text displayed inside the button
 * @property {string} size The button size
 * @property {string} icon The SVG button icon
 * @property {boolean} isLoading Wether the button is in loading state or not
 * @property {string} tag=button The button HTML tag 
 */
export default class AcButton extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    // The mode 'open' allow the custom element
    // shadow dom to be inspectable in JS and in CSS.
    // Don't worry, CSS custom properties are still
    // accessible through shadow DOM
    // const root = this.attachShadow({ mode: 'open' });
    // root.innerHTML = `
      
    // `;
  }

  get look() {
    return this.getAttribute('look');
  }

  set look(val) {
    return this.setAttribute('look', val);
  }

  get text() {
    return this.getAttribute('text');
  }

  get size() {
    return this.getAttribute('size');
  }

  get icon() {
    return this.getAttribute('icon');
  }

  get isLoading() {
    return this.getAttribute('is-loading');
  }

  get tag() {
    return this.getAttribute('tag');
  }

  static get observedAttributes() {
    return ['look', 'text', 'size', 'icon', 'is-loading', 'tag'];
  }

  connectedCallback() {
    this._render();
    console.log(this.innerHTML);
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._render();
  }

  _buildStyle() {
    return `
      <style>
        :root {
          --button-height: var(--base-space-4);
          --button-border-color: var(--neutral-200A);
          --button-border: inset 0px 0px 0px 1px var(--button-border-color);
          --button-box-shadow-active: inset 0 1px 3px 0 rgba(0, 0, 0, 0.32);
          --button-border-radius: var(--border-radius-double);
          --button-side-padding: var(--base-space-2);
          --button-icon-size: 14px;
        }
        
        .my-button {
          display: flex;
          align-items: center;
          justify-content: center;
          height: var(--button-height);
          padding-left: var(--button-side-padding);
          padding-right: var(--button-side-padding);
          color: inherit;
          text-decoration: none;
          border-radius: var(--button-border-radius);
          transition: var(--transition);
          will-change: background-color;
          cursor: pointer;
        }
        
        .my-button--primary {
          background-image: var(--gradient-purple);
        }
        
        .my-button--secondary {
          background-image: var(--gradient-grey);
        }
      </style>
    `;
  }

  _render() {
    return this.innerHTML = `
      ${this._buildStyle()}
      <button
        class="my-button my-button--${this.look}"
      >
        ${this.text}
      </button>
    `;
  }

  _onClick() {
    console.log('click');
  }
}