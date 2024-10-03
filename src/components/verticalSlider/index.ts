import BaseComponent from "../../utils/baseComponent";
import { $ } from "../../utils/queries";
import htmlPath from "./index.html";

class VerticalSlider extends BaseComponent {
  protected htmlPath = htmlPath;
  private editorContainerEl = $<HTMLTextAreaElement>(".editor-container");
  private resizeCanvasEvent = (e: MouseEvent) => {
    this.editorContainerEl.style.width = `${e.clientX}px`;
  };

  protected onLoad() {
    this.addEventListener("mousedown", (event) => {
      event.preventDefault(); // Avoid trigger other stuff like text selection
      document.addEventListener("mousemove", this.resizeCanvasEvent);
    });

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.resizeCanvasEvent);
    });
  }
}

customElements.define("vertical-slider", VerticalSlider);
export default VerticalSlider;
