import { EditorView, basicSetup } from 'codemirror';
import Renderer from './renderer';

import { oneDark } from '../utils/oneDark';
import { shared } from './shared';

import defaultVertexShader from '../shaders/vertex.wgsl';
import defaultFragmentShader from '../shaders/fragment.wgsl';

class Editor {
    private canvasEl = document.querySelector('canvas') as HTMLCanvasElement;

    constructor() {
        const vertexCode = localStorage.getItem('vertexCode') ?? defaultVertexShader
        const fragmentCode = localStorage.getItem('fragmentCode') ?? defaultFragmentShader

        shared.vertexEditor = new EditorView({
            doc: vertexCode,
            extensions: [basicSetup, oneDark],
            parent: document.querySelector('#vertex-editor') as HTMLDivElement
        });

        shared.fragmentEditor = new EditorView({
            doc: fragmentCode,
            extensions: [basicSetup, oneDark],
            parent: document.querySelector('#fragment-editor') as HTMLDivElement
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
            shared.renderer = new Renderer(device, this.canvasEl, context);
            shared.renderer.render();

            adapter.features.forEach(console.log);
        } else {
            throw Error('Context not found');
        }
    }
}

export default Editor;