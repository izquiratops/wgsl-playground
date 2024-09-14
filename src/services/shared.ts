import { Shared } from "../types";

const shared: Shared = {
    needsUpdate: false,
};

function getEditorCode(): string {
    const { shaderEditor } = shared;

    if (!shaderEditor) {
        throw Error('Vertex editor not found')
    }
    const shaderCode = shaderEditor.state.doc.toString();

    return shaderCode;
}

export { shared, getEditorCode }