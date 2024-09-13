import { EditorView } from "codemirror";
import Renderer from "./renderer";

type Shared = {
    needsUpdate: boolean;
    renderer?: Renderer;
    fragmentEditor?: EditorView;
    vertexEditor?: EditorView;
};

const shared: Shared = {
    needsUpdate: false,
};

export { shared }