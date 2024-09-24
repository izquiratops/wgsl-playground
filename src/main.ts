import safeQuery from './utils/safeQuery';
import styleCss from './styles.css';
import './components';

// Load global styles
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(styleCss);
document.adoptedStyleSheets.push(stylesheet);

// Offline support
if (navigator && navigator.serviceWorker) {
    navigator.serviceWorker.register('offline.js');
}

// Bootstrap project
const bodyEl = safeQuery<HTMLBodyElement>('body');
bodyEl.appendChild(document.createElement('code-editor-view'));
