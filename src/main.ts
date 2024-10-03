import { $ } from "./utils/queries";
import "./styles.css";
import "./components";

// Offline support
if (navigator && navigator.serviceWorker) {
  navigator.serviceWorker.register("offline.js");
}

// Bootstrap project
const bodyEl = $<HTMLBodyElement>("body");
const codeEditorEl = document.createElement("code-editor-view");
bodyEl.appendChild(codeEditorEl);
