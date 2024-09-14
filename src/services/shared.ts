import { EditorView } from "codemirror";
import Renderer from "./renderer";

class Shared {
    static needsUpdate = false;
    static renderer: Renderer | undefined;
    static shaderEditor: EditorView | undefined;

    constructor() { }

    static get editorCode(): string {
        if (!Shared.shaderEditor) {
            throw Error('Vertex editor not found')
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
