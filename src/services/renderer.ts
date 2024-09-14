import { BufferUsage, textureFormat } from "../constants";
import { UpdateResponse } from "../types";
import { getEditorCode, shared } from "./shared";

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

        let { pipeline, uniformsBuffer, uniformsBindGroup } = this.updatePipeline();

        const uniformsArrayBuffer = new Float32Array(3);
        uniformsArrayBuffer[0] = this.canvas.clientWidth;
        uniformsArrayBuffer[1] = this.canvas.clientHeight;
        uniformsArrayBuffer[2] = 1.;

        const frame = (t: number) => {
            if (shared.needsUpdate) {
                ({ pipeline, uniformsBuffer, uniformsBindGroup } = this.updatePipeline());
            }

            const commandEncoder = this.device.createCommandEncoder();
            const textureView = this.context.getCurrentTexture().createView();

            const renderPassDescriptor: any = {
                colorAttachments: [
                    {
                        view: textureView,
                        loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                        loadOp: 'clear',
                        storeOp: 'store',
                    },
                ],
            };

            uniformsArrayBuffer[2] = t;
            this.device.queue.writeBuffer(
                uniformsBuffer,
                0,
                uniformsArrayBuffer.buffer,
                uniformsArrayBuffer.byteOffset,
                uniformsArrayBuffer.byteLength
            );

            const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
            passEncoder.setPipeline(pipeline);
            passEncoder.setBindGroup(0, uniformsBindGroup);
            passEncoder.draw(6, 1, 0, 0);
            passEncoder.end();

            this.device.queue.submit([commandEncoder.finish()]);
            requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    }

    updatePipeline(): UpdateResponse {
        const shaderCode = getEditorCode();

        const pipeline = this.device.createRenderPipeline({
            layout: "auto",
            vertex: {
                module: this.device.createShaderModule({
                    code: shaderCode,
                }),
                entryPoint: 'mainVertex',
            },
            fragment: {
                module: this.device.createShaderModule({
                    code: shaderCode,
                }),
                entryPoint: 'mainFragment',
                targets: [{ format: textureFormat }],
            },
            primitive: {
                topology: 'triangle-list',
            },
        });

        const uniformsBuffer = this.device.createBuffer({
            size: 4 * 4,
            usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
        });

        const uniformsBindGroup = this.device.createBindGroup({
            layout: pipeline.getBindGroupLayout(0),
            entries: [{
                binding: 0,
                resource: { buffer: uniformsBuffer }
            }],
        });

        // Pipeline updated!
        shared.needsUpdate = false;

        return { pipeline, uniformsBuffer, uniformsBindGroup };
    }
}

export default Renderer;