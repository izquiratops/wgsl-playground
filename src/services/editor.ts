import { EditorView, basicSetup } from 'codemirror';
import { wgsl } from "@iizukak/codemirror-lang-wgsl";
// WGSL-playground modules
import Renderer from './renderer';
import Shared from './shared';
import Theme from '../utils/theme.json';
// Codemirror OneDark theme
import { oneDark } from '../utils/oneDarkTheme';
// Default WGSL code
import defaultShader from '../shaders/default.wgsl';

class Editor {
    private canvasEl = document.querySelector('canvas') as HTMLCanvasElement;

    constructor() {
        this.setupTheme();
        this.setupCodemirror();
    }

    private setupTheme() {
        const lenght = Theme['UpperBar'].length;
        const idx = Math.floor(Math.random() * lenght);
        const currentTheme: any = Theme['UpperBar'][idx];

        for (const property of Object.keys(currentTheme)) {
            document.documentElement.style.setProperty(
                property,
                currentTheme[property]
            );
        }
    }

    private setupCodemirror() {
        const vertexCode = localStorage.getItem('shaderCode') ?? defaultShader;

        Shared.shaderEditor = new EditorView({
            doc: vertexCode,
            extensions: [basicSetup, oneDark, wgsl()],
            parent: document.querySelector('#shader-editor') as HTMLDivElement
        });
    }

    async initializeWebGPU(): Promise<void> {
        const context = this.canvasEl.getContext('webgpu');

        if (context && 'gpu' in navigator) {
            const adapter = await navigator.gpu.requestAdapter();

            if (!adapter) {
                throw Error('Adapter not found');
            }

            const device = await adapter.requestDevice()
            Shared.renderer = new Renderer(device, this.canvasEl, context);
            Shared.renderer.render();

            adapter.features.forEach(console.log);
        } else {
            throw Error('Context not found');
        }
    }
}

export default Editor;