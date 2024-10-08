import { $ } from "./utils/queries";
import styleUrl from "./style.css";

// Include web components
import "./components";

// Offline support
if (navigator && navigator.serviceWorker) {
  navigator.serviceWorker.register("offline.js");
}

// Bootstrap project
const bodyEl = $<HTMLBodyElement>("body");
const codeEditorEl = document.createElement("code-editor-view");
bodyEl.appendChild(codeEditorEl);

// Apply global styles
fetch(styleUrl)
  .then(res => res.text())
  .then(globalStyles => {
    const styleElement = document.createElement('style');
    styleElement.textContent = globalStyles;
    bodyEl.appendChild(styleElement)
  })
