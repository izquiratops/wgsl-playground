class ErrorModal extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <dialog id="error">
            <h2>Something gone wrong 💀</h2>
            <p>
                Your browser doesn't support WebGPU or it's not enabled.
            </p>
        </dialog>
        `;
    }
}

customElements.define("error-modal", ErrorModal);
export default ErrorModal;