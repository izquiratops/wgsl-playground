import Shared from "../../services/shared";
import safeQuery from "../../utils/safeQuery";
import indexHtml from './index.html';

class CodeEditorToolbar extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    this.innerHTML = indexHtml;

    const drawButtonEl = safeQuery<HTMLButtonElement>('#draw-btn');
    drawButtonEl.addEventListener('click', this.saveShaderCode);

    const fullscreenButtonEl = safeQuery<HTMLButtonElement>('#fullscreen-btn');
    fullscreenButtonEl.addEventListener('click', Shared.toggleFullscreen);

    const githubButtonEl = safeQuery<HTMLButtonElement>('#github-btn');
    githubButtonEl.addEventListener('click', this.redirectToGithub);

    const aspectRatioButtonEl = safeQuery<HTMLButtonElement>('#toggle-aspect-ratio-btn');
    aspectRatioButtonEl.addEventListener('click', () => this.toggleAspectRatio);
  }

  private saveShaderCode() {
    // Autosave on local storage
    localStorage.setItem('shaderCode', Shared.shaderEditorCode);
    // This flag makes the pipeline update on the next frame
    Shared.needsUpdate = true;
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