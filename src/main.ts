import Editor from './editor';
import { Shared } from './types';

import './components';

const shared: Shared = {};

async function main() {
    const editor = new Editor();
    const errorElementEl = document.querySelector('#error') as HTMLDialogElement;

    try {
        await editor.initializeWebGPU();
    } catch {
        errorElementEl.showModal();
    }
}

main();

export { shared };