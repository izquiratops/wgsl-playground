class TextEditor extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div>Foo</div>
        `;
    }
}

customElements.define("text-editor", TextEditor);
export default TextEditor;