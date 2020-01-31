import MyButton from '../../components/MyButton/MyButton.js';

// We put the registering of the custom element
// inside a try catch so that browser not compatible
// with custom elements are still able to return
// an error telling us what's happening.
try {
  // We register the custom element on the page
  // The name must contain at least one dash. 
  customElements.define('my-button', MyButton); 
} catch (e) {
  if (e instanceof DOMException) {
    console.error(`DOMException : ${e.message}`);
  } else {
    throw e;
  }
}