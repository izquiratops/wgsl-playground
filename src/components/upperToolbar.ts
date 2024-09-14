import { getCodeFromEditors, shared } from "../services/shared";

class UpperToolbar extends HTMLElement {
    private drawButtonEl!: HTMLButtonElement;

    private draw = () => {
        // Autosave on local storage
        const shaderCode = getCodeFromEditors();
        localStorage.setItem('shaderCode', shaderCode);

        // The following frame will update the pipeline
        shared.needsUpdate = true;
    }

    constructor() {
        super();
        this.innerHTML = `
        <h3>WGSL Playground</h3>
        <div class="actions">
            <button id="draw" title="Ctrl + Enter">Draw</button>
            <form action="https://github.com/izquiratops/wgsl-playground" target="_blank" style="display: inline;">
                <input type="submit" value="Github" />
            </form>
        </div>
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