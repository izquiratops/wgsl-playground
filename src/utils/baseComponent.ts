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

        // TODO: XSS sanitizer
        if (options.templateUrl) {
            await this.loadTemplate(options.templateUrl);
        }

        if (options.styleUrls) {
            const stylesheet = new CSSStyleSheet();
            for (const styleUrl of options.styleUrls) {
                stylesheet.replaceSync(styleUrl);
                document.adoptedStyleSheets.push(stylesheet);
            }
        }

        this.onLoad();
    }

    private async loadTemplate(templateUrl: string) {
        const response = await fetch(templateUrl);
        const html = await response.text();
        this.innerHTML = html;
    }

    protected abstract onLoad(): void;
}

export { Component, BaseComponent };
