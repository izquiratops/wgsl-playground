import { shared } from "../main";

class UpperToolbar extends HTMLElement {
    private drawButtonEl!: HTMLButtonElement;

    private draw = () => {
        const { renderer, fragmentEditor, vertexEditor } = shared;

        if (!renderer || !fragmentEditor || !vertexEditor) {
            throw Error("Couldn't draw successfully");
        }

        renderer.run(
            fragmentEditor.value,
            vertexEditor.value,
        );
    }

    constructor() {
        super();
        this.innerHTML = `
        <h3>🎨 WGSL Playground</h3>
        <button id="draw" title="Shortcut: Ctrl + Enter">Draw ✏️</button>
        `;
    }

    connectedCallback() {
        this.drawButtonEl = document.querySelector('#draw') as HTMLButtonElement;
        this.drawButtonEl.addEventListener('click', this.draw);
    }
}

customElements.define("upper-toolbar", UpperToolbar);
export default UpperToolbar;