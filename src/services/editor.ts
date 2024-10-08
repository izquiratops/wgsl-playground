import { EditorView, basicSetup } from 'codemirror';
import { wgsl } from "@iizukak/codemirror-lang-wgsl";

// WGSL-playground modules
import Renderer from './renderer';
import Shared from './shared';
import Theme from '../utils/editorTheme.json';

// Codemirror OneDark theme
import { oneDark } from '../utils/codemirrorTheme';

// Default WGSL code
import defaultShader from '../shaders/default.wgsl';

class Editor {
    constructor() {}

    setupTheme() {
        const currentTheme: any = Theme['UpperBar'][0];
        for (const property of Object.keys(currentTheme)) {
            document.documentElement.style.setProperty(
                property,
                currentTheme[property]
            );
        }
    }

    setupCodemirror() {
        const vertexCode = localStorage.getItem('shaderCode') ?? defaultShader;

        Shared.shaderEditor = new EditorView({
            doc: vertexCode,
            extensions: [basicSetup, oneDark, wgsl()],
            parent: document.querySelector('#shader-editor') as HTMLDivElement
        });
    }

    setupHotkeys() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                Shared.toggleFullscreen();
            }
        });
    }

    async initializeWebGPU(): Promise<void> {
        const canvasEl = document.querySelector('canvas') as HTMLCanvasElement;
        const context = canvasEl.getContext('webgpu');

        if (context && 'gpu' in navigator) {
            const adapter = await navigator.gpu.requestAdapter();

            if (!adapter) {
                throw Error('Adapter not found');
            }

            const device = await adapter.requestDevice()
            Shared.renderer = new Renderer(device, canvasEl, context);
            Shared.renderer.render();

            adapter.features.forEach(console.log);
        } else {
            throw Error('Context not found');
        }
    }
}

export default Editor;