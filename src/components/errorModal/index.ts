import { Component, BaseComponent } from "../../utils/baseComponent";
import templateUrl from "./index.html";

@Component({
  selector: 'error-modal',
  templateUrl
})
class ErrorModal extends BaseComponent {
  protected onLoad() {}
}

export default ErrorModal;