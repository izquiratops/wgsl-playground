import { EditorView, basicSetup } from 'codemirror';
import { wgsl } from "@iizukak/codemirror-lang-wgsl";


import Renderer from './renderer';
import { shared } from './shared';
import { oneDark } from '../utils/oneDarkTheme';

import defaultShader from '../shaders/default.wgsl';

class Editor {
    private canvasEl = document.querySelector('canvas') as HTMLCanvasElement;

    constructor() {
        const vertexCode = localStorage.getItem('shaderCode') ?? defaultShader

        shared.shaderEditor = new EditorView({
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
            shared.renderer = new Renderer(device, this.canvasEl, context);
            shared.renderer.render();

            adapter.features.forEach(console.log);
        } else {
            throw Error('Context not found');
        }
    }
}

export default Editor;