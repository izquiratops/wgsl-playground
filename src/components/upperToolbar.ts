import { shared } from "../services/shared";

class UpperToolbar extends HTMLElement {
    private drawButtonEl!: HTMLButtonElement;

    private draw = () => {
        // The following frame will update the pipeline
        shared.needsUpdate = true;
    }

    constructor() {
        super();
        this.innerHTML = `
        <h3>WGSL Playground</h3>
        <button id="draw" title="Ctrl + Enter">Draw</button>
        `;
    }

    connectedCallback() {
        this.drawButtonEl = document.querySelector('#draw') as HTMLButtonElement;
        this.drawButtonEl.addEventListener('click', this.draw);

        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'Enter') {
                this.draw();
            }
        });
    }
}

customElements.define("upper-toolbar", UpperToolbar);
export default UpperToolbar;