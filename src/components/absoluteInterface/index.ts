import Shared from "../../services/shared";
import safeQuery from "../../utils/safeQuery";
import htmlPath from './index.html';

class AbsoluteInterface extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    fetch(htmlPath)
      .then(response => response.text())
      .then(html => this.innerHTML = html);

    const exitFullscreenButtonEl = safeQuery<HTMLButtonElement>('#exit-fullscreen-btn');
    exitFullscreenButtonEl.addEventListener('click', () => Shared.toggleFullscreen);
  }
}

customElements.define("absolute-interface", AbsoluteInterface);
export default AbsoluteInterface;