import { shared } from "../main";
// import defaultVertexShader from "../shaders/vertex.wgsl";

class UpperToolbar extends HTMLElement {
    private drawButtonEl!: HTMLButtonElement;

    private draw = () => {
        const { renderer, fragmentEditor } = shared;
        if (!renderer || !fragmentEditor) {
            return;
        }
        
        // TODO!
        // renderer.run(fragmentEditor.value, defaultVertexShader);
    }

    constructor() {
        super();
        this.innerHTML = `<button id="draw">Draw</button>`;
    }

    connectedCallback() {
        this.drawButtonEl = document.querySelector('#draw') as HTMLButtonElement;
        this.drawButtonEl.addEventListener('click', this.draw);
    }
}

customElements.define("upper-toolbar", UpperToolbar);
export default UpperToolbar;