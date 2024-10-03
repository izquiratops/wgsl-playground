import BaseComponent from "../../utils/baseComponent";
import Shared from "../../services/shared";
import { $ } from "../../utils/queries";
import htmlPath from "./index.html";

class AbsoluteInterface extends BaseComponent {
  protected htmlPath = htmlPath;

  protected onLoad() {
    const exitFullscreenButtonEl = $<HTMLButtonElement>("#exit-fullscreen-btn");
    exitFullscreenButtonEl.addEventListener(
      "click",
      () => Shared.toggleFullscreen(),
    );
  }
}

customElements.define("absolute-interface", AbsoluteInterface);
export default AbsoluteInterface;
