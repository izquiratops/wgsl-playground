import {Component, BaseComponent} from "../../utils/component";
import { $ } from "../../utils/queries";
import Editor from "../../services/editor";
import templateUrl from "./index.html";

@Component({
  selector: 'code-editor-view',
  templateUrl
})
class CodeEditorView extends BaseComponent {
  protected onLoad() {
    const editor = new Editor();

    editor.setupCodemirror();
    editor.setupHotkeys();
    editor.setupTheme();

    editor.initializeWebGPU().catch(() => {
      const errorModalEL = document.createElement("error-modal");
      $<HTMLBodyElement>("body").appendChild(errorModalEL);
    });
  }
}

export default CodeEditorView;
