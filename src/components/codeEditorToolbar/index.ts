import { Component, BaseComponent } from "../../utils/baseComponent";
import { $ } from "../../utils/queries";
import Shared from "../../services/shared";
import templateUrl from "./index.html";

@Component({
  selector: 'code-editor-toolbar',
  templateUrl
})
class CodeEditorToolbar extends BaseComponent {
  protected onLoad() {
    const drawButtonEl = $<HTMLButtonElement>("#draw-btn");
    drawButtonEl.addEventListener("click", this.runShaderCode);

    const fullscreenButtonEl = $<HTMLButtonElement>("#fullscreen-btn");
    fullscreenButtonEl.addEventListener("click", Shared.toggleFullscreen);

    const githubButtonEl = $<HTMLButtonElement>("#github-btn");
    githubButtonEl.addEventListener("click", this.redirectToGithub);

    const aspectRatioButtonEl = $<HTMLButtonElement>(
      "#toggle-aspect-ratio-btn",
    );
    aspectRatioButtonEl.addEventListener("click", this.toggleAspectRatio);
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
