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

  set text(val) {
    return this.setAttribute('text', val);
  }

  get size() {
    return this.getAttribute('size');
  }

  set size(val) {
    return this.setAttribute('size', val);
  }

  get icon() {
    return this.getAttribute('icon');
  }

  get isLoading() {
    return this.getAttribute('is-loading');
  }

  set isLoading(val) {
    return this.setAttribute(val ? true : false);
  }

  get tag() {
    return this.getAttribute('tag');
  }

  set tag(val) {
    return this.setAttribute('tag', val);
  }

  static get observedAttributes() {
    return [
      'look',
      'text',
      'size',
      'icon',
      'is-loading',
      'tag'
    ];
  }

  connectedCallback() {
    this._render();
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick);
  }

  /**
   * Whenever one of the button properties changes, the button rerenders
   * @return {function}
   */
  attributeChangedCallback() {
    this._render();
  }

  /**
   * Render the style
   * @return {string}
   */
  _buildStyle() {
    return `
      <style>
        // ---------------------------
        // DEFAULT
        // ---------------------------

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

        .my-button__icon {
          width: var(--button-icon-size);
          height: var(--button-icon-size);
        }

        .m-button__text {
          color: inherit;
          text-decoration: none;
          // I advise you to use mixins for text styles
          // @include text-action;
        }

        .m-button__text:empty {
          display: none;
        }
        
        // ---------------------------
        // THEMES
        // ---------------------------
        .my-button--primary {
          background-image: var(--gradient-purple);
          box-shadow: var(--button-border);
          color: var(--white);
        }

        .my-button--primary:hover {
          background-image: linear-gradient(to bottom, var(--color-app), var(--purple-800));
        }

        .my-button--primary svg {
          fill: currentColor;
        }
        
        .my-button--secondary {
          color: var(--neutral-900A);
          background-image: var(--gradient-grey);
          box-shadow: inset 0px 0px 0px 1px var(--neutral-200A);
        }

        .my-button--secondary svg {
          fill: var(--neutral-700A);
        }

        .my-button--secondary:hover {
          box-shadow: inset 0px 0px 0px 1px var(--neutral-300A);
          background-image: linear-gradient(to bottom, var(--neutral-050), var(--neutral-400));
        }

        // ---------------------------
        // SIZES
        // ---------------------------
        .my-button--tiny {
          --button-height: var(--base-space-3);
          --button-side-padding: calc(var(--base-space-1) + (var(--base-space-1) / 2));
        }

        .my-button--small {
          --button-icon-size: 12px;
          --button-height: calc(var(--base-space-3) + (var(--base-space-1) / 2));
        }

        .my-button--large {
          --button-height: var(--base-space-6);
        }

        .my-button--full-width {
          justify-content: center;
          width: 100%;
        }
      </style>
    `;
  }

  /**
   * Render the button content according to its loading state
   * @return {string}
   */
  _renderContent() {
    return this.isLoading === 'true' ? this._renderLoadingIcon() : `<span class="my-button__text text-action">${this.text}</span>`;
  }

  /**
   * Render a SVG loading icon
   * @return {string}
   */
  _renderLoadingIcon() {
    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        class="my-button__icon is-rotating"
      >
        <path d="M8 16c-2.137 0-4.146-.832-5.657-2.343s-2.343-3.52-2.343-5.657c0-1.513.425-2.986 1.228-4.261.781-1.239 1.885-2.24 3.193-2.895l.672 1.341c-1.063.533-1.961 1.347-2.596 2.354-.652 1.034-.997 2.231-.997 3.461 0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5c0-1.23-.345-2.426-.997-3.461-.635-1.008-1.533-1.822-2.596-2.354l.672-1.341c1.308.655 2.412 1.656 3.193 2.895.803 1.274 1.228 2.748 1.228 4.261 0 2.137-.832 4.146-2.343 5.657s-3.52 2.343-5.657 2.343z"/>
      </svg>
    `;
  }

  _render() {
    return this.innerHTML = `
      ${this._buildStyle()}
      <button
        class="my-button my-button--${this.look} my-button--${this.size}"
      >
        ${this._renderContent()}
      </button>
    `;
  }

  _onClick() {
    console.log('click');
  }
}