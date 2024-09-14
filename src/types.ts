import { EditorView } from "codemirror";
import Renderer from "./services/renderer";

export type Shared = {
    needsUpdate: boolean;
    renderer?: Renderer;
    shaderEditor?: EditorView;
};

export type UpdateResponse = {
    pipeline: GPURenderPipeline,
    uniformsBuffer: GPUBuffer,
    uniformsBindGroup: GPUBindGroup,
}