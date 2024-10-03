import BaseComponent from "../../utils/baseComponent";
import htmlPath from "./index.html";

class ErrorModal extends BaseComponent {
  protected htmlPath = htmlPath;

  protected onLoad() {}
}

customElements.define("error-modal", ErrorModal);
export default ErrorModal;