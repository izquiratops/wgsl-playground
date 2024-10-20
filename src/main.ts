import { $ } from "./utils/queries";

// Include global styles
import "./style.css";
// Include web components
import "./components";

// Offline support
if (navigator && navigator.serviceWorker) {
  navigator.serviceWorker.register("offline.js");
}

// Bootstrap project
const codeEditorEl = document.createElement("code-editor-view");
$<HTMLBodyElement>("body").appendChild(codeEditorEl);
