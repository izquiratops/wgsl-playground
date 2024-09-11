import Renderer from "./renderer";

type Shared = {
    renderer?: Renderer;
    fragmentEditor?: HTMLTextAreaElement;
    vertexEditor?: HTMLTextAreaElement;
};

const shared: Shared = {};

export { shared }