import { $ } from "../../utils/queries";

class VerticalSlider extends HTMLElement {
  private editorContainerEl = $<HTMLTextAreaElement>(".editor-container");

  private resizeCanvasEvent = (e: MouseEvent) => {
    this.editorContainerEl.style.width = `${e.clientX}px`;
  };

  constructor() {
    super();
  }

  connectedCallback() {
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
