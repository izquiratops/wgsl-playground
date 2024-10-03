abstract class BaseComponent extends HTMLElement {
    protected abstract htmlPath: string;

    constructor() {
        super();
    }

    connectedCallback() {
        fetch(this.htmlPath)
            .then((response) => response.text())
            .then((html) => (this.innerHTML = html))
            .then(() => this.onLoad());
    }

    protected abstract onLoad(): void;
}

export default BaseComponent;