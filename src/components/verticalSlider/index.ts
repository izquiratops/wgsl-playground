import { Component, BaseComponent } from "../../utils/baseComponent";
import { $ } from "../../utils/queries";

@Component({
  selector: 'vertial-slider'
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

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.resizeCanvasEvent);
    });
  }
}

export default VerticalSlider;
