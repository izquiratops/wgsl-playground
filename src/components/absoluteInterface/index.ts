import { Component, BaseComponent } from "../../utils/baseComponent";
import { $ } from "../../utils/queries";
import Shared from "../../services/shared";
import templateUrl from "./index.html";

@Component({
  selector: 'absolute-interface',
  templateUrl
})
class AbsoluteInterface extends BaseComponent {
  protected onLoad() {
    const exitFullscreenButtonEl = $<HTMLButtonElement>("#exit-fullscreen-btn");
    exitFullscreenButtonEl.addEventListener(
      "click",
      () => Shared.toggleFullscreen(),
    );
  }
}

export default AbsoluteInterface;
