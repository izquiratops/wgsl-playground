import { BufferUsage, textureFormat } from "../utils/constants";
import { UpdateResponse } from "./types";
import Shared from "./shared";

class Renderer {
    constructor(
        private device: GPUDevice,
        private canvas: HTMLCanvasElement,
        private context: GPUCanvasContext,
    ) {}

    render() {
        this.context.configure({
            device: this.device,
            format: textureFormat,
            alphaMode: 'opaque'
        });

        let { pipeline, uniformsBuffer } = this.updatePipeline();

        const renderPassDescriptor = {
            colorAttachments: [
                {
                    view: this.context.getCurrentTexture().createView(),
                    clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                    loadOp: 'clear',
                    storeOp: 'store',
                },
            ],
        };

        const uniformsArrayBuffer = new Float32Array(3);
        uniformsArrayBuffer[0] = this.canvas.clientWidth;
        uniformsArrayBuffer[1] = this.canvas.clientHeight;
        uniformsArrayBuffer[2] = 1.;

        const frame = (t: number) => {
            if (Shared.needsUpdate) {
                ({ pipeline, uniformsBuffer } = this.updatePipeline());
            }

            const textureView = this.context.getCurrentTexture().createView();
            renderPassDescriptor.colorAttachments[0]!.view = textureView;
            
            uniformsArrayBuffer[2] = t;
            this.device.queue.writeBuffer(
                uniformsBuffer,
                0,
                uniformsArrayBuffer.buffer,
                uniformsArrayBuffer.byteOffset,
                uniformsArrayBuffer.byteLength
            );
            
            const commandEncoder = this.device.createCommandEncoder({ label: 'main encoder' });
            const passEncoder = commandEncoder.beginRenderPass(
                renderPassDescriptor as GPURenderPassDescriptor
            );
            passEncoder.setPipeline(pipeline);
            passEncoder.draw(3);
            passEncoder.end();

            const commandBuffer = commandEncoder.finish();
            this.device.queue.submit([commandBuffer]);
        }

        requestAnimationFrame(frame);
    }

    updatePipeline(): UpdateResponse {
        const shaderCode = Shared.shaderEditorCode;

        const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
        const pipeline = this.device.createRenderPipeline({
            layout: "auto",
            vertex: {
                module: this.device.createShaderModule({
                    label: 'editor code',
                    code: shaderCode,
                }),
                entryPoint: 'mainVertex',
            },
            fragment: {
                module: this.device.createShaderModule({
                    label: 'editor code',
                    code: shaderCode,
                }),
                entryPoint: 'mainFragment',
                targets: [{ format: presentationFormat }],
            },
        });

        const uniformsBuffer = this.device.createBuffer({
            size: 4 * 4,
            usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
        });

        // Pipeline updated!
        Shared.needsUpdate = false;

        return { pipeline, uniformsBuffer };
    }
}

export default Renderer;