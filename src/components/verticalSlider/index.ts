import { Component, BaseComponent } from "../../utils/component";
import { $ } from "../../utils/queries";
import templateUrl from "./index.html";

@Component({
  selector: 'vertical-slider',
  templateUrl
})
class VerticalSlider extends BaseComponent {
  private editorContainerEl!: HTMLTextAreaElement;

  private resizeCanvasEvent = (e: MouseEvent) => {
    this.editorContainerEl.style.width = `${e.clientX}px`;
  };

  protected onLoad() {
    this.editorContainerEl = $<HTMLTextAreaElement>(".editor-container");

    this.addEventListener("mousedown", (event) => {
      event.preventDefault(); // Avoid trigger other stuff like text selection
      document.addEventListener("mousemove", this.resizeCanvasEvent);
    });

    this.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.resizeCanvasEvent);
    });
  }
}

export default VerticalSlider;
