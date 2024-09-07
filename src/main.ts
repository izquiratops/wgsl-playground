import fragmentShaderWgslCode from './shaders/fragment.wgsl'
import vertexShaderWgslCode from './shaders/vertex.wgsl'

function main() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('webgpu');

    if (context && 'gpu' in navigator) {
        navigator.gpu.requestAdapter().then(adapter => {
            if (!adapter) {
                throw Error('Adapter not found');
            }
            adapter.requestDevice().then((device) => initApp(device, canvas, context));
            adapter.features.forEach(console.log);
        })
    } else {
        throw Error('Context not found');
    }
}

function initApp(device: GPUDevice, canvas: HTMLCanvasElement, context: GPUCanvasContext) {
    const contextFormat = 'bgra8unorm';

    context.configure({
        device,
        format: contextFormat,
        alphaMode: 'opaque'
    });

    const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
            module: device.createShaderModule({
                code: vertexShaderWgslCode,
            }),
            entryPoint: 'main',
        },
        fragment: {
            module: device.createShaderModule({
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

    const uniformsBuffer = device.createBuffer({
        size: 4 * 4,
        usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
    });

    const uniformsBindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [{
            binding: 0,
            resource: { buffer: uniformsBuffer }
        }],
    });

    const uniformsArrayBuffer = new Float32Array(3);
    uniformsArrayBuffer[0] = canvas.clientWidth;
    uniformsArrayBuffer[1] = canvas.clientHeight;
    uniformsArrayBuffer[2] = 1.;


    function frame(t: number) {
        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();

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
        device.queue.writeBuffer(
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

        device.queue.submit([commandEncoder.finish()]);
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

function showError(error: Error) {
    console.error(error.message);
    const errorElement = document.getElementById('error')!;
    errorElement.classList.remove('hidden');
}

try {
    main();
} catch (error) {
    showError(error);
}
