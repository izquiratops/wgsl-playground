type BaseComponentConstructor = typeof BaseComponent & { componentOptions: ComponentOptions };

interface ComponentOptions {
    selector: string;
    styleUrls?: Array<string>,
    templateUrl?: string;
}

function Component(options: ComponentOptions) {
    return function <T extends { new(...args: any[]): BaseComponent }>(constructor: T) {
        const NewConstructor = class extends constructor {
            static componentOptions = options;
            protected onLoad!: () => void;
        };

        customElements.define(options.selector, NewConstructor);

        return NewConstructor;
    };
}

abstract class BaseComponent extends HTMLElement {
    selector: string | undefined;

    constructor() {
        super();
        this.initializeComponent();
    }

    private async initializeComponent() {
        const constructor = this.constructor as BaseComponentConstructor;
        const options = constructor.componentOptions;

        if (!options) {
            throw new Error('Component options not found. Did you forget to use the @Component decorator?');
        }

        this.selector = options.selector;

        if (options.templateUrl) {
            await this.loadTemplate(options.templateUrl);
        }

        if (options.styleUrls) {
            await this.loadStyles(options.styleUrls);
        }

        this.onLoad();
    }

    private async loadTemplate(templateUrl: string) {
        const response = await fetch(templateUrl);
        const html = await response.text();
        // TODO: XSS sanitizer
        this.innerHTML = html;
    }

    // TODO: I'm not using this for now, but it could be useful in the future
    private async loadStyles(styleUrls: string[]) {
        const styles = document.createElement('style');
        for (const styleUrl of styleUrls) {
            const response = await fetch(styleUrl);
            const css = await response.text();
            styles.textContent += css;
        }
        this.appendChild(styles);
    }

    protected abstract onLoad(): void;
}

export { Component, BaseComponent };
