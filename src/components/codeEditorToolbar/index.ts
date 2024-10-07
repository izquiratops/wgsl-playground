import { Component, BaseComponent } from "../../utils/component";
import { $ } from "../../utils/queries";
import Shared from "../../services/shared";
import templateUrl from "./index.html";

@Component({
  selector: 'code-editor-toolbar',
  templateUrl
})
class CodeEditorToolbar extends BaseComponent {
  protected onLoad() {
    $<HTMLButtonElement>("#draw-btn")
      .addEventListener("click", this.runShaderCode);

    $<HTMLButtonElement>("#fullscreen-btn")
      .addEventListener("click", Shared.toggleFullscreen);

    $<HTMLButtonElement>("#github-btn")
      .addEventListener("click", this.redirectToGithub);

    $<HTMLButtonElement>("#toggle-aspect-ratio-btn")
      .addEventListener("click", this.toggleAspectRatio);
  }

  private runShaderCode() {
    // This flag makes the pipeline update on the next frame
    Shared.needsUpdate = true;
    // Autosaves on every re-run
    localStorage.setItem("shaderCode", Shared.shaderEditorCode);
  }

  private redirectToGithub() {
    window.open("https://github.com/izquiratops/wgsl-playground", "_blank");
  }

  private toggleAspectRatio() {
    const canvasEl = $<HTMLCanvasElement>("#canvas");
    canvasEl.classList.toggle("keep-aspect-ratio");
  }
}

export default CodeEditorToolbar;
