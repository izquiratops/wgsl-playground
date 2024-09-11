import Renderer from './renderer';
import { shared } from './shared';

import defaultFragmentShader from '../shaders/fragment.wgsl';
import defaultVertexShader from '../shaders/vertex.wgsl';

class Editor {
    private canvasEl = document.querySelector('canvas') as HTMLCanvasElement;

    constructor() {
        shared.vertexEditor = document.querySelector('#vertex-editor') as HTMLTextAreaElement;
        shared.fragmentEditor = document.querySelector('#fragment-editor') as HTMLTextAreaElement;

        shared.vertexEditor.value = defaultVertexShader;
        shared.fragmentEditor.value = defaultFragmentShader;
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
            shared.renderer.run(defaultVertexShader, defaultFragmentShader);

            adapter.features.forEach(console.log);
        } else {
            throw Error('Context not found');
        }
    }
}

export default Editor;