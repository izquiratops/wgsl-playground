import Shared from "../services/shared";

class UpperToolbar extends HTMLElement {
    private draw = () => {
        // Autosave on local storage
        localStorage.setItem('shaderCode', Shared.editorCode);
        // The following frame will update the pipeline
        Shared.needsUpdate = true;
    }

    constructor() {
        super();
        this.innerHTML = `
        <h3>WGSL Playground</h3>
        <div class="actions">
            <button id="draw-btn">Draw</button>
            <button id="fullscreen-btn" title="Esc">Fullscreen</button>
            <form action="https://github.com/izquiratops/wgsl-playground" target="_blank" style="display: inline;">
                <input type="submit" value="Github" title="😸" />
            </form>
        </div>
        `;
    }

    connectedCallback() {
        const drawButtonEl = document.querySelector('#draw-btn') as HTMLButtonElement;
        drawButtonEl.addEventListener('click', this.draw);

        const fullscreenButtonEl = document.querySelector('#fullscreen-btn') as HTMLButtonElement;
        fullscreenButtonEl.addEventListener('click', Shared.toggleFullscreen);
        const showUiButtonEl = document.querySelector('#show-ui-btn') as HTMLButtonElement;
        showUiButtonEl.addEventListener('click', Shared.toggleFullscreen);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                Shared.toggleFullscreen();
            }
        });
    }
}

customElements.define("upper-toolbar", UpperToolbar);
export default UpperToolbar;