import htmlPath from "./index.html";

class ErrorModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    fetch(htmlPath)
      .then(response => response.text())
      .then(html => this.innerHTML = html);
  }
}

customElements.define("error-modal", ErrorModal);
export default ErrorModal;