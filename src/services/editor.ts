import { EditorView, basicSetup } from 'codemirror';
import { wgsl } from "@iizukak/codemirror-lang-wgsl";

// WGSL-playground modules
import Renderer from './renderer';
import Shared from './shared';
import Theme from '../utils/editorTheme.json';
import { $ } from '../utils/queries';

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
            parent: $<HTMLDivElement>('#shader-editor')
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
        const canvasEl = $<HTMLCanvasElement>('canvas');
        const context = canvasEl.getContext('webgpu');

        if (context && 'gpu' in navigator) {
            const adapter = await navigator.gpu.requestAdapter();

            if (!adapter) {
                throw Error('Adapter not found');
            }

            const device = await adapter.requestDevice();

            // Initialize the renderer before start listening for resize events
            Shared.renderer = new Renderer(device, canvasEl, context);

            // Run render function on demand every time the canvas is resized
            const observer = new ResizeObserver(entries => {
                for (const entry of entries) {
                    if (entry.contentBoxSize[0] === undefined) {
                        throw new Error("Couldn't get content size of the canvas element");
                    }

                    const width = entry.contentBoxSize[0].inlineSize;
                    const height = entry.contentBoxSize[0].blockSize;
                    const canvas = entry.target as HTMLCanvasElement;

                    canvas.width = Math.max(1, Math.min(width, device.limits.maxTextureDimension2D));
                    canvas.height = Math.max(1, Math.min(height, device.limits.maxTextureDimension2D));

                    Shared.renderer?.render();
                }
            });

            observer.observe(canvasEl);
        } else {
            throw Error('Context not found');
        }
    }
}

export default Editor;