import indexHtml from "./index.html";

class ErrorModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = indexHtml;
  }
}

customElements.define("error-modal", ErrorModal);
export default ErrorModal;