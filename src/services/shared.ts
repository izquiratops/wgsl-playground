import { Shared } from "../types";

const shared: Shared = {
    needsUpdate: false,
};


function getCodeFromEditors(): {
    vertexCode: string,
    fragmentCode: string,
} {
    const { vertexEditor, fragmentEditor } = shared;

    if (!vertexEditor) {
        throw Error('Vertex editor not found')
    }
    const vertexCode = vertexEditor.state.doc.toString();

    if (!fragmentEditor) {
        throw Error('Fragment editor not found')
    }
    const fragmentCode = fragmentEditor.state.doc.toString();

    return {
        vertexCode,
        fragmentCode
    };
}

export { shared, getCodeFromEditors }