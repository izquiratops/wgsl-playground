import { Renderer } from './renderer';
import fragmentShaderWgslCode from './shaders/fragment.wgsl'
import vertexShaderWgslCode from './shaders/vertex.wgsl'

class Editor {
    private STATE = {
        sliderActive: false,
    };

    private canvas = document.querySelector('canvas') as HTMLCanvasElement;
    private fragmentEditor = document.querySelector('#fragment-editor') as HTMLTextAreaElement;
    private splitSlider = document.querySelector('.split-slider') as HTMLDivElement;

    initialize() {
        // Set the initial value of the fragment shader editor
        this.fragmentEditor.value = fragmentShaderWgslCode;
        
        // Set the slider event listeners
        this.setSliderPosition();
        
        // Setup WebGPU
        const context = this.canvas.getContext('webgpu');

        if (context && 'gpu' in navigator) {
            navigator.gpu.requestAdapter().then(adapter => {
                if (!adapter) {
                    this.showErrorModal('Adapter not found');
                    return;
                }

                adapter.requestDevice().then((device) => {
                    const renderer = new Renderer(device, this.canvas, context);
                    renderer.initialize(vertexShaderWgslCode, fragmentShaderWgslCode);
                });

                adapter.features.forEach(console.log);
            })
        } else {
            this.showErrorModal('Context not found');
        }
    }
    
    private setSliderPosition() {
        this.splitSlider.addEventListener('mousedown', () => {
            this.STATE.sliderActive = true;
        });
        
        this.splitSlider.addEventListener('mouseup', () => {
            this.STATE.sliderActive = false;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (this.STATE.sliderActive) {
                this.canvas.style.width = `${e.clientX}px`;
            }
        });
    }
    
    private showErrorModal(error: string) {
        console.error(error);
        const errorElement: HTMLDialogElement = document.querySelector('#error')!;
        errorElement.showModal();
    }
}

const editor = new Editor();
editor.initialize();