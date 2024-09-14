import Editor from './services/editor';
import './components';

async function main() {
    const editor = new Editor();
    const errorElementEl = document.querySelector('#error') as HTMLDialogElement;

    if (navigator && navigator.serviceWorker) {
		navigator.serviceWorker.register('offline.js');
	}

    try {
        await editor.initializeWebGPU();
    } catch {
        errorElementEl.showModal();
    }
}

main();
