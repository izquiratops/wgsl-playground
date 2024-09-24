import { EditorView } from "codemirror";
import Renderer from "./renderer";

class Shared {
    static needsUpdate = false;
    static renderer: Renderer | undefined;
    static shaderEditor: EditorView | undefined;

    constructor() { }

    static get shaderEditorCode(): string {
        if (!Shared.shaderEditor) {
            throw new Error('Editor not found');
        }

        return Shared.shaderEditor.state.doc.toString();
    }

    static toggleFullscreen() {
        const interfaceElements = document.querySelectorAll('.hideable');
        for (const interfaceElement of interfaceElements) {
            interfaceElement.classList.toggle('hidden');
        }
    }
}

export default Shared;
