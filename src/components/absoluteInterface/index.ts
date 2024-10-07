import { Component, BaseComponent } from "../../utils/component";
import { $ } from "../../utils/queries";
import Shared from "../../services/shared";
import templateUrl from "./index.html";

@Component({
  selector: 'absolute-interface',
  templateUrl
})
class AbsoluteInterface extends BaseComponent {
  protected onLoad() {
    $<HTMLButtonElement>("#exit-fullscreen-btn")
      .addEventListener("click", Shared.toggleFullscreen);
  }
}

export default AbsoluteInterface;
