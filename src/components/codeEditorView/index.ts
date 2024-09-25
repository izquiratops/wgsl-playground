import Editor from "../../services/editor";
import safeQuery from "../../utils/safeQuery";
import htmlPath from "./index.html";

class CodeEditorView extends HTMLElement {
  constructor() {
    super();
  } 

  connectedCallback() {
    fetch(htmlPath)
      .then(response => response.text())
      .then(html => this.innerHTML = html)
      .then(this.onLoad);
  }

  private onLoad() {
    const editor = new Editor();

    editor.setupCodemirror();
    editor.setupHotkeys();
    editor.setupTheme();

    editor.initializeWebGPU().catch(() => {
      const errorModalEl = safeQuery<HTMLDialogElement>('#error-modal');
      errorModalEl.showModal();
    });
  }
}

customElements.define("code-editor-view", CodeEditorView);
export default CodeEditorView;