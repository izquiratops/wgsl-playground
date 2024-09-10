import Renderer from "./renderer";

export type Shared = {
    renderer?: Renderer;
    fragmentEditor?: HTMLTextAreaElement;
    vertexEditor?: HTMLTextAreaElement;
};