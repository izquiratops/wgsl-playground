import Shared from "../../services/shared";
import safeQuery from "../../utils/safeQuery";
import htmlPath from './index.html';

class CodeEditorToolbar extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    fetch(htmlPath)
      .then(response => response.text())
      .then(html => this.innerHTML = html)
      .then(() => this.onLoad());
  }

  private onLoad() {
    const drawButtonEl = safeQuery<HTMLButtonElement>('#draw-btn');
    drawButtonEl.addEventListener('click', this.runShaderCode);

    const fullscreenButtonEl = safeQuery<HTMLButtonElement>('#fullscreen-btn');
    fullscreenButtonEl.addEventListener('click', Shared.toggleFullscreen);

    const githubButtonEl = safeQuery<HTMLButtonElement>('#github-btn');
    githubButtonEl.addEventListener('click', this.redirectToGithub);

    const aspectRatioButtonEl = safeQuery<HTMLButtonElement>('#toggle-aspect-ratio-btn');
    aspectRatioButtonEl.addEventListener('click', () => this.toggleAspectRatio);
  }

  private runShaderCode() {
    // This flag makes the pipeline update on the next frame
    Shared.needsUpdate = true;
    // Autosaves on every re-run
    localStorage.setItem('shaderCode', Shared.shaderEditorCode);
  }

  private redirectToGithub() {
    window.open('https://github.com/izquiratops/wgsl-playground', '_blank');
  }

  private toggleAspectRatio() {
    const canvasEl = safeQuery<HTMLCanvasElement>('#canvas');
    canvasEl.classList.toggle('keep-aspect-ratio');
  }
}

customElements.define("code-editor-toolbar", CodeEditorToolbar);
export default CodeEditorToolbar;