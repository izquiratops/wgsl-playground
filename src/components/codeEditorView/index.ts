import Editor from "../../services/editor";
import safeQuery from "../../utils/safeQuery";
import indexHTML from "./index.html";

class CodeEditorView extends HTMLElement {
  constructor() {
    super();
  } 

  connectedCallback() {
    this.innerHTML = indexHTML;

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