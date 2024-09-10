class ErrorModal extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <dialog id="error">
            <p>
                Your browser doesn't support WebGPU or it's not enabled.<br>
                More info at <a href="https://webgpu.io">webgpu.io</a>
            </p>
        </dialog>
        `;
    }
}

customElements.define("error-modal", ErrorModal);
export default ErrorModal;