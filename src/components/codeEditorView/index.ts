import BaseComponent from "../../utils/baseComponent";
import Editor from "../../services/editor";
import { $ } from "../../utils/queries";
import htmlPath from "./index.html";

class CodeEditorView extends BaseComponent {
  protected htmlPath = htmlPath;

  protected onLoad() {
    const editor = new Editor();

    editor.setupCodemirror();
    editor.setupHotkeys();
    editor.setupTheme();

    editor.initializeWebGPU().catch(() => {
      const errorModalEl = $<HTMLDialogElement>("#error-modal");
      errorModalEl.showModal();
    });
  }
}

customElements.define("code-editor-view", CodeEditorView);
export default CodeEditorView;
