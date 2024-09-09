export class Renderer {
    constructor(
        private device: GPUDevice,
        private canvas: HTMLCanvasElement,
        private context: GPUCanvasContext,
    ) {}

    initialize(vertexShaderWgslCode: string, fragmentShaderWgslCode: string) {
        const contextFormat = 'bgra8unorm';

        this.context.configure({
            device: this.device,
            format: contextFormat,
            alphaMode: 'opaque'
        });

        const pipeline = this.device.createRenderPipeline({
            layout: 'auto',
            vertex: {
                module: this.device.createShaderModule({
                    code: vertexShaderWgslCode,
                }),
                entryPoint: 'main',
            },
            fragment: {
                module: this.device.createShaderModule({
                    code: fragmentShaderWgslCode,
                }),
                entryPoint: 'main',
                targets: [
                    {
                        format: contextFormat,
                    },
                ],
            },
            primitive: {
                topology: 'triangle-list',
            },
        });

        const BufferUsage = {
            MAP_READ: 0x0001,
            MAP_WRITE: 0x0002,
            COPY_SRC: 0x0004,
            COPY_DST: 0x0008,
            INDEX: 0x0010,
            VERTEX: 0x0020,
            UNIFORM: 0x0040,
            STORAGE: 0x0080,
            INDIRECT: 0x0100,
            QUERY_RESOLVE: 0x0200,
        };

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

        const uniformsArrayBuffer = new Float32Array(3);
        uniformsArrayBuffer[0] = this.canvas.clientWidth;
        uniformsArrayBuffer[1] = this.canvas.clientHeight;
        uniformsArrayBuffer[2] = 1.;

        const frame = (t: number) => {
            const commandEncoder = this.device.createCommandEncoder();
            const textureView = this.context.getCurrentTexture().createView();

            const renderPassDescriptor = {
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
}